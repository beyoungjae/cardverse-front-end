import commonApi from './commonApi'

// 회원가입
export const signupUser = async (userData) => {
   try {
      const response = await commonApi.post('/auth/signup', userData)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 로그인
export const loginUser = async (credentials, forceLogin = false) => {
   try {
      const headers = forceLogin ? { 'X-Force-Login': 'true' } : {}
      const response = await commonApi.post('/auth/login', credentials, { headers })
      return response
   } catch (error) {
      // 403 에러(이미 로그인됨)인 경우, 강제 로그인 시도
      if (error.response && error.response.status === 403 && !forceLogin) {
         // 로그아웃 후 강제 로그인 시도
         await logoutUser()
         return loginUser(credentials, true)
      }
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//로그아웃
export const logoutUser = async () => {
   try {
      const response = await commonApi.get('/auth/logout')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//로그인 상태 확인
export const checkAuthStatus = async () => {
   try {
      const response = await commonApi.get('/auth/status')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//프로필 업데이트
export const updateUserProfile = async (userData) => {
   try {
      const response = await commonApi.put('/auth/profile', userData)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
