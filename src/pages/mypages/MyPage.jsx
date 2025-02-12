import { useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { MyProfile, MyCoupon, MyReview, MyTemplate, MyPageLayout } from './layout'
import { MyCoupon, MyReview, MyProfile, MyTemplate } from './layouts'
import { createBox, createText } from '../../utils/muiSystem'

const Container = createBox((theme) => ({
    boxSizing: 'border-box',
    backgroundColor: '#f5f5f5',
    padding: '16px',
    border: 'none',
    minWidth: '375px',
    breakpoint: [{ down: 'sm', padding: '16px' }],
}))

const selectNone = {
    userSelect: 'none',
}

// ** Text 스타일
const Title = createText((theme) => ({
    variant: 'h1',
    fontSize: 'clamp(1.4rem, 3vw, 1.75rem)',
}))

const MyPageContainer = createBox((theme) => ({
    width: '100%',
    maxWidth: '800px',
    margin: '8px auto',
    padding: '16px',
    // minWidth: '375px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    backgroundColor: '#ffffff',
    boxShadow: '0 0 1px 0.2px rgba(0,0,0,0.54)',
    borderRadius: '8px',
    breakpoint: [{down: 'md'},{ down: 'sm', padding: '12px', gap: '12px' }],
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
    positionmin: 'relative',
    // gap: '1rem',
    [theme.breakpoints.down('md')]: {
        gap: '0.8rem',
    },
    [theme.breakpoints.down('sm')]: {
        gap: '0.7rem',
    },
    [theme.breakpoints.down(480)]: {
        gap: '0.6rem',
    },
}))

// 마이페이지 탭 스타일
const StyledTab = styled(Link, { shouldForwardProp: (prop) => prop !== '$selected' })(({ theme, $selected }) => ({
    boxSizing: 'border-box',
    width: '25%',
    position: 'relative',
    padding: '1rem 0px',
    cursor: 'pointer',
    userSelect: 'none',
    color: $selected ? theme.palette.text.primary : theme.palette.text.disabled,
    fontSize: 'clamp(0.8rem, 2vw, 1rem)',
    fontWeight: $selected ? 600 : 400,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    backgroundColor: $selected ? '#f2f2f2' : '#ffffff',
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: '-1px',
        left: '50%',
        width: $selected ? '100%' : '0%',
        height: '2px',
        backgroundColor: '#000',
        transform: 'translateX(-50%)',
    },
    '&:hover': {
        color: theme.palette.text.primary,
        backgroundColor: '#e7e7e7',
    },
    [theme.breakpoints.down('sm')]: {
        padding: '0.8rem 0px',
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
                <Title>My Page</Title>

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
