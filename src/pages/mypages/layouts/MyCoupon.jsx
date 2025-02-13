import { useState } from 'react'
import { createText, createBox } from '../../../utils/muiSystem'
import { Layout, StatusContainer } from './'
// import { styled } from '@mui/material/styles'
import { styled } from '@mui/system'
import { Box, Typography } from '@mui/material'

// ** 공통 기본 스타일
const commonStyles = {
    width: '100%',
    border: 'none',
    padding: '16px',
}

const commonBodyText = {
    variant: 'body1',
    fontSize: 'clamp(0.9rem, 1.8vw, 1rem)',
}

const commonBreakPoint = (theme) => ({
    breakpoint: [
        { up: 'lg', gap: theme.spacing(2) },
        { down: 'lg', gap: theme.spacing(1) },
    ],
})

// ** Text 스타일
const Title = createText((theme) => ({
    variant: 'h3',
    fontSize: 'clamp(1.2rem, 3vw, 1.4rem)',
}))

const Label = createText((theme) => ({
    variant: 'body1',
    fontSize: 'clamp(0.8rem, 1.8vw, 1rem)',
    fontWeight: 'bold',
    minWidth: '80px',
}))

const LabelValue = createText((theme) => ({
    variant: 'body1',
    fontSize: 'clamp(0.8rem, 1.8vw, 1rem)',
}))

// ** Container 스타일
// 컨테이너
const Container = createBox((theme) => ({
    width: ' 100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    breakpoint: [
        { up: 'lg', gap: theme.spacing(2) },
        { down: 'lg', gap: theme.spacing(1) },
    ],
}))

// 디테일 컨테이너
const DetailContainer = createBox((theme) => ({
    width: '100%',
    border: 'none',
}))

// 쿠폰내역 전환 컨테이너
const TabContainer = createBox((theme) => ({
    width: '100%',
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
}))

const ListContainer = createBox((theme) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '16px',
    backgroundColor: theme.palette.background.grey,
    borderLeft: '1px solid rgba(0,0,0,0.2)',
    borderRight: '1px solid rgba(0,0,0,0.2)',
    borderBottom: '1px solid rgba(0,0,0,0.2)',
    // borderRadius: '0 0 8px 8px',
    borderRadius: '0 0 8px 8px',

    breakpoint: [{ down: 'sm', padding: '8px' }],
}))

// ** Wrap 스타일
// 라벨 wrap
const LabelWrap = createBox((theme) => ({
    display: 'flex',
    backgroundColor: theme.palette.background.default,
    width: '100%',
    gap: theme.spacing(2),
    padding: theme.palette.spacing.md,
    border: 'none',
    breakpoint: [
        { down: 'md', borderRadius: theme.palette.borderRadius.md },
        { down: 'sm', padding: '4px' },
    ],
}))

// 리스트 Wrap
const CouponWrap = createBox((theme) => ({
    padding: '32px',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    breakpoint: [
        { down: 'md', padding: '16px' },
        { down: 'sm', padding: '12px', gap: '12px' },
    ],
    // alignItems: 'center',
}))

// ** Item 스타일
const Coupon = createBox((theme) => ({
    width: '100%',
    // border: '1px solid black',
    boxSizing: 'border-box',
    aspectRatio: '3 / 0.9',
    display: 'flex',
    borderRadius: '0 8px 8px 0',
    boxShadow: '2px 3px 2px 1px rgba(0,0,0,0.2)',
}))

const CouponDiscount = styled(Box)(({ theme }) => ({
    width: '35%',
    flex: '0.35',
    backgroundColor: '#FF385C',
    position: 'relative',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&::after': {
        content: '""',
        position: 'absolute',
        left: -8,
        top: 0,
        bottom: 0,
        width: 16,
        background: `
            linear-gradient(
                -45deg, 
                transparent 33.33%, 
                #FF385C 33.33%, 
                #FF385C 66.66%, 
                transparent 66.66%
            ),
            linear-gradient(
                45deg, 
                transparent 33.33%, 
                #FF385C 33.33%, 
                #FF385C 66.66%, 
                transparent 66.66%
            )
        `,
        backgroundSize: '24px 8px',
        backgroundPosition: '0 0, 0 16px',
        backgroundRepeat: 'repeat-y',
    },
    '& .coupon-discount': {
        fontSize: 'clamp(0.7rem, 3vw, 2.3rem)',
        // fontSize: 'clamp(0.7rem, 2vw, 5rem)',
        fontWeight: 'bold',
        letterSpacing: '0.07rem',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 1)',
        [theme.bps.md]: {},
        [theme.bps.sm]: {},
        [theme.bps.xxs]: {
            letterSpacing: '0.05rem',
            textShadow: '0.5px 0.5px 1px rgba(0, 0, 0, 1)',
        },
    },

 
}))

