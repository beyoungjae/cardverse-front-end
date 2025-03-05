import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { checkAuthStatusThunk, logoutUserThunk } from '../../features/authSlice'

const AuthChecker = ({ authData, isAuthenticated }) => {
   const dispatch = useDispatch()
   const timeoutRef = useRef(null)

   // 로그아웃 타이머 설정 함수
   const resetLogoutTimer = () => {
      if (!isAuthenticated) {
         return
      }
      if (timeoutRef.current) {
         clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
         dispatch(logoutUserThunk())
      }, 60 * 10 * 1000) // 10분 후 자동 로그아웃 실행
   }

   useEffect(() => {
      // 로그인 상태 확인
      dispatch(checkAuthStatusThunk(authData)).then(() => {
         resetLogoutTimer() // 상태 체크 후 타이머 리셋
      })

      return () => {
         if (timeoutRef.current) clearTimeout(timeoutRef.current)
      }
   }, [dispatch, authData, isAuthenticated])

   return null
}

export default AuthChecker
