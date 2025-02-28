import axios from 'axios'

const commonApi = axios.create({
   baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
   withCredentials: true,
   headers: {
      'Content-Type': 'application/json',
   },
})

// 응답 인터셉터 추가
commonApi.interceptors.response.use(
   (response) => response,
   (error) => {
      // 401 에러 처리
      if (error.response?.status === 401) {
         // 로컬 스토리지의 인증 관련 데이터 삭제
         localStorage.removeItem('user')

         // 홈페이지로 리다이렉트
         window.location.href = '/'
      }
      return Promise.reject(error)
   }
)

export default commonApi
