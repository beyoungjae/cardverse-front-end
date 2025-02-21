import { Routes, Route, Navigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { styled } from '@mui/system'

import ManageNotice from './manages/ManageNotice'
import ManageQna from './manages/ManageQna'
import ManageReview from './manages/ManageReview'
import ManageFaq from './manages/ManageFaq'

const Manage = () => {
   return (
      <>
         <Routes>
            <Route index element={<Navigate to="tab-notice" replace />} />
            <Route path="tab-notice" element={<ManageNotice />} />
            <Route path="tab-qna" element={<ManageQna />} />
            <Route path="tab-faq" element={<ManageFaq />} />
            <Route path="tab-review" element={<ManageReview />} />
         </Routes>
      </>
   )
}

export default Manage
