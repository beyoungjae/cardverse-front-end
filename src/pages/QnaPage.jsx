import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { InnerText } from '../components/customer/InnerText'

// qna 컨테이너
const QnaContainer = styled(Box)(({ theme }) => ({
   padding: '120px 40px',
   backgroundColor: theme.palette.background.default,
   minHeight: '100vh',
   [theme.bps.md]: {
      padding: '80px 24px',
   },
   [theme.bps.sm]: {
      padding: '60px 16px',
   },
}))

// qna 섹션
const QnaSection = styled(Box)(({ theme }) => ({
   textAlign: 'center',
   marginBottom: '80px',
   position: 'relative',
}))

// 버튼 스타일
const StyleButton = styled(Button)(({ theme }) => ({
   marginTop: '20px',
   backgroundColor: theme.palette.secondary.contrastText,
   color: theme.palette.primary.main,
   border: '1px solid #000',
   '&:hover': {
      backgroundColor: theme.palette.secondary.contrastText,
   },
}))

const QnaPage = () => {
   const handleFormSubmit = (data) => {}

   return (
      <QnaContainer>
         <QnaSection>
            <Typography
               variant="h1"
               sx={{
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  marginBottom: '50px',
                  fontWeight: 600,
               }}
            >
               Q&A
            </Typography>
            <InnerText onSubmit={handleFormSubmit} />
            <StyleButton variant="contained">등록하기</StyleButton>
         </QnaSection>
      </QnaContainer>
   )
}

export default QnaPage
