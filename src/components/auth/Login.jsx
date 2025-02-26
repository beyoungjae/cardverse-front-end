import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import ForgotPasswordModal from '../modals/ForgotPasswordModal'
import ModalWrapper from '../modals/ModalWrapper'

// mui
import { TextField, Box, IconButton, InputAdornment, Typography } from '@mui/material'
import { styled } from '@mui/system'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import { loginUserThunk } from '../../features/authSlice'
import { useDispatch, useSelector } from 'react-redux'
// import { handleKakaoLogin } from '../../api/oauthApi'
import { initiateKakaoLogin } from '../../features/oauthSlice'
import KakaoLoginBtn from '../button/KakaoLoginBtn'

const Container = styled(Box)(({ theme }) => ({
   padding: '60px 64px',
   width: '100%',
   maxWidth: '500px',
   margin: '0 auto',
   border: '1px solid #bbbbbb',
   borderRadius: '8px',
   minWidth: '300px',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   gap: '60px',
   backgroundColor: '#fcfcfc',

   '& > *': {
      width: '100%',
      textAlign: 'center',
   },

   [theme.breakpoints.down('md')]: {},
   [theme.breakpoints.down('sm')]: {
      gap: '60px',
      padding: '40px',
      margin: '0 auto',
      border: 'none',
      borderRadius: 0,
      backgroundColor: 'transparent',
      height: '100%',
      // border: '1px solid green',
   },
}))

const InputField = styled(TextField)(({ theme }) => ({
   '& .MuiInputBase-input': {
      fontSize: '1rem', // 기본 폰트 크기
      padding: '12px',

      [theme.breakpoints.down('md')]: {
         fontSize: '0.9rem', // md 이하에서는 작게
      },
      [theme.breakpoints.down('sm')]: {
         fontSize: '0.8rem', // sm 이하에서는 더 작게
         padding: '13px',
         backgroundColor: 'white',
         borderRadius: '4px',
      },
      [theme.breakpoints.down(480)]: {
         fontSize: '0.7rem', // 480px 이하에서는 12px
         padding: '12px',
      },
   },
   '&:first-of-type': {
      paddingBottom: '16px',
      [theme.breakpoints.down('sm')]: {
         paddingBottom: '0px',
      },
   },

   [theme.breakpoints.down('md')]: {},
   [theme.breakpoints.down('sm')]: {
      backgroundColor: 'white',
      borderRadius: '4px',
   },
}))

const Button = styled('button')(({ theme }) => ({
   backgroundColor: '#B699BB',
   color: '#000',
   border: 'none',
   borderRadius: '4px',
   padding: '15px 15px',
   fontSize: '1rem',
   fontWeight: 'bold',
   cursor: 'pointer',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   gap: '8px',
   width: '100%',

   '&:hover': {
      backgroundColor: '#a98bae',
   },
   '&.kakao-login-btn': {
      backgroundColor: '#ffe812',
   },

   '&.signup-btn': {
      backgroundColor: '#ffffff',
      border: '1px solid #cccccc',
   },
   '&.signup-btn:hover': {
      backgroundColor: '#f5f5f5',
   },

   [theme.breakpoints.down('md')]: {
      padding: '8px 12px',

      fontSize: '0.85rem',
   },
   [theme.breakpoints.down('sm')]: {
      padding: '8px 10px',
      fontSize: '0.7rem',
   },
}))

const Form = styled('form')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '20px',
   [theme.breakpoints.down('md')]: {
      gap: '12px',
   },
   [theme.breakpoints.down('sm')]: {
      // border: '1px solid pink',
      justifyContent: 'space-between',
   },
}))

const FormContainer = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',

   '&.Form-btn': {
      gap: '0px',
      [theme.breakpoints.down('md')]: { gap: '8px' },
      [theme.breakpoints.down('sm')]: { gap: '12px' },
   },
   [theme.breakpoints.down('md')]: { gap: '8px' },
   [theme.breakpoints.down('sm')]: { gap: '12px' },
}))

const LoginWrapper = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '12px',

   [theme.breakpoints.down('sm')]: {
      gap: 'initial',
      justifyContent: 'space-between',
      height: '100%',
      // border: '1px solid red',
   },
}))

// ━━━━━━ TEXT
const StyledLink = styled(Link)(({ theme }) => ({
   display: 'inline',
   textDecoration: 'none',
   fontSize: '0.89rem',
   color: 'blue',

   [theme.breakpoints.down('md')]: {
      fontSize: '0.79rem',
   },
   [theme.breakpoints.down('sm')]: {
      fontSize: '0.69rem',
   },
}))

const StyledTypography = styled(Typography)(({ theme }) => ({
   fontSize: '0.9rem',
   textAlign: 'end',
   padding: '2px 5px',

   '&.kakao-comment': {
      textAlign: 'center',
      [theme.breakpoints.down('sm')]: {
         display: 'none',
      },
   },
   '&.modal': {
      display: 'inline',
      padding: '0px 5px',
      textDecoration: 'none',
      cursor: 'pointer',
      color: 'blue',
   },

   [theme.breakpoints.down('md')]: {
      padding: '3px 5px',
      fontSize: '0.8rem',
   },
   [theme.breakpoints.down('sm')]: {
      padding: '1px 5px',
      fontSize: '0.7rem',
   },
}))

