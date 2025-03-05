import { useEffect, useState } from 'react'
import { styled } from '@mui/system'
import { useDispatch } from 'react-redux'
import { KAKAO_REST_API } from '../../api/oauthApi'
import { oauthLoginUserThunk } from '../../features/authSlice'
import { useNavigate, useLocation } from 'react-router-dom'

const KakaoStyleBtn = styled('button')(({ theme }) => ({
   backgroundColor: '#B699BB',
   color: '#000',
   border: 'none',
   borderRadius: '4px',
   padding: '15px 15px',
   fontSize: '1rem',
   fontWeight: 'bold',
   cursor: 'pointer',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   gap: '8px',
   width: '100%',

   '&:hover': {
      backgroundColor: '#a98bae',
   },

   // 카카오 로그인 버튼 스타일
   '&.kakao-login-btn': {
      backgroundColor: '#ffe812',
      '&:hover': {
         backgroundColor: '#FFD700',
      },
   },

   '&.signup-btn': {
      backgroundColor: '#ffffff',
      border: '1px solid #cccccc',
   },
   '&.signup-btn:hover': {
      backgroundColor: '#f5f5f5',
   },

   [theme.breakpoints.down('md')]: {
      padding: '8px 12px',
      fontSize: '0.85rem',
   },
   [theme.breakpoints.down('sm')]: {
      padding: '8px 10px',
      fontSize: '0.7rem',
   },
}))

const KakaoLoginBtn = ({ onClick }) => {
   return (
      <KakaoStyleBtn className="kakao-login-btn" onClick={onClick}>
         <img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/KakaoTalk_logo.svg" alt="kakao" style={{ width: '20px', height: '20px' }} />
         카카오 로그인
      </KakaoStyleBtn>
   )
}

export default KakaoLoginBtn
