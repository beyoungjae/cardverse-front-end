import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { styled } from '@mui/material/styles'
import { Box, Typography, Container } from '@mui/material'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { useLocation, useParams, useNavigate } from 'react-router-dom'

import 'swiper/css'
import 'swiper/css/navigation'

// 배너 영역
const BannerContainer = styled(Box)(({ theme }) => ({
   width: '100%',
   height: '400px',
   position: 'relative',
   overflow: 'hidden',
   backgroundColor: '#101010',
   boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
   [theme.breakpoints.down('md')]: {
      height: '300px',
   },
   [theme.breakpoints.down('sm')]: {
      height: '180px',
   },
}))

const BannerImage = styled('img')(({ theme }) => ({
   width: '100%',
   height: '100%',
   objectFit: 'cover',
}))

const BannerOverlay = styled(Box)(({ theme }) => ({
   position: 'absolute',
   top: 0,
   left: 0,
   width: '100%',
   height: '100%',
   background: 'linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2))',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
}))

const BannerTitle = styled(Typography)(({ theme }) => ({
   color: '#fff',
   fontSize: '3.2rem',
   fontWeight: theme.typography.fontWeightRegular,
   letterSpacing: '0.35em',
   textAlign: 'center',
   textShadow: '3px 3px 6px rgba(0,0,0,0.4)',
   [theme.breakpoints.down('md')]: {
      fontSize: '2.6rem',
   },
   [theme.breakpoints.down('sm')]: {
      fontSize: '1.9rem',
   },
}))

// TOTAL 텍스트 (상단 카운트 영역)
const TotalText = styled(Typography)(({ theme }) => ({
   fontSize: '1rem',
   color: theme.palette.text.secondary,
   letterSpacing: '0.3rem',
   lineHeight: '1.5',
   marginBottom: '3rem',
   textAlign: 'center',
   fontWeight: 500,
   position: 'relative',
   '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-10px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '40px',
      height: '0.1px',
      background: theme.palette.primary.light,
   },
}))

// 탭 영역 및 좌우 네비게이션 버튼
const TabContainer = styled(Box)(({ theme }) => ({
   position: 'relative',
   marginBottom: '4rem',
   '&::before': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '1px',
      backgroundColor: '#ddd',
   },
   '.swiper': {
      padding: '2rem 0',
      maxWidth: '800px',
      margin: '0 auto',
      [theme.breakpoints.down('sm')]: {
         maxWidth: '100%',
         padding: '1rem 0',
      },
   },
   '.swiper-button-prev, .swiper-button-next': {
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      backgroundColor: '#fff',
      border: '2px solid #ececec',
      boxShadow: '0 3px 8px rgba(0,0,0,0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
   },
   '.swiper-button-prev::after': {
      content: '"⟨"',
      fontSize: '1.4rem',
      color: '#444',
      fontWeight: 'bold',
   },
   '.swiper-button-next::after': {
      content: '"⟩"',
      fontSize: '1.4rem',
      color: '#444',
      fontWeight: 'bold',
   },
   '.swiper-button-prev:hover, .swiper-button-next:hover': {
      transform: 'scale(1.15)',
      background: 'linear-gradient(135deg, #fff, #f0f0f0)',
   },
   [theme.breakpoints.down('md')]: {
      '.swiper-button-prev, .swiper-button-next': {
         display: 'none',
      },
   },
   [theme.breakpoints.down('sm')]: {
      '.swiper-button-prev, .swiper-button-next': {
         display: 'none',
      },
   },
}))

// 탭 버튼 스타일
const StyledTab = styled('div')(({ theme, $selected, $isAdjacent }) => ({
   position: 'relative',
   padding: '1rem 2rem',
   cursor: 'pointer',
   fontSize: $selected ? '1.1rem' : $isAdjacent ? '1rem' : '0.9rem',
   fontWeight: $selected ? '600' : '400',
   color: $selected ? theme.palette.primary.main : $isAdjacent ? '#555' : '#777',
   transition: 'all 0.3s ease',
   textAlign: 'center',
   whiteSpace: 'nowrap',
   opacity: $selected ? 1 : $isAdjacent ? 0.9 : 0.8,
   transform: $selected ? 'scale(1)' : $isAdjacent ? 'scale(0.95)' : 'scale(0.9)',
   '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-5px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: $selected ? '60%' : '0%',
      height: '2px',
      borderRadius: '2px',
      background: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
      transition: 'width 0.3s ease',
   },
   '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
   },
   [theme.breakpoints.down('sm')]: {
      padding: '0.8rem 1.5rem',
      fontSize: $selected ? '0.95rem' : $isAdjacent ? '0.85rem' : '0.8rem',
   },
}))

// 리스트 영역
const ListSection = styled(Box)(({ theme }) => ({
   backgroundColor: '#ffffff',
   padding: theme.spacing(4),
   borderRadius: '16px',
   boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
   marginTop: theme.spacing(4),
   animation: 'fadeInUp 0.8s ease-out',
   '@keyframes fadeInUp': {
      '0%': { opacity: 0, transform: 'translateY(30px)' },
      '100%': { opacity: 1, transform: 'translateY(0)' },
   },
}))

