import React from 'react'
import { useNotice } from './'
import { Link } from 'react-router-dom'

const NoticePage = () => {
   const { notices } = useNotice()

   return (
      <div>
         <nav className="notice-navbar" style={{ textAlign: 'right' }}>
            <ul className="navbar-list">
               <li className="navbar-item">
                  <Link to="/notice">NOTICE</Link>
               </li>
               <li className="navbar-item">
                  <Link to="/qa">Q&A</Link>
               </li>
               <li className="navbar-item">
                  <Link to="/">FAQ</Link>
               </li>
            </ul>
         </nav>
         <h1>NOTICE</h1>
         <section className="notice-list">
            {notices.length === 0 ? (
               <p>등록된 공지사항이 없습니다.</p>
            ) : (
               notices.map((notice) => (
                  <article key={notice.id} className="notice-item">
                     <h2>{notice.title}</h2>
                     <p>
                        <strong>작성일:</strong> {notice.date}
                     </p>
                     <p>{notice.content}</p>
                  </article>
               ))
            )}
         </section>
      </div>
   )
}

export default NoticePage
