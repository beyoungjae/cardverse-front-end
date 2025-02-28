import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { Box, Typography, Container, Button } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTemplates } from '../../features/templateSlice'

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
   padding: '2.5rem 0',
   maxWidth: '900px',
   margin: '0 auto',
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
   [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      padding: '1.5rem 0',
   },
}))

// 탭 메뉴 컨테이너
const TabsWrapper = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   gap: theme.spacing(1),
   position: 'relative',
   [theme.breakpoints.down('sm')]: {
      gap: theme.spacing(0.5),
   },
}))

// 탭 버튼 스타일 - 커스텀 속성 제거 및 클래스 기반 스타일링으로 변경
const TabButton = styled(motion.button)(({ theme }) => ({
   position: 'relative',
   padding: '1.2rem 2.5rem',
   cursor: 'pointer',
   background: 'transparent',
   border: 'none',
   outline: 'none',
   textAlign: 'center',
   whiteSpace: 'nowrap',
   transition: 'all 0.3s ease',
   '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-8px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '0%',
      height: '3px',
      borderRadius: '3px',
      background: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
      transition: 'width 0.4s cubic-bezier(0.25, 0.8, 0.5, 1), opacity 0.4s ease',
      opacity: 0,
   },
   '&.selected': {
      color: theme.palette.primary.main,
      fontSize: '1.2rem',
      fontWeight: 600,
      opacity: 1,
      transform: 'scale(1.05)',
      '&::after': {
         width: '70%',
         opacity: 1,
         boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      },
   },
   '&.adjacent': {
      color: '#555',
      fontSize: '1.1rem',
      opacity: 0.9,
      transform: 'scale(0.95)',
   },
   '&:not(.selected):not(.adjacent)': {
      color: '#888',
      fontSize: '1rem',
      opacity: 0.75,
      transform: 'scale(0.9)',
   },
   [theme.breakpoints.down('sm')]: {
      padding: '1rem 1.8rem',
      '&.selected': { fontSize: '1rem' },
      '&.adjacent': { fontSize: '0.9rem' },
      '&:not(.selected):not(.adjacent)': { fontSize: '0.85rem' },
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
   display: 'block',
   textAlign: 'left',
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
   const { tab: urlTab } = useParams()
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { data: templates, status, error } = useSelector((state) => state.templates)
   const { isAuthenticated, user } = useSelector((state) => state.auth)
   const isAdmin = user?.role === 'admin'

   // 탭 순서 배열
   const tabOrder = ['wedding', 'invitation', 'newyear', 'gohyeon']
   const initialTab = urlTab && tabOrder.includes(urlTab) ? urlTab : 'wedding'

   // 상태
   const [currentTab, setCurrentTab] = useState(initialTab)
   const [showMore, setShowMore] = useState(false)
   const [direction, setDirection] = useState(null)
   const [isTransitioning, setIsTransitioning] = useState(false)
   const [hoveredTab, setHoveredTab] = useState(null)

   useEffect(() => {
      if (urlTab && tabOrder.includes(urlTab)) {
         setCurrentTab(urlTab)
      }
   }, [urlTab, tabOrder])

   useEffect(() => {
      dispatch(fetchTemplates(currentTab))
   }, [dispatch, currentTab])

   // 탭 변경 handler
   const handleTabChange = (newValue) => {
      if (currentTab === newValue || isTransitioning) return

      // 방향 계산
      const currentIndex = tabOrder.indexOf(currentTab)
      const newIndex = tabOrder.indexOf(newValue)

      // 일반적인 방향 계산
      let newDirection
      if (Math.abs(newIndex - currentIndex) > tabOrder.length / 2) {
         // 순환 케이스 (첫 탭 <-> 마지막 탭)
         newDirection = newIndex < currentIndex ? 'right' : 'left'
      } else {
         newDirection = newIndex > currentIndex ? 'right' : 'left'
      }

      setDirection(newDirection)
      setIsTransitioning(true)

      // 약간의 지연 후 탭 변경 및 URL 업데이트
      setTimeout(() => {
         setCurrentTab(newValue)
         navigate(`/template/${newValue}`, {
            state: { currentTab: newValue },
         })

         // 트랜지션 상태 초기화
         setTimeout(() => {
            setIsTransitioning(false)
         }, 500)
      }, 50)
   }

   // 현재 탭의 인접성 판단 (디자인 조절용)
   const isAdjacentTab = (tabName) => {
      const currentIndex = tabOrder.indexOf(currentTab)
      const tabIndex = tabOrder.indexOf(tabName)
      const diff = Math.abs(currentIndex - tabIndex)
      return diff === 1 || diff === tabOrder.length - 1
   }

   const currentTemplates = templates?.filter((template) => template.category === currentTab) || []
   const displayedTemplates = showMore ? currentTemplates : currentTemplates.slice(0, 6)

   // 템플릿 클릭 핸들러
   const handleTemplateClick = (templateId) => {
      navigate(`/template/${currentTab}/detail/${templateId}`, {
         state: { currentTab },
      })
   }

   // 템플릿 생성 핸들러
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

   // 탭 콘텐츠 전환 애니메이션
   const contentVariants = {
      enter: (direction) => ({
         x: direction === 'right' ? 30 : -30,
         opacity: 0,
      }),
      center: {
         x: 0,
         opacity: 1,
         transition: {
            x: { type: 'spring', stiffness: 300, damping: 25 },
            opacity: { duration: 0.4 },
         },
      },
      exit: (direction) => ({
         x: direction === 'right' ? -30 : 30,
         opacity: 0,
         transition: {
            x: { type: 'spring', stiffness: 300, damping: 25 },
            opacity: { duration: 0.4 },
         },
      }),
   }

   // 탭 이름 변환 함수
   const getTabName = (tabValue) => {
      switch (tabValue) {
         case 'wedding':
            return '청첩장'
         case 'newyear':
            return '연하장'
         case 'gohyeon':
            return '고희연'
         case 'invitation':
            return '초빙장'
         default:
            return tabValue
      }
   }

   // 탭 클래스 결정 함수
   const getTabClass = (tabName) => {
      if (currentTab === tabName) return 'selected'
      if (isAdjacentTab(tabName)) return 'adjacent'
      return ''
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
               <TabsWrapper>
                  {tabOrder.map((tabName) => (
                     <TabButton
                        key={tabName}
                        className={getTabClass(tabName)}
                        onClick={() => handleTabChange(tabName)}
                        disabled={isTransitioning}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                           opacity: currentTab === tabName ? 1 : isAdjacentTab(tabName) ? 0.9 : 0.75,
                           scale: currentTab === tabName ? 1.05 : isAdjacentTab(tabName) ? 0.95 : 0.9,
                           y: 0,
                        }}
                        transition={{ duration: 0.4, ease: [0.25, 0.8, 0.5, 1] }}
                        whileHover={{
                           backgroundColor: hoveredTab === tabName ? 'rgba(0, 0, 0, 0.03)' : 'transparent',
                           scale: 1.05,
                        }}
                        whileTap={{ scale: 0.98 }}
                        onHoverStart={() => setHoveredTab(tabName)}
                        onHoverEnd={() => setHoveredTab(null)}
                     >
                        {getTabName(tabName)}
                     </TabButton>
                  ))}
               </TabsWrapper>
            </TabContainer>

            <ListSection initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
               <AnimatePresence mode="wait" custom={direction}>
                  <motion.div key={currentTab} custom={direction} variants={contentVariants} initial="enter" animate="center" exit="exit">
                     <TemplateGrid as={motion.div} variants={containerVariants} initial="hidden" animate="visible">
                        {displayedTemplates.map((template, index) => (
                           <TemplateCard
                              key={template.id}
                              onClick={() => handleTemplateClick(template.id)}
                              whileHover={{
                                 y: -12,
                                 boxShadow: '0 14px 28px rgba(0,0,0,0.15)',
                                 transition: { duration: 0.3 },
                              }}
                              whileTap={{ scale: 0.98 }}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                           >
                              <ImageWrapper>
                                 <TemplateImage src={template.thumbnail || '/images/default-template.png'} alt={template.title} whileHover={{ scale: 1.05 }} />
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
