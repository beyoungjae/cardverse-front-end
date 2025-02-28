import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { styled } from '@mui/material/styles'
import { Box, Typography, Container, Grid, Card, CardMedia, CardContent, IconButton, Tabs, Tab, Chip, Button } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTemplates } from '../../features/templateSlice'

import 'swiper/css'
import 'swiper/css/navigation'

// 배너 영역
const BannerContainer = styled(Box)(({ theme }) => ({
   width: '100%',
   height: '450px',
   position: 'relative',
   overflow: 'hidden',
   backgroundColor: '#0a0a0a',
   boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
   [theme.breakpoints.down('md')]: {
      height: '350px',
   },
   [theme.breakpoints.down('sm')]: {
      height: '220px',
   },
}))

const BannerImage = styled(motion.img)(({ theme }) => ({
   width: '100%',
   height: '100%',
   objectFit: 'cover',
   filter: 'brightness(0.85)',
}))

const BannerOverlay = styled(Box)(({ theme }) => ({
   position: 'absolute',
   top: 0,
   left: 0,
   width: '100%',
   height: '100%',
   background: 'linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.5) 100%)',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   flexDirection: 'column',
}))

const BannerTitle = styled(motion.div)(({ theme }) => ({
   color: '#fff',
   fontSize: '3.8rem',
   fontWeight: theme.typography.fontWeightRegular,
   letterSpacing: '0.4em',
   textAlign: 'center',
   textShadow: '3px 3px 8px rgba(0,0,0,0.5)',
   [theme.breakpoints.down('md')]: {
      fontSize: '3rem',
   },
   [theme.breakpoints.down('sm')]: {
      fontSize: '2.2rem',
   },
}))

// TOTAL 텍스트 (상단 카운트 영역)
const TotalText = styled(motion.div)(({ theme }) => ({
   fontSize: '1.1rem',
   color: theme.palette.text.secondary,
   letterSpacing: '0.35rem',
   lineHeight: '1.6',
   marginBottom: '4rem',
   textAlign: 'center',
   fontWeight: 500,
   position: 'relative',
   paddingBottom: '20px',
   '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '0',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '60px',
      height: '2px',
      background: 'linear-gradient(to right, rgba(0,0,0,0.1), rgba(0,0,0,0.3), rgba(0,0,0,0.1))',
      borderRadius: '2px',
   },
}))

// 탭 영역
const TabContainer = styled(Box)(({ theme }) => ({
   position: 'relative',
   marginBottom: '5rem',
   '&::before': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '15%',
      right: '15%',
      height: '1px',
      backgroundColor: 'rgba(0,0,0,0.08)',
      borderRadius: '1px',
   },
   '.swiper': {
      padding: '2.5rem 0',
      maxWidth: '900px',
      margin: '0 auto',
      [theme.breakpoints.down('sm')]: {
         maxWidth: '100%',
         padding: '1.5rem 0',
      },
   },
}))

// 탭 버튼 스타일
const StyledTab = styled(motion.div)(({ theme, $selected, $isAdjacent }) => ({
   position: 'relative',
   padding: '1.2rem 2.5rem',
   cursor: 'pointer',
   fontSize: $selected ? '1.2rem' : $isAdjacent ? '1.1rem' : '1rem',
   fontWeight: $selected ? '600' : '400',
   color: $selected ? theme.palette.primary.main : $isAdjacent ? '#555' : '#888',
   transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
   textAlign: 'center',
   whiteSpace: 'nowrap',
   opacity: $selected ? 1 : $isAdjacent ? 0.9 : 0.75,
   transform: $selected ? 'scale(1.05)' : $isAdjacent ? 'scale(0.95)' : 'scale(0.9)',
   '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-8px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: $selected ? '70%' : '0%',
      height: '3px',
      borderRadius: '3px',
      background: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
      transition: 'width 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
      boxShadow: $selected ? '0 2px 6px rgba(0,0,0,0.1)' : 'none',
   },
   '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.03)',
      transform: 'scale(1.05)',
   },
   [theme.breakpoints.down('sm')]: {
      padding: '1rem 1.8rem',
      fontSize: $selected ? '1rem' : $isAdjacent ? '0.9rem' : '0.85rem',
   },
}))

// 리스트 영역
const ListSection = styled(motion.div)(({ theme }) => ({
   backgroundColor: '#ffffff',
   padding: theme.spacing(5),
   borderRadius: '20px',
   boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
   marginTop: theme.spacing(5),
   overflow: 'hidden',
   [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3),
      borderRadius: '16px',
   },
}))

