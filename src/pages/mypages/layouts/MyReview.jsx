import React, { useState } from 'react'
import { createText, createBox } from '../../../utils/muiSystem'
import { Layout, StatusContainer, SubTitle, Container } from './'
import { styled } from '@mui/system'
import { Box, Typography } from '@mui/material'

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

const Label = createText((theme) => ({
    variant: 'body1',
    fontSize: 'clamp(0.9rem, 1.8vw, 1rem)',
    fontWeight: 'bold',
    minWidth: '80px',
}))

const LabelValue = createText((theme) => ({
    variant: 'body1',
    fontSize: 'clamp(0.9rem, 1.8vw, 1rem)',
}))

const DetailContainer = createBox((theme) => ({
    width: '100%',
    border: 'none',
}))

const TabContainer = createBox((theme) => ({
    width: '100%',
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
}))

/** 네비탭 스타일 **/
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

const ListContainers = createBox((theme) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '16px',
    backgroundColor: theme.palette.background.grey,
    borderLeft: '1px solid rgba(0,0,0,0.2)',
    borderRight: '1px solid rgba(0,0,0,0.2)',
    borderBottom: '1px solid rgba(0,0,0,0.2)',

    borderRadius: '0 0 8px 8px',

    breakpoint: [{ down: 'sm', padding: '8px' }],
}))

const ListContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '16px',
    backgroundColor: theme.palette.background.grey,
    borderLeft: '1px solid rgba(0,0,0,0.2)',
    borderRight: '1px solid rgba(0,0,0,0.2)',
    borderBottom: '1px solid rgba(0,0,0,0.2)',

    borderRadius: '0 0 8px 8px',
    [theme.bps.sm]: { padding: '8px' },
}))

const TemplateWrap = styled(Box)(({ theme }) => ({
    padding: '32px',
    backgroundColor: 'white',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '32px',
    [theme.bps.md]: {
        padding: '16px',
    },
    [theme.bps.sm]: {
        padding: '12px',
        gap: '12px',
        gridTemplateColumns: 'repeat(1, 1fr)',
    },
}))

const Template = styled(Box)(({ theme }) => ({
    width: '100%',
    boxSizing: 'border-box',
    aspectRatio: '3 / 4.5',
    backgroundColor: 'rgb(250,249,247)',
    display: 'flex',
    borderRadius: '8px',
    boxShadow: '2px 3px 2px 1px rgba(0,0,0,0.2)',
}))

const CouponDiscount = styled(Box)(({ theme }) => ({
    width: '25%',
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
        [theme.bps.xxs]: {
            letterSpacing: '0.05rem',
            textShadow: '0.5px 0.5px 1px rgba(0, 0, 0, 1)',
        },
    },
}))

const CouponInfo = styled(Box)(({ theme }) => ({
    width: '50%',
    maxWidth: '400px', // ✅ 특정 크기 이상으로 커지지 않도록 제한
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(4px, 1vw, 8px)', // ✅ 갭도 자동 조정
    // padding: 'clamp(10px, 2vw, 24px)', // ✅ 패딩도 가변 조정
    padding: 'calc(4px + 1vw)', // ✅ padding도 동적 조절
    backgroundColor: 'white',
    position: 'relative',
    borderRadius: '0 8px 8px 0',
    '& .coupon-label': {
        fontSize: 'clamp(0.5rem, 2.5vw, 1.6rem)', // ✅ 자동 조절
    },
}))

const CouponDDay = styled(Box)(({ theme }) => ({
    width: '25%',
    backgroundColor: 'yellow',
    display: 'flex',
    borderRadius: '0 8px 8px 0',
    flexDirection: 'column',
    gap: 'calc(0.5rem + 0.5vw)', // ✅ 글씨 크기에 비례하여 자동 조정
    justifyContent: 'space-between',
    padding: 'calc(4px + 1vw)', // ✅ padding도 동적 조절
    alignItems: 'flex-end',
    '& .coupon-expiration': {
        fontSize: 'clamp(0.38rem, 1.5vw, 1.0rem)',
    },
    '& .coupon-d-day': {
        fontSize: 'clamp(0.7rem, 3vw, 1.8rem)',
        fontWeight: 'bold',
    },
}))

const MyTemplate = () => {
    const [activeTab, setActiveTab] = useState(true)
    const [visibleCount, setVisibleCount] = useState(4)

    const tabs = [
        { key: true, label: '리뷰', position: 'left' },
        { key: false, label: '문의', position: 'right' },
    ]

    const templates = [
        { id: 1, image: '이미지', label: '초대장', status: 'active', isPaid: true },
        { id: 2, image: '이미지', label: '초대장', status: 'active', isPaid: true },
        { id: 3, image: '이미지', label: '초대장', status: 'draft', isPaid: false },
        { id: 4, image: '이미지', label: '초대장', status: 'active', isPaid: true },
        { id: 5, image: '이미지', label: '초대장', status: 'active', isPaid: false },
        { id: 6, image: '이미지', label: '초대장', status: 'active', isPaid: false },
        { id: 7, image: '이미지', label: '초대장', status: 'active', isPaid: true },
    ]

    const handleShowMore = () => {
        setVisibleCount((prev) => prev + 2)
    }
    const handleToggleTab = () => {
        setActiveTab((prev) => !prev)
        setVisibleCount((prev) => (prev = 4))
    }
    return (
        <Layout>
            <Container>
                <SubTitle>MY 리뷰 & 문의</SubTitle>
                <StatusContainer>
                    <LabelWrap>
                        <Label>작성 리뷰 : </Label>
                        <LabelValue></LabelValue>
                    </LabelWrap>{' '}
                    <LabelWrap>
                        <Label>문의 내역 : </Label>
                        <LabelValue></LabelValue>
                    </LabelWrap>
                </StatusContainer>
                {/* {tabs.map()} */}
                <DetailContainer>
                    <TabContainer>
                        {tabs.map(({ key, label, position }) => (
                            <StyledTab
                                key={key}
                                $active={activeTab === key} // ✅ Boolean 값으로 비교 (문자열 X)
                                $position={position}
                                onClick={handleToggleTab}>
                                {label}
                            </StyledTab>
                        ))}
                    </TabContainer>
                    <ListContainer>
                        <TemplateWrap>
                            {templates.slice(0, visibleCount).map(({ id, label, image, status, isPaid }) => (
                                <React.Fragment key={id}>
                                    <Template></Template>
                                </React.Fragment>
                            ))}
                        </TemplateWrap>
                        {visibleCount < templates.length && <MoreButton onClick={handleShowMore}>남은 수량 ({templates.length - visibleCount}개)</MoreButton>}
                    </ListContainer>
                </DetailContainer>
            </Container>
        </Layout>
    )
}

const MoreButton = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    marginTop: theme.spacing(3),
    color: theme.palette.primary.main,
    fontWeight: 600,
    '& .arrow': {
        animation: 'bounce 2s infinite',
        fontSize: '1rem',
    },
    '@keyframes bounce': {
        '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
        '40%': { transform: 'translateY(-10px)' },
        '60%': { transform: 'translateY(-5px)' },
    },
}))

export default MyTemplate
