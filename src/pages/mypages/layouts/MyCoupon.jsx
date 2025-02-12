import { useState } from 'react'

import { createText, createBox } from '../../../utils/muiSystem'
import { Layout } from './'

// ** 공통 기본 스타일
const commonStyles = {
    width: '100%',
    border: 'none',
    padding: '16px',
}

// ** Text 스타일
const Title = createText((theme) => ({
    variant: 'h3',
    fontSize: 'clamp(1.2rem, 3vw, 1.4rem)',
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

// ** Box 스타일
// * 쿠폰 wrap
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

// 쿠폰 현황 box
const StatusContainer = createBox((theme) => ({
    ...commonStyles,
    borderRadius: theme.palette.borderRadius.small,
    boxShadow: '0 0 1px 0.2px rgba(0,0,0,0.54)',
}))

// 라벨 wrap
const LabelWrap = createBox((theme) => ({
    display: 'flex',
    backgroundColor: theme.palette.background.default,
    width: '100%',
    gap: theme.spacing(2),
    padding: theme.palette.spacing.md,
    border: 'none',
    breakpoint: [{ down: 'md', borderRadius: theme.palette.borderRadius.md }],
}))

// 쿠폰내역 box
const DetailContainer = createBox((theme) => ({
    ...commonStyles,
    borderRadius: theme.palette.borderRadius.small,
    boxShadow: '0 0 1px 0.2px rgba(0,0,0,0.54)',
}))

// 쿠폰내역 전환 탭
const TabContainer = createBox((theme) => ({
    width: '100%',
    padding: 0,
    margin: 0,
    display: 'flex',
}))
const StyledTab = createBox((theme) => ({
    width: '50%',
    flex: '0.5',
    textAlign: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
}))

const MyCoupon = () => {
    const [activeTab, setActiveTab] = useState('available')

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
                        <StyledTab onClick={() => setActiveTab('available')}>사용 가능 쿠폰</StyledTab>
                        <StyledTab>사용 완료 쿠폰</StyledTab>
                    </TabContainer>
                </DetailContainer>
            </Container>
        </Layout>
    )
}

export default MyCoupon
