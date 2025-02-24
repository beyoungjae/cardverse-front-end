import React, { useState } from 'react'

import { Box, Typography, Select, MenuItem, FormControl, Pagination } from '@mui/material'
import { display, styled } from '@mui/system'
// import { Container } from '../layouts/boxCommon'
import { Title } from '../layouts/textCommon'
import { StyledButton } from '../layouts/btnCommon'
import TitleContainer from '../layouts/TitleContainer'
import MainContainer from '../layouts/MainContainer'

const Container = styled(Box)(() => ({
   width: '100%',
   height: '100%',
   //    height: '100vh',
   //    height: '960px',
   padding: '40px 40px 20px 40px',
   borderRadius: '8px',
   backgroundColor: '#ffffff',
   border: '1px solid #ccc',
   display: 'flex',
   flexDirection: 'column',
   gap: '16px',

   margin: '0 auto',

   '&::after': {},
}))

const ItemWrap = styled(Box)(({ theme }) => ({
   border: '1px solid red',
   display: 'flex',
   gap: '12px',
   height: '13%',
   padding: '4px',
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
   return (
      <Container>
         <TitleContainer title="이벤트" add="이벤트 추가" />
         <MainContainer type="list">
            <ItemWrap>
               <ImgWrap>
                  <Image src="images/default.jpg" alt="배너 이미지" />
               </ImgWrap>
               <InfoWrap></InfoWrap>
            </ItemWrap>
            <ItemWrap>
               <ImgWrap>
                  <Image src="images/default.jpg" alt="배너 이미지" />
               </ImgWrap>
               <InfoWrap></InfoWrap>
            </ItemWrap>
            <ItemWrap>
               <ImgWrap>
                  <Image src="images/default.jpg" alt="배너 이미지" />
               </ImgWrap>
               <InfoWrap></InfoWrap>
            </ItemWrap>
            <ItemWrap>
               <ImgWrap>
                  <Image src="images/default.jpg" alt="배너 이미지" />
               </ImgWrap>
               <InfoWrap></InfoWrap>
            </ItemWrap>
            <ItemWrap>
               <ImgWrap>
                  <Image src="images/default.jpg" alt="배너 이미지" />
               </ImgWrap>
               <InfoWrap></InfoWrap>
            </ItemWrap>
            <ItemWrap>
               <ImgWrap>
                  <Image src="images/default.jpg" alt="배너 이미지" />
               </ImgWrap>
               <InfoWrap></InfoWrap>
            </ItemWrap>
         </MainContainer>
         <Pagination />
      </Container>
   )
}

export default Event
