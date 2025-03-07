import { Box, Typography, FormControl, OutlinedInput, InputAdornment, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'

import { styled } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'
import Top4Card from '../components/customer/Top4Card'
import Board from '../components/customer/Board'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostsThunk } from '../features/postSlice'

// 고객센터 페이지 컨테이너
const CustomerContainer = styled(Box)(({ theme }) => ({
   width: '100%',
   backgroundColor: theme.palette.background.default,
   minHeight: '100vh',
}))

// 배너 이미지
const Bannerimg = styled(Box)(() => ({
   width: '100%',
   height: '240px',
   backgroundImage: "url('/images/home/login-background.png')",
   backgroundSize: 'cover',
   backgroundPosition: 'center',
   backgroundRepeat: 'no-repeat',
   position: 'relative',
   display: 'flex',
   flexDirection: 'column',
}))

// 배너 타이틀
const BannerTitle = styled(Typography)(({ theme }) => ({
   ...theme.typography.h1,
   position: 'absolute',
   top: '50%',
   left: '50%',
   textAlign: 'center',
   transform: 'translateX(-50%) translateY(-50%)',
   color: theme.palette.text.primary,
   [theme.bps.md]: {
      fontSize: '2rem',
   },
   [theme.bps.sm]: {
      fontSize: '1.5rem',
   },
}))

// 검색창
const SearchBox = styled(FormControl)(({ theme }) => ({
   position: 'absolute',
   bottom: '-25px',
   left: '50%',
   width: '581px',
   transform: 'translateX(-50%) ',
   backgroundColor: theme.palette.background.default,
   margin: '0 auto',
   display: 'flex',
   borderRadius: '20px',
   [theme.bps.md]: {
      width: '80%',
   },
   [theme.bps.sm]: {
      width: '60%',
   },
}))

// 자주묻는질문 컨테이너
const CustomerContentContainer = styled(Box)(({ theme }) => ({
   padding: '80px 50px',
   backgroundColor: theme.palette.background.default,
   minHeight: '100vh',
   maxWidth: '1100px',
   margin: '0 auto',
   [theme.bps.md]: {
      padding: '80px 90px',
   },
   [theme.bps.sm]: {
      padding: '60px 60px',
   },
   [theme.breakpoints.down(420)]: {
      padding: '60px 24px',
   },
}))

// 그 외의 타이틀
const SecondeTitle = styled(Typography)(({ theme }) => ({
   ...theme.typography.h3,
   fontSize: '1.5rem',
   color: theme.palette.text.primary,
   fontWeight: 'bold',
   textAlign: 'left',
   marginBottom: '15px',
   [theme.bps.md]: {
      fontSize: '1.3rem',
   },
   [theme.bps.sm]: {
      fontSize: '1.2rem',
   },
}))

//탭 타이틀
const CustomTab = styled(Tab)(({ theme }) => ({
   fontSize: '1.5rem',
   fontWeight: 'bold',
   color: '#A4A4A4',
   padding: '8px 16px',
   '&.Mui-selected': {
      color: '#000',
   },
   [theme.bps.md]: {
      fontSize: '1.3rem',
   },
   [theme.bps.sm]: {
      fontSize: '1.2rem',
   },
}))

//바텀 컬러
const BottomImg = styled('div')(({ theme }) => ({
   width: '100%',
   height: '100px',
   backgroundColor: '#CDE4FD',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
}))

//바텀 타이틀
const BottomContext = styled(Typography)(({ theme }) => ({
   ...theme.typography.body2,
   fontWeight: 'bold',
   fontSize: '20px',
   color: '#21457C',
   textAlign: 'center',
   [theme.bps.md]: {
      fontSize: '1.5rem',
   },
   [theme.bps.sm]: {
      fontSize: '1rem',
   },
}))

