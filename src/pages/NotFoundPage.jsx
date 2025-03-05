import React from 'react'
import { Box, Typography, Button, Container } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import HomeIcon from '@mui/icons-material/Home'

const NotFoundContainer = styled(Container)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   minHeight: 'calc(100vh - 200px)',
   padding: theme.spacing(4),
   textAlign: 'center',
}))

const ErrorIcon = styled(ErrorOutlineIcon)(({ theme }) => ({
   fontSize: '120px',
   color: theme.palette.primary.main,
   marginBottom: theme.spacing(2),
}))

const HomeButton = styled(Button)(({ theme }) => ({
   marginTop: theme.spacing(4),
   padding: theme.spacing(1, 3),
   borderRadius: '30px',
   fontWeight: 'bold',
}))

const NotFoundPage = () => {
   const navigate = useNavigate()

   const handleGoHome = () => {
      navigate('/')
   }

   return (
      <NotFoundContainer>
         <ErrorIcon />
         <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
            404
         </Typography>
         <Typography variant="h4" component="h2" gutterBottom>
            페이지를 찾을 수 없습니다
         </Typography>
         <Typography variant="body1" color="textSecondary" paragraph>
            요청하신 페이지가 존재하지 않거나, 이동되었거나, 일시적으로 사용할 수 없습니다.
         </Typography>
         <Typography variant="body1" color="textSecondary" paragraph>
            URL을 확인하시거나 아래 버튼을 클릭하여 홈으로 이동하세요.
         </Typography>
         <HomeButton variant="contained" color="primary" startIcon={<HomeIcon />} onClick={handleGoHome}>
            홈으로 돌아가기
         </HomeButton>
      </NotFoundContainer>
   )
}

export default NotFoundPage
