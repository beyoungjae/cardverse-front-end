import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { checkAuthStatusThunk, logoutUserThunk } from '../../features/authSlice'

const AuthChecker = ({ authData, isAuthenticated }) => {
   const dispatch = useDispatch()
   const timeoutRef = useRef(null)

   // 로그아웃 타이머 설정 함수
   const resetLogoutTimer = () => {
      if (!isAuthenticated) {
         console.log('🚨 isAuthenticated가 false이므로 타이머 설정 안함')
         return
      }

      console.log('⏳ 타이머 초기화 및 재설정')

      // 기존 타이머 제거
      if (timeoutRef.current) {
         console.log('🛑 기존 타이머 제거')
         clearTimeout(timeoutRef.current)
      }

      // 새로운 10분 타이머 설정
      timeoutRef.current = setTimeout(() => {
         console.log('🚪 [자동 로그아웃] 10분 경과됨. 로그아웃 실행')
         dispatch(logoutUserThunk())
      }, 10 * 60 * 1000) // 10분 후 실행
   }

   useEffect(() => {
      let isMounted = true

      console.log('🔍 [useEffect] 로그인 상태 확인 중...')
      dispatch(checkAuthStatusThunk(authData)).then(() => {
         if (isMounted) {
            console.log('✅ [로그인 상태 확인 완료] 타이머 재설정 시작')
            resetLogoutTimer()
         }
      })

      return () => {
         isMounted = false
         if (timeoutRef.current) {
            console.log('🧹 [클린업] 컴포넌트 언마운트됨. 기존 타이머 제거')
            clearTimeout(timeoutRef.current)
         }
      }
   }, [authData, isAuthenticated, dispatch])

   useEffect(() => {
      console.log('🔄 [isAuthenticated 변경 감지] 새로운 타이머 설정')
      resetLogoutTimer()
   }, [isAuthenticated])

   return null
}

export default AuthChecker

// const AuthChecker = ({ authData, isAuthenticated }) => {
//    const dispatch = useDispatch()
//    const timeoutRef = useRef(null)

//    // 로그아웃 타이머 설정 함수
//    const resetLogoutTimer = () => {
//       if (!isAuthenticated) {
//          return
//       }
//       console.log('타이머 실행')
//       if (timeoutRef.current) {
//          clearTimeout(timeoutRef.current)
//       }

//       timeoutRef.current = setTimeout(() => {
//          console.log('자동 로그아웃')
//          dispatch(logoutUserThunk())
//       }, 60 * 10 * 1000) // 10분 후 자동 로그아웃 실행
//    }

//    useEffect(() => {
//       // 로그인 상태 확인
//       dispatch(checkAuthStatusThunk(authData)).then(() => {
//          resetLogoutTimer() // 상태 체크 후 타이머 리셋
//       })

//       return () => {
//          if (timeoutRef.current) clearTimeout(timeoutRef.current)
//       }
//    }, [dispatch, authData, isAuthenticated])

//    return null
// }

// export default AuthChecker
