import { Routes, Route, Navigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { styled } from '@mui/system'

import Coupon from './promotions/Coupon'
import Event from './promotions/Event'
import EventNew from './promotions/EventNew'

const Promotion = () => {
    return (
        <>
            <Routes>
                <Route index element={<Navigate to="tab-event" replace />} />
                <Route path="tab-event" element={<Event />} />
                <Route path="tab-coupon" element={<Coupon />} />
                <Route path="new" element={<EventNew />} />
            </Routes>
        </>
    )
}

export default Promotion
