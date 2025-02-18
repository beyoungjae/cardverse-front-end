import React, { useState } from 'react'
import { useNotice } from './NoticeContext'
import { Button } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

const NoticePage = () => {
   const { notices = [] } = useNotice() || {}
   const location = useLocation()

   const isNoticePage = location.pathname === '/notice'
   const isQAPage = location.pathname === '/'
   const isFAQPage = location.pathname === '/faq'

   // 공지사항의 각 항목이 펼쳐지는 상태를 관리
   const [expandedNotice, setExpandedNotice] = useState(null)

   // 공지사항을 클릭했을 때 펼쳐지거나 접히도록 하는 함수
   const handleToggle = (id) => {
      setExpandedNotice(expandedNotice === id ? null : id)
   }

   return (
      <div>
         <div className="header" style={{ textAlign: 'right', marginBottom: '20px', paddingTop: '100px', paddingRight: '50px' }}>
            <Button
               component={Link}
               to="/support"
               variant="contained"
               color="primary"
               sx={{
                  marginLeft: '10px',
                  textTransform: 'none',
                  backgroundColor: 'white',
                  color: isNoticePage ? '#B699BB' : 'black',
                  boxShadow: 'none',
                  '&:hover': {
                     backgroundColor: 'white',
                     color: '#B699BB',
                     boxShadow: 'none',
                  },
               }}
            >
               NOTICE
            </Button>
            <Button
               component={Link}
               to="/"
               variant="contained"
               color="primary"
               sx={{
                  marginLeft: '10px',
                  textTransform: 'none',
                  backgroundColor: 'white',
                  color: isQAPage ? '#B699BB' : 'black',
                  boxShadow: 'none',
                  '&:hover': {
                     backgroundColor: 'white',
                     color: '#B699BB',
                     boxShadow: 'none',
                  },
               }}
            >
               Q&A
            </Button>
            <Button
               component={Link}
               to="/faq"
               variant="contained"
               color="primary"
               sx={{
                  marginLeft: '10px',
                  textTransform: 'none',
                  backgroundColor: 'white',
                  color: isFAQPage ? '#B699BB' : 'black',
                  boxShadow: 'none',
                  '&:hover': {
                     backgroundColor: 'white',
                     color: '#B699BB',
                     boxShadow: 'none',
                  },
               }}
            >
               FAQ
            </Button>
         </div>

         <h1 style={{ textAlign: 'center', paddingTop: '100px' }}>NOTICE</h1>

         <section className="notice-list" style={{ paddingTop: '50px', textAlign: 'center' }}>
            {notices.length === 0 ? (
               <p>등록된 공지사항이 없습니다.</p>
            ) : (
               notices.map((notice) => (
                  <article key={notice.id} className="notice-item">
                     <h2 onClick={() => handleToggle(notice.id)} style={{ cursor: 'pointer' }}>
                        {notice.title}
                     </h2>
                     <p>
                        <strong>작성일:</strong> {notice.date}
                     </p>
                     {expandedNotice === notice.id && <p>{notice.content}</p>}
                  </article>
               ))
            )}
         </section>
      </div>
   )
}

export default NoticePage
