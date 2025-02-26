import React, { useState, useCallback } from 'react'
import { TextField, Button, Container, CircularProgress, InputAdornment, IconButton, MenuItem, Typography, Box, FormControlLabel, Checkbox, Grid } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useTheme } from '@mui/material/styles'
import { styled } from '@mui/system'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { signupUserThunk } from '../../features/authSlice'
import { useDispatch, useSelector } from 'react-redux'

const FormControlText = styled(Typography)(({ theme }) => ({
   fontSize: '16px',
   marginBottom: theme.spacing(2),
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
   marginBottom: theme.spacing(2),
   fontSize: '14px',
   '& .MuiInputBase-root': {
      fontSize: '16px',
   },
   width: '100%',
}))

const StyledButton = styled(Button)(({ theme }) => ({
   marginTop: theme.spacing(2),
   backgroundColor: '#B699BB',
   color: '#fff',
   fontSize: '16px',
   '&:hover': {
      backgroundColor: '#B699BB',
   },
   width: '100%',
}))

const LogoButton = styled('img')(({ theme }) => ({
   cursor: 'pointer',
   width: '150px',
   height: 'auto',
   marginBottom: theme.spacing(4),
   [theme.breakpoints.down('sm')]: {
      width: '120px',
   },
   [theme.breakpoints.down('xs')]: {
      width: '100px',
   },
}))

// 유효성 검사 스키마 (Yup 사용)
const schema = Yup.object({
   email: Yup.string().email('올바른 이메일을 입력해주세요.').required('이메일을 입력해주세요.'),
   password: Yup.string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, '비밀번호는 문자, 숫자, 특수문자를 포함해야 합니다.')
      .required('비밀번호를 입력해주세요.'),
   confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
      .required('비밀번호 확인을 입력해주세요.'),
   nick: Yup.string().required('닉네임을 입력해주세요.'),
   signupType: Yup.string()
      .oneOf(['normal', 'referral'], '올바른 가입 유형을 선택해주세요.') // 두 가지 값만 허용
      .required('가입 유형을 선택해주세요.'),
   referralEmail: Yup.string().when('signupType', {
      is: '추천인',
      then: Yup.string().email('올바른 이메일을 입력해주세요.').required('추천인 이메일을 입력해주세요.'),
   }),
}).required()

