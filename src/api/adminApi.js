import commonApi from "./commonApi";

export const createCoupon = async (data) => {
    try {
        const response = await commonApi.post('/admin/coupon/new', data)
        return response
    } catch (error) {
        console.error('쿠폰 등록 실패:', error.message)
        throw error
    }
}