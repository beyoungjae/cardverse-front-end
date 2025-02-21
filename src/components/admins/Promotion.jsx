import { Routes, Route, Navigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { styled } from '@mui/system'

import PromotionCoupon from './promotions/PromotionCoupon'
import PromotionEvent from './promotions/PromotionEvent'


const Promotion = () => {
    return (
       <>
          <Routes>
             <Route index element={<Navigate to="tab-event" replace />} />
             <Route path="tab-event" element={<PromotionEvent />} />
             <Route path="tab-coupon" element={<PromotionCoupon />} />
          </Routes>
       </>
    )
}

export default Promotion
