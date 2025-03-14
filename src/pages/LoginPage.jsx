import React from 'react'
import { Login } from '../components/auth'
import { styled } from '@mui/system'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

// 페이지 컨테이너 - Login 컴포넌트에 이미 스타일이 적용되어 있으므로 최소한의 스타일만 적용
const PageWrapper = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}))

const LogoContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '50px',
}))

const LoginLogo = styled('img')(({ theme }) => ({
   width: '150px',
   height: 'auto',
   zIndex: 1,
   cursor: 'pointer',
   '&:hover': {
      transform: 'scale(1.05)',
   },
   '&:active': {
      transform: 'scale(0.95)',
   },
   transition: 'transform 0.3s ease',
   [theme.breakpoints.down('sm')]: {
      width: '120px',
   },
}))

const LoginPage = () => {
  const navigate = useNavigate()

  return (
    <PageWrapper>
      <LogoContainer>
        <LoginLogo src="/images/logo.png" alt="CardVerse" onClick={() => navigate('/')} />
      </LogoContainer>
      <Login />
    </PageWrapper>
  )
}

export default LoginPage
