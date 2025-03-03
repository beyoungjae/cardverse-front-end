import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

import { 
   TextField, 
   InputAdornment, 
   IconButton, 
   MenuItem, 
   Typography, 
   Box, 
   FormControlLabel, 
   Checkbox, 
   Grid,
   CircularProgress
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useTheme } from '@mui/material/styles'
import { styled } from '@mui/system'

import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { signupUserThunk } from '../../features/authSlice'

// 페이지 컨테이너
const PageContainer = styled(Box)(({ theme }) => ({
   minHeight: '100vh',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   padding: '40px 20px',
}))

// 회원가입 컨테이너
const SignupContainer = styled(motion.div)(({ theme }) => ({
   width: '100%',
   maxWidth: '600px',
   margin: '0 auto',
   borderRadius: '16px',
   overflow: 'hidden',
   boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
   backgroundColor: '#ffffff',
   
   [theme.breakpoints.down('sm')]: {
      borderRadius: '12px',
   },
}))

// 회원가입 헤더
const SignupHeader = styled(Box)(({ theme }) => ({
   position: 'relative',
   padding: '40px 0',
   textAlign: 'center',
   backgroundColor: '#B699BB',
   overflow: 'hidden',
   
   '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'url("/images/home/banner.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      opacity: 0.2,
      zIndex: 0,
   },
}))

// 회원가입 타이틀
const SignupTitle = styled(Typography)(({ theme }) => ({
   fontSize: '1.8rem',
   fontWeight: 600,
   color: '#ffffff',
   marginBottom: '5px',
   position: 'relative',
   zIndex: 1,
   
   [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
   },
}))

// 회원가입 서브타이틀
const SignupSubtitle = styled(Typography)(({ theme }) => ({
   fontSize: '1rem',
   color: 'rgba(255, 255, 255, 0.8)',
   position: 'relative',
   zIndex: 1,
   
   [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
   },
}))

// 회원가입 폼
const SignupForm = styled(Box)(({ theme }) => ({
   padding: '40px',
   
   [theme.breakpoints.down('sm')]: {
      padding: '30px 20px',
   },
}))

// 인풋 필드 레이블
const InputLabel = styled(Typography)(({ theme }) => ({
   fontSize: '0.9rem',
   fontWeight: 500,
   marginBottom: '8px',
   color: '#555',
}))

// 인풋 필드
const StyledTextField = styled(TextField)(({ theme }) => ({
   marginBottom: '20px',
   '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      '&:hover .MuiOutlinedInput-notchedOutline': {
         borderColor: '#B699BB',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
         borderColor: '#B699BB',
      },
   },
   '& .MuiInputLabel-root.Mui-focused': {
      color: '#B699BB',
   },
   '& .MuiInputBase-input': {
      padding: '15px',
      fontSize: '0.95rem',
      
      [theme.breakpoints.down('sm')]: {
         padding: '12px',
         fontSize: '0.9rem',
      },
   },
   '& .MuiFormHelperText-root': {
      marginLeft: '2px',
      fontSize: '0.75rem',
   },
}))

// 회원가입 버튼
const SignupButton = styled(motion.button)(({ theme }) => ({
   width: '100%',
   padding: '15px',
   backgroundColor: '#B699BB',
   color: '#ffffff',
   border: 'none',
   borderRadius: '8px',
   fontSize: '1rem',
   fontWeight: 600,
   cursor: 'pointer',
   marginTop: '10px',
   marginBottom: '20px',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   transition: 'background-color 0.3s ease',
   
   '&:hover': {
      backgroundColor: '#a589aa',
   },
   
   '&:disabled': {
      backgroundColor: '#d1c1d3',
      cursor: 'not-allowed',
   },
   
   [theme.breakpoints.down('sm')]: {
      padding: '12px',
      fontSize: '0.9rem',
   },
}))

// 체크박스 스타일
const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
   color: '#B699BB',
   '&.Mui-checked': {
      color: '#B699BB',
   },
}))

// 에러 메시지 박스
const ErrorBox = styled(Box)(({ theme }) => ({
   backgroundColor: 'rgba(255, 0, 0, 0.1)',
   color: '#d32f2f',
   padding: '10px 15px',
   borderRadius: '8px',
   marginBottom: '20px',
   fontSize: '0.9rem',
}))

