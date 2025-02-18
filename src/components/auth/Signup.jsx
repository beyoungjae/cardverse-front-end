import React, { useState, useCallback, useMemo } from 'react'
import { TextField, Button, Container, CircularProgress, InputAdornment, IconButton, MenuItem, Typography, Box, FormControlLabel, Checkbox, Grid, Card, CardContent } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useTheme } from '@mui/material/styles'
import { styled } from '@mui/system'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

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

// 유효성 검사 스키마 (Yup 사용)
const schema = Yup.object({
   email: Yup.string().email('올바른 이메일을 입력해주세요.').required('이메일을 입력해주세요.'),
   password: Yup.string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .matches(/[a-zA-Z]/, '비밀번호는 문자와 숫자를 포함해야 합니다.')
      .required('비밀번호를 입력해주세요.'),
   confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
      .required('비밀번호 확인을 입력해주세요.'),
   nickname: Yup.string().required('닉네임을 입력해주세요.'),
   membershipType: Yup.string().required('가입 유형을 선택해주세요.'),
}).required()

const Signup = () => {
   const theme = useTheme()

   const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
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

   const handleSignup = useCallback(
      async (data) => {
         try {
            if (!formStatus.agreeTerms) {
               throw new Error('약관에 동의해주세요.')
            }

            setFormStatus((prevState) => ({ ...prevState, loading: true }))

            await new Promise((resolve, reject) => {
               setTimeout(() => {
                  resolve('회원가입 성공')
               }, 1000)
            })

            alert('회원가입이 완료되었습니다!')
         } catch (error) {
            setFormStatus((prevState) => ({
               ...prevState,
               errorMessage: error.message === '약관에 동의해주세요.' ? '약관에 동의하지 않으셨습니다. 체크박스를 선택해주세요.' : '회원가입에 실패했습니다. 다시 시도해주세요.',
            }))
         } finally {
            setFormStatus((prevState) => ({ ...prevState, loading: false }))
         }
      },
      [formStatus.agreeTerms]
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
                     type={type}
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
                                    edge="end"
                                 >
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
      [control, errors, formStatus.showPassword, formStatus.showConfirmPassword]
   )

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
         }}
      >
         <Box
            sx={{
               width: '100%',
               maxWidth: '600px',
               backgroundColor: theme.palette.background.paper,
               borderRadius: theme.shape.borderRadius.large,
               padding: { xs: theme.spacing(2), sm: theme.spacing(3), md: theme.spacing(4) },
               boxSizing: 'border-box',
               border: `1px solid ${theme.palette.divider}`,
            }}
         >
            <Typography
               variant="h4"
               align="center"
               gutterBottom
               sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '30px', sm: '35px', md: '40px' },
                  marginBottom: theme.spacing(2),
               }}
            >
               회원가입
            </Typography>
            <Typography
               variant="body1"
               align="center"
               gutterBottom
               sx={{
                  color: theme.palette.text.secondary,
                  fontSize: { xs: '12px', sm: '14px', md: '16px' },
                  marginBottom: theme.spacing(5),
               }}
            >
               회원이 되어 다양한 혜택을 경험해보세요!
            </Typography>

            {formStatus.errorMessage && (
               <Box
                  sx={{
                     backgroundColor: theme.palette.error.light,
                     color: theme.palette.error.contrastText,
                     padding: theme.spacing(1),
                     marginBottom: theme.spacing(2),
                     borderRadius: '4px',
                     textAlign: 'center',
                  }}
               >
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
                  {renderTextField('nickname', '닉네임을 입력해주세요.')}
               </Grid>

               <Grid item xs={12}>
                  <FormControlText>가입유형</FormControlText>
                  <Controller
                     name="membershipType"
                     control={control}
                     defaultValue=""
                     render={({ field }) => (
                        <StyledTextField select label="가입유형 (추천인 / 일반사용자)" {...field} error={!!errors.membershipType} helperText={errors.membershipType ? errors.membershipType.message : ''}>
                           <MenuItem value="추천인">추천인</MenuItem>
                           <MenuItem value="일반사용자">일반사용자</MenuItem>
                        </StyledTextField>
                     )}
                  />
               </Grid>

               <Grid item xs={12}>
                  <FormControlLabel
                     control={<Checkbox checked={formStatus.agreeTerms} onChange={(e) => setFormStatus((prevState) => ({ ...prevState, agreeTerms: e.target.checked }))} />}
                     label={
                        <Typography variant="body2" color="textSecondary">
                           약관에 동의합니다.
                           <a href="/terms" target="_blank" style={{ textDecoration: 'none', color: '#1976d2' }}>
                              약관 보기
                           </a>
                        </Typography>
                     }
                  />
               </Grid>

               <Grid item xs={12}>
                  <StyledButton onClick={handleSubmit(handleSignup)} disabled={formStatus.loading}>
                     {formStatus.loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : '회원가입'}
                  </StyledButton>
               </Grid>
            </Grid>
         </Box>
      </Container>
   )
}

export default Signup
