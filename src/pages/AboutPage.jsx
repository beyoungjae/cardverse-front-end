import React from 'react'
import { styled } from '@mui/material/styles'
import { Box, Typography, Container } from '@mui/material'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// 히어로 섹션
const HeroSection = styled(Box)(({ theme }) => ({
   height: '100vh',
   width: '100%',
   position: 'relative',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   overflow: 'hidden',
   backgroundColor: theme.palette.background.default,
   userSelect: 'none',
}))

// 히어로 배경 이미지
const HeroBackground = styled('img')(({ theme }) => ({
   position: 'absolute',
   top: 0,
   left: 0,
   width: '100%',
   height: '100%',
   objectFit: 'cover',
   opacity: 0.8,
   filter: 'brightness(0.7)',
   pointerEvents: 'none',
}))

// 히어로 콘텐츠
const HeroContent = styled(Box)(({ theme }) => ({
   position: 'relative',
   zIndex: 1,
   textAlign: 'center',
   padding: '0 20px',
   textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
}))

// 히어로 타이틀
const HeroTitle = styled(Typography)(({ theme }) => ({
   ...theme.typography.h1,
   fontSize: '4.5rem',
   marginBottom: '2rem',
   color: theme.palette.text.primary,
   fontWeight: 600,
   [theme.bps.md]: {
      fontSize: '3.5rem',
   },
   [theme.bps.sm]: {
      fontSize: '2.5rem',
   },
}))

// 섹션 컨테이너
const Section = styled(Box)(({ theme }) => ({
   padding: '120px 0',
   backgroundColor: theme.palette.background.default,
   position: 'relative',
   overflow: 'hidden',
}))

// 미션 섹션
const MissionSection = styled(Section)(({ theme }) => ({
   backgroundColor: theme.palette.background.grey,
}))

// 섹션 타이틀
const SectionTitle = styled(Typography)(({ theme }) => ({
   ...theme.typography.h2,
   textAlign: 'center',
   marginBottom: '3rem',
   color: theme.palette.text.primary,
   [theme.bps.md]: {
      fontSize: '2rem',
   },
   [theme.bps.sm]: {
      fontSize: '1.5rem',
   },
}))

// 미션 그리드
const MissionGrid = styled(Box)(({ theme }) => ({
   display: 'grid',
   gridTemplateColumns: 'repeat(3, 1fr)',
   gap: '2rem',
   maxWidth: '1200px',
   margin: '0 auto',
   padding: '0 20px',
   [theme.bps.md]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
   },
   [theme.bps.sm]: {
      gridTemplateColumns: '1fr',
   },
}))

// 미션 카드
const MissionCard = styled(motion.div)(({ theme }) => ({
   backgroundColor: theme.palette.background.paper,
   padding: '3rem',
   borderRadius: '1.5rem',
   boxShadow: theme.shadows[2],
   textAlign: 'center',
   transition: 'all 0.3s ease',
   '&:hover': {
      transform: 'translateY(-10px)',
      boxShadow: theme.shadows[4],
   },
   position: 'relative',
   overflow: 'hidden',
   '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '4px',
      background: 'linear-gradient(90deg, #B699BB 0%, #ADC0FF 100%)',
   },
}))

// 가치 섹션
const ValuesSection = styled(Section)(({ theme }) => ({
   backgroundColor: theme.palette.background.default,
}))

// 가치 그리드
const ValuesGrid = styled(Box)(({ theme }) => ({
   display: 'grid',
   gridTemplateColumns: 'repeat(2, 1fr)',
   gap: '4rem',
   maxWidth: '1200px',
   margin: '0 auto',
   padding: '0 20px',
   [theme.bps.md]: {
      gridTemplateColumns: '1fr',
      gap: '2rem',
   },
}))

