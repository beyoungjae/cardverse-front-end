import commonApi from './commonApi'

export const templateApi = {
   // 템플릿 생성 (파일 업로드 지원)
   createTemplate: async (formData) => {
      try {
         const response = await commonApi.post('/templates', formData, {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         })
         return response.data
      } catch (error) {
         console.error('템플릿 생성 오류:', error.response?.data || error.message)
         throw error
      }
   },

   // 템플릿 수정
   updateTemplate: async (templateId, templateData) => {
      const response = await commonApi.put(`/templates/${templateId}`, templateData)
      return response.data
   },

   // 템플릿 목록 조회
   getTemplates: async (category) => {
      try {
         const response = await commonApi.get(`/templates${category ? `?category=${category}` : ''}`)
         return response.data
      } catch (error) {
         throw error
      }
   },

   // 템플릿 상세 조회
   getTemplate: async (templateId) => {
      try {
         const response = await commonApi.get(`/templates/${templateId}`)
         return response.data
      } catch (error) {
         throw error
      }
   },

   // 템플릿 삭제
   deleteTemplate: async (templateId) => {
      const response = await commonApi.delete(`/templates/${templateId}`)
      return response.data
   },
}
