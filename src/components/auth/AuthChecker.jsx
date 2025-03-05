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

      // 기존 타이머 제거
      if (timeoutRef.current) {
         clearTimeout(timeoutRef.current)
      }

      // 새로운 10분 타이머 설정
      timeoutRef.current = setTimeout(() => {
         dispatch(logoutUserThunk())
      }, 10 * 60 * 1000) // 10분 후 실행
   }

   useEffect(() => {
      let isMounted = true

      dispatch(checkAuthStatusThunk(authData)).then(() => {
         if (isMounted) {
            resetLogoutTimer()
         }
      })

      return () => {
         isMounted = false
         if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
         }
      }
   }, [authData, isAuthenticated, dispatch])

   useEffect(() => {
      resetLogoutTimer()
   }, [isAuthenticated])

   return null
}

export default AuthChecker
