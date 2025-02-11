import React, { useState, useRef, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { Box, Typography, Container, Tab, Tabs } from '@mui/material'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { useLocation } from 'react-router-dom'

// 배너 컨테이너
const BannerContainer = styled(Box)(({ theme }) => ({
   width: '100%',
   height: '400px',
   position: 'relative',
   overflow: 'hidden',
   backgroundColor: '#f5f5f5',
   [theme.breakpoints.down('md')]: {
      height: '300px',
   },
   [theme.breakpoints.down('sm')]: {
      height: '200px',
   },
}))

// 배너 이미지
const BannerImage = styled('img')(({ theme }) => ({
   width: '100%',
   height: '100%',
   objectFit: 'cover',
}))

// 배너 오버레이
const BannerOverlay = styled(Box)(({ theme }) => ({
   position: 'absolute',
   top: 0,
   left: 0,
   width: '100%',
   height: '100%',
   backgroundColor: 'rgba(0, 0, 0, 0.3)',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
}))

// 배너 타이틀
const BannerTitle = styled(Typography)(({ theme }) => ({
   color: '#fff',
   fontSize: '2.5rem',
   fontWeight: 500,
   letterSpacing: '0.5em',
   textAlign: 'center',
   [theme.breakpoints.down('md')]: {
      fontSize: '2rem',
   },
   [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
   },
}))

// 탭 컨테이너 스타일
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
      backgroundColor: '#e0e0e0',
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
      width: '40px',
      height: '40px',
      background: 'white',
      borderRadius: '50%',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      '&::after': {
         fontSize: '1rem',
         color: '#333',
         fontWeight: 'bold',
      },
      '&:hover': {
         background: '#f8f8f8',
      },
      [theme.breakpoints.down('sm')]: {
         width: '30px',
         height: '30px',
         '&::after': {
            fontSize: '0.8rem',
         },
      },
   },
}))

// 커스텀 탭 스타일
const StyledTab = styled('div')(({ theme, $selected, $isAdjacent }) => ({
   position: 'relative',
   padding: '1rem 3rem',
   cursor: 'pointer',
   fontSize: $selected ? '1.1rem' : $isAdjacent ? '0.9rem' : '0.8rem',
   fontWeight: $selected ? 600 : 400,
   color: $selected ? '#000' : $isAdjacent ? '#666' : '#888',
   transition: 'all 0.3s ease',
   textAlign: 'center',
   whiteSpace: 'nowrap',
   opacity: $selected ? 1 : $isAdjacent ? 0.8 : 0.5,
   transform: $selected ? 'scale(1)' : $isAdjacent ? 'scale(0.9)' : 'scale(0.8)',
   '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-1px',
      left: 0,
      width: $selected ? '100%' : '0%',
      height: '2px',
      backgroundColor: '#000',
      transition: 'all 0.3s ease',
   },
   [theme.breakpoints.down('sm')]: {
      padding: '0.8rem 2rem',
      fontSize: $selected ? '0.9rem' : $isAdjacent ? '0.8rem' : '0.7rem',
   },
}))

// TOTAL 텍스트
const TotalText = styled(Typography)(({ theme }) => ({
   fontSize: '0.9rem',
   color: '#888',
   letterSpacing: '0.2em',
   marginBottom: '3rem',
   textAlign: 'center',
   position: 'relative',
   '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-1rem',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '30px',
      height: '1px',
      backgroundColor: '#888',
   },
}))

// 템플릿 그리드 컨테이너
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

// 템플릿 카드 스타일
const TemplateCard = styled(motion.div)(({ theme }) => ({
   position: 'relative',
   cursor: 'pointer',
   padding: '1rem',
   '&:hover img': {
      transform: 'scale(1.05)',
   },
}))

// 템플릿 이미지
const TemplateImage = styled('img')(({ theme }) => ({
   width: '100%',
   height: 'auto',
   transition: 'transform 0.3s ease',
}))

// 가격 정보
const PriceInfo = styled(Typography)(({ theme }) => ({
   marginTop: '1rem',
   fontSize: '1.1rem',
   color: theme.palette.text.primary,
   textAlign: 'center',
}))

// More 버튼 스타일
const MoreButton = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   cursor: 'pointer',
   marginTop: '3rem',
   '& .arrow': {
      animation: 'bounce 2s infinite',
   },
   '@keyframes bounce': {
      '0%, 20%, 50%, 80%, 100%': {
         transform: 'translateY(0)',
      },
      '40%': {
         transform: 'translateY(-10px)',
      },
      '60%': {
         transform: 'translateY(-5px)',
      },
   },
}))

