import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Typography, Box, Button } from '@mui/material'
import { styled as muiStyled } from '@mui/material/styles'
import styled from 'styled-components'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

// 뒤로가기 버튼 컨테이너
const BackButtonContainer = muiStyled(Box)(({ theme }) => ({
   padding: '2rem 0',
   borderBottom: `1px solid ${theme.palette.divider}`,
}))

// 뒤로가기 버튼
const BackButton = muiStyled(Link)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   gap: '0.5rem',
   color: theme.palette.text.primary,
   textDecoration: 'none',
   fontSize: '0.9rem',
   transition: 'color 0.3s ease',
   '&:hover': {
      color: theme.palette.text.secondary,
   },
}))

// 전체 컨테이너 스타일
const PageContainer = muiStyled(Container)(({ theme }) => ({
   maxWidth: '800px',
   margin: '0 auto',
   padding: '2rem 1rem',
}))

// 메인 이미지 스타일
const MainImageContainer = muiStyled(Box)(({ theme }) => ({
   textAlign: 'center',
   marginBottom: '2rem',
   '& img': {
      maxWidth: '300px',
      height: 'auto',
   },
}))

// 가격 섹션 스타일
const PriceSection = muiStyled(Box)(({ theme }) => ({
   textAlign: 'center',
   marginBottom: '2rem',
   '& .price-text': {
      fontSize: '1.2rem',
      fontWeight: 500,
      marginBottom: '1rem',
   },
}))

// 버튼 그룹 스타일
const ButtonGroup = muiStyled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   gap: '0.5rem',
   marginBottom: '3rem',
}))

const BeforePurchasingButton = styled.div`
   .button {
      padding: 1em 2em;
      border: none;
      border-radius: 5px;
      font-weight: bold;
      letter-spacing: 5px;
      text-transform: uppercase;
      cursor: pointer;
      color: #000000;
      transition: all 1000ms;
      font-size: 15px;
      position: relative;
      overflow: hidden;
      outline: 2px solid #000000;
   }

   button:hover {
      color: #ffffff;
      transform: scale(1.05);
      outline: 2px solid #000000;
      box-shadow: 4px 5px 17px -4px #000000;
   }

   button::before {
      content: '';
      position: absolute;
      left: -50px;
      top: 0;
      width: 0;
      height: 100%;
      background-color: #000000;
      transform: skewX(180deg);
      z-index: -1;
      transition: width 500ms;
   }

   button:hover::before {
      width: 250%;
   }

   button:active {
      transform: scale(0.98);
      background-color: #000000;
      transition: all 0.1s ease;
   }
`

// 커스텀 버튼 스타일
const CustomButton = muiStyled(Button)(({ theme }) => ({
   padding: '0.5rem 2rem',
   borderRadius: '20px',
   backgroundColor: theme.palette.primary.main,
   color: 'white',
   '&:hover': {
      backgroundColor: theme.palette.primary.light,
   },
}))

// 상세 정보 섹션 스타일
const DetailSection = muiStyled(Box)(({ theme }) => ({
   textAlign: 'center',
   marginBottom: '3rem',
   '& .detail-title': {
      fontSize: '1.2rem',
      letterSpacing: '0.2em',
      marginBottom: '2rem',
   },
}))

// 비디오 섹션 스타일
const VideoSection = muiStyled(Box)(({ theme }) => ({
   position: 'relative',
   width: '100%',
   backgroundColor: '#f5f5f5',
   borderRadius: '10px',
   padding: '2rem',
   marginBottom: '3rem',
   '& .play-button': {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: '#FF0000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto',
      cursor: 'pointer',
   },
}))

// QR 코드 섹션 스타일
const QRSection = muiStyled(Box)(({ theme }) => ({
   textAlign: 'center',
   '& img': {
      maxWidth: '200px',
      height: 'auto',
   },
}))

const TemplateDetail = () => {
   const { templateId, tab } = useParams()

   // 임시 데이터 (추후 API 연동 필요)
   const templateData = {
      id: templateId,
      mainImage: '/images/templates/card1.svg',
      price: '23,000',
      detailImages: ['/images/templates/card2.svg', '/images/templates/card3.png', '/images/templates/card4.png'],
   }

   return (
      <>
         <BackButtonContainer>
            <Container maxWidth="lg">
               <BackButton to={`/template/${tab}`}>
                  <ArrowBackIosNewIcon sx={{ fontSize: '0.8rem' }} />
                  Back Template
               </BackButton>
            </Container>
         </BackButtonContainer>

         <PageContainer>
            <MainImageContainer>
               <img src={templateData.mainImage} alt="Template Preview" />
            </MainImageContainer>

            <PriceSection>
               <BeforePurchasingButton>
                  <button className="button">구매하기 전 잠깐 사용해보기</button>
               </BeforePurchasingButton>
               <Typography className="price-text">Price | {templateData.price}</Typography>
               <ButtonGroup>
                  <CustomButton>구매하기</CustomButton>
                  <CustomButton>미리보기</CustomButton>
               </ButtonGroup>
            </PriceSection>

            <DetailSection>
               <Typography className="detail-title">TEMPLATE DETAILS</Typography>
               <Box className="detail-images">
                  {templateData.detailImages.map((image, index) => (
                     <img key={index} src={image} alt={`Detail ${index + 1}`} />
                  ))}
               </Box>
            </DetailSection>

            <VideoSection>
               <Box className="play-button">
                  <PlayArrowIcon sx={{ color: 'white', fontSize: '2rem' }} />
               </Box>
            </VideoSection>

            <QRSection>
               <img src="/images/qr-code.png" alt="QR Code" />
            </QRSection>
         </PageContainer>
      </>
   )
}

export default TemplateDetail
