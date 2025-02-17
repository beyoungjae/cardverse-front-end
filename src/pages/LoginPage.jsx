import React from 'react'
import { Box } from '@mui/material'
import { Login } from '../components/auth'
import { styled } from '@mui/system'
import { Link } from 'react-router-dom'

const LogoContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    [theme.breakpoints.down('md')]: {
        flexGrow: 0,
        marginRight: 'auto',
    },
}))

const LogoImgLink = styled('img')(({ theme }) => ({
    margin: '0 auto',
    padding: '10px',
    height: '80px',
}))

const Container = styled(Box)(({ theme }) => ({
    backgroundColor: 'transparent',
    padding: '40px',
    border: 'none',
    minWidth: '375px',
    height: '100vh',
    minHeight: '100vh', // 일반적인 뷰포트 높이
    maxHeight: '100dvh',

    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url('/images/home/login-background.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    margin: '0 auto',
    [theme.breakpoints.down('md')]: {},
    [theme.breakpoints.down('sm')]: {
        minHeight: '100svh', // ✅ 작은 뷰포트 (주소창이 보이는 상태)
        maxHeight: '100lvh', // ✅ 큰 뷰포트 (주소창이 사라진 상태)
        backgroundImage: `linear-gradient(rgba(255, 255, 255,0.8), rgba(255, 255, 255, 0.8)), url('/images/home/login-background.png')`,
    },
}))

const LoginPage = () => {
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