// 로그인 링크 텍스트
const LoginLinkText = styled(Typography)(({ theme }) => ({
   textAlign: 'center',
   fontSize: '0.9rem',
   color: '#666',
   marginTop: '20px',
   
   [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
   },
}))

// 링크 스타일
const TextLink = styled(Typography)(({ theme }) => ({
   color: '#B699BB',
   cursor: 'pointer',
   fontWeight: 500,
   display: 'inline',
   marginLeft: '5px',
   marginRight: '5px',
   
   '&:hover': {
      textDecoration: 'underline',
   },
}))

// 유효성 검증 스키마
const schema = Yup.object().shape({
   email: Yup.string().email('올바른 이메일을 입력해주세요.').required('이메일을 입력해주세요.'),
   password: Yup.string()
      .required('비밀번호를 입력해주세요.')
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/, '비밀번호는 영문과 숫자를 포함해야 합니다.'),
   confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
      .required('비밀번호 확인을 입력해주세요.'),
   nick: Yup.string().required('닉네임을 입력해주세요.'),
   signupType: Yup.string().required('가입유형을 선택해주세요.'),
   referralEmail: Yup.string().when('signupType', {
      is: 'referral',
      then: (schema) => schema.email('올바른 이메일을 입력해주세요.').required('추천인 이메일을 입력해주세요.'),
      otherwise: (schema) => schema.notRequired().nullable(),
   }),
})

