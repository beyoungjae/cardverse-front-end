import axios from 'axios'

const host = window.location.hostname === 'localhost' ? 'http://43.203.232.147:8000' : '/api'

const commonApi = axios.create({
   baseURL: host,
   withCredentials: true,
   headers: {
      'Content-Type': 'application/json',
   },
})

// 응답 인터셉터 추가
commonApi.interceptors.response.use(
   (response) => response,
   (error) => {
      // 401 에러 처리 (인증 실패)
      if (error.response?.status === 401) {
         // 로그인 상태 확인 요청인 경우에는 로컬 스토리지를 지우지 않음
         const isStatusCheck = error.config.url.includes('/auth/status')

         if (!isStatusCheck) {
            // 로컬 스토리지의 인증 관련 데이터 삭제
            localStorage.removeItem('loginType')

            // 홈페이지로 리다이렉트 (선택적)
            // 자동 리다이렉트는 사용자 경험을 해칠 수 있으므로 필요한 경우에만 활성화
            // window.location.href = '/';
         }
      }

      // 네트워크 오류 처리 (서버 연결 실패)
      if (!error.response) {
         console.error('Network error:', error.message)
         // 네트워크 오류는 로그인 상태를 초기화하지 않고 오류만 반환
         return Promise.reject({
            ...error,
            isNetworkError: true,
            message: '서버 연결에 실패했습니다. 네트워크 연결을 확인해주세요.',
         })
      }

      return Promise.reject(error)
   }
)

export default commonApi
