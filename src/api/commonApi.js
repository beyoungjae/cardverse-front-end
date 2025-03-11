import axios from 'axios'

const commonApi = axios.create({
   baseURL: process.env.REACT_APP_API_URL || 'https://cardverse-ten.store',
   withCredentials: true,
   timeout: 10000,
})

// 요청 인터셉터 추가
commonApi.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem('authToken')
      if (token) {
         config.headers.Authorization = `Bearer ${token}`
      }
      return config
   },
   (error) => Promise.reject(error)
)

// 응답 인터셉터 추가
commonApi.interceptors.response.use(
   (response) => response,
   (error) => {
      // 401 오류 시 로그인 페이지로 리다이렉트 (선택 사항)
      if (error.response && error.response.status === 401) {
         console.log('인증 오류: 로그인이 필요합니다')
         // 로그인 페이지로 리다이렉트하거나 로그인 모달 표시
      }
      return Promise.reject(error)
   }
)

export default commonApi
