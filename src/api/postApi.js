import commonApi from './commonApi'

const postApi = {
   createPost: async (formData) => {
      try {
         const response = await commonApi.post('/post/create', formData)
         return response
      } catch (error) {
         console.error(`${formData.type.toUpperCase()} 작성 오류:`, error.response?.data || error.message)
         throw error
      }
   },
   getPosts: async (data) => {
      try {
         const response = await commonApi.get('/post/', { params: data })
         return response
      } catch (error) {
         console.error(`전체 글 조회 중 오류:`, error.response?.data || error.message)
         throw error
      }
   },
}

export default postApi
