import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { Login } from '../components/auth'
import { styled } from '@mui/system'
import { Link } from 'react-router-dom'

const LogoContainer = styled(Box)(({ theme }) => ({
   display: 'flex',
   [theme.breakpoints.down('md')]: {},

   position: 'relative',

   '&::after': {
      content: '"Card Verse에 오신 것을 환영합니다."',
      position: 'absolute',
      textAlign: 'center',
      right: '0',
      width: '100%',
      bottom: '-60%',
      fontSize: '1.2rem',
      fontWeight: 'normal',
      color: '#999999',
      // transform: 'translateX(-50%)',
      [theme.breakpoints.down('md')]: { bottom: '-40%', fontSize: '0.9rem' },
      [theme.breakpoints.down('sm')]: { bottom: '-40%', fontSize: '0.7rem' },
   },
}))

const LogoImgLink = styled('img')(({ theme }) => ({
   // margin: '0 auto',
   padding: '0px',
   height: '80px',

   [theme.breakpoints.down('md')]: {
      height: '70px',
   },
   [theme.breakpoints.down('sm')]: {
      height: '50px',
   },
}))

const Container = styled(Box)(({ theme }) => ({
   backgroundColor: 'transparent',
   padding: '50px',
   border: 'none',
   minWidth: '375px',
   minHeight: '100vh', // 일반적인 뷰포트 높이
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   gap: '80px',

   backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url('/images/home/login-background.png')`,
   backgroundSize: 'cover',
   backgroundPosition: 'center',
   backgroundRepeat: 'no-repeat',
   margin: '0 auto',
   [theme.breakpoints.down('md')]: {
      gap: '50px',
      padding: '40px',
   },
   [theme.breakpoints.down('sm')]: {
      height: '100vh',
      minHeight: '100svh', // ✅ 작은 뷰포트 (주소창이 보이는 상태)
      maxHeight: '100lvh', // ✅ 큰 뷰포트 (주소창이 사라진 상태)
      backgroundImage: `linear-gradient(rgba(255, 255, 255,0.8), rgba(255, 255, 255, 0.8)), url('/images/home/login-background.png')`,
      padding: '40px 0px',
      gap: '20px',
   },
}))

const LoginPage = () => {
   const [sdkLoaded, setSdkLoaded] = useState(false)

   // useEffect(() => {
   //    if (!window.Kakao.isInitialized()) {
   //       window.Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY)
   //    }
   // }, [])

   // useEffect(() => {
   //    // 이미 로드되었다면 스킵
   //    if (sdkLoaded) return
   //    //       <script src="https://t1.kakaocdn.net/kakao_js_sdk/2.4.0/kakao.min.js" integrity="sha384-mXVrIX2T/Kszp6Z0aEWaA8Nm7J6/ZeWXbL8UpGRjKwWe56Srd/iyNmWMBhcItAjH" crossorigin="anonymous"></script>
   //    const script = document.createElement('script')
   //    script.src = 'https://developers.kakao.com/sdk/js/kakao.js'
   //    script.async = true
   //    script.onload = () => {
   //       if (window.Kakao && !window.Kakao.isInitialized()) {
   //          window.Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY)
   //          console.log('카카오 SDK 초기화 성공')
   //       }
   //       setSdkLoaded(true)
   //    }
   //    document.head.appendChild(script)

   //    return () => {
   //       document.head.removeChild(script)
   //    }
   // }, [sdkLoaded])

   return (
      <Container>
         <LogoContainer>
            <Link to="/">
               <LogoImgLink src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="로고" />
            </Link>
         </LogoContainer>
         <Login />
      </Container>
   )
}
export default LoginPage
