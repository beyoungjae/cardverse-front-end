import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

// import { Container } from '../layouts/boxCommon'
import Layout from '../layouts/Layout'
import { Title } from '../layouts/textCommon'
import { CATEGORIES, ITEMS_PER_PAGE } from '../constants/template'
import { CreateBtn, DeleteBtn, EditBtn } from '../../button'

import { Box, Typography, Select, MenuItem, FormControl, Pagination } from '@mui/material'
import { styled } from '@mui/system'

import EditIcon from '@mui/icons-material/Edit'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'

const CardContainer = styled(Box)(({ theme }) => ({
   display: 'grid',
   gridTemplateColumns: 'repeat(2, 1fr)', // 2열
   gridTemplateRows: 'repeat(3, 1fr)', // 3행
   gap: '16px',
   padding: '10px',
   border: '1px solid #cccccc',
   borderRadius: '8px',
   backgroundColor: '#f8f8f4',
}))

const CardItem = styled(Box)(({ theme }) => ({
   padding: '2px',
   display: 'flex',
   gap: '8px',
   backgroundColor: '#f5f5f5',

   border: '1px solid #a0a0a0',
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
   gap: '8px',
}))

const TitleContainer = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   paddingBottom: '4px',
   borderBottom: '1px solid #f0f0f0',
   alignItems: 'center',
   '&.sub': {
      alignItems: 'stretch',
      gap: '4px',
   },
   '&.main': {
      paddingBottom: '10px',
      width: '100%',
   },
}))

const CardTitle = styled(Typography)(({ theme }) => ({
   fontSize: '1.4rem',
   width: 'fit-content',
   flex: '5',
   height: '100%',
   display: 'flex',
   alignItems: 'center',
}))

const TextBox = styled(Box)(({ theme }) => ({
   display: 'grid',
   gridTemplateRows: 'repeat(5, 1fr)', // 3행
   gap: '8px',
}))

const StyledLink = styled(Link)(({ theme }) => ({
   color: 'black',
   display: 'flex',
   alignItems: 'center',
   textDecoration: 'none',
   gap: '8px',
   padding: '10px 15px 10px 10px',
   borderRadius: '4px',
   border: '1px solid #e5e5e5',

   '&:hover': {
      backgroundColor: '#eeeeee',
   },
}))

// width: 'fit-content'

