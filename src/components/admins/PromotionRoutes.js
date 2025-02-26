import { Routes, Route, Navigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { styled } from '@mui/system'

import Coupon from './promotions/Coupon'
import Event from './promotions/Event'
import EventForm from './promotions/EventForm'
import TabRouter from './TabRouter'

const PromotionRoutes = () => {
   return (
      <Routes>
         <Route index element={<Navigate to="tab-overview" replace />} />
         <Route path="tab-coupon" element={<Coupon />} />
         <Route path="tab-event" element={<Event />} />
         <Route path="new" element={<EventForm />} />
      </Routes>
   )
}

export default PromotionRoutes
