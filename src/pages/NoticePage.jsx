import React, { useState, useCallback } from 'react'
import { Button, Typography, Box } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { styled } from '@mui/system'

const NavButton = styled(Button)(({ theme, isActive }) => ({
   marginLeft: theme.spacing(2),
   textTransform: 'none',
   backgroundColor: 'white',
   color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
   boxShadow: 'none',
   '&:hover': {
      backgroundColor: 'white',
      color: theme.palette.primary.main,
      boxShadow: 'none',
   },
}))

const NoticeItem = ({ notice, expandedNotice, handleToggle }) => {
   return (
      <Box display="flex" flexDirection="column" mt={10} mb={3} p={2} borderBottom={(theme) => `2px solid ${theme.palette.divider}`} transition="all 0.3s ease">
         <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight="bold" sx={{ cursor: 'pointer' }} onClick={() => handleToggle(notice.id)}>
               {notice.title}
            </Typography>
            <Box display="flex" justifyContent="flex-end" alignItems="center">
               <Typography variant="body2">{notice.date}</Typography>
            </Box>
         </Box>

         {expandedNotice === notice.id && (
            <Box sx={{ marginTop: 2 }}>
               <Typography variant="body2">{notice.content}</Typography>
            </Box>
         )}
      </Box>
   )
}

const Container = styled(Box)(({ theme }) => ({
   backgroundColor: theme.palette.background.default,
   padding: theme.spacing(3),
   textAlign: 'left',
   [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
   },
}))

const NoticePage = () => {
   const [notices] = useState([
      {
         id: 1,
         title: '공지사항',
         date: '2025-02-17',
         content:
            '첫 번째 공지사항 내용입니다. 첫 번째 공지사항 내용입니다. 첫 번째 공지사항 내용입니다. 첫 번째 공지사항 내용입니다.첫 번째 공지사항 내용입니다.첫 번째 공지사항 내용입니다.첫 번째 공지사항 내용입니다.첫 번째 공지사항 내용입니다.첫 번째 공지사항 내용입니다.첫 번째 공지사항 내용입니다.첫 번째 공지사항 내용입니다.첫 번째 공지사항 내용입니다.첫 번째 공지사항 내용입니다.첫 번째 공지사항 내용입니다.첫 번째 공지사항 내용입니다.첫 번째 공지사항 내용입니다.첫 번째 공지사항 내용입니다.',
      },
      {
         id: 2,
         title: '공지사항',
         date: '2025-02-18',
         content:
            '두 번째 공지사항 내용입니다. 두 번째 공지사항 내용입니다. 두 번째 공지사항 내용입니다. 두 번째 공지사항 내용입니다.두 번째 공지사항 내용입니다.두 번째 공지사항 내용입니다.두 번째 공지사항 내용입니다.두 번째 공지사항 내용입니다.두 번째 공지사항 내용입니다.두 번째 공지사항 내용입니다.두 번째 공지사항 내용입니다.두 번째 공지사항 내용입니다.두 번째 공지사항 내용입니다.두 번째 공지사항 내용입니다.두 번째 공지사항 내용입니다.두 번째 공지사항 내용입니다.두 번째 공지사항 내용입니다.',
      },
   ])

   const location = useLocation()

   const isNoticePage = location.pathname === '/support'
   const isQAPage = location.pathname === '/'
   const isFAQPage = location.pathname === '/faq'

   const [expandedNotice, setExpandedNotice] = useState(null)

   const handleToggle = useCallback((id) => {
      setExpandedNotice((prev) => (prev === id ? null : id))
   }, [])

   return (
      <div>
         <Box
            className="header"
            sx={{
               textAlign: 'right',
               marginBottom: 2,
               pt: 10,
               pr: 6,
            }}
         >
            <NavButton component={Link} to="/support" variant="contained" isActive={isNoticePage}>
               NOTICE
            </NavButton>
            <NavButton component={Link} to="/" variant="contained" isActive={isQAPage}>
               Q&A
            </NavButton>
            <NavButton component={Link} to="/faq" variant="contained" isActive={isFAQPage}>
               FAQ
            </NavButton>
         </Box>

         <Typography variant="h1" align="center" sx={{ paddingTop: 8 }}>
            NOTICE
         </Typography>

         <Container>{notices.length === 0 ? <p>등록된 공지사항이 없습니다.</p> : notices.map((notice) => <NoticeItem key={notice.id} notice={notice} expandedNotice={expandedNotice} handleToggle={handleToggle} />)}</Container>
      </div>
   )
}

export default NoticePage
