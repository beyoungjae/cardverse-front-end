import { OAUTH_CONFIG } from '../config/config'
import commonApi from './commonApi'

const oauthParam = new URLSearchParams({
   client_id: OAUTH_CONFIG.CLIENT_ID,
   redirect_uri: OAUTH_CONFIG.REDIRECT_URI,
   response_type: OAUTH_CONFIG.RESPONSE_TYPE,
})

export const KAKAO_REST_API = `https://kauth.kakao.com/oauth/authorize?${oauthParam.toString()}`

export const kakaoLoginUser = async (code) => {
   try {
      const response = await commonApi.post('/oauth/kakao/login', code)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

export const checkOAuthStatus = async () => {
   try {
      const response = await commonApi.get('/oauth/status')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
