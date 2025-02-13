import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { Container, Typography, Box, Button, Modal, IconButton } from '@mui/material'
import { styled as muiStyled } from '@mui/material/styles'
import styled from 'styled-components'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import CloseIcon from '@mui/icons-material/Close'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

// 뒤로가기 버튼 컨테이너
const BackButtonContainer = muiStyled(Box)(({ theme }) => ({
   padding: '2rem 0',
   borderBottom: `1px solid ${theme.palette.divider}`,
}))

// 뒤로가기 버튼 스타일
const BackButton = muiStyled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   gap: '0.5rem',
   color: theme.palette.text.primary,
   textDecoration: 'none',
   fontSize: '0.9rem',
   transition: 'color 0.3s ease',
   cursor: 'pointer',
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
      maxWidth: '500px',
      [theme.breakpoints.down('md')]: {
         maxWidth: '350px',
      },
      [theme.breakpoints.down('sm')]: {
         maxWidth: '260px',
      },
      height: 'auto',
   },
}))

// 가격 섹션 스타일
const PriceSection = muiStyled(Box)(({ theme }) => ({
   textAlign: 'center',
   marginBottom: '10rem',
   '& .price-text': {
      fontSize: '1.2rem',
      fontWeight: 500,
      marginBottom: '2rem',
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
   margin-bottom: 2rem;
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

// 버튼 스타일 컴포넌트들
const ButtonStyles = {
   buyButton: {
      backgroundColor: '#000000',
      color: '#ffffff',
      padding: '15px 40px',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      '&:hover': {
         backgroundColor: '#333333',
      },
   },
   previewButton: {
      backgroundColor: '#ffffff',
      color: '#000000',
      padding: '15px 40px',
      border: '1px solid #000000',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      '&:hover': {
         backgroundColor: '#f5f5f5',
      },
   },
   tryButton: {
      width: '100%',
      padding: '15px',
      backgroundColor: '#f0f0f0',
      color: '#000000',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      '&:hover': {
         backgroundColor: '#e0e0e0',
      },
   },
}

// 버튼 컴포넌트들
const ActionButton = muiStyled('button')(({ variant = 'buy' }) => ({
   ...(variant === 'buy' ? ButtonStyles.buyButton : variant === 'preview' ? ButtonStyles.previewButton : ButtonStyles.tryButton),
}))

// 구매 버튼 스타일
const BuyButton = muiStyled(Button)(({ theme }) => ({
   padding: '0.5rem 2rem',
   borderRadius: '8px',
   backgroundColor: '#B699BB',
   color: 'white',
   '&:hover': {
      backgroundColor: '#D8B6DD',
   },
}))

// 미리보기 버튼 스타일
const PreviewButton = muiStyled(Button)(({ theme }) => ({
   padding: '0.5rem 2rem',
   borderRadius: '8px',
   backgroundColor: '#dddddd',
   color: '#000000',
   '&:hover': {
      backgroundColor: '#eeeeee',
   },
}))

// 상세 정보 섹션 스타일
const DetailSection = muiStyled(Box)(({ theme }) => ({
   borderTop: `0.5px solid ${theme.palette.divider}`,
   '& .detail-title': {
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.text.disabled,
      textAlign: 'center',
      marginBottom: '3rem',
      fontSize: '1.2rem',
      letterSpacing: '1em',
      marginTop: '5rem',
      marginBottom: '5rem',
      [theme.breakpoints.down('md')]: {
         fontSize: '1rem',
      },
      [theme.breakpoints.down('sm')]: {
         fontSize: '0.8rem',
      },
   },
   '& .detail-images': {
      position: 'relative',
      width: '320px',
      height: '640px',
      margin: '0 auto',
      [theme.breakpoints.down('md')]: {
         width: '250px',
         height: '500px',
      },
      [theme.breakpoints.down('sm')]: {
         width: '200px',
         height: '400px',
      },
      '& .iphone-mockup': {
         width: '100%',
         height: '100%',
         position: 'relative',
         zIndex: 2,
         objectFit: 'contain',
      },
      '& .screen-content': {
         position: 'absolute',
         top: '2.5%', // 아이폰 목업의 화면 영역에 맞게 미세 조정
         left: '4%',
         width: '92%', // 화면 비율 미세 조정
         height: '95%',
         overflow: 'hidden',
         borderRadius: '40px', // 아이폰 모서리 곡률에 맞게 조정
         '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0,
            transition: 'opacity 0.5s ease-in-out',
            position: 'absolute',
            top: 0,
            left: 0,
            '&.active': {
               opacity: 1,
            },
         },
      },
   },
}))

// 상세 정보 섹션 타이틀 스타일
const DetailSectionTitle = muiStyled('div')(({ theme }) => ({
   ...theme.typography.h2,
   textAlign: 'center',
   marginTop: '10rem',
   marginBottom: '10rem',
   [theme.breakpoints.down('md')]: {
      fontSize: '1.4rem',
   },
   [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem',
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

// 비디오 섹션 서브 코멘트 스타일
const VideoSectionSubComment = muiStyled('div')(({ theme }) => ({
   ...theme.typography.body2,
   textAlign: 'right',
   color: '#B699BB',
   marginBottom: '10rem',
   [theme.breakpoints.down('md')]: {
      fontSize: '0.7rem',
   },
   [theme.breakpoints.down('sm')]: {
      fontSize: '0.5rem',
   },
}))

// QR 코드 섹션 타이틀 스타일
const QRSectionTitle = muiStyled('div')(({ theme }) => ({
   ...theme.typography.h3,
   textAlign: 'center',
   marginTop: '10rem',
   marginBottom: '10rem',
   [theme.breakpoints.down('md')]: {
      fontSize: '1.3rem',
   },
   [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
   },
}))

// QR 코드 섹션 스타일
const QRSection = muiStyled(Box)(({ theme }) => ({
   textAlign: 'center',
   marginBottom: '10rem',
   '& .qr-code-images': {
      position: 'relative',
      width: '200px',
      height: 'auto',
      margin: '0 auto',
      [theme.breakpoints.down('md')]: {
         width: '150px',
         height: 'auto',
      },
      [theme.breakpoints.down('sm')]: {
         width: '100px',
         height: 'auto',
      },
      '& .iphone-mockup': {
         width: '100%',
         height: '100%',
         position: 'relative',
         zIndex: 2,
         objectFit: 'contain',
      },
      '& .qr-code': {
         position: 'absolute',
         top: '2.5%', // 아이폰 목업의 화면 영역에 맞게 미세 조정
         left: '4%',
         width: '92%', // 화면 비율 미세 조정
         height: '95%',
         objectFit: 'contain',
         borderRadius: '40px', // 아이폰 모서리 곡률에 맞게 조정
         zIndex: 1,
      },
   },
}))

// 모달 스타일
const PreviewModal = muiStyled(Modal)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   '& .modal-content': {
      position: 'relative',
      width: '100%',
      maxWidth: '800px',
      maxHeight: '90vh',
      margin: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      outline: 'none',
   },
   '& .close-button': {
      position: 'absolute',
      right: '10px',
      top: '10px',
      zIndex: 1,
   },
   '& .slide-container': {
      position: 'relative',
      width: '100%',
      height: '60vh', // 높이 조정
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   '& .slide-image': {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain',
      [theme.breakpoints.down('md')]: {
         width: '80%',
         height: 'auto',
      },
      [theme.breakpoints.down('sm')]: {
         width: '65%',
         height: 'auto',
      },
   },
   '& .nav-button': {
      position: 'absolute',
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      '&:hover': {
         backgroundColor: 'rgba(255, 255, 255, 0.2)',
      },
   },
   '& .prev-button': {
      left: '10px',
   },
   '& .next-button': {
      right: '10px',
   },
   '& .button-container': {
      marginTop: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
   },
}))

const TemplateDetail = () => {
   const { templateId } = useParams()
   const location = useLocation()
   const navigate = useNavigate()

   // 현재 선택된 탭 정보를 가져오기
   const currentTab = location.state?.currentTab || 'wedding'

   const handleBack = () => {
      navigate(`/template/${currentTab}`, {
         state: { currentTab },
      })
   }

   // 임시 데이터 (추후 API 연동 필요)
   const templateData = {
      id: templateId,
      mainImage: '/images/templates/card1.svg',
      price: '23,000',
      detailImages: ['/images/templates/card2.svg', '/images/templates/card3.png', '/images/templates/card4.png'],
   }

   const [activeIndex, setActiveIndex] = useState(0)
   const [isPreviewOpen, setIsPreviewOpen] = useState(false)
   const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0)

   useLayoutEffect(() => {
      // 모바일에서는 smooth, 데스크톱에서는 auto 사용
      const isMobile = window.innerWidth <= 768
      window.scrollTo({
         top: 0,
         left: 0,
         behavior: isMobile ? 'smooth' : 'auto',
      })
   }, [location.pathname])

   useEffect(() => {
      const interval = setInterval(() => {
         setActiveIndex((prev) => (prev + 1) % templateData.detailImages.length)
      }, 3000) // 3초마다 이미지 전환

      return () => clearInterval(interval)
   }, [])

   const handlePreviewOpen = () => {
      setIsPreviewOpen(true)
      setCurrentPreviewIndex(0)
   }

   const handlePreviewClose = () => {
      setIsPreviewOpen(false)
   }

   const handlePrevImage = () => {
      setCurrentPreviewIndex((prev) => (prev === 0 ? templateData.detailImages.length - 1 : prev - 1))
   }

   const handleNextImage = () => {
      setCurrentPreviewIndex((prev) => (prev + 1) % templateData.detailImages.length)
   }

   return (
      <>
         <BackButtonContainer>
            <Container maxWidth="lg">
               <BackButton onClick={handleBack}>
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
                  <BuyButton>구매하기</BuyButton>
                  <PreviewButton onClick={handlePreviewOpen}>미리보기</PreviewButton>
               </ButtonGroup>
            </PriceSection>

            <DetailSection>
               <Typography className="detail-title">TEMPLATE DETAILS</Typography>
               <Box className="detail-images">
                  <img src="/images/iphone-mockup.png" alt="iPhone mockup" className="iphone-mockup" />
                  <Box className="screen-content">
                     {templateData.detailImages.map((image, index) => (
                        <img key={index} src={image} alt={`Detail ${index + 1}`} className={activeIndex === index ? 'active' : ''} />
                     ))}
                  </Box>
               </Box>
            </DetailSection>

            <DetailSectionTitle>클릭 몇 번으로 나만의 감성을 담은 초대장을 완성하세요.</DetailSectionTitle>

            <VideoSection>
               <Box className="play-button">
                  <PlayArrowIcon sx={{ color: 'white', fontSize: '2rem' }} />
               </Box>
            </VideoSection>
            <VideoSectionSubComment>
               템플릿의 다채로운 기능과 세련된 디자인을 영상으로 확인하세요. <br />본 영상은 예시이며, 실제 템플릿은 자유롭게 편집 가능합니다.
            </VideoSectionSubComment>

            <QRSectionTitle>디지털 초대장으로 손쉽고 세련되게, 소중한 순간을 공유하세요.</QRSectionTitle>
            <QRSection>
               <Box className="qr-code-images">
                  <img src="/images/iphone-mockup.png" alt="iPhone mockup" className="iphone-mockup" />
                  <img src="/images/qrcodeEX.png" alt="QR Code" className="qr-code" />
               </Box>
            </QRSection>
         </PageContainer>

         {/* 미리보기 모달 */}
         <PreviewModal open={isPreviewOpen} onClose={handlePreviewClose} aria-labelledby="preview-modal">
            <div className="modal-content">
               <IconButton className="close-button" onClick={handlePreviewClose}>
                  <CloseIcon />
               </IconButton>
               <div className="slide-container">
                  <IconButton className="nav-button prev-button" onClick={handlePrevImage}>
                     <NavigateBeforeIcon />
                  </IconButton>
                  <img src={templateData.detailImages[currentPreviewIndex]} alt={`Preview ${currentPreviewIndex + 1}`} className="slide-image" />
                  <IconButton className="nav-button next-button" onClick={handleNextImage}>
                     <NavigateNextIcon />
                  </IconButton>
               </div>
               <div className="button-container">
                  <ActionButton variant="try">구매하기 전 잠깐 사용해보기</ActionButton>
                  <ActionButton variant="buy">구매하기</ActionButton>
               </div>
            </div>
         </PreviewModal>
      </>
   )
}

export default TemplateDetail
