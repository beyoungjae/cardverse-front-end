import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useCallback, useEffect, useState } from 'react'
import useTemplateStore from '../../../../store/templateStore'
import { debounce } from 'lodash'
import dayjs from 'dayjs'

const STORAGE_KEY = 'template_draft'
const AUTO_SAVE_DELAY = 1000 // 1초

// 유효성 검사 스키마
const schema = yup.object().shape({
   title: yup.string().required('제목을 입력해주세요').min(2, '최소 2자 이상 입력해주세요').max(50, '최대 50자까지 입력 가능합니다'),
   greeting: yup.string().required('인사말을 입력해주세요').min(10, '최소 10자 이상 입력해주세요').max(500, '최대 500자까지 입력 가능합니다'),
   date: yup
      .date()
      .nullable()
      .required('날짜를 선택해주세요')
      .min(new Date(), '현재 시간 이후로 선택해주세요')
      .test('is-future', '현재 시간 이후로 선택해주세요', (value) => {
         if (!value) return true
         return dayjs(value).isAfter(dayjs())
      }),
   location: yup.string().required('장소를 입력해주세요').min(5, '최소 5자 이상 입력해주세요'),
   traffic: yup.string().when('location', {
      is: (location) => location && location.length > 0,
      then: yup.string().required('오시는 길을 입력해주세요'),
   }),
   gallery: yup.array().of(
      yup.mixed().test('fileSize', '이미지 크기는 5MB 이하여야 합니다', (value) => {
         if (!value) return true
         return value.size <= 5000000
      })
   ),
   attendance: yup.string().when('rsvpEnabled', {
      is: true,
      then: yup.string().required('참석 여부 메시지를 입력해주세요'),
   }),
   rsvpEnabled: yup.boolean(),
   rsvpDeadline: yup
      .date()
      .nullable()
      .when('rsvpEnabled', {
         is: true,
         then: yup
            .date()
            .nullable()
            .required('RSVP 마감일을 선택해주세요')
            .min(new Date(), '현재 시간 이후로 선택해주세요')
            .test('before-event', '행사 날짜 이전으로 선택해주세요', function (value) {
               const eventDate = this.parent.date
               if (!value || !eventDate) return true
               return dayjs(value).isBefore(dayjs(eventDate))
            }),
      }),
})

const useTemplateForm = () => {
   const { template, updateTemplate } = useTemplateStore()
   const [autoSaveStatus, setAutoSaveStatus] = useState('idle') // idle, saving, saved, error
   const [lastSaved, setLastSaved] = useState(null)

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

   // 임시 저장 처리
   const saveDraft = useCallback(
      debounce(async (data) => {
         try {
            setAutoSaveStatus('saving')
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
            setLastSaved(new Date())
            setAutoSaveStatus('saved')
         } catch (error) {
            console.error('Failed to save draft:', error)
            setAutoSaveStatus('error')
         }
      }, AUTO_SAVE_DELAY),
      []
   )

   // 임시 저장 데이터 불러오기
   const loadDraft = useCallback(() => {
      try {
         const savedData = localStorage.getItem(STORAGE_KEY)
         if (savedData) {
            const parsedData = JSON.parse(savedData)
            // 날짜 데이터 변환
            if (parsedData.date) parsedData.date = new Date(parsedData.date)
            if (parsedData.rsvpDeadline) parsedData.rsvpDeadline = new Date(parsedData.rsvpDeadline)
            return parsedData
         }
      } catch (error) {
         console.error('Failed to load draft:', error)
      }
      return null
   }, [])

   // 폼 데이터 변경 시 임시 저장
   useEffect(() => {
      const subscription = methods.watch((data) => {
         saveDraft(data)
      })
      return () => subscription.unsubscribe()
   }, [methods.watch, saveDraft])

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
   const mockApiCall = (data) =>
      new Promise((resolve) => {
         setTimeout(() => {
            resolve({ success: true, data })
         }, 1500)
      })

   // 폼 제출 처리
   const onSubmit = async (data) => {
      try {
         // API 호출 모킹
         const result = await mockApiCall(data)
         if (result.success) {
            // 스토어 업데이트
            updateTemplate(data)
            // 임시 저장 데이터 삭제
            localStorage.removeItem(STORAGE_KEY)
            return { success: true }
         }
      } catch (error) {
         console.error('Template submission error:', error)
         return { success: false, error }
      }
   }

   // 이미지 업로드 처리
   const handleImageUpload = useCallback(
      async (files) => {
         try {
            // 이미지 유효성 검사
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

            // 현재 갤러리에 추가
            const currentGallery = methods.getValues('gallery') || []
            methods.setValue('gallery', [...currentGallery, ...validFiles])

            return { success: true, files: validFiles }
         } catch (error) {
            console.error('Image upload error:', error)
            return { success: false, error }
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
   }
}

export default useTemplateForm
