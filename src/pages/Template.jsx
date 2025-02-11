import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { Box, Typography, Container, Tab, Tabs } from '@mui/material'
import { motion } from 'framer-motion'

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

// 탭 컨테이너
const TabContainer = styled(Box)(({ theme }) => ({
   borderBottom: `1px solid ${theme.palette.divider}`,
   marginBottom: '4rem',
}))

// 커스텀 탭
const StyledTab = styled(Tab)(({ theme }) => ({
   fontSize: '1rem',
   fontWeight: 400,
   letterSpacing: '0.2em',
   padding: '1.5rem 3rem',
   '&.Mui-selected': {
      fontWeight: 500,
   },
}))

// 템플릿 그리드
const TemplateGrid = styled(Box)(({ theme }) => ({
   display: 'grid',
   gridTemplateColumns: 'repeat(3, 1fr)',
   gap: '2rem',
   padding: '0 1rem',
   [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
   },
   [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
   },
}))

// 템플릿 카드
const TemplateCard = styled(motion.div)(({ theme }) => ({
   position: 'relative',
   cursor: 'pointer',
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

// 템플릿 데이터
const templates = {
   invitation: [
      { id: 1, image: '/images/templates/card1.svg', price: '23,000' },
      { id: 2, image: '/images/templates/card2.svg', price: '15,000' },
      { id: 3, image: '/images/templates/card3.png', price: '5,000' },
      { id: 4, image: '/images/templates/card4.png', price: '10,000' },
      { id: 5, image: '/images/templates/card5.png', price: '30,000' },
      { id: 6, image: '/images/templates/card6.png', price: '45,000' },
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
      { id: 13, image: '/images/templates/card13.png', price: '15,000' },
      { id: 14, image: '/images/templates/card14.png', price: '18,000' },
      { id: 15, image: '/images/templates/card15.png', price: '22,000' },
   ],
}

const Template = () => {
   const [currentTab, setCurrentTab] = useState('invitation')

   const handleTabChange = (event, newValue) => {
      setCurrentTab(newValue)
   }

   return (
      <>
         <BannerContainer>
            <BannerImage src="/images/home/banner.png" alt="Template Banner" />
            <BannerOverlay>
               <BannerTitle>TEMPLATE VOWEL</BannerTitle>
            </BannerOverlay>
         </BannerContainer>

         <Container maxWidth="lg" sx={{ py: 8 }}>
            <TabContainer>
               <Tabs
                  value={currentTab}
                  onChange={handleTabChange}
                  centered
                  TabIndicatorProps={{
                     style: {
                        display: 'none',
                     },
                  }}
               >
                  <StyledTab label="청첩장" value="wedding" />
                  <StyledTab label="연하장" value="newyear" />
                  <StyledTab label="고희연" value="gohyeon" />
                  <StyledTab label="초빙장" value="invitation" />
               </Tabs>
            </TabContainer>

            <TemplateGrid>
               {templates[currentTab].map((template, index) => (
                  <TemplateCard key={template.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                     <TemplateImage src={template.image} alt={`Template ${template.id}`} />
                     <PriceInfo>Price | {template.price}</PriceInfo>
                  </TemplateCard>
               ))}
            </TemplateGrid>
         </Container>
      </>
   )
}

export default Template