const Login = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [showPassword, setShowPassword] = useState(false)
   const [showModal, setShowModal] = useState(false)
   const navigate = useNavigate()
   const dispatch = useDispatch()

   // const handleKakaoLogin = useCallback(() => {
   //    window.Kakao.Auth.authorize({
   //       redirectUri: `${process.env.REACT_APP_API_URL}/oauth/kakao`,
   //       // clientId: process.env.REACT_APP_KAKAO_REST_KEY,
   //       // scope: 'profile_nickname profile_image account_email',
   //    })
   // }, [])

   const handleKakaoLogin = () => {
      dispatch(initiateKakaoLogin())
   }

   // const handleKakaoLogin = () => {
   //    window.Kakao.Auth.loginForm({
   //       success: async function (authObj) {
   //          const response = await commonApi.post('/oauth/kakao/callback', {
   //             accessToken: authObj.access_token,
   //          })
   //       },
   //       fail: function (err) {
   //          console.error('카카오 로그인 실패:', err)
   //       },
   //    })
   // }

   // useEffect(() => {
   //    if (window.Kakao) {
   //       window.Kakao.init('YOUR_KAKAO_JAVASCRIPT_KEY')
   //       console.log('✅ Kakao SDK initialized')
   //    } else {
   //       console.error('❌ Kakao SDK is not loaded')
   //    }
   // }, [])

   // const handleKakaoLogin = useCallback(() => {
   //    kakaoLogin()
   // }, [])

   // const KakaoLogin = () => {
   //    useEffect(() => {
   //       if (!window.Kakao.isInitialized()) {
   //          window.Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY)
   //       }
   //    }, [])

   //    const handleKakaoLogin = useCallback(() => {
   //       window.Kakao.Auth.authorize({
   //          redirectUri: `${process.env.REACT_APP_BASE_URL}/auth/kakao/callback`,
   //       })
   //    }, []) // 의존성 배열이 비어있음 (redirectUri가 상수이므로)

   //    return <button onClick={handleKakaoLogin}>카카오 로그인</button>
   // }

   // const handleKakaoLogin = useCallback(() => {
   //    const Kakao = window.Kakao

   //    if (!Kakao) {
   //       console.error('❌ Kakao is not loaded')
   //       return
   //    }

   //    Kakao.Auth.login({
   //       success: (response) => {
   //          console.log('✅ 카카오 로그인 성공!')
   //          console.log('🔹 access_token:', response.access_token)

   //          Kakao.API.request({
   //             url: '/v2/user/me',
   //             success: (userResponse) => {
   //                console.log('🔹 카카오 사용자 정보:', userResponse)
   //                alert(`카카오 로그인 성공!\n닉네임: ${userResponse.kakao_account.profile.nickname}`)
   //                navigate('/home')
   //             },
   //             fail: (error) => {
   //                console.error('❌ 사용자 정보 요청 실패:', error)
   //             },
   //          })
   //       },
   //       fail: (error) => {
   //          console.error('❌ 카카오 로그인 실패:', error)
   //       },
   //    })
   // }, [navigate])

   const handleLogin = useCallback(
      async (e) => {
         try {
            e.preventDefault()
            if (email.trim() && password.trim()) {
               const result = await dispatch(loginUserThunk({ email, password })).unwrap()
               if (result.id) {
                  navigate('/')
               }
            } else {
               alert('이메일과 비밀번호를 입력해주세요.')
            }
         } catch (error) {
            console.error('로그인 에러:', error)
         }
      },
      [dispatch, email, password, navigate],
   )

   return (
      <Container>
         <LoginWrapper>
            <Form onSubmit={handleLogin}>
               <FormContainer>
                  <InputField
                     // 인풋 필드
                     placeholder="이메일을 입력해 주세요."
                     name="email"
                     fullWidth
                     autoComplete="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputField
                     // 인풋 필드
                     placeholder="비밀번호를 입력해 주세요."
                     type={showPassword ? 'text' : 'password'}
                     name="password"
                     fullWidth
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
                     비밀번호가 기억나지 않으세요?
                     <StyledTypography className="modal" component="span" onClick={() => setShowModal(true)}>
                        비밀번호
                     </StyledTypography>
                     찾기
                  </StyledTypography>
               </FormContainer>

               <FormContainer className="Form-btn">
                  <Button fullWidth type="submit">
                     로그인
                  </Button>
                  <StyledTypography>
                     계정이 없으세요?
                     <StyledLink to="/signup"> 회원가입 </StyledLink>하기
                  </StyledTypography>
               </FormContainer>
            </Form>
            <StyledTypography className="kakao-comment" sx={{ marginBottom: '16px', color: '#cccccc' }}>
               ─────────── or ───────────
            </StyledTypography>
            <KakaoLoginBtn />
            {/* <Button
               // 브레이크 포인트

               className="kakao-login-btn"
               onClick={handleKakaoLogin}>
               <img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/KakaoTalk_logo.svg" alt="kakao" style={{ width: '20px', height: '20px' }} />
               카카오로 간편 로그인
            </Button> */}
            {/* {showModal && <ForgotPasswordModal onClose={() => setShowModal(false)} />} */}
            {showModal && <ModalWrapper onClose={() => setShowModal(false)} />}
         </LoginWrapper>
      </Container>
   )
}

export default Login
