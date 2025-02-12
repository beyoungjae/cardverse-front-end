import { Box, Typography, Button } from '@mui/material'
import { createBox, createText } from '../../../utils/muiSystem'
import { Layout } from './'

const Title = createText((theme) => ({
    variant: 'h3',
    fontSize: 'clamp(1.4rem, 3vw, 1.75rem)',
    fontFamily: theme.typography.fontFamily.split(',')[0],
}))

const LabelContainer = createBox((theme) => ({}))

const LabelWrap = createBox((theme) => ({
    display: 'flex',
    backgroundColor: theme.palette.background.default,
    width: '100%',
    gap: theme.spacing(2),
    padding: theme.palette.spacing.md,
    border: 'none',
    borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
    breakpoint: [
        // { down: 'lg', borderRadius: theme.palette.borderRadius.large }],
        { down: 'md', borderRadius: theme.palette.borderRadius.md },
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

// const Wrapper = () => {}

const MyProfile = () => {
    const user = {
        nickname: '홍길동',
        email: 'hong@example.com',
        createdAt: '2024-01-01',
        lastLoginAt: '2024-02-01',
    }

    return (
        // <ProfileContainer>
        <Layout>
            <Title>MY 정보</Title>

            <LabelContainer>
                <LabelWrap>
                    <Label>닉네임 </Label>
                    <LabelValue>엉망진창</LabelValue>
                </LabelWrap>
                <LabelWrap>
                    <Label>email </Label>
                    <LabelValue>example123@gmail.com</LabelValue>
                </LabelWrap>
                <LabelWrap>
                    <Label>가입일시 </Label>
                    <LabelValue>25년 2월 1일</LabelValue>
                </LabelWrap>
                <LabelWrap>
                    <Label>최근 로그인 </Label>
                    <LabelValue>25년 2월 13일</LabelValue>
                </LabelWrap>
            </LabelContainer>
        </Layout>
        // </ProfileContainer>
    )
}

export default MyProfile

/* 

 <Box sx={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <Typography variant="h5" fontWeight="bold">
                내 프로필
            </Typography>

            
            <NickBox>
                hi
            </NickBox>
            <NickBox2>
                asdsadsadsad
            </NickBox2>

            <Box sx={{ mt: 2, p: 2, border: '1px solid #ddd', borderRadius: '8px' }}>
                <Typography variant="body1">
                    <strong>닉네임:</strong> {user.nickname}
                </Typography>
                <Typography variant="body1">
                    <strong>이메일:</strong> {user.email}
                </Typography>
                <Typography variant="body1">
                    <strong>가입일:</strong> {user.createdAt}
                </Typography>
                <Typography variant="body1">
                    <strong>최근 로그인:</strong> {user.lastLoginAt}
                </Typography>
            </Box>

            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                비밀번호 변경
            </Button>
        </Box>
*/
