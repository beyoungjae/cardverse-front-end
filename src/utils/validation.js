import * as Yup from 'yup'

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

export const signupSchema = Yup.object({
   email: Yup.string().email('올바른 이메일을 입력해주세요.').required('이메일을 입력해주세요.'),
   password: Yup.string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, '비밀번호는 문자, 숫자, 특수문자를 포함해야 합니다.')
      .required('비밀번호를 입력해주세요.'),
   confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
      .required('비밀번호 확인을 입력해주세요.'),
}).required()
