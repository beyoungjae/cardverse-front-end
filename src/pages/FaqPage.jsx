import React, { useState } from 'react'
import { Box, Typography, FormControl, OutlinedInput, InputAdornment, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'

import { styled } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'
import Board from '../components/customer/Board'

// 자주묻는질문 컨테이너
const FaqContainer = styled(Box)(({ theme }) => ({
   width: '100%',
   backgroundColor: theme.palette.background.default,
   minHeight: '100vh',
}))

// 배너 이미지
const Bannerimg = styled(Box)(() => ({
   width: '100%',
   height: '212px',
   backgroundImage: "url('/images/home/login-background.png')",
   backgroundSize: 'cover',
   backgroundPosition: 'center',
   backgroundRepeat: 'no-repeat',
}))

// 배너 타이틀
const BannerTitle = styled(Typography)(({ theme }) => ({
   ...theme.typography.h1,
   textAlign: 'center',
   lineHeight: '185px',
   color: theme.palette.text.primary,
   [theme.bps.md]: {
      fontSize: '2rem',
   },
   [theme.bps.sm]: {
      fontSize: '1.5rem',
   },
}))

// 검색창
const SearchBox = styled(FormControl)(({ theme }) => ({
   width: '581px',
   backgroundColor: theme.palette.background.default,
   margin: '-20px auto',
   display: 'flex',
   borderRadius: '5px',
   [theme.bps.md]: {
      width: '80%',
   },
   [theme.bps.sm]: {
      width: '60%',
   },
}))

// 자주묻는질문 컨테이너
const CustomerContentContainer = styled(Box)(({ theme }) => ({
   padding: '80px 50px',
   backgroundColor: theme.palette.background.default,
   minHeight: '100vh',
   maxWidth: '1100px',
   margin: '0 auto',
   [theme.bps.md]: {
      padding: '80px 90px',
   },
   [theme.bps.sm]: {
      padding: '60px 60px',
   },
   [theme.breakpoints.down(420)]: {
      padding: '60px 24px',
   },
}))

//탭 타이틀
const CustomTab = styled(Tab)(({ theme }) => ({
   minWidth: '0 !important',
   fontSize: '1.5rem',
   fontWeight: 'bold',
   color: '#A4A4A4',
   padding: '8px 16px',
   '&.Mui-selected': {
      color: '#000',
   },
   [theme.bps.md]: {
      fontSize: '1.3rem',
   },
   [theme.bps.sm]: {
      fontSize: '1.2rem',
   },
}))

//바텀 컬러
const BottomImg = styled('div')(({ theme }) => ({
   width: '100%',
   height: '100px',
   backgroundColor: '#CDE4FD',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
}))

//바텀 타이틀
const BottomContext = styled(Typography)(({ theme }) => ({
   ...theme.typography.body2,
   fontWeight: 'bold',
   fontSize: '20px',
   color: '#21457C',
   textAlign: 'center',
   [theme.bps.md]: {
      fontSize: '1.5rem',
   },
   [theme.bps.sm]: {
      fontSize: '1rem',
   },
}))

// 더미 데이터
const dummyFaq = [
   {
      id: 1,
      title: '자주묻는질문입니다.',
      content: [
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
      ],
   },
   {
      id: 2,
      title: '자주묻는질문입니다.',
      content: [
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
      ],
   },
   {
      id: 3,
      title: '자주묻는질문입니다.',
      content: [
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
      ],
   },
   {
      id: 4,
      title: '자주묻는질문입니다.',
      content: [
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
      ],
   },
   {
      id: 5,
      title: '자주묻는질문입니다.',
      content: [
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
      ],
   },
   {
      id: 6,
      title: '자주묻는질문입니다.',
      content: [
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
      ],
   },
   {
      id: 7,
      title: '자주묻는질문입니다.',
      content: [
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
      ],
   },
   {
      id: 8,
      title: '자주묻는질문입니다.',
      content: [
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
      ],
   },
   {
      id: 9,
      title: '자주묻는질문입니다.',
      content: [
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
      ],
   },
   {
      id: 10,
      title: '자주묻는질문입니다.',
      content: [
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
         '자주묻는질문입니다.',
      ],
   },
]

const FaqPage = () => {
   const [value, setValue] = useState('best')

   const handleChange = (event, newValue) => {
      setValue(newValue)
   }

   return (
      <FaqContainer>
         {/* 배너, 검색창 */}
         <Bannerimg>
            <BannerTitle>FAQ</BannerTitle>
         </Bannerimg>
         <SearchBox>
            <OutlinedInput
               placeholder="검색어를 입력하세요"
               endAdornment={
                  <InputAdornment position="end">
                     <SearchIcon />
                  </InputAdornment>
               }
            />
         </SearchBox>

         <CustomerContentContainer>
            {/* 자주묻는질문 탭 */}
            <Box sx={{ width: '100%', typography: 'body1', marginTop: '100px' }}>
               <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: '#585858' }}>
                     <TabList onChange={handleChange} aria-label="FAQ tabs">
                        <CustomTab label="BEST" value="best" />
                        <CustomTab label="모바일" value="mobile" />
                        <CustomTab label="이벤트" value="event" />
                        <CustomTab label="쿠폰" value="coupon" />
                     </TabList>
                  </Box>
                  <TabPanel value="best" sx={{ padding: 0 }}>
                     <Board result={dummyFaq} />
                  </TabPanel>
                  <TabPanel value="mobile" sx={{ padding: 0 }}>
                     <Board result={dummyFaq} />
                  </TabPanel>
                  <TabPanel value="event" sx={{ padding: 0 }}>
                     <Board result={dummyFaq} />
                  </TabPanel>
                  <TabPanel value="coupon" sx={{ padding: 0 }}>
                     <Board result={dummyFaq} />
                  </TabPanel>
               </TabContext>
            </Box>
         </CustomerContentContainer>
         {/* 하단 */}
         <BottomImg>
            <BottomContext>
               <img src="/images/bulb.png" style={{ width: '22px', height: '22px' }} alt="bulb icon" />
               궁금해 하시던 질문에 답을 찾아드립니다
            </BottomContext>
         </BottomImg>
      </FaqContainer>
   )
}

export default FaqPage