const CouponInfo = styled(Box)(({ theme }) => ({
    flex: '0.65',
    width: '65%',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    justifyContent: 'space-between',
    padding: '24px',
    backgroundColor: 'white',
    position: 'relative',
    borderRadius: '0 8px 8px 0',
}))

// 탭 스타일
const StyledTab = createBox((theme, { $active, $position }) => {
    const borderColor = '1px solid rgba(0,0,0,0.2)' // ✅ 기본 테두리 색상
    const transparentBorder = '1px solid rgba(0,0,0,0)' // ✅ 투명한 테두리
    return {
        // ...commonBodyText,
        fontSize: 'clamp(0.6rem, 1.8vw, 1rem)',
        width: '50%',
        flex: '0.5',
        textAlign: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        cursor: 'pointer',
        fontWeight: $active ? 600 : 400,
        color: $active ? theme.palette.text.primary : theme.palette.text.secondary,
        backgroundColor: $active ? theme.palette.background.grey : '#ffffff',
        padding: '16px 0',
        borderRadius: '8px 8px 0 0',
        position: 'relative',

        // ** 동적 보더 설정
        // 보더 탑
        borderTop: $position === 'right' && $active ? borderColor : $position === 'left' && $active ? borderColor : transparentBorder,

        // 보더 라이트
        borderRight: $position === 'right' && $active ? borderColor : $position === 'left' && $active ? borderColor : transparentBorder,

        // 보더 레프트
        borderLeft: $position === 'left' && $active ? borderColor : 'right' && $active ? borderColor : transparentBorder,

        // 보더 바텀
        breakpoint: [
            { down: 'md', padding: '12px 0' },
            { down: 'sm', padding: '8px 0' },
        ],

        '&::after': {
            position: 'absolute',
            content: '""',
            width: $position === 'left' ? '101%' : '100.5%',
            bottom: '0px',
            left: $position === 'left' ? '0%' : '-1px',
            height: '1px',
            backgroundColor: $active
                ? 'transparent' // 활성화된 탭은 안 보이도록 투명 처리
                : 'rgba(0, 0, 0, 0.2)', // 비활성화된 탭은 아래줄 유지
        },
    }
})

const MyCoupon = () => {
    // const [activeTab, setActiveTab] = useState('available')
    const [activeTab, setActiveTab] = useState(true)

    const tabs = [
        { key: true, label: '사용 가능 쿠폰', position: 'left' },
        { key: false, label: '사용 완료 쿠폰', position: 'right' },
    ]

    return (
        <Layout>
            <Title>MY 쿠폰</Title>
            <Container>
                <StatusContainer>
                    <LabelWrap>
                        <Label>사용 가능 쿠폰 </Label>
                        <LabelValue>1</LabelValue>
                    </LabelWrap>
                </StatusContainer>
                <DetailContainer>
                    <TabContainer>
                        {tabs.map(({ key, label, position }) => (
                            <StyledTab
                                key={key}
                                $active={activeTab === key} // ✅ Boolean 값으로 비교 (문자열 X)
                                $position={position}
                                onClick={() => setActiveTab(key)}>
                                {label}
                            </StyledTab>
                        ))}
                    </TabContainer>
                    <ListContainer $active={activeTab === 'available'}>
                        <CouponWrap>
                            <Coupon>
                                <CouponDiscount>
                                    <Typography className="coupon-discount">3000원</Typography>
                                </CouponDiscount>
                                <CouponInfo>
                                    <Label>쿠폰명 설명</Label>
                                    <Title>할인금액</Title>
                                </CouponInfo>
                            </Coupon>
                            <Coupon></Coupon>
                            <Coupon></Coupon>
                            <Coupon></Coupon>
                        </CouponWrap>
                    </ListContainer>
                </DetailContainer>
            </Container>
        </Layout>
    )
}

export default MyCoupon