// 템플릿 카드 및 이미지 영역
const TemplateGrid = styled(Box)(({ theme }) => ({
   display: 'grid',
   gridTemplateColumns: 'repeat(3, 1fr)',
   gap: '2rem',
   [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
   },
   [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
   },
}))

const TemplateCard = styled(motion.div)(({ theme }) => ({
   position: 'relative',
   cursor: 'pointer',
   padding: '1rem',
   borderRadius: '12px',
   overflow: 'hidden',
   backgroundColor: '#fff',
   boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
   transition: 'all 0.05s ease',
   '&:hover': {
      transform: 'translateY(-8px) scale(1.02)',
      boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
   },
   '&:hover img': {
      transform: 'scale(1.1)',
   },
}))

const ImageWrapper = styled(Box)(({ theme }) => ({
   position: 'relative',
   width: '100%',
   paddingTop: '100%',
   overflow: 'hidden',
}))

const TemplateImage = styled('img')(({ theme }) => ({
   position: 'absolute',
   top: 0,
   left: 0,
   width: '100%',
   height: '100%',
   objectFit: 'contain',
   transition: 'transform 0.3s ease',
}))

const PriceInfo = styled(Typography)(({ theme }) => ({
   marginTop: '0.5rem',
   fontSize: '1rem',
   fontWeight: 500,
   textAlign: 'center',
   color: theme.palette.text.primary,
}))

// More 버튼
const MoreButton = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   cursor: 'pointer',
   marginTop: theme.spacing(3),
   color: theme.palette.primary.main,
   fontWeight: 600,
   '& .arrow': {
      animation: 'bounce 2s infinite',
      fontSize: '1rem',
   },
   '@keyframes bounce': {
      '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
      '40%': { transform: 'translateY(-10px)' },
      '60%': { transform: 'translateY(-5px)' },
   },
}))

// 템플릿 데이터 가라데이터
const templates = {
   invitation: [
      { id: 1, image: '/images/templates/card1.svg', price: '23,000' },
      { id: 2, image: '/images/templates/card2.svg', price: '15,000' },
      { id: 3, image: '/images/templates/card3.png', price: '5,000' },
      { id: 4, image: '/images/templates/card4.png', price: '10,000' },
      { id: 5, image: '/images/templates/card5.png', price: '30,000' },
      { id: 6, image: '/images/templates/card6.png', price: '45,000' },
      { id: 7, image: '/images/templates/card7.png', price: '25,000' },
      { id: 8, image: '/images/templates/card8.png', price: '20,000' },
      { id: 9, image: '/images/templates/card9.png', price: '35,000' },
   ],
   wedding: [
      { id: 7, image: '/images/templates/card7.png', price: '25,000' },
      { id: 8, image: '/images/templates/card8.png', price: '20,000' },
      { id: 9, image: '/images/templates/card9.png', price: '35,000' },
   ],
   newyear: [
      { id: 10, image: '/images/templates/card10.png', price: '15,000' },
      { id: 11, image: '/images/templates/card1.svg', price: '18,000' },
      { id: 12, image: '/images/templates/card2.svg', price: '22,000' },
   ],
   gohyeon: [
      { id: 13, image: '/images/templates/card4.png', price: '15,000' },
      { id: 14, image: '/images/templates/card5.png', price: '18,000' },
      { id: 15, image: '/images/templates/card6.png', price: '22,000' },
   ],
}

