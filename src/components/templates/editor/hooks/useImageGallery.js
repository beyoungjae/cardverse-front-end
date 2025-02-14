import { useState, useCallback, useEffect } from 'react'
import { debounce } from 'lodash'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

const useImageGallery = (initialImages = []) => {
   const [images, setImages] = useState(initialImages)
   const [selectedImage, setSelectedImage] = useState(null)
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [uploadProgress, setUploadProgress] = useState({})
   const [errors, setErrors] = useState([])
   const [previewUrls, setPreviewUrls] = useState([])

   // 이미지 유효성 검사
   const validateImage = useCallback((file) => {
      if (!ALLOWED_TYPES.includes(file.type)) {
         return '지원하지 않는 파일 형식입니다.'
      }
      if (file.size > MAX_FILE_SIZE) {
         return '파일 크기는 5MB를 초과할 수 없습니다.'
      }
      return null
   }, [])

   // 이미지 업로드 처리
   const handleImageUpload = useCallback(
      async (files) => {
         const newErrors = []
         const validFiles = []
         const newPreviewUrls = []

         // 파일 유효성 검사
         for (let i = 0; i < files.length; i++) {
            const file = files[i]
            const error = validateImage(file)

            if (error) {
               newErrors.push({ file: file.name, message: error })
            } else {
               validFiles.push(file)
               // 미리보기 URL 생성
               const previewUrl = URL.createObjectURL(file)
               newPreviewUrls.push(previewUrl)
            }
         }

         setErrors(newErrors)

         if (validFiles.length > 0) {
            // 업로드 진행률 초기화
            const newProgress = {}
            validFiles.forEach((file) => {
               newProgress[file.name] = 0
            })
            setUploadProgress(newProgress)

            // 업로드 시뮬레이션
            validFiles.forEach((file) => {
               simulateUpload(file)
            })

            setImages((prev) => [...prev, ...validFiles])
            setPreviewUrls((prev) => [...prev, ...newPreviewUrls])
         }

         return { success: validFiles.length > 0, errors: newErrors }
      },
      [validateImage]
   )

   // 업로드 진행률 시뮬레이션
   const simulateUpload = useCallback((file) => {
      let progress = 0
      const interval = setInterval(() => {
         progress += 10
         setUploadProgress((prev) => ({
            ...prev,
            [file.name]: progress,
         }))

         if (progress >= 100) {
            clearInterval(interval)
            // 업로드 완료 후 진행률 정보 제거
            setUploadProgress((prev) => {
               const newProgress = { ...prev }
               delete newProgress[file.name]
               return newProgress
            })
         }
      }, 200)
   }, [])

   // 이미지 삭제
   const handleImageDelete = useCallback((index) => {
      setImages((prev) => {
         const newImages = [...prev]
         newImages.splice(index, 1)
         return newImages
      })
      setPreviewUrls((prev) => {
         const newUrls = [...prev]
         URL.revokeObjectURL(newUrls[index]) // 메모리 해제
         newUrls.splice(index, 1)
         return newUrls
      })
   }, [])

   // 이미지 순서 변경
   const reorderImages = useCallback((startIndex, endIndex) => {
      setImages((prev) => {
         const result = Array.from(prev)
         const [removed] = result.splice(startIndex, 1)
         result.splice(endIndex, 0, removed)
         return result
      })
      setPreviewUrls((prev) => {
         const result = Array.from(prev)
         const [removed] = result.splice(startIndex, 1)
         result.splice(endIndex, 0, removed)
         return result
      })
   }, [])

   // 이미지 선택 및 모달 제어
   const handleImageSelect = useCallback(
      (image, index) => {
         setSelectedImage({ file: image, index, url: previewUrls[index] })
         setIsModalOpen(true)
      },
      [previewUrls]
   )

   const handleModalClose = useCallback(() => {
      setSelectedImage(null)
      setIsModalOpen(false)
   }, [])

   // 메모리 정리
   useEffect(() => {
      return () => {
         previewUrls.forEach((url) => URL.revokeObjectURL(url))
      }
   }, [previewUrls])

   return {
      images,
      selectedImage,
      isModalOpen,
      uploadProgress,
      errors,
      previewUrls,
      handleImageUpload,
      handleImageDelete,
      handleImageSelect,
      handleModalClose,
      reorderImages,
   }
}

export default useImageGallery
