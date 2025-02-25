import { useEffect, useState } from 'react'
import { styled } from '@mui/system'

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
   const [isKakaoLoaded, setIsKakaoLoaded] = useState(false)

   useEffect(() => {
      const kakaoKey = process.env.REACT_APP_KAKAO_JS_KEY
      console.log('🔍 카카오 API 키:', kakaoKey) // 환경 변수 체크

      if (!kakaoKey) {
         console.error('❌ 카카오 API 키가 설정되지 않았습니다!')
         return
      }

      // 카카오 SDK 로드 함수
      const loadKakaoSDK = (attempt = 0) => {
         if (attempt > 10) {
            console.error('⏳ 카카오 SDK 로드 실패 (최대 재시도 횟수 초과)')
            return
         }

         if (typeof window !== 'undefined' && window.Kakao) {
            if (!window.Kakao.isInitialized()) {
               window.Kakao.init(kakaoKey)
               console.log('✅ 카카오 SDK 초기화 완료:', window.Kakao.isInitialized())
            }
            setIsKakaoLoaded(true)
         } else {
            console.log(`⏳ 카카오 SDK 로딩 중... (재시도 ${attempt + 1})`)
            setTimeout(() => loadKakaoSDK(attempt + 1), 500)
         }
      }

      // SDK가 존재하면 즉시 실행, 아니면 로드 체크 시작
      if (window.Kakao) {
         loadKakaoSDK()
      } else {
         // SDK가 동적 로드될 경우, `onload` 이벤트를 사용해서 체크
         const script = document.querySelector("script[src*='kakao_js_sdk']")
         if (script) {
            script.onload = () => loadKakaoSDK()
         } else {
            console.error('❌ 카카오 SDK가 <script>로 포함되지 않았습니다.')
         }
      }
   }, [])

   const handleLogin = () => {
      if (!isKakaoLoaded) {
         console.error('❌ 카카오 SDK가 아직 로드되지 않았습니다.')
         return
      }

      window.Kakao.Auth.login({
         success: (authObj) => {
            console.log('✅ 로그인 성공:', authObj)
         },
         fail: (err) => {
            console.error('❌ 로그인 실패:', err)
         },
      })
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
      <KakaoStyleBtn className="kakao-login-btn" onClick={handleLogin}>
         <img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/KakaoTalk_logo.svg" alt="kakao" style={{ width: '20px', height: '20px' }} />
         카카오 로그인
      </KakaoStyleBtn>
   )
}

export default KakaoLoginBtn
