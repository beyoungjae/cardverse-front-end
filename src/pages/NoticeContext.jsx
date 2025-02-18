import React, { createContext, useState, useContext, useMemo } from 'react'

const NoticeContext = createContext()

export const NoticeProvider = ({ children }) => {
   const [notices, setNotices] = useState([])

   const addNotice = (newNotice) => {
      setNotices((prevNotices) => [...prevNotices, newNotice])
   }

   const value = useMemo(() => ({ notices, addNotice }), [notices])

   return <NoticeContext.Provider value={value}>{children}</NoticeContext.Provider>
}

export const useNotice = () => {
   const context = useContext(NoticeContext)
   if (!context) {
      throw new Error('useNotice must be used within NoticeProvider')
   }
   return context
}
