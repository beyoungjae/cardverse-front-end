import commonApi from './commonApi'

// 이미지 업로드 API
export const uploadImages = async (files, section = 'gallery') => {
   const formData = new FormData()
   files.forEach((file) => {
      formData.append('images', file)
   })
   formData.append('section', section) // 섹션 정보 추가

   try {
      const response = await commonApi.post('/images/upload', formData, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      })

      // 응답 구조 통일
      return {
         success: true,
         data: response.data.map((img) => ({
            id: img.id,
            url: img.imageUrl.startsWith('http') ? img.imageUrl : `${process.env.REACT_APP_API_URL}${img.imageUrl}`,
            name: img.name,
            section: img.section || section,
            order: img.order || 0,
         })),
      }
   } catch (error) {
      console.error('이미지 업로드 실패:', error)
      return {
         success: false,
         error: error.message || '이미지 업로드에 실패했습니다.',
      }
   }
}

// 이미지 삭제 API
export const deleteImage = async (imageId) => {
   try {
      await commonApi.delete(`/images/${imageId}`)
      return {
         success: true,
      }
   } catch (error) {
      console.error('이미지 삭제 실패:', error)
      return {
         success: false,
         error: error.message || '이미지 삭제에 실패했습니다.',
      }
   }
}