const Signup = () => {
   const theme = useTheme()
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const [ref, inView] = useInView({
      threshold: 0.1,
      triggerOnce: true,
   })

   const {
      control,
      handleSubmit,
      formState: { errors },
      watch,
      setValue,
   } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
         email: '',
         password: '',
         confirmPassword: '',
         nick: '',
         signupType: 'normal',
         referralEmail: '',
      },
   })

   const [formStatus, setFormStatus] = useState({
      loading: false,
      showPassword: false,
      showConfirmPassword: false,
      agreeTerms: false,
      errorMessage: '',
   })
   const [isSignupComplete, setIsSignupComplete] = useState(false)

   const signupType = watch('signupType')

   const handleSignup = useCallback(
      async (data) => {
         try {
            if (!formStatus.agreeTerms) {
               throw new Error('약관에 동의해주세요.')
            }

            setFormStatus((prevState) => ({ ...prevState, loading: true }))

            const result = await dispatch(signupUserThunk(data)).unwrap()

            if (result) {
               setIsSignupComplete(true)
               alert('회원가입이 완료되었습니다!')
               navigate('/login')
            } else {
               throw new Error('회원가입 처리 중 문제가 발생했습니다.')
            }
         } catch (error) {
            console.error('회원가입 에러:', error)
            setFormStatus((prevState) => ({
               ...prevState,
               errorMessage: error.message === '약관에 동의해주세요.' 
                  ? '약관에 동의하지 않으셨습니다. 체크박스를 선택해주세요.' 
                  : '회원가입에 실패하였습니다.',
            }))
         } finally {
            setFormStatus((prevState) => ({ ...prevState, loading: false }))
         }
      },
      [formStatus.agreeTerms, navigate, dispatch]
   )

   const renderTextField = useCallback(
      (name, label, placeholder, type = 'text') => {
         return (
            <Controller
               name={name}
               control={control}
               defaultValue=""
               render={({ field }) => (
                  <>
                     <InputLabel>{label}</InputLabel>
                     <StyledTextField
                        {...field}
                        placeholder={placeholder}
                        type={
                           name === 'password' 
                              ? (formStatus.showPassword ? 'text' : 'password') 
                              : name === 'confirmPassword' 
                                 ? (formStatus.showConfirmPassword ? 'text' : 'password') 
                                 : type
                        }
                        fullWidth
                        autoComplete="off"
                        variant="outlined"
                        error={!!errors[name]}
                        helperText={errors[name] ? errors[name].message : ''}
                        InputProps={{
                           endAdornment:
                              name === 'password' || name === 'confirmPassword' ? (
                                 <InputAdornment position="end">
                                    <IconButton
                                       onClick={() => {
                                          name === 'password' 
                                             ? setFormStatus((prev) => ({ ...prev, showPassword: !prev.showPassword })) 
                                             : setFormStatus((prev) => ({ ...prev, showConfirmPassword: !prev.showConfirmPassword }))
                                       }}
                                       edge="end"
                                    >
                                       {name === 'password' 
                                          ? formStatus.showPassword ? <VisibilityOff /> : <Visibility /> 
                                          : formStatus.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                 </InputAdornment>
                              ) : null,
                        }}
                     />
                  </>
               )}
            />
         )
      },
      [control, errors, formStatus.showPassword, formStatus.showConfirmPassword]
   )

   useEffect(() => {
      if (signupType === 'normal') {
         setValue('referralEmail', '')
      }
   }, [signupType, setValue])
   
   return (
      <PageContainer>
         <SignupContainer
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
         >
            <SignupHeader>
               <SignupTitle variant="h4">회원가입</SignupTitle>
               <SignupSubtitle variant="body1">CardVerse의 회원가입을 통해 템플릿을 사용해 보세요</SignupSubtitle>
            </SignupHeader>
            
            <SignupForm>
               {formStatus.errorMessage && <ErrorBox>{formStatus.errorMessage}</ErrorBox>}

               <form onSubmit={handleSubmit(handleSignup)}>
                  <Grid container spacing={2}>
                     <Grid item xs={12}>
                        {renderTextField('email', '이메일', '이메일을 입력해주세요.')}
                     </Grid>

                     <Grid item xs={12}>
                        {renderTextField('password', '비밀번호', '비밀번호를 입력해주세요.', 'password')}
                     </Grid>

                     <Grid item xs={12}>
                        {renderTextField('confirmPassword', '비밀번호 확인', '비밀번호를 한번 더 입력해주세요.', 'password')}
                     </Grid>

                     <Grid item xs={12}>
                        {renderTextField('nick', '닉네임', '닉네임을 입력해주세요.')}
                     </Grid>

                     <Grid item xs={12}>
                        <InputLabel>가입유형</InputLabel>
                        <Controller
                           name="signupType"
                           control={control}
                           defaultValue="normal"
                           render={({ field }) => (
                              <StyledTextField
                                 select
                                 fullWidth
                                 placeholder="가입유형을 선택해주세요"
                                 variant="outlined"
                                 {...field}
                                 error={!!errors.signupType}
                                 helperText={errors.signupType ? errors.signupType.message : ''}
                              >
                                 <MenuItem value="referral">추천인</MenuItem>
                                 <MenuItem value="normal">일반사용자</MenuItem>
                              </StyledTextField>
                           )}
                        />
                     </Grid>

                     {signupType === 'referral' && (
                        <Grid item xs={12}>
                           {renderTextField('referralEmail', '추천인 이메일', '추천인 이메일을 입력해주세요.')}
                        </Grid>
                     )}

                     <Grid item xs={12}>
                        <FormControlLabel
                           control={
                              <StyledCheckbox
                                 checked={formStatus.agreeTerms}
                                 onChange={() => setFormStatus((prev) => ({ ...prev, agreeTerms: !prev.agreeTerms }))}
                              />
                           }
                           label={<Typography variant="body2">서비스 이용약관 및 개인정보 처리방침에 동의합니다.</Typography>}
                        />
                     </Grid>

                     <Grid item xs={12}>
                        <SignupButton
                           type="submit"
                           disabled={formStatus.loading}
                           whileHover={{ scale: 1.02 }}
                           whileTap={{ scale: 0.98 }}
                        >
                           {formStatus.loading ? <CircularProgress size={24} color="inherit" /> : '회원가입'}
                        </SignupButton>

                        <LoginLinkText>
                           이미 계정이 있으신가요?
                           <TextLink component={Link} to="/login">로그인</TextLink> 하기
                        </LoginLinkText>
                     </Grid>
                  </Grid>
               </form>
            </SignupForm>
         </SignupContainer>
      </PageContainer>
   )
}

export default Signup
