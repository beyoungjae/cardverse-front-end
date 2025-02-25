import { useState, useCallback } from 'react'
import imageCompression from 'browser-image-compression'
import { uploadImages, deleteImage } from '../../../../api/galleryApi'

const DEFAULT_COMPRESSION_OPTIONS = {
   maxSizeMB: 1,
   maxWidthOrHeight: 1920,
   useWebWorker: true,
}

const useImageUpload = (customOptions = {}) => {
   const [uploadProgress, setUploadProgress] = useState(0)
   const [error, setError] = useState(null)
   const [isUploading, setIsUploading] = useState(false)

   const compressImage = async (file) => {
      try {
         const options = {
            ...DEFAULT_COMPRESSION_OPTIONS,
            ...customOptions,
         }
         return await imageCompression(file, options)
      } catch (error) {
         console.error('이미지 압축 실패:', error)
         return file
      }
   }

   const validateImage = (file) => {
      const maxSize = 20 * 1024 * 1024 // 20MB
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

      if (!allowedTypes.includes(file.type)) {
         throw new Error('지원하지 않는 이미지 형식입니다.')
      }

      if (file.size > maxSize) {
         throw new Error('파일 크기가 20MB를 초과합니다.')
      }
   }

   const uploadImage = useCallback(async (file, section) => {
      try {
         setError(null)
         setIsUploading(true)
         setUploadProgress(0)

         // 이미지 유효성 검사
         validateImage(file)

         // 이미지 압축
         setUploadProgress(20)
         const compressedFile = await compressImage(file)
         setUploadProgress(40)

         // 이미지 업로드
         const response = await uploadImages([compressedFile], section)
         setUploadProgress(100)

         if (!response.success) {
            throw new Error(response.error)
         }

         return response.data[0]
      } catch (error) {
         setError(error.message)
         return null
      } finally {
         setIsUploading(false)
      }
   }, [])

   const uploadMultipleImages = useCallback(async (files, section) => {
      try {
         setError(null)
         setIsUploading(true)
         setUploadProgress(0)

         // 모든 파일 유효성 검사
         files.forEach(validateImage)

         // 이미지 압축
         setUploadProgress(20)
         const compressedFiles = await Promise.all(files.map((file) => compressImage(file)))
         setUploadProgress(40)

         // 이미지 업로드
         const response = await uploadImages(compressedFiles, section)
         setUploadProgress(100)

         if (!response.success) {
            throw new Error(response.error)
         }

         // 응답 데이터 구조 확인 및 변환
         return response.data.map((img) => ({
            id: img.id,
            url: img.url,
            name: img.name,
            section: img.section,
            order: img.order || 0,
         }))
      } catch (error) {
         setError(error.message)
         return []
      } finally {
         setIsUploading(false)
      }
   }, [])

   const deleteUploadedImage = useCallback(async (imageId) => {
      try {
         setError(null)
         const response = await deleteImage(imageId)

         if (!response.success) {
            throw new Error(response.error)
         }

         return true
      } catch (error) {
         setError(error.message)
         return false
      }
   }, [])

   return {
      uploadImage,
      uploadMultipleImages,
      deleteUploadedImage,
      uploadProgress,
      error,
      isUploading,
      setError,
   }
}

export default useImageUpload
