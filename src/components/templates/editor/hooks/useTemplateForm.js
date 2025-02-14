import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useCallback, useEffect, useState, useRef } from 'react'
import useTemplateStore from '../../../../store/templateStore'
import { debounce } from 'lodash'
import dayjs from 'dayjs'

const STORAGE_KEY = 'template_draft'
const AUTO_SAVE_DELAY = 1000 // 1초

// 유효성 검사 스키마
const schema = yup.object().shape({
   title: yup
      .string()
      .required('제목을 입력해주세요')
      .min(2, '최소 2자 이상 입력해주세요')
      .max(50, '최대 50자까지 입력 가능합니다')
      .test('no-special-chars', '특수문자는 사용할 수 없습니다', (value) => {
         if (!value) return true
         return !/[!@#$%^&*(),.?":{}|<>]/.test(value)
      }),
   greeting: yup.string().required('인사말을 입력해주세요').min(10, '최소 10자 이상 입력해주세요').max(500, '최대 500자까지 입력 가능합니다'),
   date: yup
      .date()
      .nullable()
      .required('날짜를 선택해주세요')
      .test('is-future', '현재 시간 이후로 선택해주세요', (value) => {
         if (!value) return true
         return dayjs(value).isAfter(dayjs())
      }),
   location: yup.string().required('장소를 입력해주세요').min(5, '최소 5자 이상 입력해주세요'),
   traffic: yup.string().when('location', {
      is: (val) => val && val.length > 0,
      then: () => yup.string().required('오시는 길을 입력해주세요'),
      otherwise: () => yup.string(),
   }),
   gallery: yup.array().of(
      yup.mixed().test('fileSize', '이미지 크기는 5MB 이하여야 합니다', (value) => {
         if (!value) return true
         return value.size <= 5000000
      })
   ),
   attendance: yup.string().when('rsvpEnabled', {
      is: true,
      then: () => yup.string().required('참석 여부 메시지를 입력해주세요'),
      otherwise: () => yup.string(),
   }),
   rsvpEnabled: yup.boolean(),
   rsvpDeadline: yup
      .date()
      .nullable()
      .when('rsvpEnabled', {
         is: true,
         then: () =>
            yup
               .date()
               .nullable()
               .required('RSVP 마감일을 선택해주세요')
               .min(new Date(), '현재 시간 이후로 선택해주세요')
               .test('before-event', '행사 날짜 이전으로 선택해주세요', function (value) {
                  const eventDate = this.parent.date
                  if (!value || !eventDate) return true
                  return dayjs(value).isBefore(dayjs(eventDate))
               }),
         otherwise: () => yup.date().nullable(),
      }),
})

const useTemplateForm = () => {
   const { template, updateTemplate } = useTemplateStore()
   const [autoSaveStatus, setAutoSaveStatus] = useState('idle') // idle, saving, saved, error
   const [lastSaved, setLastSaved] = useState(null)
   const [previewData, setPreviewData] = useState(null)
   const [isLoading, setIsLoading] = useState(false)
   const previousData = useRef(null)

   // 폼 초기화
   const methods = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
         title: template.title || '',
         greeting: template.greeting || '',
         date: template.date ? new Date(template.date) : null,
         location: template.location || '',
         traffic: template.traffic || '',
         gallery: template.gallery || [],
         attendance: template.attendance || '',
         rsvpEnabled: false,
         rsvpDeadline: null,
      },
      mode: 'onChange',
   })

   // 실시간 미리보기 데이터 업데이트
   const updatePreview = useCallback(
      debounce((data) => {
         setPreviewData(data)
      }, 300),
      []
   )

   // 데이터 변경 감지
   const hasDataChanged = useCallback((newData) => {
      if (!previousData.current) return true
      return JSON.stringify(newData) !== JSON.stringify(previousData.current)
   }, [])

   // 임시 저장 처리
   const saveDraft = useCallback(
      debounce(async (data) => {
         if (!hasDataChanged(data)) return

         try {
            setAutoSaveStatus('saving')
            setIsLoading(true)

            // 데이터 정제
            const cleanData = {
               ...data,
               date: data.date ? data.date.toISOString() : null,
               rsvpDeadline: data.rsvpDeadline ? data.rsvpDeadline.toISOString() : null,
               gallery: data.gallery.map((file) => ({
                  name: file.name,
                  size: file.size,
                  type: file.type,
                  lastModified: file.lastModified,
               })),
            }

            localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanData))
            setLastSaved(new Date())
            updateTemplate(data)
            previousData.current = data
            setAutoSaveStatus('saved')
         } catch (error) {
            console.error('Failed to save draft:', error)
            setAutoSaveStatus('error')
         } finally {
            setIsLoading(false)
         }
      }, AUTO_SAVE_DELAY),
      [updateTemplate, hasDataChanged]
   )

   // 임시 저장 데이터 불러오기
   const loadDraft = useCallback(() => {
      try {
         setIsLoading(true)
         const savedData = localStorage.getItem(STORAGE_KEY)
         if (savedData) {
            const parsedData = JSON.parse(savedData)
            // 날짜 데이터 변환
            if (parsedData.date) parsedData.date = new Date(parsedData.date)
            if (parsedData.rsvpDeadline) parsedData.rsvpDeadline = new Date(parsedData.rsvpDeadline)

            // 이미지 데이터 복원
            if (parsedData.gallery) {
               parsedData.gallery = parsedData.gallery.map((fileInfo) => {
                  // 실제 파일 객체는 복원할 수 없으므로, 임시 File 객체 생성
                  return new File([], fileInfo.name, {
                     type: fileInfo.type,
                     lastModified: fileInfo.lastModified,
                  })
               })
            }

            previousData.current = parsedData
            return parsedData
         }
      } catch (error) {
         console.error('Failed to load draft:', error)
      } finally {
         setIsLoading(false)
      }
      return null
   }, [])

   // 폼 데이터 변경 시 실시간 업데이트 및 임시 저장
   useEffect(() => {
      const subscription = methods.watch((data) => {
         updatePreview(data)
         saveDraft(data)
      })
      return () => subscription.unsubscribe()
   }, [methods.watch, updatePreview, saveDraft])

   // 컴포넌트 마운트 시 임시 저장 데이터 불러오기
   useEffect(() => {
      const draftData = loadDraft()
      if (draftData) {
         Object.keys(draftData).forEach((key) => {
            methods.setValue(key, draftData[key])
         })
      }
   }, [loadDraft, methods.setValue])

   // API 호출 모킹
   const mockApiCall = async (data) => {
      setIsLoading(true)
      try {
         await new Promise((resolve) => setTimeout(resolve, 1500))
         return { success: true, data }
      } finally {
         setIsLoading(false)
      }
   }

   // 폼 제출 처리
   const onSubmit = async (data) => {
      try {
         setIsLoading(true)
         const result = await mockApiCall(data)
         if (result.success) {
            updateTemplate(data)
            localStorage.removeItem(STORAGE_KEY)
            previousData.current = null
            return { success: true }
         }
      } catch (error) {
         console.error('Template submission error:', error)
         return { success: false, error }
      } finally {
         setIsLoading(false)
      }
   }

   // 이미지 업로드 처리
   const handleImageUpload = useCallback(
      async (files) => {
         try {
            setIsLoading(true)
            const validFiles = Array.from(files).filter((file) => {
               const isValid = schema.fields.gallery.innerType.tests[0].test(file)
               return isValid
            })

            if (validFiles.length !== files.length) {
               methods.setError('gallery', {
                  type: 'manual',
                  message: '일부 이미지의 크기가 너무 큽니다',
               })
            }

            const currentGallery = methods.getValues('gallery') || []
            methods.setValue('gallery', [...currentGallery, ...validFiles], {
               shouldValidate: true,
               shouldDirty: true,
            })

            return { success: true, files: validFiles }
         } catch (error) {
            console.error('Image upload error:', error)
            return { success: false, error }
         } finally {
            setIsLoading(false)
         }
      },
      [methods]
   )

   return {
      ...methods,
      onSubmit,
      handleImageUpload,
      loadDraft,
      saveDraft,
      autoSaveStatus,
      lastSaved,
      previewData,
      isLoading,
   }
}

export default useTemplateForm
