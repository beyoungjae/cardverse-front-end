import React, { useState, useEffect } from 'react'
import { Box, Typography, Pagination } from '@mui/material'
import { styled } from '@mui/material/styles'
import { motion } from 'framer-motion'
import { fontSize } from '@mui/system'

// 이벤트 페이지 컨테이너
const EventContainer = styled(Box)(({ theme }) => ({
   width: '100%',
   backgroundColor: theme.palette.background.default,
   minHeight: '100vh',
   padding: '50px 0',
}))

// 카드 그리드
const CardGrid = styled(Box)(({ theme }) => ({
   display: 'grid',
   padding: '0 50px',
   gridTemplateColumns: 'repeat(3, 1fr)',
   gap: '32px',
   maxWidth: '1200px',
   margin: '0 auto',
   [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '24px',
   },
   [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      gap: '16px',
   },
}))

// 이벤트 카드
const EventCard = styled(motion.div)(({ theme }) => ({
   backgroundColor: theme.palette.background.paper,
   borderRadius: theme.shape.borderRadius,
   padding: '24px',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'flex-end',
   height: '100%',
   overflow: 'hidden',
   [theme.breakpoints.down('400')]: {
      fontSize: '1rem',
   },
}))

// 카드 안의 이미지
const CardImage = styled('img')(({ theme }) => ({
   width: '100%',
   height: 'auto',
   objectFit: 'cover',
   borderRadius: theme.shape.borderRadius,
   maxHeight: '200px',
   marginBottom: '16px',
}))

// 페이지네이션
const PaginationContainer = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   marginTop: '60px',
   [theme.breakpoints.down('sm')]: {
      marginTop: '40px',
   },
}))

// 더미 데이터
const dummyCards = [
   { id: 1, title: '2월 깜짝 무료배송 왔어요', content: '단 5일간! 전 상품 무료배송으로 만나요.', date: '2025.02.27 ~ 2025.03.04', imageUrl: '/images/mypage/personal info.png' },
   { id: 2, title: '2월 깜짝 무료배송 왔어요', content: '단 5일간! 전 상품 무료배송으로 만나요.', date: '2025.02.27 ~ 2025.03.04', imageUrl: '/images/mypage/personal info.png' },
   { id: 3, title: '2월 깜짝 무료배송 왔어요', content: '단 5일간! 전 상품 무료배송으로 만나요.', date: '2025.02.27 ~ 2025.03.04', imageUrl: '/images/mypage/personal info.png' },
   { id: 4, title: '2월 깜짝 무료배송 왔어요', content: '단 5일간! 전 상품 무료배송으로 만나요.', date: '2025.02.27 ~ 2025.03.04', imageUrl: '/images/mypage/personal info.png' },
   { id: 5, title: '2월 깜짝 무료배송 왔어요', content: '단 5일간! 전 상품 무료배송으로 만나요.', date: '2025.02.27 ~ 2025.03.04', imageUrl: '/images/mypage/personal info.png' },
   { id: 6, title: '2월 깜짝 무료배송 왔어요', content: '단 5일간! 전 상품 무료배송으로 만나요.', date: '2025.02.27 ~ 2025.03.04', imageUrl: '/images/mypage/personal info.png' },
   { id: 7, title: '2월 깜짝 무료배송 왔어요', content: '단 5일간! 전 상품 무료배송으로 만나요.', date: '2025.02.27 ~ 2025.03.04', imageUrl: '/images/mypage/personal info.png' },
   { id: 8, title: '2월 깜짝 무료배송 왔어요', content: '단 5일간! 전 상품 무료배송으로 만나요.', date: '2025.02.27 ~ 2025.03.04', imageUrl: '/images/mypage/personal info.png' },
   { id: 9, title: '2월 깜짝 무료배송 왔어요', content: '단 5일간! 전 상품 무료배송으로 만나요.', date: '2025.02.27 ~ 2025.03.04', imageUrl: '/images/mypage/personal info.png' },
   { id: 10, title: '2월 깜짝 무료배송 왔어요', content: '단 5일간! 전 상품 무료배송으로 만나요.', date: '2025.02.27 ~ 2025.03.04', imageUrl: '/images/mypage/personal info.png' },
   { id: 11, title: '2월 깜짝 무료배송 왔어요', content: '단 5일간! 전 상품 무료배송으로 만나요.', date: '2025.02.27 ~ 2025.03.04', imageUrl: '/images/mypage/personal info.png' },
   { id: 12, title: '2월 깜짝 무료배송 왔어요', content: '단 5일간! 전 상품 무료배송으로 만나요.', date: '2025.02.27 ~ 2025.03.04', imageUrl: '/images/mypage/personal info.png' },
   { id: 13, title: '2월 깜짝 무료배송 왔어요', content: '단 5일간! 전 상품 무료배송으로 만나요.', date: '2025.02.27 ~ 2025.03.04', imageUrl: '/images/mypage/personal info.png' },
   { id: 14, title: '2월 깜짝 무료배송 왔어요', content: '단 5일간! 전 상품 무료배송으로 만나요.', date: '2025.02.27 ~ 2025.03.04', imageUrl: '/images/mypage/personal info.png' },
   { id: 15, title: '2월 깜짝 무료배송 왔어요', content: '단 5일간! 전 상품 무료배송으로 만나요.', date: '2025.02.27 ~ 2025.03.04', imageUrl: '/images/mypage/personal info.png' },
]

const Event = () => {
   const [cards, setCards] = useState([])
   const [page, setPage] = useState(1)
   const cardsPerPage = 9

   const handlePageChange = (event, newPage) => {
      setPage(newPage)
   }

   const getCardsForPage = (page) => {
      const startIndex = (page - 1) * cardsPerPage
      const endIndex = startIndex + cardsPerPage
      return dummyCards.slice(startIndex, endIndex)
   }

   useEffect(() => {
      setCards(getCardsForPage(page))
   }, [page])

   return (
      <EventContainer>
         <CardGrid>
            {cards.map((card) => (
               <EventCard key={card.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  <CardImage src={card.imageUrl} alt={card.title} />
                  <Typography variant="h6" fontWeight={600} sx={{ marginBottom: '8px', fontSize: '1.2rem' }}>
                     {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                     {card.content}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ paddingTop: '10px', fontSize: '0.6rem' }}>
                     {card.date}
                  </Typography>
               </EventCard>
            ))}
         </CardGrid>

         <PaginationContainer>
            <Pagination count={Math.ceil(dummyCards.length / cardsPerPage)} page={page} onChange={handlePageChange} color="primary" />
         </PaginationContainer>
      </EventContainer>
   )
}

export default Event
