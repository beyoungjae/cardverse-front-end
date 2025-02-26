// api/oauthApi.js
import commonApi from './commonApi'

// 카카오 로그인
// export const kakaoLogin = () => {
//    window.location.href = `${process.env.REACT_APP_API_URL}/oauth/kakao`
// }
export const handleKakaoLogin = () => {
   if (!window.Kakao) {
      console.error('Kakao SDK not loaded')
      return
   }

   window.Kakao.Auth.loginForm({
      success: async function (authObj) {
         try {
            console.log('카카오 로그인 성공', authObj)
            // 백엔드로 직접 인증 정보 전송consol
            const response = await commonApi.post('/oauth/kakao', {
               accessToken: authObj.access_token,
            })

            // 로그인 성공 처리
            if (response.data.success) {
               // Redux store 업데이트나 리다이렉트 처리
               window.location.href = '/' // 또는 원하는 페이지로
            }
         } catch (error) {
            console.error('카카오 로그인 처리 실패:', error)
         }
      },
      fail: function (err) {
         console.error('카카오 로그인 실패:', err)
      },
   })
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