// 템플릿 카드 및 이미지 영역
const TemplateGrid = styled(Box)(({ theme }) => ({
   display: 'grid',
   gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
   gap: theme.spacing(4),
   marginBottom: theme.spacing(5),
   [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
      gap: theme.spacing(3),
   },
}))

const TemplateCard = styled(motion.div)(({ theme }) => ({
   position: 'relative',
   borderRadius: theme.spacing(2.5),
   overflow: 'hidden',
   cursor: 'pointer',
   boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
   transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
   '&:hover': {
      transform: 'translateY(-12px)',
      boxShadow: '0 14px 28px rgba(0,0,0,0.15)',
   },
}))

const TemplateTitle = styled(Typography)(({ theme }) => ({
   position: 'absolute',
   bottom: theme.spacing(2.5),
   left: theme.spacing(2.5),
   textAlign: 'center',
   fontSize: '1.25rem',
   fontWeight: 600,
   color: theme.palette.primary.main,
   backgroundColor: 'rgba(255, 255, 255, 0.92)',
   padding: theme.spacing(1.2, 2.2),
   borderRadius: theme.spacing(1.5),
   boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
   backdropFilter: 'blur(4px)',
   transition: 'all 0.3s ease',
   '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.97)',
   },
}))

const ImageWrapper = styled(Box)({
   position: 'relative',
   paddingTop: '133.33%', // 3:4 비율
   overflow: 'hidden',
})

const TemplateImage = styled(motion.img)({
   position: 'absolute',
   top: 0,
   left: 0,
   width: '100%',
   height: '100%',
   objectFit: 'cover',
   transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
})

const PriceInfo = styled(Typography)(({ theme }) => ({
   position: 'absolute',
   top: theme.spacing(2.5),
   right: theme.spacing(2.5),
   padding: theme.spacing(1, 2),
   backgroundColor: 'rgba(255, 255, 255, 0.92)',
   borderRadius: theme.spacing(1.5),
   fontWeight: 600,
   boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
   backdropFilter: 'blur(4px)',
}))

// More 버튼
const MoreButton = styled(Button)(({ theme }) => ({
   display: 'block',
   margin: '3rem auto 1rem',
   padding: theme.spacing(1.2, 5),
   borderRadius: '30px',
   fontSize: '1rem',
   fontWeight: 500,
   letterSpacing: '0.1em',
   boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
   transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
   '& .arrow': {
      transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
      display: 'inline-block',
      marginLeft: '8px',
   },
   '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
   },
   '&:hover .arrow': {
      transform: 'translateY(-3px)',
   },
}))

const CreateTemplateButton = styled(Button)(({ theme }) => ({
   minWidth: 220,
   padding: theme.spacing(1.3, 4),
   borderRadius: '30px',
   fontSize: '1.05rem',
   fontWeight: 500,
   boxShadow: '0 8px 16px rgba(0,0,0,0.12)',
   transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
   '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 24px rgba(0,0,0,0.18)',
   },
}))