// 가치 아이템
const ValueItem = styled(motion.div)(({ theme }) => ({
   display: 'flex',
   alignItems: 'flex-start',
   gap: '2rem',
   padding: '2rem',
   borderRadius: '1rem',
   backgroundColor: theme.palette.background.paper,
   boxShadow: theme.shadows[1],
   transition: 'all 0.3s ease',
   '&:hover': {
      boxShadow: theme.shadows[3],
      transform: 'scale(1.02)',
   },
}))

// 가치 번호
const ValueNumber = styled(Typography)(({ theme }) => ({
   fontSize: '3.5rem',
   fontWeight: 700,
   background: 'linear-gradient(90deg, #B699BB 0%, #ADC0FF 100%)',
   WebkitBackgroundClip: 'text',
   WebkitTextFillColor: 'transparent',
   marginRight: '1.5rem',
}))

const AboutPage = () => {
   // Intersection Observer 설정 : 스크롤 시 화면에 보이는 요소에 대한 이벤트 처리
   const [missionRef, missionInView] = useInView({
      threshold: 0.3,
      triggerOnce: true,
   })

   const [valuesRef, valuesInView] = useInView({
      threshold: 0.3,
      triggerOnce: true,
   })

   const missions = [
      {
         title: '디지털 혁신',
         description: '디지털 시대에 맞는 혁신적인 초대장 솔루션을 제공합니다.',
      },
      {
         title: '다양한 디자인',
         description: '각 순간의 특별함을 담아내는 맞춤형 디자인을 제공합니다.',
      },
      {
         title: '환경 친화적',
         description: '환경을 생각하는 페이퍼리스 솔루션으로 미래를 생각합니다.',
      },
   ]

   const values = [
      {
         title: '혁신',
         description: '끊임없는 혁신으로 디지털 초대장의 새로운 기준을 만듭니다.',
      },
      {
         title: '품질',
         description: '최고의 품질로 고객의 특별한 순간을 완벽하게 표현합니다.',
      },
      {
         title: '단순함',
         description: '복잡한 과정을 단순화하여 누구나 쉽게 사용할 수 있습니다.',
      },
      {
         title: '신뢰',
         description: '신뢰할 수 있는 서비스로 고객의 소중한 순간을 지원합니다.',
      },
   ]

   return (
      <>
         <HeroSection>
            <HeroBackground src="/images/home/about-hero.png" alt="About Hero" />
            <HeroContent>
               <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                  <HeroTitle>About CardVerse</HeroTitle>
                  <Typography variant="h5" color="white">
                     특별한 순간을 더욱 특별하게
                  </Typography>
               </motion.div>
            </HeroContent>
         </HeroSection>

         <MissionSection ref={missionRef}>
            <Container>
               <SectionTitle>혁신적인 초대장 솔루션</SectionTitle>
               <MissionGrid>
                  {missions.map((mission, index) => (
                     <MissionCard key={mission.title} initial={{ opacity: 0, y: 50 }} animate={missionInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.2 }}>
                        <Typography variant="h5" gutterBottom>
                           {mission.title}
                        </Typography>
                        <Typography color="textSecondary">{mission.description}</Typography>
                     </MissionCard>
                  ))}
               </MissionGrid>
            </Container>
         </MissionSection>

         <ValuesSection ref={valuesRef}>
            <Container>
               <SectionTitle>끊임없는 혁신으로 디지털 초대장의 새로운 기준을 만듭니다.</SectionTitle>
               <ValuesGrid>
                  {values.map((value, index) => (
                     <ValueItem key={value.title} initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} animate={valuesInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.2 }}>
                        <ValueNumber>{String(index + 1).padStart(2, '0')}</ValueNumber>
                        <Box>
                           <Typography variant="h5" gutterBottom>
                              {value.title}
                           </Typography>
                           <Typography color="textSecondary">{value.description}</Typography>
                        </Box>
                     </ValueItem>
                  ))}
               </ValuesGrid>
            </Container>
         </ValuesSection>
      </>
   )
}

export default AboutPage
