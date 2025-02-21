// import { useState, useCallback } from 'react'

// const useMessage = () => {
//    const [errorMessage, setErrorMessage] = useState('')
//    const [successMessage, setSuccessMessage] = useState('')

//    const setError = useCallback((message) => {
//       setErrorMessage(message)
//       setSuccessMessage('') // ✅ 에러 발생 시 성공 메시지 초기화
//    }, [])

//    const setSuccess = useCallback((message) => {
//       setSuccessMessage(message)
//       setErrorMessage('') // ✅ 성공 시 에러 메시지 초기화
//    }, [])

//    const clearMessages = useCallback(() => {
//       setErrorMessage('')
//       setSuccessMessage('')
//    }, [])

//    return { errorMessage, successMessage, setError, setSuccess, clearMessages }
// }

// export default useMessage

// import { useState, useCallback } from 'react'

// const useMessage = () => {
//    const [error, setError] = useState({ type: '', message: '' })
//    const [successMessage, setSuccessMessage] = useState('')

//    const setErrorWithType = useCallback((type, message) => {
//       setError({ type, message })
//       setSuccessMessage('') // 에러 발생 시 성공 메시지 초기화
//    }, [])

//    const setSuccess = useCallback((message) => {
//       setSuccessMessage(message)
//       setError({ type: '', message: '' }) // 성공 시 에러 메시지 초기화
//    }, [])

//    const clearMessages = useCallback(() => {
//       setError({ type: '', message: '' })
//       setSuccessMessage('')
//    }, [])

//    return { error, successMessage, setErrorWithType, setSuccess, clearMessages }
// }

// export default useMessage

// import { useState, useCallback } from 'react'

// const useMessage = () => {
//    const [error, setError] = useState({ type: '', message: '' })
//    const [successMessage, setSuccessMessage] = useState('')

//    const setErrorWithType = useCallback((type, message) => {
//       setError({ type, message })
//       // 성공 메시지를 초기화하지 않음
//    }, [])

//    const setSuccess = useCallback((message) => {
//       setSuccessMessage(message)
//       setError({ type: '', message: '' }) // 성공 시 에러 메시지 초기화
//    }, [])

//    const clearMessages = useCallback(() => {
//       setError({ type: '', message: '' })
//       setSuccessMessage('')
//    }, [])

//    return { error, successMessage, setErrorWithType, setSuccess, clearMessages }
// }

// export default useMessage

// import { useState, useCallback } from 'react'

// const useMessage = () => {
//    const [messages, setMessages] = useState({
//       error: { type: '', message: '' },
//       success: '',
//    })

//    const setErrorWithType = useCallback((type, message) => {
//       setMessages((prev) => ({
//          ...prev,
//          error: { type, message },
//       }))
//    }, [])

//    const setSuccess = useCallback((message) => {
//       setMessages((prev) => ({
//          ...prev,
//          success: message,
//          error: { type: '', message: '' }, // 에러 메시지 초기화
//       }))
//    }, [])

//    const clearMessages = useCallback(() => {
//       setMessages({
//          error: { type: '', message: '' },
//          success: '',
//       })
//    }, [])

//    return { messages, setErrorWithType, setSuccess, clearMessages }
// }

// export default useMessage

import { useState, useCallback } from 'react'

const useMessage = () => {
   const [messages, setMessages] = useState({
      error: { type: '', message: '' },
      success: '',
   })

   const setErrorWithType = useCallback((type, message) => {
      setMessages((prev) => ({
         ...prev,
         error: { type, message },
      }))
   }, [])

   const setSuccess = useCallback((message) => {
      setMessages((prev) => ({
         ...prev,
         success: message,
         error: { type: '', message: '' }, // 성공 시 에러 메시지 초기화
      }))
   }, [])

   const clearMessages = useCallback(() => {
      setMessages({
         error: { type: '', message: '' },
         success: '',
      })
   }, [])

   return { messages, setErrorWithType, setSuccess, clearMessages }
}

export default useMessage
