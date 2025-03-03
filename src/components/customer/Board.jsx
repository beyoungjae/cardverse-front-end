import React, { useState } from 'react'
import { Box, Typography, Pagination } from '@mui/material'
import { styled } from '@mui/material/styles'

// 보드 컨테이너
const BoardContainer = styled(Box)(({ theme }) => ({
   [theme.breakpoints.down('lg')]: {
      fontSize: '1.3rem',
   },
   [theme.breakpoints.down('md')]: {
      fontSize: '1.2rem',
   },
   [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
   },
}))

// 보드 아이템 컨테이너
const BoardItemContainer = styled(Box)(({ theme }) => ({
   borderBottom: `1px solid ${theme.palette.divider}`,
}))

// 콘텐츠 박스
const ContentBox = styled(Box)(({ theme, show }) => ({
   display: show ? 'block' : 'none',
   padding: '20px',
   backgroundColor: '#FAFAFA',
}))

// 보드 타이틀
const BoardTitle = styled(Box)(({ theme }) => ({
   fontWeight: 'bold',
   cursor: 'pointer',
   paddingTop: '20px',
   paddingLeft: '20px',
   paddingBottom: '30px',
   alignItems: 'center',
   [theme.breakpoints.down('lg')]: {
      fontSize: '1.1rem',
   },
   [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
   },
   [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
   },
}))

// 페이지네이션 스타일
const PaginationContent = styled(Box)(({ theme }) => ({
   display: 'flex',
   paddingTop: '50px',
   justifyContent: 'center',
   alignItems: 'center',
   textAlign: 'center',
   [theme.breakpoints.down('sm')]: {
      paddingTop: '30px',
   },
}))

const Board = ({ result }) => {
   const [openItemId, setOpenItemId] = useState(null)
   const [currentPage, setCurrentPage] = useState(1)
   const itemsPerPage = 5

   const handleTitleClick = (id) => {
      setOpenItemId((prevId) => (prevId === id ? null : id))
   }

   const handlePageChange = (event, value) => {
      setCurrentPage(value)
   }

   const startIndex = (currentPage - 1) * itemsPerPage
   const endIndex = startIndex + itemsPerPage
   const currentItems = result.slice(startIndex, endIndex)

   return (
      <BoardContainer>
         {currentItems.map((item) => (
            <BoardItemContainer key={item.id}>
               <BoardTitle>
                  <Typography variant="h6" onClick={() => handleTitleClick(item.id)} sx={{ fontSize: '15px' }}>
                     {item.title}
                  </Typography>
               </BoardTitle>
               <ContentBox show={openItemId === item.id}>
                  <Typography variant="body2">{item.content} </Typography>
               </ContentBox>
            </BoardItemContainer>
         ))}

         {/* 페이지네이션 */}
         <PaginationContent>
            <Pagination count={Math.ceil(result.length / itemsPerPage)} page={currentPage} onChange={handlePageChange} shape="rounded" color="#EEEEEE" />
         </PaginationContent>
      </BoardContainer>
   )
}

export default Board
