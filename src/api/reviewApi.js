import commonApi from './commonApi'

const reviewApi = {
  // 리뷰 목록 조회
  getReviews: async (params = {}) => {
    try {
      const response = await commonApi.get('/reviews', { params })
      return response.data
    } catch (error) {
      console.error('리뷰 목록 조회 오류:', error.response?.data || error.message)
      throw error
    }
  },

  // 템플릿별 리뷰 조회
  getTemplateReviews: async (templateId) => {
    try {
      const response = await commonApi.get(`/reviews/template/${templateId}`)
      return response.data
    } catch (error) {
      console.error('템플릿 리뷰 조회 오류:', error.response?.data || error.message)
      throw error
    }
  },

  // 리뷰 작성
  createReview: async (reviewData) => {
    try {
      const response = await commonApi.post('/reviews', reviewData)
      return response.data
    } catch (error) {
      console.error('리뷰 작성 오류:', error.response?.data || error.message)
      throw error
    }
  },

  // 리뷰 수정
  updateReview: async (reviewId, reviewData) => {
    try {
      const response = await commonApi.put(`/reviews/${reviewId}`, reviewData)
      return response.data
    } catch (error) {
      console.error('리뷰 수정 오류:', error.response?.data || error.message)
      throw error
    }
  },

  // 리뷰 삭제
  deleteReview: async (reviewId) => {
    try {
      const response = await commonApi.delete(`/reviews/${reviewId}`)
      return response.data
    } catch (error) {
      console.error('리뷰 삭제 오류:', error.response?.data || error.message)
      throw error
    }
  },

  // 사용자가 작성한 리뷰 조회
  getUserReviews: async () => {
    try {
      const response = await commonApi.get('/reviews/user')
      return response.data
    } catch (error) {
      console.error('사용자 리뷰 조회 오류:', error.response?.data || error.message)
      throw error
    }
  }
}

export default reviewApi