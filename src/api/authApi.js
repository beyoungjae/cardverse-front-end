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
export const loginUser = async (credentials) => {
   try {
      const response = await commonApi.post('/auth/login', credentials)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//로그아웃
export const logoutUser = async (removeUser) => {
   try {
      const response = await commonApi.get('/auth/logout', removeUser)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//로그인 상태 확인
export const checkAuthStatus = async (userData) => {
   try {
      const response = await commonApi.post('/auth/status', userData)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//프로필 업데이트
export const updateUserProfile = async (userData) => {
   try {
      const response = await commonApi.patch('/auth/profile', userData)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
