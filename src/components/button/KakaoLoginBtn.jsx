import { useEffect, useState } from 'react'
import { styled } from '@mui/system'
import { KAKAO_REST_API } from '../../api/oauthApi'
import { useDispatch } from 'react-redux'
import { oauthLoginUserThunk } from '../../features/authSlice'
import { kakaoLoginUserThunk } from '../../features/oauthSlice'
import { useNavigate } from 'react-router-dom'

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

const KakaoLoginBtn = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   // useEffect(() => {
   //    if (!window.Kakao.isInitialized()) {
   //       window.Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY)
   //    }
   // })

   useEffect(() => {
      const search = new URLSearchParams(window.location.search) //http://localhost:3000/login?code=데이터
      const code = search.get('code')
      console.log(code)

      // 카카오로 리다이렉트 될 경우 code가 존재
      if (code) {
         dispatch(oauthLoginUserThunk({ code, provider: 'kakao' }))
            .unwrap()
            .then(() => {
               navigate('/')
            })
            .catch((error) => {
               console.error('로그인 실패:', error)
               alert('로그인에 실패하셨습니다.')
            })
      }
   }, [dispatch, navigate])

   const handleKakaoLogin = () => {
      window.location.href = KAKAO_REST_API
   }

   // Kakao 로그인 성공 시 method
   const KakaoLoginSuccess = async (data) => {
      // const access_token = data.access_token
      // const body = { access_token: access_token }
      // const cookie = new Cookies()
      console.log('로그인성공', data)
      // const login_request = await API.kakoLoginRequset(body)
      // cookie.set('token', login_request.data.token, { path: '/' })
      // naviage('/')
   }
   const getUserInfo = (token) => {
      window.Kakao.API.request({
         url: '/v2/user/me',
         success: (res) => {
            console.log('👤 사용자 정보:', res)
         },
         fail: (err) => {
            console.error('❌ 사용자 정보 요청 실패:', err)
         },
      })
   }

   return (
      <KakaoStyleBtn className="kakao-login-btn" onClick={handleKakaoLogin}>
         <img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/KakaoTalk_logo.svg" alt="kakao" style={{ width: '20px', height: '20px' }} />
         카카오 로그인
      </KakaoStyleBtn>
   )
}

export default KakaoLoginBtn
