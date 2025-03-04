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
