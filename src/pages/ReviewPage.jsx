import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { Box, Typography, Rating, Avatar, Pagination } from '@mui/material'
import { motion } from 'framer-motion'

// 리뷰 페이지 컨테이너
const ReviewContainer = styled(Box)(({ theme }) => ({
   padding: '120px 40px',
   backgroundColor: theme.palette.background.default,
   minHeight: '100vh',
   [theme.bps.md]: {
      padding: '80px 24px',
   },
   [theme.bps.sm]: {
      padding: '60px 16px',
   },
}))

// 리뷰 헤더 섹션
const HeaderSection = styled(Box)(({ theme }) => ({
   textAlign: 'center',
   marginBottom: '80px',
   position: 'relative',
   [theme.bps.sm]: {
      marginBottom: '40px',
   },
}))

// 리뷰 그리드
const ReviewGrid = styled(Box)(({ theme }) => ({
   display: 'grid',
   gridTemplateColumns: 'repeat(3, 1fr)',
   gap: '32px',
   maxWidth: '1200px',
   margin: '0 auto',
   [theme.bps.md]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '24px',
   },
   [theme.bps.sm]: {
      gridTemplateColumns: '1fr',
      gap: '16px',
   },
}))

// 리뷰 카드
const ReviewCard = styled(motion.div)(({ theme }) => ({
   backgroundColor: theme.palette.background.paper,
   borderRadius: theme.shape.borderRadius,
   padding: '24px',
   boxShadow: theme.shadows[1],
   transition: 'transform 0.3s ease',
   '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: theme.shadows[3],
   },
}))

// 리뷰 헤더
const ReviewHeader = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   marginBottom: '16px',
   gap: '12px',
}))

// 리뷰 컨텐츠
const ReviewContent = styled(Typography)(({ theme }) => ({
   color: theme.palette.text.primary,
   marginBottom: '16px',
   fontSize: '0.95rem',
   lineHeight: 1.6,
}))

// 페이지네이션 컨테이너
const PaginationContainer = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   marginTop: '60px',
   [theme.bps.sm]: {
      marginTop: '40px',
   },
}))

// 리뷰 작성 버튼
const WriteReviewButton = styled(Box)(({ theme }) => ({
   position: 'absolute',
   right: 500,
   top: '50%',
   transform: 'translateY(-50%)',
   padding: '12px 24px',
   backgroundColor: theme.palette.primary.main,
   color: '#fff',
   borderRadius: '8px',
   cursor: 'pointer',
   fontWeight: 600,
   transition: 'all 0.3s ease',
   boxShadow: theme.shadows[2],
   '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      transform: 'translateY(-50%) scale(1.05)',
   },
   '@media (min-width: 1281px) and (max-width: 1919px)': {
      right: 10,
   },
   [theme.bps.lg]: {
      right: 0,
   },
   [theme.bps.md]: {
      right: 0,
      padding: '10px 20px',
      fontSize: '0.9rem',
   },
   [theme.bps.sm]: {
      padding: '8px 16px',
      fontSize: '0.8rem',
      right: 0,
   },
}))

// 더미 리뷰 데이터
const dummyReviews = [
   {
      id: 1,
      name: 'Kim Seoyeon',
      rating: 5,
      date: '2024.03.15',
      content: '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
      template: '모던 청첩장',
   },
   {
      id: 2,
      name: '강냉이사냥꾼',
      rating: 4,
      date: '2024.04.20',
      content: '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
      template: '모던 청첩장',
   },
   {
      id: 3,
      name: '곧결혼해요',
      rating: 5,
      date: '2024.05.10',
      content: '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
      template: '모던 청첩장',
   },
   {
      id: 4,
      name: '곽두팔',
      rating: 4,
      date: '2024.06.15',
      content: '디자인이 너무 예쁘고 깔끔합니다.',
      template: '모던 초빙장',
   },
   {
      id: 5,
      name: '강냉이사냥꾼',
      rating: 5,
      date: '2024.07.20',
      content: '두 번째 이용중이에요!',
      template: '클래식 연하장',
   },
   {
      id: 6,
      name: '깜냥이',
      rating: 4,
      date: '2024.08.25',
      content: '부모님 칠순잔치에 써주었어요! 디자인이 너무 예쁘고 깔끔해요!',
      template: '모던 고희연',
   },
   {
      id: 7,
      name: '박세빈',
      rating: 5,
      date: '2024.09.30',
      content: '행복한 해피뉴이얼을 보낸 것 같습니다. 정말 만족스럽고 무료로 사용할 수 있어서 좋았어요!',
      template: '모던 연하장',
   },
   {
      id: 8,
      name: 'Undefined',
      rating: 4,
      date: '2024.10.15',
      content: '좋은 경험, 좋은 청첩장 카드! 추천합니다.',
      template: '모던 청첩장',
   },
   {
      id: 9,
      name: '원시기형',
      rating: 5,
      date: '2024.11.20',
      content: '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
      template: '모던 청첩장',
   },
]

const ReviewPage = () => {
   const [page, setPage] = useState(1)
   const reviewsPerPage = 9

   const handlePageChange = (event, value) => {
      setPage(value)
      window.scrollTo({ top: 0, behavior: 'smooth' })
   }

   return (
      <ReviewContainer>
         <HeaderSection>
            <Typography
               variant="h1"
               sx={{
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  marginBottom: '16px',
                  fontWeight: 600,
               }}
            >
               고객 리뷰
            </Typography>
            <Typography
               variant="body1"
               sx={{
                  color: 'text.secondary',
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)',
               }}
            >
               Cardverse를 이용해주신 고객님들의 소중한 후기입니다
            </Typography>
            <WriteReviewButton>리뷰 작성하기</WriteReviewButton>
         </HeaderSection>

         <ReviewGrid>
            {dummyReviews.slice((page - 1) * reviewsPerPage, page * reviewsPerPage).map((review) => (
               <ReviewCard key={review.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  <ReviewHeader>
                     <Avatar sx={{ width: 40, height: 40 }}>{review.name.charAt(0)}</Avatar>
                     <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                           {review.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                           {review.date}
                        </Typography>
                     </Box>
                  </ReviewHeader>
                  <Rating value={review.rating} readOnly size="small" />
                  <ReviewContent>{review.content}</ReviewContent>
                  <Typography variant="caption" color="primary">
                     {review.template}
                  </Typography>
               </ReviewCard>
            ))}
         </ReviewGrid>

         <PaginationContainer>
            <Pagination count={Math.ceil(dummyReviews.length / reviewsPerPage)} page={page} onChange={handlePageChange} color="primary" />
         </PaginationContainer>
      </ReviewContainer>
   )
}

export default ReviewPage
