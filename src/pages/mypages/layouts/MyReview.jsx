import React, { useState, useCallback, useMemo } from 'react'
import { createText, createBox } from '../../../utils/muiSystem'
import { Layout, StatusContainer, SubTitle, Container } from './'
import { borderBottom, borderRadius, letterSpacing, styled } from '@mui/system'
import { Box, Typography } from '@mui/material'

const LabelWrap = styled(Box)(({ theme }) => ({
    display: 'flex',
    backgroundColor: theme.palette.background.default,
    width: '100%',
    gap: theme.spacing(2),
    padding: theme.palette.spacing.md,
    border: 'none',
    [theme.bps.md]: {
        borderRadius: theme.palette.borderRadius.medium,
    },
    [theme.bps.sm]: {
        padding: '8px',
    },
    [theme.bps.xs]: {
        boxShadow: 'none',
        border: '1px solid #dddddd',
        borderRadius: '4px',
    },
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
const StyledTabs = createBox((theme, { $active, $position }) => {
    const borderColor = '1px solid rgba(0,0,0,0.2)' // ✅ 기본 테두리 색상
    const transparentBorder = '1px solid rgba(0,0,0,0)' // ✅ 투명한 테두리
    // rtype
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

const StyledTab = styled('div')(({ theme, $active, $position }) => {
    const borderColor = '1px solid rgba(0,0,0,0.2)' // ✅ 기본 테두리 색상
    const transparentBorder = '1px solid rgba(0,0,0,0)' // ✅ 투명한 테두리

    return {
        fontSize: 'clamp(0.8rem, 1.8vw, 1rem)',
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
        letterSpacing: '12px',

        // ** 동적 보더 설정
        // 보더 탑
        borderTop: $position === 'right' && $active ? borderColor : $position === 'left' && $active ? borderColor : transparentBorder,

        // 보더 라이트
        borderRight: $position === 'right' && $active ? borderColor : $position === 'left' && $active ? borderColor : transparentBorder,

        // 보더 레프트
        borderLeft: $position === 'left' && $active ? borderColor : 'right' && $active ? borderColor : transparentBorder,

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

        [theme.bps.md]: { padding: '12px 0' },
        [theme.bps.sm]: { padding: '8px 0', letterSpacing: '6px' },
    }
})

const ListContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '8px',
    backgroundColor: theme.palette.background.grey,
    borderLeft: '1px solid rgba(0,0,0,0.2)',
    borderRight: '1px solid rgba(0,0,0,0.2)',
    borderBottom: '1px solid rgba(0,0,0,0.2)',

    borderRadius: '0 0 8px 8px',
    [theme.bps.sm]: { padding: '3px' },
}))

const ListWrap = styled(Box)(({ theme }) => ({
    padding: '0px 8px',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    [theme.bps.md]: {
        padding: '16px',
    },
    [theme.bps.sm]: {
        padding: '12px',
        gap: '12px',
        gridTemplateColumns: 'repeat(1, 1fr)',
    },
}))

const ListItemBox = styled(Box)(({ theme }) => ({
    width: '100%',
    aspectRatio: '3 / 0.9',
    display: 'flex',
    flexDirection: 'column',
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.bps.xs]: {
        aspectRatio: '3 / 0.9',
    },
}))

const Item = styled(Box)(({ theme }) => ({
    width: '100%',
    padding: '8px',
    // border: '1px solid red',
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.2rem',

    '&.item-title': {
        flex: '0.2',
        position: 'relative',
    },

    '&.item-title::after': {
        content: '""',
        height: '1px',
        width: '99%',
        position: 'absolute',
        left: '50%',
        bottom: 0,
        backgroundColor: '#eeeeee',
        transform: 'translateX(-50%)',
    },

    '&.item-content': {
        flex: '0.8',
    },
    [theme.bps.md]: {
        fontSize: '1rem',
    },
    [theme.bps.sm]: {
        fontSize: '0.8rem',
    },
    [theme.bps.xs]: {
        fontSize: '0.75rem',
        padding: '4px 6px',

        '&.item-title': {
            fontSize: '0.7rem',
            flex: '0.3',
            position: 'relative',
        },

        '&.item-title::after': {
            content: '""',
            height: '0px',
            width: '99%',
            position: 'absolute',
            left: '50%',
            bottom: 0,
            backgroundColor: '#eeeeee',
            transform: 'translateX(-50%)',
        },

        '&.item-content': {
            flex: '0.7',
        },
    },
}))

function MyTemplate() {
    const [activeTab, setActiveTab] = useState(true)
    const [visibleCount, setVisibleCount] = useState(4)
    const [type, setType] = useState('review')

    const tabs = [
        { key: true, label: '리뷰', type: 'review', position: 'left' },
        { key: false, label: '문의', type: 'qna', position: 'right' },
    ]

    const posts = [
        { id: 1, type: 'review', title: '리뷰 1', status: 'active', isPaid: true },
        { id: 2, type: 'review', title: '리뷰 2', status: 'active', isPaid: true },
        { id: 3, type: 'qna', title: '문의 1', status: 'acitve', isPaid: false },
        { id: 4, type: 'qna', title: '문의 2', status: 'active', isPaid: true },
        { id: 5, type: 'qna', title: '문의 3', status: 'active', isPaid: false },
        { id: 6, type: 'review', title: '리뷰 3', status: 'active', isPaid: false },
        { id: 7, type: 'review', title: '리뷰 4', status: 'active', isPaid: true },
        { id: 8, type: 'qna', title: '문의 4', status: 'active', isPaid: false },
        { id: 9, type: 'qna', title: '문의 5', status: 'active', isPaid: false },
        { id: 10, type: 'review', title: '리뷰 5', status: 'active', isPaid: true },
        { id: 11, type: 'review', title: '리뷰 6', status: 'active', isPaid: true },
        { id: 12, type: 'review', title: '리뷰 7', status: 'active', isPaid: true },
        { id: 13, type: 'review', title: '리뷰 8', status: 'active', isPaid: true },
    ]

    // 필터링된 포스트 메모이제이션
    const filteredPosts = useMemo(() => posts.filter((post) => post.type === (activeTab ? 'review' : 'qna')), [posts, activeTab])

    const reviewCount = useMemo(() => posts.filter((post) => post.type === 'review').length, [posts])

    const qnaCount = useMemo(() => posts.filter((post) => post.type === 'qna').length, [posts])

    const handleShowMore = () => {
        setVisibleCount((prev) => prev + 10)
    }

    const handleActiveTab = useCallback(
        (key, type) => {
            if (activeTab !== key) {
                // setActiveTab((prev) => !prev)
                setActiveTab(key)
                setVisibleCount(4)
                setType(type)
            } else {
            }
        },
        [activeTab],
    )
    return (
        <Layout>
            <Container>
                <SubTitle>MY 리뷰 & 문의</SubTitle>

                <StatusContainer>
                    <LabelWrap>
                        <Label>내 리뷰 : </Label>
                        <LabelValue></LabelValue>
                    </LabelWrap>{' '}
                    <LabelWrap>
                        <Label>내 문의 : </Label>
                        <LabelValue></LabelValue>
                    </LabelWrap>
                </StatusContainer>

                <DetailContainer>
                    <TabContainer>
                        {tabs.map(({ key, label, position, type }) => (
                            <StyledTab
                                key={key}
                                $active={activeTab === key} // ✅ Boolean 값으로 비교 (문자열 X)
                                $position={position}
                                onClick={() => handleActiveTab(key, type)}>
                                {label}
                            </StyledTab>
                        ))}
                    </TabContainer>

                    <ListContainer>
                        <ListWrap>
                            {filteredPosts.slice(0, visibleCount).map(({ id, type, status, title }) => (
                                <ListItemBox key={id} className={type}>
                                    {/* <Item className="item-title"></Item> */}
                                    {/* <Item className="item-content"></Item> */}
                                    <Item className="item-title">{title}</Item>
                                    <Item className="item-content">아이템내용</Item>
                                </ListItemBox>
                            ))}
                        </ListWrap>

                        {filteredPosts.length > visibleCount && <MoreButton onClick={handleShowMore}>더보기 ({(activeTab ? reviewCount : qnaCount) - visibleCount}개)</MoreButton>}
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
