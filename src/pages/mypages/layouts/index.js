import { Box, Typography, Button } from '@mui/material'
import { createBox, createText } from '../../../utils/muiSystem'

export { default as MyProfile } from './MyProfile'
export { default as MyCoupon } from './MyCoupon'
export { default as MyTemplate } from './MyTemplate'
export { default as MyReview } from './MyReview'

// ** 공통 기본 스타일
const commonStyles = (theme) => ({
    width: '100%',
    border: 'none',
    borderRadius: theme.palette.borderRadius.small,
    boxShadow: '0 0 1px 0.2px rgba(0,0,0,0.54)',
})

// ** 레이아웃
export const Layout = createBox((theme) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: '0 auto',
    border: 'none',
    boxShadow: '0 0 1px 1px black',
    // boxShadow: theme.shadows[2],
    borderRadius: '5px',
    gap: '16px',
    padding: theme.palette.spacing.lg,
    breakpoint: [{ down: 848, width: '100%' }],
}))

// ** 상태 컨테이너
export const StatusContainer = createBox((theme) => ({
    ...commonStyles(theme),
    padding: '16px',
    breakpoint: [
        { down: 'md', padding: '12px' },
        { down: 'sm', padding: '10px' },
        { down: '480', padding: '8px'}
    ],
}))

// ** 디테일 컨테이너
export const DetailContainer = createBox((theme) => ({
    ...commonStyles(theme),
}))
