import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import Navbar from './components/shared/Navbar'
import Home from './components/Home'
import Footer from './components/shared/Footer'

// 네비바 아래 컨텐츠를 위한 컨테이너
const MainContent = styled(Box)(({ theme }) => ({
   paddingTop: '124px',
   [theme.breakpoints.down('md')]: {
      paddingTop: '55px',
   },
}))

function App() {
   return (
      <>
         <CssBaseline />
         <Navbar />
         <MainContent>
            <Home />
         </MainContent>
         <Footer />
      </>
   )
}

export default App
