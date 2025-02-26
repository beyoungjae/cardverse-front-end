import commonApi from './commonApi'

export const templateApi = {
   // 템플릿 생성
   createTemplate: async (templateData) => {
      const response = await commonApi.post('/templates', templateData)
      return response.data
   },

   // 템플릿 수정
   updateTemplate: async (templateId, templateData) => {
      const response = await commonApi.put(`/templates/${templateId}`, templateData)
      return response.data
   },

   // 템플릿 조회
   getTemplate: async (templateId) => {
      const response = await commonApi.get(`/templates/${templateId}`)
      return response.data
   },

   // 템플릿 삭제
   deleteTemplate: async (templateId) => {
      const response = await commonApi.delete(`/templates/${templateId}`)
      return response.data
   },
}
