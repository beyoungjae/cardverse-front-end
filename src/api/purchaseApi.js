import commonApi from './commonApi'

export const purchaseApi = {
   // 결제 처리
   processPurchase: async (purchaseData) => {
      try {
         const response = await commonApi.post('/purchase', {
            templateId: purchaseData.templateId,
            paymentInfo: purchaseData.paymentInfo,
            totalAmount: purchaseData.totalAmount,
         })
         return response.data
      } catch (error) {
         if (error.response?.status === 401) {
            throw new Error('로그인이 필요합니다.')
         }
         throw error
      }
   },

   // 구매 내역 조회 추가
   getPurchaseHistory: async () => {
      try {
         const response = await commonApi.get('/purchase/history')
         return response.data
      } catch (error) {
         console.error('구매 내역 조회 오류:', error)
         throw error
      }
   },

   // 특정 템플릿 구매 여부 확인
   checkTemplatePurchased: async (templateId) => {
      try {
         const response = await commonApi.get(`/purchase/check/${templateId}`)
         return response.data
      } catch (error) {
         console.error('템플릿 구매 여부 확인 오류:', error)
         // 로그인되지 않은 상태이거나 오류 발생 시 구매하지 않은 것으로 처리
         if (error.response?.status === 401) {
            return { purchased: false }
         }
         // 백엔드 API가 아직 구현되지 않은 경우 등의 오류 처리
         if (error.response?.status === 404) {
            return { purchased: false }
         }
         return { purchased: false }
      }
   },

   // 쿠폰 검증
   validateCoupon: async (couponCode) => {
      try {
         const response = await commonApi.post('/purchase/validate-coupon', { couponCode })
         return response.data
      } catch (error) {
         throw error
      }
   },

   // 결제 상태 확인
   checkPurchaseStatus: async (purchaseId) => {
      try {
         const response = await commonApi.get(`/purchase/status/${purchaseId}`)
         return response.data
      } catch (error) {
         throw error
      }
   },
}
