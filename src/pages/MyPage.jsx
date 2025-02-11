import { useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { MyProfile, MyCoupon, MyReview, MyTemplate } from '../components/user'

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

    const StyledTab = styled(Link, { shouldForwardProp: (prop) => prop !== '$selected' })(({ theme, $selected }) => ({
        boxSizing: 'border-box',
        width: '25%',
        position: 'relative',
        padding: '1rem 3rem',
        cursor: 'pointer',
        color: $selected ? theme.palette.text.primary : theme.palette.text.disabled,
        fontSize: '1rem',
        fontWeight: $selected ? 600 : 400,
        textAlign: 'center',
        whiteSpace: 'nowrap',
        textDecoration: 'none',
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
            backgroundColor: theme.palette.action.hover,
        },
        [theme.breakpoints.down('sm')]: {
            padding: '0.8rem 2rem',
        },
    }))

    const TabContainer = styled(Box)(({ theme }) => ({
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        positionmin: 'relative',
        marginBottom: '4rem',
        gap: '1rem',
        '&::before': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1px',
            backgroundColor: '#e0e0e0',
        },
    }))

    return (
        <Box sx={{ maxWidth: '1280px', margin: '8px auto', padding: '16px' }}>
            {/* 탭 네비게이션 */}
            <TabContainer>
                {tabs.map((tab) => {
                    const isSelected = currentTab === tab

                    return (
                        <StyledTab key={tab} $selected={isSelected.toString()} to={`/my/${tab}`}>
                            {tab === 'template' ? 'MY 템플릿' : tab === 'coupon' ? 'MY 쿠폰' : tab === 'review' ? 'MY 리뷰' : 'MY 프로필'}
                        </StyledTab>
                    )
                })}
            </TabContainer>
            {/* 탭에 따라 다른 UI 렌더링 */}
            <Box sx={{ mt: 4 }}>
                {currentTab === 'template' && <MyTemplate />}
                {currentTab === 'coupon' && <MyCoupon />}
                {currentTab === 'review' && <MyReview />}
                {currentTab === 'profile' && <MyProfile />}
            </Box>
        </Box>
    )
}

export default MyPage
