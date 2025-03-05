import commonApi from './commonApi'

const postApi = {
   createPost: async (formData) => {
      try {
          const response = await commonApi.post('/posts/create', formData)

         return response.data
      } catch (error) {
         console.error(`${formData.type.toUpperCase()} 작성 오류:`, error.response?.data || error.message)
         throw error
      }
   },
}

export default postApi