const TemplateList = () => {
   // const location = useLocation()
   const { tab: urlTab } = useParams()
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { data: templates, status, error } = useSelector((state) => state.templates)
   const { isAuthenticated, user } = useSelector((state) => state.auth)
   const isAdmin = user?.role === 'admin'

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

   // useLayoutEffect(() => {
   //    const isMobile = window.innerWidth <= 768
   //    window.scrollTo({ top: 0, left: 0, behavior: isMobile ? 'smooth' : 'auto' })
   // }, [location.pathname])

   useEffect(() => {
      if (urlTab && tabOrder.includes(urlTab)) {
         setCurrentTab(urlTab)
         setDesiredTab(urlTab)
      }
   }, [urlTab])

   useEffect(() => {
      dispatch(fetchTemplates(currentTab))
   }, [dispatch, currentTab])

   // 탭 변경 handler
   const handleTabChange = (event, newValue) => {
      setCurrentTab(newValue)
      navigate(`/template/${newValue}`, {
         state: { currentTab: newValue },
      })
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

   const currentTemplates = templates?.filter((template) => template.category === currentTab) || []
   const displayedTemplates = showMore ? currentTemplates : currentTemplates.slice(0, 6)

   const handleTemplateClick = (templateId) => {
      navigate(`/template/${currentTab}/detail/${templateId}`, {
         state: { currentTab },
      })
   }

   const handleCreateTemplate = () => {
      navigate(`/template/${currentTab}/edit`, {
         state: { currentTab },
      })
   }

   if (status === 'failed') return <p>에러 발생: {error}</p>

   // 애니메이션 변수
   const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
         },
      },
   }

   const itemVariants = {
      hidden: { y: 30, opacity: 0 },
      visible: {
         y: 0,
         opacity: 1,
         transition: {
            type: 'spring',
            stiffness: 300,
            damping: 24,
         },
      },
   }

   const bannerVariants = {
      hidden: { scale: 1.1, opacity: 0.7 },
      visible: {
         scale: 1,
         opacity: 1,
         transition: {
            duration: 1.2,
            ease: 'easeOut',
         },
      },
   }

   const titleVariants = {
      hidden: { y: -20, opacity: 0 },
      visible: {
         y: 0,
         opacity: 1,
         transition: {
            delay: 0.3,
            duration: 0.8,
            ease: 'easeOut',
         },
      },
   }

   return (
      <>
         <BannerContainer>
            <BannerImage src="/images/home/background4.png" alt="Template Banner" initial="hidden" animate="visible" variants={bannerVariants} />
            <BannerOverlay>
               <BannerTitle initial="hidden" animate="visible" variants={titleVariants}>
                  TEMPLATE VOWEL
               </BannerTitle>
            </BannerOverlay>
         </BannerContainer>

         <Container maxWidth="lg" sx={{ py: 10 }}>
            <TotalText initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
               T O T A L
            </TotalText>

            <TabContainer>
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
                              <StyledTab
                                 $selected={currentTab === tabName}
                                 $isAdjacent={isAdjacentTab(tabName)}
                                 onClick={(event) => handleTabChange(event, tabName)}
                                 whileHover={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.03)',
                                    scale: currentTab === tabName ? 1.05 : 1.05,
                                 }}
                                 whileTap={{ scale: 0.98 }}
                              >
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
            </TabContainer>

            <ListSection initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
               <AnimatePresence mode="wait">
                  <motion.div key={currentTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                     <TemplateGrid as={motion.div} variants={containerVariants} initial="hidden" animate="visible">
                        {displayedTemplates.map((template, index) => (
                           <TemplateCard
                              key={template.id}
                              onClick={() => handleTemplateClick(template.id)}
                              variants={itemVariants}
                              whileHover={{
                                 y: -12,
                                 boxShadow: '0 14px 28px rgba(0,0,0,0.15)',
                                 transition: { duration: 0.3 },
                              }}
                              whileTap={{ scale: 0.98 }}
                           >
                              <ImageWrapper>
                                 <TemplateImage src={template.thumbnail || '/images/default-template.png'} alt={template.title} whileHover={{ scale: 1.05 }} transition={{ duration: 0.8 }} />
                              </ImageWrapper>
                              <PriceInfo>₩ {Number(template.price).toLocaleString()}</PriceInfo>
                              <TemplateTitle>{template.title}</TemplateTitle>
                           </TemplateCard>
                        ))}
                     </TemplateGrid>
                  </motion.div>
               </AnimatePresence>

               <MoreButton onClick={() => setShowMore(!showMore)} component={motion.button} whileHover={{ y: -3, boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }} whileTap={{ scale: 0.98 }}>
                  <Typography>
                     {showMore ? 'Less' : 'More'}
                     <motion.span
                        className="arrow"
                        initial={{ y: 0 }}
                        animate={{ y: showMore ? 3 : 0 }}
                        transition={{
                           repeat: Infinity,
                           repeatType: 'reverse',
                           duration: 0.6,
                        }}
                     >
                        {showMore ? ' ↑' : ' ↓'}
                     </motion.span>
                  </Typography>
               </MoreButton>
            </ListSection>

            {isAdmin && (
               <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                  <CreateTemplateButton
                     variant="contained"
                     onClick={handleCreateTemplate}
                     component={motion.button}
                     whileHover={{
                        y: -4,
                        boxShadow: '0 12px 24px rgba(0,0,0,0.18)',
                     }}
                     whileTap={{ scale: 0.98 }}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.8, duration: 0.5 }}
                  >
                     새 템플릿 만들기
                  </CreateTemplateButton>
               </Box>
            )}
         </Container>
      </>
   )
}

export default TemplateList
