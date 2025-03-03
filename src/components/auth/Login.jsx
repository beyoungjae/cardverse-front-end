import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

import ModalWrapper from '../modals/ModalWrapper'

// mui
import { TextField, Box, IconButton, InputAdornment, Typography } from '@mui/material'
import { styled } from '@mui/system'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import { loginUserThunk, logoutUserThunk } from '../../features/authSlice'
import { useDispatch } from 'react-redux'
import KakaoLoginBtn from '../button/KakaoLoginBtn'

// 페이지 컨테이너
const PageContainer = styled(Box)(({ theme }) => ({
   minHeight: '100vh',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   padding: '40px 20px',
}))

// 로그인 컨테이너
const LoginContainer = styled(motion.div)(({ theme }) => ({
   width: '100%',
   maxWidth: '500px',
   margin: '0 auto',
   borderRadius: '16px',
   overflow: 'hidden',
   boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
   backgroundColor: '#ffffff',
   
   [theme.breakpoints.down('sm')]: {
      borderRadius: '12px',
   },
}))

// 로그인 헤더
const LoginHeader = styled(Box)(({ theme }) => ({
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

// 로그인 타이틀
const LoginTitle = styled(Typography)(({ theme }) => ({
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

// 로그인 서브타이틀
const LoginSubtitle = styled(Typography)(({ theme }) => ({
   fontSize: '1rem',
   color: 'rgba(255, 255, 255, 0.8)',
   position: 'relative',
   zIndex: 1,
   
   [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
   },
}))

// 로그인 폼
const LoginForm = styled(Box)(({ theme }) => ({
   padding: '40px',
   
   [theme.breakpoints.down('sm')]: {
      padding: '30px 20px',
   },
}))

// 입력필드
const InputField = styled(TextField)(({ theme }) => ({
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
      fontSize: '1rem',
      
      [theme.breakpoints.down('sm')]: {
         padding: '12px',
         fontSize: '0.9rem',
      },
   },
}))

// 로그인 버튼
const LoginButton = styled(motion.button)(({ theme }) => ({
   width: '100%',
   padding: '15px',
   backgroundColor: '#B699BB',
   color: '#ffffff',
   border: 'none',
   borderRadius: '8px',
   fontSize: '1rem',
   fontWeight: 600,
   cursor: 'pointer',
   marginBottom: '20px',
   transition: 'background-color 0.3s ease',
   
   '&:hover': {
      backgroundColor: '#a589aa',
   },
   
   [theme.breakpoints.down('sm')]: {
      padding: '12px',
      fontSize: '0.9rem',
   },
}))

// 분리선
const Divider = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   margin: '20px 0',
   color: '#aaa',
   fontSize: '0.9rem',
   
   '&::before, &::after': {
      content: '""',
      flex: 1,
      borderBottom: '1px solid #ddd',
   },
   '&::before': {
      marginRight: '10px',
   },
   '&::after': {
      marginLeft: '10px',
   },
}))

// 텍스트 링크
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

// 도움말
const HelpText = styled(Typography)(({ theme }) => ({
   textAlign: 'center',
   fontSize: '0.9rem',
   color: '#666',
   marginTop: '20px',
   
   [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
   },
}))

const Login = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [showPassword, setShowPassword] = useState(false)
   const [showModal, setShowModal] = useState(false)
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const [ref, inView] = useInView({
      threshold: 0.1,
      triggerOnce: true,
   })

   const handleLogin = useCallback(
      async (e) => {
         e.preventDefault()
         try {
            if (email && password) {
               localStorage.setItem('loginType', 'local')
               
               // 로그인 시도
               const result = await dispatch(loginUserThunk({ 
                  email, 
                  password,
                  forceLogin: true // 강제 로그인 옵션 추가
               })).unwrap()
               
               if (result.id) {
                  navigate('/')
               }
            } else {
               alert('이메일과 비밀번호를 입력해주세요.')
            }
         } catch (error) {
            console.error('로그인 에러:', error)
            
            // 에러 메시지에 따른 처리
            if (error && typeof error === 'string') {
               if (error.includes('이미 로그인되어 있습니다')) {
                  // 자동으로 로그아웃 후 다시 로그인 시도
                  try {
                     await dispatch(logoutUserThunk()).unwrap()
                     
                     // 세션 스토리지와 로컬 스토리지 초기화
                     sessionStorage.removeItem('statusCheckFlag')
                     
                     // 로그아웃 성공 후 다시 로그인 시도
                     const result = await dispatch(loginUserThunk({ 
                        email, 
                        password,
                        forceLogin: true
                     })).unwrap()
                     
                     if (result.id) {
                        navigate('/')
                     }
                  } catch (secondError) {
                     console.error('두 번째 로그인 시도 에러:', secondError)
                     alert('로그인에 실패했습니다. 페이지를 새로고침한 후 다시 시도해주세요.')
                     // 페이지 새로고침
                     window.location.reload()
                  }
               } else {
                  // 다른 로그인 에러 처리
                  alert(`로그인에 실패했습니다: ${error}`)
               }
            } else {
               alert('로그인에 실패했습니다. 다시 시도해주세요.')
            }
         }
      },
      [dispatch, email, password, navigate]
   )

   return (
      <PageContainer>
         <LoginContainer 
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
         >
            <LoginHeader>
               <LoginTitle variant="h4">로그인</LoginTitle>
               <LoginSubtitle variant="body1">CardVerse에 오신 것을 환영합니다</LoginSubtitle>
            </LoginHeader>
            
            <LoginForm component="form" onSubmit={handleLogin}>
               <InputField
                  label="이메일"
                  placeholder="이메일을 입력해 주세요"
                  name="email"
                  fullWidth
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
               />
               
               <InputField
                  label="비밀번호"
                  placeholder="비밀번호를 입력해 주세요"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  fullWidth
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="outlined"
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
               
               <Typography variant="body2" align="right" sx={{ mb: 2 }}>
                  비밀번호가 기억나지 않으세요?
                  <TextLink component="span" onClick={() => setShowModal(true)}>
                     비밀번호 찾기
                  </TextLink>
               </Typography>
               
               <LoginButton 
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
               >
                  로그인
               </LoginButton>
               
               <Divider>또는</Divider>
               
               <KakaoLoginBtn />
               
               <HelpText>
                  계정이 없으세요?
                  <TextLink component={Link} to="/signup">
                     회원가입
                  </TextLink>
                  하기
               </HelpText>
            </LoginForm>
            
            {showModal && <ModalWrapper onClose={() => setShowModal(false)} />}
         </LoginContainer>
      </PageContainer>
   )
}

export default Login
