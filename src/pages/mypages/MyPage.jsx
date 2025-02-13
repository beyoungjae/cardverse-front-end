import { useEffect } from 'react'
import { fontWeight, styled } from '@mui/system'

import { Box, Typography } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { MyCoupon, MyReview, MyProfile, MyTemplate } from './layouts'
import { createBox, createText } from '../../utils/muiSystem'

const Container = createBox((theme) => ({
    backgroundColor: '#f5f5f5',
    padding: '40px',
    border: 'none',
    minWidth: '375px',
    breakpoint: [{ down: 'sm', padding: '16px' }],
}))

const MyPageContainer = createBox((theme) => ({
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
    backgroundColor: '#ffffff',
    boxShadow: '0 0 0px 0.3px black',
    borderRadius: '8px',
    breakpoint: [{ down: 'md' }, { down: 'sm', padding: '12px', gap: '12px' }],
}))

// ** Text 스타일
const Title = styled(Typography)(({ theme, variant = 'h1', children }) => ({
    ...theme.typography[variant],
    color: 'rgba(0,0,0,0.4)',
    textShadow: '4px 2px 3px rgba(0,0,0,0.12)',
    position: 'relative',
    fontSize: 'clamp(1rem, 5vw, 2.5rem)',
    '&::after': {
        content: `"${children}"`,
        position: 'absolute',
        left: 0,
        top: 0,
        color: 'white',
        fontSize: 'clamp(1rem, 5vw, 2.5rem)',
        height: '50px',
        background: 'linear-gradient(135deg, rgb(220,220,220), rgb(20,20,20))' /* 🔥 그라데이션 배경 */,
        WebkitBackgroundClip: 'text' /* ✅ 텍스트에 배경 적용 */,
        WebkitTextFillColor: 'transparent' /* ✅ 글자 색상을 투명하게 */,
    },
    [theme.bps.md]: {},
}))

// 마이페이지 탭 컨테이너
const TabContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    gap: '1rem',

    '&::after': {
        position: 'absolute',
        width: '100%',
        bottom: '-10px',
        left: '0',
        content: '""',
        height: '1px',
        backgroundColor: '#cccccc',
        background: 'linear-gradient(to right, rgba(140,140,140, 0) 0%, rgba(140,140,140, 1) 10%,rgba(140,140,140, 1) 90%,  rgba(140,140,140, 0) 100%)',
    },
    '&::before': {
        position: 'absolute',
        width: '100%',
        top: '-10px',
        left: '0',
        content: '""',
        height: '1px',
        backgroundColor: '#cccccc',
        background: 'linear-gradient(to right, rgba(140,140,140, 0) 0%, rgba(140,140,140, 1) 10%,rgba(140,140,140, 1) 90%,  rgba(140,140,140, 0) 100%)',
    },
    [theme.breakpoints.down('md')]: {
        gap: '0.8rem',
    },
    [theme.breakpoints.down('sm')]: {
        gap: '0.5rem',
    },
    [theme.breakpoints.down(480)]: {
        gap: '0.2rem',
        '&::after': {
            position: 'absolute',
            width: '100%',
            bottom: '-5px',
            left: '0',
            content: '""',
            height: '1px',
            backgroundColor: '#cccccc',
        },
        '&::before': {
            position: 'absolute',
            width: '100%',
            top: '-5px',
            left: '0',
            content: '""',
            height: '1px',
            backgroundColor: '#cccccc',
        },
    },
}))

// 마이페이지 탭 스타일
const StyledTab = styled(Link, { shouldForwardProp: (prop) => prop !== '$selected' })(({ theme, $selected }) => ({
    boxSizing: 'border-box',
    width: '22%',
    position: 'relative',
    padding: '1rem 0px',
    cursor: 'pointer',
    userSelect: 'none',
    color: $selected ? theme.palette.text.primary : theme.palette.text.disabled,
    fontSize: 'clamp(0.8rem, 2vw, 1rem)',
    fontWeight: $selected ? 600 : 400,
    textAlign: 'center',
    bordorRadius: '8px 0 0 8px',
    whiteSpace: 'nowrap',
    transition: 'background-color 0.4s ease',
    textDecoration: 'none',
    backgroundColor: $selected ? '#f1f1f1' : '#ffffff',
    '&::after': {
        content: '""',
        bordorRadius: '8px 0 0 8px',
        position: 'absolute',
        bottom: '-1px',
        left: '50%',
        width: $selected ? '100%' : '0%',
        height: '3px',
        transition: 'all 0.4s ease',
        backgroundColor: '#000',
        transform: 'translateX(-50%)',
    },
    '&:hover': $selected
        ? {} // ✅ 선택된 상태에서는 아무 스타일도 변경되지 않도록
        : {
              bordorRadius: '8px 0 0 8px',
              color: theme.palette.text.primary,
              backgroundColor: '#f7f7f7',
              transition: 'all 0.3s ease',
          },
    [theme.breakpoints.down('sm')]: {
        padding: '0.8rem 0px',
        width: '25%',
        '&::after': {
            bordorRadius: '8px 0 0 8px',
            height: '2px',
        },
    },
}))

const MyPage = () => {
    const location = useLocation()
    const navigate = useNavigate()

    // `/my`로 접근하면 `/my/template`로 자동 리디렉트
    useEffect(() => {
        if (location.pathname === '/my') {
            navigate('/my/template', { replace: true })
        }
    }, [location, navigate])

    // 현재 URL에서 탭의 value 추출
    const currentTab = location.pathname.split('/')[2] || 'template'
    const tabs = ['template', 'coupon', 'review', 'profile']

    return (
        <Container>
            <MyPageContainer>
                <Title component="span">My Page</Title>

                {/* 탭 네비게이션 */}
                <TabContainer>
                    {tabs.map((tab) => {
                        const isSelected = currentTab === tab

                        return (
                            <StyledTab key={tab} $selected={isSelected} to={`/my/${tab}`}>
                                {tab === 'template' ? '템플릿' : tab === 'coupon' ? '쿠폰' : tab === 'review' ? '리뷰' : '내정보'}
                            </StyledTab>
                        )
                    })}
                </TabContainer>
                {/* 탭에 따라 다른 UI 렌더링 */}
                <Box sx={{ mt: 0 }}>
                    <>
                        {currentTab === 'template' && <MyTemplate />}
                        {currentTab === 'coupon' && <MyCoupon />}
                        {currentTab === 'review' && <MyReview />}
                        {currentTab === 'profile' && <MyProfile />}
                    </>
                </Box>
            </MyPageContainer>
        </Container>
    )
}

export default MyPage
