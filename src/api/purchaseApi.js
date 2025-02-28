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
