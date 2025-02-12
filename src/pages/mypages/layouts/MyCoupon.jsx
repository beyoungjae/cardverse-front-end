import { useState } from 'react'

import { createText, createBox } from '../../../utils/muiSystem'
import { Layout, StatusContainer } from './'
import { borderBottom } from '@mui/system'

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
const ListWrap = createBox((theme) => ({
    padding: '32px',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    breakpoint: [
        { down: 'md', padding: '16px', },
        { down: 'sm', padding: '12px', gap: '12px', },
    ],
    // alignItems: 'center',
}))

// ** Item 스타일
const ListItem = createBox((theme) => ({
    width: '100%',
    border: '1px solid black',
    padding: '32px',
    boxSizing: 'border-box',
    aspectRatio: '3 / 0.9',
}))

const StyledTab = createBox((theme, { $active, $position }) => {
    const borderColor = '1px solid rgba(0,0,0,0.2)' // ✅ 기본 테두리 색상
    const transparentBorder = '1px solid rgba(0,0,0,0)' // ✅ 투명한 테두리
    return {
        // ...commonBodyText,
        fontSize: 'clamp(0.75rem, 1.8vw, 1rem)',
        width: '50%',
        flex: '0.5',
        textAlign: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontWeight: $active ? 600 : 400,
        color: $active ? theme.palette.text.primary : theme.palette.text.secondary,
        backgroundColor: $active ? theme.palette.background.grey : '#ffffff',
        padding: '16px 0',
        borderRadius: '8px 8px 0 0',

        // ** 동적 보더 설정
        // 보더 탑
        borderTop: $position === 'right' && $active ? borderColor : $position === 'left' && $active ? borderColor : transparentBorder,

        // 보더 라이트
        borderRight: $position === 'right' && $active ? borderColor : $position === 'left' && $active ? borderColor : transparentBorder,

        // 보더 레프트
        borderLeft: $position === 'left' && $active ? borderColor : 'right' && $active ? borderColor : transparentBorder,

        // 보더 바텀
        borderBottom: $active ? transparentBorder : borderColor,
        breakpoint: [
            { down: 'md', padding: '12px 0' },
            { down: 'sm', padding: '8px 0' },
        ],
    }
})

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
                        <StyledTab $active={activeTab === 'available'} $position="left" onClick={() => setActiveTab('available')}>
                            사용 가능 쿠폰
                        </StyledTab>
                        <StyledTab $active={activeTab === 'used'} $position="right" onClick={() => setActiveTab('used')}>
                            사용 완료 쿠폰
                        </StyledTab>
                    </TabContainer>
                    <ListContainer>
                        <ListWrap>
                            <ListItem></ListItem>
                            <ListItem></ListItem>
                            <ListItem></ListItem>
                            <ListItem></ListItem>
                        </ListWrap>
                    </ListContainer>
                </DetailContainer>
            </Container>
        </Layout>
    )
}

export default MyCoupon
