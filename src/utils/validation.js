const passwordRegex = /^(?=.*[A-Za-z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

/**
 * 새 비밀번호 유효성 검사
 * - 최소 8자리 이상
 * - 영문 (대소문자 상관없음)
 * - 하나 이상의 특수문자 포함
 */
export const isNewPasswordValid = (password) => {
   // 최소 8자리 이상, 영문 + 특수문자 조합
   const passwordRegex = /^(?=.*[A-Za-z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
   return passwordRegex.test(password)
}

/**
 * 이메일 유효성 검사
 * - "@" 기호가 포함되어야 함
 * - "@" 앞에는 영어 대소문자, 숫자, ".", "_", "-"가 올 수 있음
 * - "@" 뒤에는 도메인 이름이 오며, 영어 대소문자 및 "."이 포함될 수 있음
 * - 도메인 마지막 부분은 2글자 이상
 */
export const isEmailValid = (email) => {
   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
   return emailRegex.test(email)
}
