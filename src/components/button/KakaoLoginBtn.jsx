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

const KakaoLoginBtn = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const location = useLocation()
   const [isProcessingCode, setIsProcessingCode] = useState(false)

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

   // useEffect(() => {
   //    if (isProcessingCode) return

   //    const search = new URLSearchParams(window.location.search)
   //    const code = search.get('code')

   //    // 카카오로 리다이렉트 될 경우 code가 존재
   //    if (code) {
   //       setIsProcessingCode(true)
   //       localStorage.setItem('loginType', 'kakao')

   //       // 코드 파라미터를 URL에서 제거하기 위한 처리
   //       const cleanUrl = window.location.pathname
   //       window.history.replaceState({}, document.title, cleanUrl)

   //       dispatch(oauthLoginUserThunk({ code, provider: 'kakao' }))
   //          .unwrap()
   //          .then(() => {
   //             navigate('/')
   //          })
   //          .catch((error) => {
   //             console.error('로그인 실패:', error)
   //             alert('로그인에 실패하셨습니다.')
   //          })
   //          .finally(() => {
   //             setIsProcessingCode(false)
   //          })
   //    }
   // }, [dispatch, navigate, isProcessingCode])

   // useEffect(() => {
   //    // 이미 코드를 처리 중인 경우 중복 실행 방지
   //    if (isProcessingCode) return

   //    const search = new URLSearchParams(window.location.search)
   //    const code = search.get('code')

   //    // 카카오로 리다이렉트 될 경우 code가 존재
   //    if (code) {
   //       setIsProcessingCode(true)
   //       localStorage.setItem('loginType', 'oauth')

   //       // 코드 파라미터를 URL에서 제거하기 위한 처리
   //       const cleanUrl = window.location.pathname
   //       window.history.replaceState({}, document.title, cleanUrl)

   //       dispatch(kakaoLoginUserThunk({ code }))
   //          .unwrap()
   //          .then(() => {
   //             navigate('/')
   //          })
   //          .catch((error) => {
   //             console.error('로그인 실패:', error)
   //             alert('로그인에 실패하셨습니다.')
   //          })
   //          .finally(() => {
   //             setIsProcessingCode(false)
   //          })
   //    }
   // }, [dispatch, navigate, isProcessingCode])

   const handleKakaoLogin = (e) => {
      e.preventDefault()
      e.stopPropagation()
      window.location.href = KAKAO_REST_API
   }

   return (
      // <KakaoStyleBtn className="kakao-login-btn" onClick={handleKakaoLogin}>
      <KakaoStyleBtn className="kakao-login-btn" onClick={handleKakaoLogin}>
         <img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/KakaoTalk_logo.svg" alt="kakao" style={{ width: '20px', height: '20px' }} />
         카카오 로그인
      </KakaoStyleBtn>
   )
}

export default KakaoLoginBtn
