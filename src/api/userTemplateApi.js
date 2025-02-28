import commonApi from './commonApi'

export const userTemplateApi = {
   // 사용자 템플릿 생성
   createUserTemplate: async (data) => {
      try {
         const response = await commonApi.post('/user-templates', data)
         return response.data
      } catch (error) {
         console.error('사용자 템플릿 생성 오류:', error.response?.data || error.message)
         throw error
      }
   },

   // 사용자 템플릿 조회
   getUserTemplate: async (userTemplateId) => {
      try {
         const response = await commonApi.get(`/user-templates/${userTemplateId}`)
         return response.data
      } catch (error) {
         console.error('사용자 템플릿 조회 오류:', error.response?.data || error.message)
         throw error
      }
   },

   // 템플릿 세트 업데이트 (formData 저장)
   updateTemplateSet: async (userTemplateId, data) => {
      try {
         const response = await commonApi.put(`/user-templates/${userTemplateId}/template-set`, data)
         return response.data
      } catch (error) {
         console.error('템플릿 세트 업데이트 오류:', error.response?.data || error.message)
         throw error
      }
   },

   // 사용자 템플릿 목록 조회
   getUserTemplates: async () => {
      try {
         const response = await commonApi.get('/user-templates/user/templates')
         return response.data
      } catch (error) {
         console.error('사용자 템플릿 목록 조회 오류:', error.response?.data || error.message)
         throw error
      }
   },

   // 사용자 템플릿 삭제
   deleteUserTemplate: async (userTemplateId) => {
      try {
         const response = await commonApi.delete(`/user-templates/${userTemplateId}`)
         return response.data
      } catch (error) {
         console.error('사용자 템플릿 삭제 오류:', error.response?.data || error.message)
         throw error
      }
   },
}
