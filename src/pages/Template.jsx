import React, { useState, useRef, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { Box, Typography, Container } from '@mui/material'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { useLocation, useParams } from 'react-router-dom'

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
   // 필요한 속성만 지정해 불필요한 애니메이션을 줄임
   transition: 'color 0.3s ease, opacity 0.3s ease, transform 0.3s ease',
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
      transition: 'width 0.3s ease',
      willChange: 'width',
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
   const { tab } = useParams()

   // 탭 순서 배열을 먼저 정의
   const tabOrder = ['wedding', 'invitation', 'newyear', 'gohyeon']
   const L = tabOrder.length // 탭 개수

   // 초기 탭 설정 (URL 파라미터가 유효하면 사용, 없으면 'wedding')
   const initialTab = tab && tabOrder.includes(tab) ? tab : 'wedding'

   // 상태 정의
   const [currentTab, setCurrentTab] = useState(initialTab)
   const [desiredTab, setDesiredTab] = useState(initialTab)
   const [showMore, setShowMore] = useState(false)

   // ref 정의
   const swiperRef = useRef(null)
   const initialRender = useRef(true)
   const animatingRef = useRef(false)

   // 페이지 진입 시 상단 스크롤 이동
   useEffect(() => {
      window.scrollTo(0, 0)
   }, [location.pathname])

   // URL 파라미터가 변경되면 상태 업데이트
   useEffect(() => {
      if (tab && tabOrder.includes(tab)) {
         setCurrentTab(tab)
         setDesiredTab(tab)
      }
   }, [tab])

   // 텍스트 탭 클릭 시 desiredTab 업데이트
   const handleTabChange = (newValue) => {
      if (newValue !== desiredTab) {
         setDesiredTab(newValue)
         setShowMore(false)
      }
   }

   // < > 버튼용: 한 슬라이드씩 이동하도록 desiredTab을 업데이트
   const handlePrevClick = () => {
      const currentIndex = tabOrder.indexOf(currentTab)
      // 이전 탭: 원형 배열이므로 currentIndex-1 (음수이면 마지막으로)
      const prevIndex = (currentIndex - 1 + L) % L
      setDesiredTab(tabOrder[prevIndex])
   }
   const handleNextClick = () => {
      const currentIndex = tabOrder.indexOf(currentTab)
      const nextIndex = (currentIndex + 1) % L
      setDesiredTab(tabOrder[nextIndex])
   }

   // desiredTab과 currentTab이 다르면 한 슬라이드씩 이동(최소 이동)하도록 effect 처리
   useEffect(() => {
      const swiper = swiperRef.current?.swiper
      if (swiper && desiredTab !== currentTab && !animatingRef.current) {
         const currentIndex = tabOrder.indexOf(currentTab)
         const targetIndex = tabOrder.indexOf(desiredTab)
         let diff = targetIndex - currentIndex
         // 원형 배열로 최소 차이 계산 (예: 3 -> 0: diff = -3 -> +1)
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
         // 만약 diff === 0라면 이미 일치하므로 아무것도 하지 않음
      }
   }, [desiredTab, currentTab, L])

   // 슬라이드 전환 완료 시 호출: currentTab 업데이트
   // (loop 모드에서 swiper.realIndex는 실제 원본 인덱스를 제공합니다)
   const handleTransitionEnd = (swiper) => {
      const newIndex = swiper.realIndex % L
      // 중앙 세트에서 newIndex가 목표 인덱스와 다르다면 currentTab를 업데이트
      setCurrentTab(tabOrder[newIndex])
      animatingRef.current = false
   }

   // 사용자가 스와이프 등으로 이동한 경우에도 desiredTab와 currentTab 동기화
   const handleSlideChange = (swiper) => {
      if (!animatingRef.current) {
         const newIndex = swiper.realIndex % L
         setCurrentTab(tabOrder[newIndex])
         setDesiredTab(tabOrder[newIndex])
      }
   }

   // 탭 글씨 스타일 관련: 현재 탭과 인접 탭이면 스타일 다르게 표시
   const isAdjacentTab = (tabName) => {
      const currentIndex = tabOrder.indexOf(currentTab)
      const tabIndex = tabOrder.indexOf(tabName)
      const diff = Math.abs(currentIndex - tabIndex)
      return diff === 1 || diff === L - 1
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
               {/* 커스텀 화살표 버튼을 직접 구현 */}
               <div className="swiper-button-prev" onClick={handlePrevClick} style={{ cursor: 'pointer' }}></div>
               <Swiper
                  ref={swiperRef}
                  modules={[Navigation]}
                  slidesPerView={3}
                  centeredSlides
                  // 초기 슬라이드는 중앙 세트의 해당 인덱스로 설정 (예: 'wedding'이면 index = tabOrder.index + L)
                  initialSlide={tabOrder.indexOf(currentTab) + L}
                  speed={300}
                  loop
                  observer
                  observeParents
                  watchSlidesProgress
                  allowTouchMove={false}
                  // 기본 내비게이션은 사용하지 않고 커스텀 버튼을 사용합니다.
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
