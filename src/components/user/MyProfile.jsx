import { Box, Typography, Button } from '@mui/material'
import { createBox, createText } from '../../utils/muiSystem'

const NickBox = createBox({
    width: '100%',
    border: '1px solid black',
    borderRadius: '12px',
    height: '40px',
    backgroundColor: 'red',
})

const NickBox2 = createBox((theme) => ({
    width: '100%',
    border: '1px solid black',
    borderRadius: '12px',
    height: '40px',
    backgroundColor: theme.palette.background.default,
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
    breakpoint: [{ down: 'lg', borderRadius: theme.palette.borderRadius.large }],
}))

const ProfileContainer = createBox((theme) => ({
    width: '800px',
    margin: '0 auto',
    border: 'none',
    boxShadow: theme.shadows[2],
    borderRadius: '5px',
    padding: theme.palette.spacing.lg,
    breakpoint: [{ down: 848, width: '100%' }],
}))

const Title = createText((theme) => ({
    variant: 'h3',
}))

const ProfileWrapper = createBox((theme) => ({
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
    fontWeight: 'bold',
    // flex: '0.1',
    minWidth: '80px',
}))

const LabelValue = createText((theme) => ({
    variant: 'body1',
    // flex: '0.9',
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
        <ProfileContainer>
            <Title>내 프로필</Title>

            <ProfileWrapper>
                <Label>닉네임 </Label>
                <LabelValue>엉망진창</LabelValue>
            </ProfileWrapper>
            <ProfileWrapper>
                <Label>email </Label>
                <LabelValue>example123@gmail.com</LabelValue>
            </ProfileWrapper>
            <ProfileWrapper>
                <Label>가입일시 </Label>
                <LabelValue>25년 2월 1일</LabelValue>
            </ProfileWrapper>
            <ProfileWrapper>
                <Label>최근 로그인 </Label>
                <LabelValue>25년 2월 13일</LabelValue>
            </ProfileWrapper>
        </ProfileContainer>
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
