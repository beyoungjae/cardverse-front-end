import commonApi from './commonApi'

export const purchaseApi = {
   // 결제 처리
   processPurchase: async (purchaseData) => {
      try {
         const response = await commonApi.post('/purchase', purchaseData)
         return response.data
      } catch (error) {
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
