import React, { useState } from 'react'

import { Box, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { StyledButton } from '../layouts/btnCommon'
import TitleContainer from '../layouts/TitleContainer'
import MainContainer from '../layouts/MainContainer'

const Container = styled(Box)(() => ({
   width: '100%',
   height: '100%',
   padding: '40px 40px 20px 40px',
   borderRadius: '8px',
   backgroundColor: '#ffffff',
   border: '1px solid #ccc',
   display: 'flex',
   flexDirection: 'column',
   gap: '16px',

   margin: '0 auto',
}))

const ItemWrap = styled(Box)(({ theme }) => ({
   display: 'flex',
   gap: '12px',
   height: '20%',
   padding: '12px 4px',
}))

const ImgWrap = styled(Box)(({ theme }) => ({
   flex: 2,
   border: '1px solid black',
   borderRadius: '6px',
}))

const InfoWrap = styled(Box)(({ theme }) => ({
   flex: 4,
   border: '1px solid black',
}))

const Image = styled('img')(() => ({
   objectFit: 'cover',
}))

function Event() {
   const CATEGORIES = [
      { value: 'all', label: '전체보기' },
      { value: 'attendance', label: '출석' },
      { value: 'purchase', label: '구매' },
      { value: 'review', label: '리뷰' },
      { value: 'signup', label: '회원가입' },
   ]

   const items = [
      { id: 1, type: 'attendance', title: '제목1', content: '이벤트 이미지1 json', startDate: 'yyyy-mm-dd(s)', endDate: 'yyyy-mm-dd(e)', isLimited: false, bannerUrl: '배너 이미지 주소1', maxParticipants: null },
      { id: 2, type: 'attendance', title: '제목2', content: '이벤트 이미지2 json', startDate: 'yyyy-mm-dd(s)', endDate: 'yyyy-mm-dd(e)', isLimited: false, bannerUrl: '배너 이미지 주소2', maxParticipants: null },
      { id: 3, type: 'attendance', title: '제목3', content: '이벤트 이미지3 json', startDate: 'yyyy-mm-dd(s)', endDate: 'yyyy-mm-dd(e)', isLimited: false, bannerUrl: '배너 이미지 주소3', maxParticipants: null },
      { id: 4, type: 'attendance', title: '제목4', content: '이벤트 이미지4 json', startDate: 'yyyy-mm-dd(s)', endDate: 'yyyy-mm-dd(e)', isLimited: false, bannerUrl: '배너 이미지 주소4', maxParticipants: null },
      { id: 5, type: 'attendance', title: '제목5', content: '이벤트 이미지5 json', startDate: 'yyyy-mm-dd(s)', endDate: 'yyyy-mm-dd(e)', isLimited: false, bannerUrl: '배너 이미지 주소5', maxParticipants: null },
   ]

   return (
      <Container>
         <TitleContainer title="이벤트" add="이벤트 추가" />
         <MainContainer type="list" categories={CATEGORIES} itemData={items}></MainContainer>
      </Container>
   )
}

export default Event