const Signup = () => {
   const theme = useTheme()
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const {
      control,
      handleSubmit,
      formState: { errors },
      watch,
   } = useForm({
      resolver: yupResolver(schema),
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
               navigate('/')
            } else {
               throw new Error('회원가입 처리 중 문제가 발생했습니다.')
            }
         } catch (error) {
            console.error('회원가입 에러:', error)
            setFormStatus((prevState) => ({
               ...prevState,
               errorMessage: error === '약관에 동의해주세요.' ? '약관에 동의하지 않으셨습니다. 체크박스를 선택해주세요.' : '회원가입에 실패하였습니다.',
               // errorMessage: error.message === '약관에 동의해주세요.' ? '약관에 동의하지 않으셨습니다. 체크박스를 선택해주세요.' : '회원가입에 실패했습니다. 다시 시도해주세요.',
            }))
         } finally {
            setFormStatus((prevState) => ({ ...prevState, loading: false }))
         }
      },
      [formStatus.agreeTerms, navigate, dispatch],
   )

   const renderTextField = useCallback(
      (name, placeholder, type = 'text') => {
         return (
            <Controller
               name={name}
               control={control}
               defaultValue=""
               render={({ field }) => (
                  <StyledTextField
                     {...field}
                     placeholder={placeholder}
                     // type 동적 변경
                     type={name === 'password' ? (formStatus.showPassword ? 'text' : 'password') : name === 'confirmPassword' ? (formStatus.showConfirmPassword ? 'text' : 'password') : type}
                     error={!!errors[name]}
                     helperText={errors[name] ? errors[name].message : ''}
                     InputProps={{
                        endAdornment:
                           name === 'password' || name === 'confirmPassword' ? (
                              <InputAdornment position="end">
                                 <IconButton
                                    onClick={() => {
                                       name === 'password' ? setFormStatus((prev) => ({ ...prev, showPassword: !prev.showPassword })) : setFormStatus((prev) => ({ ...prev, showConfirmPassword: !prev.showConfirmPassword }))
                                    }}
                                    edge="end">
                                    {name === 'password' ? formStatus.showPassword ? <VisibilityOff /> : <Visibility /> : formStatus.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                 </IconButton>
                              </InputAdornment>
                           ) : null,
                     }}
                  />
               )}
            />
         )
      },
      [control, errors, formStatus.showPassword, formStatus.showConfirmPassword],
   )
   // const renderTextField = useCallback(
   //    (name, placeholder, type = 'text') => {
   //       return (
   //          <Controller
   //             name={name}
   //             control={control}
   //             defaultValue=""
   //             render={({ field }) => (
   //                <StyledTextField
   //                   {...field}
   //                   placeholder={placeholder}
   //                   type={type}
   //                   error={!!errors[name]}
   //                   helperText={errors[name] ? errors[name].message : ''}
   //                   InputProps={{
   //                      endAdornment:
   //                         name === 'password' || name === 'confirmPassword' ? (
   //                            <InputAdornment position="end">
   //                               <IconButton
   //                                  onClick={() => {
   //                                     name === 'password' ? setFormStatus((prev) => ({ ...prev, showPassword: !prev.showPassword })) : setFormStatus((prev) => ({ ...prev, showConfirmPassword: !prev.showConfirmPassword }))
   //                                  }}
   //                                  edge="end">
   //                                  {name === 'password' ? formStatus.showPassword ? <VisibilityOff /> : <Visibility /> : formStatus.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
   //                               </IconButton>
   //                            </InputAdornment>
   //                         ) : null,
   //                   }}
   //                />
   //             )}
   //          />
   //       )
   //    },
   //    [control, errors, formStatus.showPassword, formStatus.showConfirmPassword],
   // )

   return (
      <Container
         sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50vh',
            paddingTop: { xs: theme.spacing(2), sm: theme.spacing(3), md: theme.spacing(5) },
            paddingBottom: theme.spacing(5),
            maxWidth: '100%',
         }}>
         <Box
            sx={{
               width: '100%',
               maxWidth: '600px',
               backgroundColor: theme.palette.background.paper,
               borderRadius: theme.shape.borderRadius.large,
               padding: { xs: theme.spacing(2), sm: theme.spacing(3), md: theme.spacing(4) },
               boxSizing: 'border-box',
               border: `1px solid ${theme.palette.divider}`,
            }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: theme.spacing(4) }}>
               <LogoButton src="/images/logo.png" alt="Logo" onClick={() => navigate('/')} />
            </Box>

            {formStatus.errorMessage && (
               <Box
                  sx={{
                     backgroundColor: theme.palette.error.light,
                     color: theme.palette.error.contrastText,
                     padding: theme.spacing(1),
                     marginBottom: theme.spacing(2),
                     borderRadius: '4px',
                     textAlign: 'center',
                  }}>
                  {formStatus.errorMessage}
               </Box>
            )}

            <Grid container spacing={2}>
               <Grid item xs={12}>
                  <FormControlText>이메일</FormControlText>
                  {renderTextField('email', '이메일을 입력해주세요.')}
               </Grid>

               <Grid item xs={12}>
                  <FormControlText>비밀번호</FormControlText>
                  {renderTextField('password', '비밀번호를 입력해주세요.', 'password')}
               </Grid>

               <Grid item xs={12}>
                  <FormControlText>비밀번호 확인</FormControlText>
                  {renderTextField('confirmPassword', '비밀번호를 한번 더 입력해주세요.', 'password')}
               </Grid>

               <Grid item xs={12}>
                  <FormControlText>닉네임</FormControlText>
                  {renderTextField('nick', '닉네임을 입력해주세요.')}
               </Grid>

               <Grid item xs={12}>
                  <FormControlText>가입유형</FormControlText>
                  <Controller
                     name="signupType"
                     control={control}
                     defaultValue=""
                     render={({ field }) => (
                        <StyledTextField select label="가입유형 (추천인 / 일반사용자)" {...field} error={!!errors.signupType} helperText={errors.signupType ? errors.signupType.message : ''}>
                           <MenuItem value="referral">추천인</MenuItem>
                           <MenuItem value="normal">일반사용자</MenuItem>
                        </StyledTextField>
                     )}
                  />
               </Grid>

               {signupType === 'referral' && (
                  <Grid item xs={12}>
                     <FormControlText>추천인 이메일</FormControlText>
                     {renderTextField('referralEmail', '추천인 이메일을 입력해주세요.')}
                  </Grid>
               )}

               <Grid item xs={12}>
                  <FormControlLabel control={<Checkbox checked={formStatus.agreeTerms} onChange={() => setFormStatus((prevState) => ({ ...prevState, agreeTerms: !prevState.agreeTerms }))} />} label="약관에 동의합니다." />
               </Grid>

               <Grid item xs={12}>
                  <StyledButton onClick={handleSubmit(handleSignup)} disabled={formStatus.loading}>
                     {formStatus.loading ? <CircularProgress size={24} color="inherit" /> : '회원가입'}
                  </StyledButton>
               </Grid>
            </Grid>
         </Box>
      </Container>
   )
}

export default Signup
