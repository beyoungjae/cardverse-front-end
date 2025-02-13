import { useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { MyProfile, MyCoupon, MyReview, MyTemplate, MyPageLayout } from './layout'
import { MyCoupon, MyReview, MyProfile, MyTemplate } from './layouts'
import { createBox, createText } from '../../utils/muiSystem'

const Container = createBox((theme) => ({
    backgroundColor: '#f5f5f5',
    padding: '16px',
    border: 'none',
    minWidth: '375px',
    breakpoint: [{ down: 'sm', padding: '16px' }],
}))

// ** Text 스타일
const Title = styled(Typography)(({ theme }) => ({
    display: 'inline',
    fontSize: 'clamp(1rem, 5vw, 2.5rem)',
    fontWeight: theme.typography.h1.fontWeight,
    lineHeight: theme.typography.h1.lineHeight,
}))

const MyPageContainer = createBox((theme) => ({
    width: '100%',
    maxWidth: '800px',
    margin: '8px auto',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    backgroundColor: '#ffffff',
    boxShadow: '0 0 0px 0.3px black',
    borderRadius: '8px',
    breakpoint: [{ down: 'md' }, { down: 'sm', padding: '12px', gap: '12px' }],
}))

const TabLayout = createBox((theme) => ({
    width: '800px',
    margin: '0 auto',
    border: 'none',
    boxShadow: theme.shadows[2],
    borderRadius: '5px',
    padding: theme.palette.spacing.lg,
    breakpoint: [{ down: 848, width: '100%' }],
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
    // gap: '1rem',

    '&::after': {
        position: 'absolute',
        width: '100%',
        bottom: '-2px',
        left: '0',
        content: '""',
        height: '1px',
        backgroundColor: '#cccccc',
        background: 'linear-gradient(to right, rgba(204, 204, 204, 0) 0%, rgba(204, 204, 204, 1) 10%,rgba(204, 204, 204, 1) 90%,  rgba(204, 204, 204, 0) 100%)',
    },
    '&::before': {
        position: 'absolute',
        width: '100%',
        top: '-1px',
        left: '0',
        content: '""',
        height: '1px',
        backgroundColor: '#cccccc',
        background: 'linear-gradient(to right, rgba(204, 204, 204, 0) 0%, rgba(204, 204, 204, 1) 10%,rgba(204, 204, 204, 1) 90%,  rgba(204, 204, 204, 0) 100%)',
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
            bottom: '-2px',
            left: '0',
            content: '""',
            height: '1px',
            backgroundColor: '#cccccc',
        },
        '&::before': {
            position: 'absolute',
            width: '100%',
            top: '-1px',
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
    whiteSpace: 'nowrap',
    // transition: 'all 1s ease',
    transition: 'background-color 0.4s ease',
    textDecoration: 'none',
    backgroundColor: $selected ? '#f0f0f0' : '#ffffff',
    '&::after': {
        content: '""',
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
              color: theme.palette.text.primary,
              backgroundColor: '#f8f8f8',
              transition: 'all 0.3s ease',
          },
    [theme.breakpoints.down('sm')]: {
        padding: '0.8rem 0px',
        width: '25%',
        '&::after': {
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
