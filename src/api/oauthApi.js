// api/oauthApi.js
import commonApi from './commonApi'

// 카카오 로그인
export const kakaoLogin = () => {
   window.location.href = `${process.env.REACT_APP_API_URL}/oauth/kakao`
}

// 카카오 로그인 콜백 처리
export const handleKakaoCallback = async () => {
   try {
      const response = await commonApi.get('/oauth/kakao/callback')
      return response
   } catch (error) {
      console.error('카카오 로그인 처리 오류:', error)
      throw error
   }
}