// 템플릿 데이터 가라데이터 추후 함수 변경 예정
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

const Template = () => {
   const location = useLocation()
   const [currentTab, setCurrentTab] = useState('wedding')
   const [showMore, setShowMore] = useState(false)
   const swiperRef = useRef(null)

   const tabOrder = ['wedding', 'invitation', 'newyear', 'gohyeon']

   useEffect(() => {
      window.scrollTo(0, 0)
   }, [location.pathname])

   useEffect(() => {
      const path = location.pathname.split('/')
      const tab = path[path.length - 1]
      if (tabOrder.includes(tab) && tab !== currentTab) {
         setCurrentTab(tab)
      }
   }, [location.pathname])

   useEffect(() => {
      if (swiperRef.current?.swiper) {
         const targetIndex = tabOrder.indexOf(currentTab)
         const realSlideIndex = targetIndex + tabOrder.length
         swiperRef.current.swiper.slideTo(realSlideIndex, 300)
      }
   }, [currentTab])

   const handleTabChange = (newValue) => {
      if (newValue !== currentTab) {
         setCurrentTab(newValue)
         setShowMore(false)
      }
   }

   const handleSlideChange = (swiper) => {
      const realIndex = swiper.realIndex % tabOrder.length
      const newTab = tabOrder[realIndex]
      if (newTab !== currentTab) {
         handleTabChange(newTab)
      }
   }

   const isAdjacentTab = (tabName) => {
      const currentIndex = tabOrder.indexOf(currentTab)
      const tabIndex = tabOrder.indexOf(tabName)
      const diff = Math.abs(currentIndex - tabIndex)
      return diff === 1 || diff === tabOrder.length - 1
   }

   const currentTemplates = templates[currentTab] || []
   const displayedTemplates = showMore ? currentTemplates : currentTemplates.slice(0, 6)

   return (
      <>
         <BannerContainer>
            <BannerImage src="/images/home/banner.png" alt="Template Banner" />
            <BannerOverlay>
               <BannerTitle>TEMPLATE VOWEL</BannerTitle>
            </BannerOverlay>
         </BannerContainer>

         <Container maxWidth="lg" sx={{ py: 8 }}>
            <TotalText>T O T A L {currentTemplates.length}</TotalText>

            <TabContainer>
               <Swiper
                  ref={swiperRef}
                  modules={[Navigation]}
                  slidesPerView={3}
                  centeredSlides
                  initialSlide={tabOrder.indexOf(currentTab) + tabOrder.length}
                  speed={300}
                  loop
                  observer
                  observeParents
                  watchSlidesProgress
                  allowTouchMove={false}
                  navigation={{
                     prevEl: '.swiper-button-prev',
                     nextEl: '.swiper-button-next',
                  }}
                  onSlideChange={handleSlideChange}
                  onAfterLoopFix={(swiper) => {
                     const currentIndex = tabOrder.indexOf(currentTab)
                     const targetIndex = currentIndex + tabOrder.length
                     if (swiper.activeIndex !== targetIndex) {
                        swiper.slideTo(targetIndex, 0, false)
                     }
                  }}
                  breakpoints={{
                     320: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                     },
                     768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                     },
                     1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                     },
                  }}
               >
                  {tabOrder.map((tabName) => (
                     <React.Fragment key={tabName}>
                        <SwiperSlide key={`${tabName}`}>
                           <StyledTab $selected={currentTab === tabName} $isAdjacent={isAdjacentTab(tabName)}>
                              {tabName === 'wedding' && '청첩장'}
                              {tabName === 'newyear' && '연하장'}
                              {tabName === 'gohyeon' && '고희연'}
                              {tabName === 'invitation' && '초빙장'}
                           </StyledTab>
                        </SwiperSlide>
                     </React.Fragment>
                  ))}
               </Swiper>
               <div className="swiper-button-prev"></div>
               <div className="swiper-button-next"></div>
            </TabContainer>

            <TemplateGrid>
               {displayedTemplates.map((template, index) => (
                  <TemplateCard key={template.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                     <TemplateImage src={template.image} alt={`Template ${template.id}`} />
                     <PriceInfo>₩ {template.price}</PriceInfo>
                  </TemplateCard>
               ))}
            </TemplateGrid>

            <MoreButton onClick={() => setShowMore(!showMore)}>
               <Typography className="arrow">{showMore ? 'Less' : 'More'}</Typography>
            </MoreButton>
         </Container>
      </>
   )
}

export default Template
