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

      // 토큰이 있으면 저장
      if (response.data.token) {
         localStorage.setItem('authToken', response.data.token)

         // axios 기본 헤더에 토큰 설정
         commonApi.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
      }

      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//로그아웃
export const logoutUser = async () => {
   try {
      const response = await commonApi.post('/auth/logout')

      // 로그아웃 시 토큰 제거
      localStorage.removeItem('authToken')
      delete commonApi.defaults.headers.common['Authorization']

      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//로그인 상태 확인
export const checkAuthStatus = async (userData) => {
   try {
      // 토큰 가져오기
      const token = localStorage.getItem('authToken')

      // 토큰이 있으면 헤더에 추가
      if (token) {
         commonApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }

      const response = await commonApi.post('/auth/status', userData ?? {})

      // 인증 실패 시 토큰 제거
      if (!response.data.isAuthenticated) {
         localStorage.removeItem('authToken')
         delete commonApi.defaults.headers.common['Authorization']
      }

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
