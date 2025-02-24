import { Routes, Route, Navigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { styled } from '@mui/system'

import AnalyticsOverview from './analysis/AnalyticsOverview'
import AnalyticsTemplate from './analysis/AnalyticsTemplate'
import AnalyticsUser from './analysis/AnalyticsUser'
import AnalyticsError from './analysis/AnalyticsError'

const AnalyticsRoutes = () => {
   return (
      <>
         <Routes>
            <Route index element={<Navigate to="tab-overview" replace />} />
            <Route path="tab-overview" element={<AnalyticsOverview />} />
            <Route path="tab-template" element={<AnalyticsTemplate />} />
            <Route path="tab-user" element={<AnalyticsUser />} />
            <Route path="tab-error" element={<AnalyticsError />} />
         </Routes>
      </>
   )
}

export default AnalyticsRoutes
