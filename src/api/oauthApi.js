import { OAUTH_CONFIG } from '../config/config'
import commonApi from './commonApi'

const oauthParam = new URLSearchParams({
   client_id: OAUTH_CONFIG.CLIENT_ID,
   redirect_uri: OAUTH_CONFIG.REDIRECT_URI,
   response_type: OAUTH_CONFIG.RESPONSE_TYPE,
})

export const KAKAO_REST_API = `https://kauth.kakao.com/oauth/authorize?${oauthParam.toString()}`

export const oauthLoginUser = async (credentials) => {
   try {
      const response = await commonApi.post('/oauth/login', credentials)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
