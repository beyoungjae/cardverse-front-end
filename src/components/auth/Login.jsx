import React, { useState, useCallback, useMemo } from 'react'
import { TextField, Box, IconButton, InputAdornment, Typography } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { styled } from '@mui/system'
import { Link, useNavigate } from 'react-router-dom'

const Container = styled(Box)(({ theme }) => ({
   padding: theme.spacing(4),
   width: '100%',
   maxWidth: '500px',
   margin: '0 auto',
   border: '1px solid #bbbbbb',
   borderRadius: theme.shape.borderRadius,
   minWidth: '300px',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   gap: theme.spacing(7),
   backgroundColor: '#fcfcfc',

   [theme.breakpoints.down('sm')]: {
      gap: theme.spacing(2),
      padding: theme.spacing(3),
      margin: '0 auto',
      border: 'none',
      borderRadius: 0,
      backgroundColor: 'transparent',
   },

   [theme.breakpoints.down('xs')]: {
      gap: theme.spacing(1),
      padding: theme.spacing(2),
      width: '90%',
   },
}))

const InputField = styled(TextField)(({ theme }) => ({
   '& .MuiInputBase-input': {
      fontSize: '1rem',
      padding: theme.spacing(1.5),

      [theme.breakpoints.down('md')]: {
         fontSize: '0.9rem',
      },
      [theme.breakpoints.down('sm')]: {
         fontSize: '0.8rem',
         padding: theme.spacing(1.5),
      },
      [theme.breakpoints.down('xs')]: {
         fontSize: '0.75rem',
         padding: theme.spacing(1),
      },
   },
   '&:first-of-type': {
      paddingBottom: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
         paddingBottom: theme.spacing(1),
      },
   },
}))

const Button = styled('button')(({ theme }) => ({
   backgroundColor: '#B699BB',
   color: '#000',
   border: 'none',
   borderRadius: theme.shape.borderRadius,
   padding: theme.spacing(2, 4),
   fontSize: '1rem',
   fontWeight: 'bold',
   cursor: 'pointer',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   gap: theme.spacing(1),
   width: '100%',

   '&:hover': {
      backgroundColor: '#a98bae',
   },

   '&.kakao-login-btn': {
      backgroundColor: '#ffe812',
   },

   '&.signup-btn': {
      backgroundColor: '#ffffff',
      border: `1px solid #cccccc`,
   },

   [theme.breakpoints.down('md')]: {
      padding: theme.spacing(1, 2),
      fontSize: '0.85rem',
   },

   [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1, 2),
      fontSize: '0.75rem',
   },

   [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0.5, 1),
      fontSize: '0.7rem',
   },
}))

const Form = styled('form')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: theme.spacing(2),

   [theme.breakpoints.down('md')]: {
      gap: theme.spacing(1.5),
   },

   [theme.breakpoints.down('sm')]: {
      gap: theme.spacing(1),
   },

   [theme.breakpoints.down('xs')]: {
      gap: theme.spacing(0.5),
   },
}))

const StyledTypography = styled(Typography)(({ theme }) => ({
   fontSize: '0.85rem',
   textAlign: 'end',
   padding: theme.spacing(1),

   [theme.breakpoints.down('md')]: {
      fontSize: '0.8rem',
   },

   [theme.breakpoints.down('sm')]: {
      fontSize: '0.75rem',
   },

   [theme.breakpoints.down('xs')]: {
      fontSize: '0.7rem',
   },
}))

const LoginWrapper = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: theme.spacing(3),

   [theme.breakpoints.down('sm')]: {
      gap: theme.spacing(1.5),
      justifyContent: 'space-between',
      height: '100%',
   },
}))

const StyledLink = styled(Link)(({ theme }) => ({
   display: 'inline',
   textDecoration: 'none',
   fontSize: '0.84rem',

   [theme.breakpoints.down('md')]: {
      fontSize: '0.8rem',
   },

   [theme.breakpoints.down('sm')]: {
      fontSize: '0.75rem',
   },

   [theme.breakpoints.down('xs')]: {
      fontSize: '0.7rem',
   },
}))

const Login = React.memo(() => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [showPassword, setShowPassword] = useState(false)

   const navigate = useNavigate()

   const handleKakaoLogin = useCallback(() => {
      const Kakao = window.Kakao
      Kakao.Auth.login({
         success: (response) => {
            console.log('✅ 카카오 로그인 성공!')
            console.log('🔹 access_token:', response.access_token)

            Kakao.API.request({
               url: '/v2/user/me',
               success: (userResponse) => {
                  console.log('🔹 카카오 사용자 정보:', userResponse)
                  alert(`카카오 로그인 성공!\n닉네임: ${userResponse.kakao_account.profile.nickname}`)
                  navigate('/home')
               },
               fail: (error) => {
                  console.error('❌ 사용자 정보 요청 실패:', error)
               },
            })
         },
         fail: (error) => {
            console.error('❌ 카카오 로그인 실패:', error)
         },
      })
   }, [navigate])

   const handleLogin = (e) => {
      e.preventDefault()
      alert('로그인 성공!')
      navigate('/home')
   }

   const memoizedButtonText = useMemo(() => {
      return '로그인'
   }, [])

   return (
      <Container>
         <LoginWrapper>
            <Form onSubmit={handleLogin}>
               <InputField placeholder="이메일을 입력해 주세요." name="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />

               <InputField
                  placeholder="비밀번호를 입력해 주세요."
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                     endAdornment: (
                        <InputAdornment position="end">
                           <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                           </IconButton>
                        </InputAdornment>
                     ),
                  }}
               />
               <StyledTypography>
                  비밀번호가 기억나지 않으세요? <StyledLink>비밀번호</StyledLink> 찾으러 가기
               </StyledTypography>
            </Form>

            <Button fullWidth type="submit">
               {memoizedButtonText}
            </Button>

            <StyledTypography>────────────── or ──────────────</StyledTypography>
            <Button className="kakao-login-btn" onClick={handleKakaoLogin}>
               <img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/KakaoTalk_logo.svg" alt="kakao" style={{ width: '20px', height: '20px' }} />
               카카오로 간편 로그인
            </Button>
         </LoginWrapper>
      </Container>
   )
})

export default Login
