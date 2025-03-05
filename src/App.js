import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuthStatusThunk, logoutUserThunk } from './features/authSlice'

// style 세팅
import CssBaseline from '@mui/material/CssBaseline'
import { styled as muiStyled } from '@mui/material/styles'
import { createGlobalStyle } from 'styled-components'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

// 컴포넌트 import
import Navbar from './components/shared/Navbar'
import { Home, TemplatePage, LoginPage, SignupPage, ReviewPage, CustomerPage, AdminPage, CreatePostPage, AboutPage, QnaPage, FaqPage, EventPage, TemplatePreviewPage, MyPage, QnaPostPage } from './pages'
import Footer from './components/shared/Footer'
import { Login } from './components/auth'
import ReviewEditor from './components/review/ReviewEditor'
import LoginRoute from './components/redirect/LoginRoute'
// 라우트 세팅
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import AuthChecker from './components/auth/AuthChecker'

// 네비바 아래 컨텐츠를 위한 컨테이너
const MainContent = muiStyled('div')(({ theme, $hideLayout }) => ({
   paddingTop: $hideLayout ? 0 : '126px',
   [theme.breakpoints.down('lg')]: {
      paddingTop: $hideLayout ? 0 : '125px',
   },
   [theme.breakpoints.down('sm')]: {
      paddingTop: $hideLayout ? 0 : '55px',
   },
}))

// 전역 스타일 스크롤바
const GlobalStyle = createGlobalStyle`
  body {
    line-height: 1.5;
    overflow-x: auto;
    overflow-y: scroll;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    caret-color: transparent; /* 입력 커서(깜빡이는 막대) 숨김 */
    -webkit-tap-highlight-color: transparent;
  }

  input, textarea, [contenteditable="true"] {
    caret-color: auto; /* input과 textarea 같은 입력 필드에서만 기본 커서 보이게 */
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, #B699BB, #ADC0FF);
    border-radius: 5px;
    transition: all 0.3s ease;

    &:hover {
      background: linear-gradient(45deg, #957B99, #7187CE);
    }
  }
`

function App() {
   const location = useLocation()
   const dispatch = useDispatch()
   const { isAuthenticated, user, authData, loading } = useSelector((state) => state.auth)
   console.log('user정보 확인', user)
   console.log('authData 확인', authData)
   console.log('')

   useEffect(() => {
      dispatch(checkAuthStatusThunk(authData))
   }, [dispatch])

   useEffect(() => {
      if (location.pathname !== '/login' && location.pathname !== '/signup') {
         sessionStorage.setItem('lastVisited', location.pathname)
      }
   }, [location.pathname])

   const hideLayout = location.pathname.startsWith('/login') || location.pathname.startsWith('/signup') || location.pathname.startsWith('/admin') || location.pathname.startsWith('/template/preview/') || location.pathname.startsWith('/preview/')

   return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
         <GlobalStyle />
         <CssBaseline />
         <AuthChecker authData={authData} isAuthenticated={isAuthenticated} />

         {!loading && !hideLayout && <Navbar isAuthenticated={isAuthenticated} user={user} />}

         <MainContent $hideLayout={hideLayout}>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/about" element={<AboutPage />} />
               <Route
                  path="/signup"
                  element={
                     <LoginRoute>
                        <SignupPage />
                     </LoginRoute>
                  }
               />
               <Route path="/support" element={<CustomerPage />} />
               {/* <Route path="/qna" element={<QnaPage />} /> */}
               {/* <Route path="/qna" element={<QnaPage />} /> */}
               <Route path="/post/new" element={<QnaPostPage />} />
               <Route path="/faq" element={<FaqPage />} />
               <Route path="/event" element={<EventPage />} />
               <Route path="/template">
                  {/* /template 접근 시 기본 탭으로 리다이렉트 */}
                  <Route index element={<Navigate to="/template/wedding" replace />} />
                  <Route path=":tab/*" element={<TemplatePage key={window.location.pathname} />} />
               </Route>

               {/* 독립적인 미리보기 페이지 라우트 */}
               <Route path="/preview/:userTemplateId" element={<TemplatePreviewPage />} />

               {/* /templates/preview/ 경로에 대한 리다이렉트 */}
               <Route
                  path="/templates/preview/:userTemplateId"
                  element={
                     <Navigate
                        replace
                        to={(location) => {
                           const userTemplateId = decodeURIComponent(location.pathname.split('/').pop())
                           return `/preview/${userTemplateId}`
                        }}
                     />
                  }
               />

               {/* 기존 /template/preview/ 경로에 대한 리다이렉트 */}
               <Route
                  path="/template/preview/:userTemplateId"
                  element={
                     <Navigate
                        replace
                        to={(location) => {
                           const userTemplateId = decodeURIComponent(location.pathname.split('/').pop())
                           return `/preview/${userTemplateId}`
                        }}
                     />
                  }
               />

               <Route
                  path="/login"
                  element={
                     <LoginRoute>
                        <LoginPage />
                     </LoginRoute>
                  }>
                  <Route index element={<Login />} />
                  <Route path="*" element={<Navigate to="/login" replace />} />
               </Route>
               {/* 리뷰 페이지 */}
               <Route path="/review" element={<ReviewPage />} />
               <Route path="/review/write" element={<ReviewEditor />} />

               <Route path="/post/new" element={<CreatePostPage />} />
               {/* 관리자 페이지 */}
               <Route path="/admin" element={<Navigate to="/admin/analytics" replace />} />
               <Route path="/admin/:id/*" element={<AdminPage />} />
               {/* 마이페이지 */}
               <Route path="/my" element={<MyPage />} />
            </Routes>
         </MainContent>

         {!hideLayout && <Footer />}
      </LocalizationProvider>
   )
}

export default App
