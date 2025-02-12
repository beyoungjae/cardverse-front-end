import { Box, Typography, Button } from '@mui/material'
import { createBox, createText } from '../../../utils/muiSystem'

export { default as MyProfile } from './MyProfile'
export { default as MyCoupon } from './MyCoupon'
export { default as MyTemplate } from './MyTemplate'
export { default as MyReview } from './MyReview'

export const Layout = createBox((theme) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: '0 auto',
    border: 'none',
    boxShadow: theme.shadows[2],
    borderRadius: '5px',
    gap: '16px',
    padding: theme.palette.spacing.lg,
    breakpoint: [{ down: 848, width: '100%' }],
}))