const TemplateActive = () => {
   const [selectedCategory, setSelectedCategory] = useState('all') // 초기값을 'all'로 설정
   const [currentPage, setCurrentPage] = useState(1)
   const { id } = useParams()
   const navigate = useNavigate()

   const cards = [
      { id: 1, title: '무슨카드1', category: 'wedding', content: '내용1', price: 13000, createdAt: '2025-01-13', status: 'published', thumbnail: '이미지2' },
      { id: 2, title: '무슨카드2', category: 'wedding', content: '내용2', price: 13000, createdAt: '2025-01-13', status: 'published', thumbnail: '이미지3' },
      { id: 3, title: '무슨카드3', category: 'wedding', content: '내용3', price: 13000, createdAt: '2025-01-13', status: 'published', thumbnail: '이미지4' },
      { id: 4, title: '무슨카드4', category: 'wedding', content: '내용4', price: 13000, createdAt: '2025-01-13', status: 'published', thumbnail: '이미지1' },
      { id: 5, title: '무슨카드5', category: 'wedding', content: '내용5', price: 13000, createdAt: '2025-01-13', status: 'published', thumbnail: '이미지5' },
      { id: 6, title: '무슨카드6', category: 'wedding', content: '내용6', price: 13000, createdAt: '2025-01-13', status: 'published', thumbnail: '이미지6' },
      { id: 7, title: '무슨카드7', category: 'wedding', content: '내용7', price: 13000, createdAt: '2025-01-13', status: 'published', thumbnail: '이미지7' },
   ]

   const getCategoryLabel = (value) => {
      const category = CATEGORIES.find((cat) => cat.value === value)
      return category ? category.label : value
   }

   const handleCategoryChange = (event) => {
      setSelectedCategory(event.target.value)
      setCurrentPage(1)
   }

   const handlePageChange = (event, value) => {
      setCurrentPage(value)
      // 페이지 상단으로 스크롤
      window.scrollTo({
         top: 0,
         behavior: 'smooth',
      })
   }

   const handleEdit = (postId) => {
      navigate(`/admin/${id}/edit/${postId}`)
   }

   const filteredCards = selectedCategory === 'all' ? cards : cards.filter((card) => card.category === selectedCategory)

   const pageCount = Math.ceil(filteredCards.length / ITEMS_PER_PAGE)

   const currentCards = filteredCards.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

   return (
      <Layout>
         <TitleContainer className="main">
            <Box sx={{ display: 'flex', alignItems: 'center', height: 'stretch' }}>
               <Title sx={{ padding: '0' }}>판매중 템플릿</Title>
               <Box
                  sx={{
                     padding: '10px 30px',
                     display: 'flex',
                     alignItems: 'center',
                     gap: '10px',
                  }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                     구분:
                  </Typography>
                  <FormControl sx={{ minWidth: 180 }}>
                     <Select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        sx={{
                           textAlign: 'center',
                           width: '80%',
                           backgroundColor: '#fff',
                           '& .MuiSelect-select': {
                              padding: '8px 14px',
                           },
                           '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#666',
                           },
                        }}>
                        {CATEGORIES.map((category) => (
                           <MenuItem key={category.value} value={category.value} disabled={category.value === '전체보기'}>
                              {category.label}
                           </MenuItem>
                        ))}
                     </Select>
                  </FormControl>
               </Box>
            </Box>
            <CreateBtn type="template" />
            {/* <StyledLink to="/admin/template/new">
               <EditIcon sx={{ fontSize: '1.5rem', color: 'black' }} />
               <Typography sx={{ fontSize: '1rem' }}>새 템플릿 등록</Typography>
            </StyledLink> */}
         </TitleContainer>

         <CardContainer>
            {currentCards.length === 0 && (
               <CardItem>
                  <CardImgWrap>
                     <img src={'/images/default.jpg'} alt="card-img" style={{ width: '100%' }} />
                  </CardImgWrap>
                  <CardInfoWrap>
                     <TitleContainer className="sub">
                        <CardTitle variant="h3">등록된 상품이 없습니다.</CardTitle>
                        <EditBtn />
                        {/* <StyledButton>
                           <DriveFileRenameOutlineIcon sx={{ fontSize: '1.3rem' }} />
                        </StyledButton> */}
                        {/* <StyledButton>
                           <RemoveShoppingCartIcon sx={{ fontSize: '1.2rem' }} />
                        </StyledButton> */}
                        {/* <DeleteBtn /> */}
                     </TitleContainer>
                     <TextBox>
                        <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                           구분:
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                           가격:
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                           등록일:
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                           총 판매량:
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                           평균 리뷰:
                        </Typography>
                     </TextBox>
                  </CardInfoWrap>
               </CardItem>
            )}

            {currentCards.map((card) => {
               const formattedPrice = `${card.price.toLocaleString()}원`
               return (
                  <CardItem key={card.id}>
                     <CardImgWrap>
                        <img src={card.thumbnail.startsWith('http') ? card.thumbnail : '/images/default.jpg'} alt="카드 이미지" style={{ width: '100%' }} />
                     </CardImgWrap>
                     <CardInfoWrap>
                        <TitleContainer className="sub">
                           <CardTitle variant="h3">{card.title}</CardTitle>
                           <EditBtn type="template" id={card.id} />
                           {/* <StyledButton onClick={() => handleEdit(card.id)}>
                              <DriveFileRenameOutlineIcon sx={{ fontSize: '1.3rem' }} />
                           </StyledButton> */}
                           <DeleteBtn type="template" />

                           {/* <StyledButton>
                              <RemoveShoppingCartIcon sx={{ fontSize: '1.2rem' }} />
                           </StyledButton> */}
                        </TitleContainer>
                        <TextBox>
                           <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                              구분: {getCategoryLabel(card.category)}
                           </Typography>
                           <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                              가격: {formattedPrice}
                           </Typography>
                           <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                              등록일: {card.createdAt}
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

         {filteredCards.length > 0 && (
            <Box
               sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '10px 0',
               }}>
               <Pagination
                  count={pageCount}
                  page={currentPage}
                  onChange={handlePageChange}
                  variant="outlined"
                  shape="rounded"
                  sx={{
                     '& .MuiPaginationItem-root': {
                        color: '#666',
                        '&.Mui-selected': {
                           backgroundColor: '#666',
                           color: '#fff',
                           '&:hover': {
                              backgroundColor: '#555',
                           },
                        },
                     },
                  }}
               />
            </Box>
         )}
      </Layout>
   )
}

export default TemplateActive
