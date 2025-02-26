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
