import { Box, Typography, Button } from '@mui/material'
import { createBox, createText } from '../../../utils/muiSystem'
// import { styled } from '@mui/system'
import { styled } from '@mui/material/styles'
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
    boxShadow: '0 0 0px 0.3px black',
    borderRadius: '5px',
    gap: '24px',
    padding: theme.palette.spacing.lg,
    breakpoint: [{ down: 848, width: '100%' }],
}))

// 기본 컨테이너
// export const Container = createBox((theme) => ({
//     width: ' 100%',
//     display: 'flex',
//     flexDirection: 'column',
//     breakpoint: [
//         { up: 'lg', gap: theme.spacing(3) },
//         { down: 'lg', gap: theme.spacing(1) },
//     ],
// }))

export const Container = styled(Box)(({ theme }) => ({
    width: ' 100%',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    [theme.bps.md]: {
        gap: theme.spacing(2),
    },
    [theme.bps.sm]: {
        gap: theme.spacing(1),
    },
}))

// ** 상태 컨테이너
export const StatusContainer = createBox((theme) => ({
    ...commonStyles(theme),
    padding: '16px',
    display:'flex',
    breakpoint: [
        { down: 'md', padding: '12px' },
        { down: 'sm', padding: '10px' },
        { down: '480', padding: '8px' },
    ],
}))

// ** 디테일 컨테이너
export const DetailContainer = createBox((theme) => ({
    ...commonStyles(theme),
}))

// ** Text 스타일
export const SubTitle = styled(Typography)(({ theme, variant = 'h1', children }) => ({
    ...theme.typography[variant],
    // color: 'rgba(0,0,0,0.9)',
    color: 'transparent',
    textShadow: '2px 1px 1px rgba(0,0,0,0.12)',
    position: 'relative',
    fontSize: 'clamp(1.2rem, 3vw, 1.7rem)',
    width: 'fit-content',
    marginBottom: '6px',
    '&::after': {
        content: `"${children}"`,
        position: 'absolute',
        left: '0px',
        top: '0px',
        color: 'transparent',
        fontSize: 'clamp(1.2rem, 3vw, 1.7rem)',
        height: '50px',
        background: 'linear-gradient(270deg, rgb(100,100,100), rgb(20,20,20))' /* 🔥 그라데이션 배경 */,

        WebkitBackgroundClip: 'text' /* ✅ 텍스트에 배경 적용 */,
    },
    '&::before': {
        content: '""',
        position: 'absolute',
        bottom: '-6px',
        width: '180%',
        left: '-10px',
        background: 'linear-gradient(to right,rgba(140,140,140,0) 0%, rgba(140,140,140,1) 5%, rgba(140,140,140, 1) 30%,rgba(140,140,140, 1) 70%,  rgba(0,0,0,0) 100%)',
        height: '1px',
    },
}))
