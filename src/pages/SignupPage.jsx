import React from 'react'
import Signup from '../components/auth/Signup'
import { Box } from '@mui/material'
import { styled } from '@mui/system'

const MainContainer = styled(Box)(({ theme }) => ({
   backgroundColor: 'transparent',
   padding: '50px',
   border: 'none',
   minWidth: '375px',
   height: '100vh',
   minHeight: '100vh',
   maxHeight: '100dvh',
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
      minHeight: '100svh',
      maxHeight: '100lvh',
      backgroundImage: `linear-gradient(rgba(255, 255, 255,0.8), rgba(255, 255, 255, 0.8)), url('/images/home/login-background.png')`,
      padding: '40px 0px',
      gap: '20px',
   },
}))

const SignupPage = () => {
   return (
      <MainContainer>
         <Signup />
      </MainContainer>
   )
}
export default SignupPage
