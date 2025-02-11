import { Box, Typography, Button } from '@mui/material';

// const Wrapper = () => {}

const MyProfile = () => {
     const user = {
        nickname: "홍길동",
        email: "hong@example.com",
        createdAt: "2024-01-01",
        lastLoginAt: "2024-02-01",
    };

    return (
        <Box sx={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
            <Typography variant="h5" fontWeight="bold">내 프로필</Typography>

            <Box sx={{ mt: 2, p: 2, border: "1px solid #ddd", borderRadius: "8px" }}>
                <Typography variant="body1"><strong>닉네임:</strong> {user.nickname}</Typography>
                <Typography variant="body1"><strong>이메일:</strong> {user.email}</Typography>
                <Typography variant="body1"><strong>가입일:</strong> {user.createdAt}</Typography>
                <Typography variant="body1"><strong>최근 로그인:</strong> {user.lastLoginAt}</Typography>
            </Box>

            {/* 비밀번호 변경 버튼 */}
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>비밀번호 변경</Button>
        </Box>)
}

export default MyProfile
