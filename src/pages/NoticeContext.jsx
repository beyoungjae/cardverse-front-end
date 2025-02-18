import React, { createContext, useState, useContext } from 'react'

// Context 생성
const NoticeContext = createContext()

// NoticeProvider 컴포넌트 - 상태 관리
export const NoticeProvider = ({ children }) => {
   const [notices, setNotices] = useState([])

   // 공지사항 추가 함수
   const addNotice = (newNotice) => {
      setNotices((prevNotices) => [...prevNotices, newNotice])
   }

   return <NoticeContext.Provider value={{ notices, addNotice }}>{children}</NoticeContext.Provider>
}

export const useNotice = () => {
   return useContext(NoticeContext)
}
