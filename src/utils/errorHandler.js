// utils/handleApiError.js
const handleApiError = (error, operation = '') => {
   const prefix = operation ? `${operation} 실패 => ` : ''

   // 서버 응답 없음 (네트워크 문제)
   if (!error.response) {
      return prefix + '서버에 연결할 수 없습니다. 네트워크를 확인해주세요.'
   }

   // 서버 내부 오류
   if (error.response.status === 500) {
      return prefix + '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
   }

   // 백엔드 정상 에러 응답
   if (error.response?.data?.message) {
      return prefix + error.response.data.message
   }

   // 기타 예상치 못한 오류
   return prefix + '예기치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
}

export default handleApiError
