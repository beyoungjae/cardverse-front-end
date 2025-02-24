import { useState, useCallback, useEffect } from 'react'
import { debounce } from 'lodash'
import imageCompression from 'browser-image-compression'
import { uploadImages } from '../../../../api/galleryApi'

const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

const useImageGallery = (initialImages = []) => {
   const [images, setImages] = useState(initialImages)
   const [selectedImage, setSelectedImage] = useState(null)
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [uploadProgress, setUploadProgress] = useState({})
   const [errors, setErrors] = useState([])
   const [previewUrls, setPreviewUrls] = useState([])
   const [uploading, setUploading] = useState(false)

   // 이미지 유효성 검사
   const validateImage = useCallback((file) => {
      if (!ALLOWED_TYPES.includes(file.type)) {
         return '지원하지 않는 파일 형식입니다.'
      }
      if (file.size > MAX_FILE_SIZE) {
         return '파일 크기는 20MB를 초과할 수 없습니다.'
      }
      return null
   }, [])

   const optimizeImage = useCallback(async (file) => {
      if (!file) return null

      try {
         const compressedFile = await imageCompression(file, {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
         })
         return compressedFile
      } catch (error) {
         console.error('이미지 최적화 실패:', error)
         return file
      }
   }, [])

   // 이미지 업로드 처리
   const handleImageUpload = useCallback(
      async (event) => {
         const files = Array.from(event.target.files).filter((file) => file.type.startsWith('image/'))

         try {
            setUploadProgress(0)
            const response = await uploadImages(files)

            // 업로드된 이미지 URL 업데이트
            setPreviewUrls((prev) => [...prev, ...response.data.urls])
            setImages((prev) => [...prev, ...response.data.urls])
         } catch (error) {
            console.error('이미지 업로드 실패:', error)
            // 에러 처리
         }
      },
      [setImages]
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
