import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { styled as muiStyled } from '@mui/material/styles'
import { Box } from '@mui/material'
import { createGlobalStyle } from 'styled-components'
import Navbar from './components/shared/Navbar'
import { Home, MyPage } from './pages'
import Footer from './components/shared/Footer'
import { Route, Routes } from 'react-router-dom'

// 네비바 아래 컨텐츠를 위한 컨테이너
const MainContent = muiStyled(Box)(({ theme }) => ({
   paddingTop: '126px',
   [theme.breakpoints.down('lg')]: {
      paddingTop: '125px',
   },
   [theme.breakpoints.down('sm')]: {
      paddingTop: '55px',
   },
}))

// 전역 스타일
const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }

  body {
    line-height: 1.5;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    width: 8px;
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
   return (
      <>
         <GlobalStyle />
         <CssBaseline />
         <Navbar />
         <MainContent>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/mypage" element={<MyPage />} />
            </Routes>
         </MainContent>
         <Footer />
      </>
   )
}

export default App