// 더미 공지 데이터
const dummyNotice = [
   {
      id: 1,
      title: '공지사항입니다.',
      content: [
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
      ],
   },
   {
      id: 2,
      title: '공지사항입니다.',
      content: [
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
      ],
   },
   {
      id: 3,
      title: '공지사항입니다.',
      content: [
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
      ],
   },
   {
      id: 4,
      title: '공지사항입니다.',
      content: [
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
      ],
   },
   {
      id: 5,
      title: '공지사항입니다.',
      content: [
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
      ],
   },
   {
      id: 6,
      title: '공지사항입니다.',
      content: [
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
      ],
   },
   {
      id: 7,
      title: '공지사항입니다.',
      content: [
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
      ],
   },
   {
      id: 8,
      title: '공지사항입니다.',
      content: [
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
      ],
   },
   {
      id: 9,
      title: '공지사항입니다.',
      content: [
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
      ],
   },
   {
      id: 10,
      title: '공지사항입니다.',
      content: [
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
      ],
   },
]

// 더미 QNA 데이터
const dummyQNA = [
   {
      id: 1,
      title: '질문입니다',
      content: [
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
      ],
   },
   {
      id: 2,
      title: '질문입니다',
      content: [
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
      ],
   },
   {
      id: 3,
      title: '질문입니다',
      content: [
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
      ],
   },
   {
      id: 4,
      title: '질문입니다',
      content: [
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
      ],
   },
   {
      id: 5,
      title: '질문입니다',
      content: [
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
      ],
   },
   {
      id: 6,
      title: '질문입니다',
      content: [
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
      ],
   },
   {
      id: 7,
      title: '질문입니다',
      content: [
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
      ],
   },
   {
      id: 8,
      title: '질문입니다',
      content: [
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
      ],
   },
   {
      id: 9,
      title: '질문입니다',
      content: [
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
         '청첩장 디자인이 너무 예쁘고 깔끔해요! 모바일로 전달하기도 편리하고 게스트들의 반응도 좋았습니다.',
      ],
   },
]

const CustomerPage = () => {
   const dispatch = useDispatch()
   const [value, setValue] = useState('notice')
   const { posts } = useSelector((state) => state.posts)
   console.log(posts)

   useEffect(() => {
      dispatch(fetchPostsThunk({ types: ['qna', 'notice'], limit: 10 }))
   }, [dispatch])

   const handleChange = (event, newValue) => {
      setValue(newValue)
   }

   return (
      <CustomerContainer>
         {/* 배너, 검색창 */}
         <Bannerimg>
            <BannerTitle>CardVerse 고객센터</BannerTitle>
            <SearchBox>
               <OutlinedInput
                  placeholder="CardVerse의 모든것을 검색해 보세요."
                  endAdornment={
                     <InputAdornment position="end">
                        <SearchIcon />
                     </InputAdornment>
                  }
                  sx={{ borderRadius: '20px' }}
               />
            </SearchBox>
         </Bannerimg>

         <CustomerContentContainer>
            {/* 자주묻는질문 */}
            <SecondeTitle>자주 묻는 질문 TOP4</SecondeTitle>
            <Top4Card />

            {/* 공지사항, Q&A 탭 */}
            <Box sx={{ width: '100%', typography: 'body1', marginTop: '100px' }}>
               <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: '#585858' }}>
                     <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <CustomTab label="NOTICE" value="notice" />
                        <CustomTab label="Q&A" value="qna" />
                     </TabList>
                  </Box>
                  <TabPanel value="notice" sx={{ padding: 0 }}>
                     <Board result={posts?.notice || []} />
                  </TabPanel>
                  <TabPanel value="qna" sx={{ padding: 0 }}>
                     <Board result={posts.qna} />
                  </TabPanel>
               </TabContext>
            </Box>
         </CustomerContentContainer>

         {/* 하단 */}
         <BottomImg>
            <BottomContext>
               <img src="/images/bulb.png" style={{ width: '22px', height: '22px' }} alt="bulb icon" />
               Card Verse의 궁금한점을 모든 물어보세요!
            </BottomContext>
         </BottomImg>
      </CustomerContainer>
   )
}

export default CustomerPage
