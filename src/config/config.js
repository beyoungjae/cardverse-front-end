export const OAUTH_CONFIG = {
    CLIENT_ID: process.env.REACT_APP_KAKAO_JS_KEY,
   REDIRECT_URI: process.env.REACT_APP_REDIRECT_URI || 'http://localhost:3000/login',
   RESPONSE_TYPE: 'code',
}
