import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_URL

const projectApi = axios.create({
   baseURL: BASE_URL,
   headers: {
      'Content-Type': 'application/json',
   },
   withCredentials: true,
})

// 회원가입
export const registerUser = async (userData) => {
   try {
      const response = await projectApi.post('/auth/join', userData)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.response ? error.response.status : error.message}`)
      throw error
   }
}

// 로그인
export const loginUser = async (credentials) => {
   try {
      const response = await projectApi.post('/auth/login', credentials)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.response ? error.response.status : error.message}`)
      throw error
   }
}

// 로그아웃
export const logoutUser = async () => {
   try {
      const response = await projectApi.get('/auth/logout')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.response ? error.response.status : error.message}`)
      throw error
   }
}

// 로그인 상태 확인
export const checkAuthStatus = async () => {
   try {
      const response = await projectApi.get('/auth/status')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.response ? error.response.status : error.message}`)
      throw error
   }
}
