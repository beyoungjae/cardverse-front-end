import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuthStatusThunk, logoutUserThunk } from './features/authSlice'
import { checkOAuthStatusThunk } from './features/oauthSlice'

// style 세팅
import CssBaseline from '@mui/material/CssBaseline'
import { styled as muiStyled } from '@mui/material/styles'
import { createGlobalStyle } from 'styled-components'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

// 컴포넌트 import
import Navbar from './components/shared/Navbar'
import { Home, TemplatePage, LoginPage, SignupPage, ReviewPage, CustomerPage, AdminPage, CreatePostPage, AboutPage, QnaPage, FaqPage, EventPage, TemplatePreviewPage, MyPage } from './pages'
import Footer from './components/shared/Footer'
import { Login } from './components/auth'
import ReviewEditor from './components/review/ReviewEditor'

// 라우트 세팅
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'

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
   const { isAuthenticated, user } = useSelector((state) => state.auth)
   const { token, kakaoUser } = useSelector((state) => state.oauth)
   const [isAuth, setIsAuth] = useState(false)
   const [activeUser, setActiveUser] = useState(null)

   const loginType = localStorage.getItem('loginType')

   const authRef = useRef(false)

   useEffect(() => {
      let authenticated = false
      let currentUser = null

      // loginType 값을 trim 처리하여 공백 제거
      const cleanLoginType = loginType?.trim() || 'local'

      if (cleanLoginType === 'local') {
         authenticated = !!isAuthenticated
         currentUser = authenticated ? user : null
      } else if (cleanLoginType === 'oauth') {
         authenticated = !!token.accessToken
         currentUser = authenticated ? kakaoUser : null
      }

      authRef.current = authenticated
      setIsAuth(authenticated)
      setActiveUser(currentUser)
   }, [isAuthenticated, token.accessToken, user, kakaoUser, loginType])

   useEffect(() => {
      // 공백 제거 및 기본값 설정
      const cleanLoginType = localStorage?.getItem('loginType')?.trim() || 'local'
      
      // 로그인 타입에 따라 상태 확인 요청 전송
      if (cleanLoginType === 'local') {
         dispatch(checkAuthStatusThunk())
            .unwrap()
            .then(response => {
               // 성공적으로 상태 확인이 완료되면 플래그 제거
               sessionStorage.removeItem('statusCheckFlag')
            })
            .catch((error) => {
               // 403 에러(이미 로그인됨)가 발생한 경우, 세션 쿠키를 정리
               if (error && error.status === 403) {
                  // 백엔드에 로그아웃 요청 전송
                  dispatch(logoutUserThunk())
                     .then(() => {
                        // 로컬 스토리지 및 세션 스토리지 정리
                        localStorage.removeItem('loginType')
                        sessionStorage.removeItem('statusCheckFlag')
                        // 페이지 새로고침
                        window.location.reload()
                     })
               } else {
                  // 네트워크 오류 등의 일시적 문제는 플래그를 설정하지 않음
                  // 이렇게 하면 다음 새로고침에서 다시 시도할 수 있음
                  if (error.status === 401) {
                     // 인증 실패 시에만 플래그 설정
                     sessionStorage.setItem('statusCheckFlag', 'failed')
                  }
               }
            })
      } else if (cleanLoginType === 'oauth') {
         // 리프레시 토큰이 있는지 확인
         const hasRefreshToken = document.cookie.includes('refreshToken')
         
         if (hasRefreshToken) {
            dispatch(checkOAuthStatusThunk())
               .unwrap()
               .then(response => {
                  // 성공적으로 상태 확인이 완료되면 플래그 제거
                  sessionStorage.removeItem('statusCheckFlag')
               })
               .catch((error) => {
                  // 403 에러(이미 로그인됨)가 발생한 경우, 세션 쿠키를 정리
                  if (error && error.status === 403) {
                     // 백엔드에 로그아웃 요청 전송
                     dispatch(logoutUserThunk())
                        .then(() => {
                           // 로컬 스토리지 및 세션 스토리지 정리
                           localStorage.removeItem('loginType')
                           sessionStorage.removeItem('statusCheckFlag')
                           // 페이지 새로고침
                           window.location.reload()
                        })
                  } else {
                     // 네트워크 오류 등의 일시적 문제는 플래그를 설정하지 않음
                     if (error.status === 401) {
                        // 인증 실패 시에만 플래그 설정
                        sessionStorage.setItem('statusCheckFlag', 'failed')
                        // 리프레시 토큰이 유효하지 않으면 로그인 타입을 local로 변경
                        localStorage.setItem('loginType', 'local')
                     }
                  }
               })
         } else {
            // 리프레시 토큰이 없으면 로그인 타입을 local로 변경
            localStorage.setItem('loginType', 'local')
            sessionStorage.setItem('statusCheckFlag', 'failed')
         }
      }
   }, [dispatch])

   const hideLayout = location.pathname.startsWith('/login') || location.pathname.startsWith('/signup') || location.pathname.startsWith('/admin') || location.pathname.startsWith('/template/preview/') || location.pathname.startsWith('/preview/')

   return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
         <GlobalStyle />
         <CssBaseline />

         {!hideLayout && <Navbar isAuthenticated={isAuth} user={activeUser} />}

         <MainContent $hideLayout={hideLayout}>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/about" element={<AboutPage />} />
               <Route path="/signup" element={<SignupPage />} />
               <Route path="/support" element={<CustomerPage />} />
               <Route path="/qna" element={<QnaPage />} />
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
                           const userTemplateId = location.pathname.split('/').pop()
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
                           const userTemplateId = location.pathname.split('/').pop()
                           return `/preview/${userTemplateId}`
                        }}
                     />
                  }
               />

               <Route path="/login" element={<LoginPage />}>
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
