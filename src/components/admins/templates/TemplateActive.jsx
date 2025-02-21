import React, { useState } from 'react'

import { Box, Typography } from '@mui/material'
import { display, styled } from '@mui/system'
import { Container } from '../layouts/boxCommon'
import { Title } from '../layouts/textCommon'
import { StyledButton } from '../layouts/btnCommon'

import EditIcon from '@mui/icons-material/Edit'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import { Link, useNavigate } from 'react-router-dom'

const CardContainer = styled(Box)(({ theme }) => ({
   display: 'grid',
   gridTemplateColumns: 'repeat(2, 1fr)', // 2열
   gridTemplateRows: 'repeat(4, 1fr)', // 3행
   gap: '24px',
   height: '84%',
   padding: '20px 60px 40px 60px',
   //    width: '1280px',
   //    margin: '0 auto',
}))

const CardItem = styled(Box)(({ theme }) => ({
   padding: '10px',
   display: 'flex',
   gap: '16px',
   backgroundColor: '#f5f5f5',

   border: '1px solid #bbbbbb',
   borderRadius: '6px',
}))

const CardImgWrap = styled(Box)(({ theme }) => ({
   boxShadow: '0 0 1px 1px #d5d5d5',
   backgroundColor: '#ffffff',
   borderRadius: '4px',
   padding: '10px',
   flex: 1,
}))

const CardInfoWrap = styled(Box)(({ theme }) => ({
   flex: 3.5,
   boxShadow: '0 0 1px 1px #d5d5d5',
   borderRadius: '4px',
   padding: '12px',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-between',
   backgroundColor: '#ffffff',
   gap: '16px',
}))

const TextBox = styled(Box)(({ theme }) => ({
   display: 'grid',
   gridTemplateRows: 'repeat(5, 1fr)', // 3행
   gap: '10px',
}))

const CardTitle = styled(Typography)(({ theme }) => ({
   fontSize: '1.4rem',
   width: 'fit-content',
   flex: '7',
   height: '100%',
   display: 'flex',
   alignItems: 'center',
}))

const TitleBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   gap: '12px',
   alignItems: 'center',
   '&.sub-title': {
      alignItems: 'stretch',
      gap: '4px',
   },
}))

const StyledLink = styled(Link)(({ theme }) => ({
   color: 'black',
   display: 'flex',
   alignItems: 'center',
   textDecoration: 'none',
   gap: '8px', // 아이콘과 텍스트 사이 간격
   padding: '10px 15px 10px 10px',
   borderRadius: '4px',
   border: '1px solid #e5e5e5',
   //    height: '10px',

   '&:hover': {
      backgroundColor: '#eeeeee',
   },
}))

// width: 'fit-content'

const TemplateActive = () => {
   const [view, setView] = useState(6)

   const cards = [
      { id: 1, title: '무슨카드1', category: 'wedding', content: '내용1', price: 13000, createdAt: '2025-01-13', status: 'published', thumbnail: '이미지2' },
      { id: 2, title: '무슨카드2', category: 'wedding', content: '내용2', price: 13000, createdAt: '2025-01-13', status: 'published', thumbnail: '이미지3' },
      { id: 3, title: '무슨카드3', category: 'wedding', content: '내용3', price: 13000, createdAt: '2025-01-13', status: 'published', thumbnail: '이미지4' },
      { id: 4, title: '무슨카드4', category: 'wedding', content: '내용4', price: 13000, createdAt: '2025-01-13', status: 'published', thumbnail: '이미지1' },
      { id: 5, title: '무슨카드5', category: 'wedding', content: '내용5', price: 13000, createdAt: '2025-01-13', status: 'published', thumbnail: '이미지5' },
      { id: 6, title: '무슨카드6', category: 'wedding', content: '내용6', price: 13000, createdAt: '2025-01-13', status: 'published', thumbnail: '이미지6' },
      //   { id: 7, title: '무슨카드7', category: 'wedding', content: '내용7', price: 13000, createdAt: '2025-01-13', status: 'published', thumbnail: '이미지7' },
   ]

   const infoItems = [{ label: '구분' }, { label: '가격' }, { label: '등록일' }, { label: '총 판매량' }, { label: '평균 리뷰' }]

   return (
      <Container>
         <TitleBox className="main-title" sx={{ padding: '0 60px', width: '100%' }}>
            <Title>판매중 템플릿</Title>
            <StyledLink to="/admin/template/new">
               <EditIcon sx={{ fontSize: '1.5rem', color: 'black' }} />
               <Typography sx={{ fontSize: '1rem' }}>새 템플릿 등록</Typography>
            </StyledLink>
         </TitleBox>

         <CardContainer>
            {cards.map((card) => {
               const formattedPrice = `${card.price.toLocaleString()}원` // 13000 → "13,000원"
               return (
                  <CardItem key={card.id}>
                     <CardImgWrap>
                        <img src={card.thumbnail.startsWith('http') ? card.thumbnail : '/images/default.jpg'} alt="카드 이미지" style={{ width: '100%' }} />
                     </CardImgWrap>
                     <CardInfoWrap>
                        <TitleBox className="sub-title">
                           <CardTitle variant="h3">{card.title}</CardTitle>
                           <StyledButton>
                              <DriveFileRenameOutlineIcon sx={{ fontSize: '1.3rem' }} />
                           </StyledButton>
                           <StyledButton>
                              <RemoveShoppingCartIcon sx={{ fontSize: '1.2rem' }} />
                           </StyledButton>
                        </TitleBox>

                        <TextBox>
                           <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                              구분: 연회장
                           </Typography>
                           <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                              가격: {formattedPrice}
                           </Typography>
                           <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                              등록일: yyyy-mm-dd
                           </Typography>
                           <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                              총 판매량: n개
                           </Typography>
                           <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                              평균 리뷰: ☆☆☆
                           </Typography>
                        </TextBox>
                     </CardInfoWrap>
                  </CardItem>
               )
            })}
         </CardContainer>
      </Container>
   )
}

export default TemplateActive