const TemplateList = () => {
   const location = useLocation()
   const { tab: urlTab } = useParams()
   const navigate = useNavigate()

   // 탭 순서 배열
   const tabOrder = ['wedding', 'invitation', 'newyear', 'gohyeon']
   const L = tabOrder.length
   const initialTab = urlTab && tabOrder.includes(urlTab) ? urlTab : 'wedding'

   // 상태 및 ref
   const [currentTab, setCurrentTab] = useState(initialTab)
   const [desiredTab, setDesiredTab] = useState(initialTab)
   const [showMore, setShowMore] = useState(false)
   const swiperRef = useRef(null)
   const animatingRef = useRef(false)

   useLayoutEffect(() => {
      const isMobile = window.innerWidth <= 768
      window.scrollTo({ top: 0, left: 0, behavior: isMobile ? 'smooth' : 'auto' })
   }, [location.pathname])

   useEffect(() => {
      if (urlTab && tabOrder.includes(urlTab)) {
         setCurrentTab(urlTab)
         setDesiredTab(urlTab)
      }
   }, [urlTab])

   // 탭 변경 handler
   const handleTabChange = (newValue) => {
      if (newValue !== desiredTab) {
         setDesiredTab(newValue)
         setShowMore(false)
      }
   }

   // 좌우 버튼 handler
   const handlePrevClick = () => {
      const currentIndex = tabOrder.indexOf(currentTab)
      const prevIndex = (currentIndex - 1 + L) % L
      setDesiredTab(tabOrder[prevIndex])
   }
   const handleNextClick = () => {
      const currentIndex = tabOrder.indexOf(currentTab)
      const nextIndex = (currentIndex + 1) % L
      setDesiredTab(tabOrder[nextIndex])
   }

   useEffect(() => {
      const swiper = swiperRef.current?.swiper
      if (swiper && desiredTab !== currentTab && !animatingRef.current) {
         const currentIndex = tabOrder.indexOf(currentTab)
         const targetIndex = tabOrder.indexOf(desiredTab)
         let diff = targetIndex - currentIndex
         if (diff > L / 2) {
            diff -= L
         } else if (diff < -L / 2) {
            diff += L
         }
         animatingRef.current = true
         if (diff > 0) {
            swiper.slideNext(300)
         } else if (diff < 0) {
            swiper.slidePrev(300)
         }
      }
   }, [desiredTab, currentTab, L])

   // 슬라이드 전환 완료 handler
   const handleTransitionEnd = (swiper) => {
      const newIndex = swiper.realIndex % L
      setCurrentTab(tabOrder[newIndex])
      animatingRef.current = false
   }

   // 사용자가 직접 슬라이드한 경우 동기화
   const handleSlideChange = (swiper) => {
      if (!animatingRef.current) {
         const newIndex = swiper.realIndex % L
         setCurrentTab(tabOrder[newIndex])
         setDesiredTab(tabOrder[newIndex])
      }
   }

   // 현재 탭의 인접성 판단 (디자인 조절용)
   const isAdjacentTab = (tabName) => {
      const currentIndex = tabOrder.indexOf(currentTab)
      const tabIndex = tabOrder.indexOf(tabName)
      const diff = Math.abs(currentIndex - tabIndex)
      return diff === 1 || diff === L - 1
   }

   const currentTemplates = templates[currentTab] || []
   const displayedTemplates = showMore ? currentTemplates : currentTemplates.slice(0, 6)

   const handleTemplateClick = (templateId) => {
      navigate(`/template/${currentTab}/${templateId}`, { state: { currentTab } })
   }

   return (
      <>
         <BannerContainer>
            <BannerImage src="/images/home/background4.png" alt="Template Banner" />
            <BannerOverlay>
               <BannerTitle>TEMPLATE VOWEL</BannerTitle>
            </BannerOverlay>
         </BannerContainer>

         <Container maxWidth="lg" sx={{ py: 8 }}>
            <TotalText>
               T O T A L <br />
               {currentTemplates.length}
            </TotalText>

            <TabContainer>
               <div className="swiper-button-prev" onClick={handlePrevClick} style={{ cursor: 'pointer' }}></div>
               <Swiper
                  ref={swiperRef}
                  modules={[Navigation]}
                  slidesPerView={3}
                  centeredSlides
                  initialSlide={tabOrder.indexOf(currentTab) + L}
                  speed={300}
                  loop
                  observer
                  observeParents
                  watchSlidesProgress
                  allowTouchMove={false}
                  navigation={false}
                  onTransitionEnd={handleTransitionEnd}
                  onSlideChange={handleSlideChange}
                  breakpoints={{
                     320: { slidesPerView: 3, spaceBetween: 10 },
                     768: { slidesPerView: 3, spaceBetween: 20 },
                     1024: { slidesPerView: 3, spaceBetween: 30 },
                  }}
               >
                  {[...Array(3)].map((_, i) => (
                     <React.Fragment key={i}>
                        {tabOrder.map((tabName) => (
                           <SwiperSlide key={`${tabName}-${i}`}>
                              <StyledTab $selected={currentTab === tabName} $isAdjacent={isAdjacentTab(tabName)} onClick={() => handleTabChange(tabName)}>
                                 {tabName === 'wedding' && '청첩장'}
                                 {tabName === 'newyear' && '연하장'}
                                 {tabName === 'gohyeon' && '고희연'}
                                 {tabName === 'invitation' && '초빙장'}
                              </StyledTab>
                           </SwiperSlide>
                        ))}
                     </React.Fragment>
                  ))}
               </Swiper>
               <div className="swiper-button-next" onClick={handleNextClick} style={{ cursor: 'pointer' }}></div>
            </TabContainer>

            <ListSection>
               <TemplateGrid>
                  {displayedTemplates.map((template, index) => (
                     <TemplateCard key={template.id} onClick={() => handleTemplateClick(template.id)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                        <ImageWrapper>
                           <TemplateImage src={template.image} alt={`Template ${template.id}`} />
                        </ImageWrapper>
                        <PriceInfo onClick={(e) => e.stopPropagation()}>₩ {template.price}</PriceInfo>
                     </TemplateCard>
                  ))}
               </TemplateGrid>

               <MoreButton onClick={() => setShowMore(!showMore)}>
                  <Typography className="arrow">{showMore ? 'Less' : 'More'}</Typography>
               </MoreButton>
            </ListSection>
         </Container>
      </>
   )
}

export default TemplateList
