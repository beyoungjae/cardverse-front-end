import React, { useState, useEffect } from 'react'
import { TextField, Typography, Box } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { styled } from '@mui/system'

const Container = styled(Box)(({ theme }) => ({
    padding: '32px',
    width: '100%',
    maxWidth: '500px',
    margin: '100px auto',
    border: '1px solid #bbbbbb',
    borderRadius: '8px',
    minWidth: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '60px',
    backgroundColor: '#fcfcfc',

    '& > *': {
        width: '100%',
        textAlign: 'center',
    },

    [theme.breakpoints.down('md')]: {
        margin: '80px auto',
    },
    [theme.breakpoints.down('sm')]: {
        gap: '40px',
        padding: '24px 40px',
        margin: '0 auto',
        border: 'none',
        borderRadius: 0,
        backgroundColor: 'transparent',
    },
}))

const Title = styled(Typography)(({ theme }) => ({
    position: 'relative',

    '&::after': {
        content: '"CARDVERSE에 오신 것을 환영합니다."',
        position: 'absolute',
        left: '50%',
        width: '100%',
        bottom: '-80%',
        fontSize: '1.0rem',
        fontWeight: 'normal',
        color: '#c0c0c0',
        transform: 'translateX(-50%)',
        [theme.breakpoints.down('md')]: { bottom: '-110%', fontSize: '0.9rem' },
        [theme.breakpoints.down('sm')]: { bottom: '-90%', fontSize: '0.7rem' },
    },
    [theme.breakpoints.down('md')]: { fontSize: '1.5rem' },
    [theme.breakpoints.down('sm')]: { fontSize: '1.3rem' },
}))

const InputField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-input': {
        fontSize: '1rem', // 기본 폰트 크기
        [theme.breakpoints.down('md')]: {
            fontSize: '0.9rem', // md 이하에서는 작게
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.8rem', // sm 이하에서는 더 작게
            padding: '13px',
        },
        [theme.breakpoints.down(480)]: {
            fontSize: '0.7rem', // 480px 이하에서는 12px
            padding: '12px',
        },
    },

    [theme.breakpoints.down('md')]: {},
    [theme.breakpoints.down('sm')]: {},
    [theme.breakpoints.down(480)]: {},
}))

const Button = styled('button')(({ theme }) => ({
    backgroundColor: '#B699BB',
    color: '#000',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 15px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',

    '&:hover': {
        backgroundColor: '#a98bae',
    },
    '&.kakao-login-btn': {
        backgroundColor: '#ffe812',
    },

    '&.signup-btn': {
        backgroundColor: '#ffffff',
        border: '1px solid #cccccc',
    },
    '&.signup-btn:hover': {
        backgroundColor: '#f5f5f5',
    },

    [theme.breakpoints.down('md')]: {
        padding: '8px 12px',

        fontSize: '0.85rem',
    },
    [theme.breakpoints.down('sm')]: {
        padding: '8px 10px',
        fontSize: '0.7rem',
    },
}))

const Form = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    [theme.breakpoints.down('md')]: {
        gap: '24px',
    },
    [theme.breakpoints.down('sm')]: {
        gap: '16px',
    },
}))

const FormContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',

    '&.Form-btn': {
        gap: '8px',
        [theme.breakpoints.down('md')]: { gap: '6px' },
        [theme.breakpoints.down('sm')]: { gap: '4px' },
    },
    [theme.breakpoints.down('md')]: { gap: '12px' },
    [theme.breakpoints.down('sm')]: { gap: '8px' },
}))

const LoginWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
}))

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (window.Kakao) {
            const Kakao = window.Kakao
            if (!Kakao.isInitialized()) {
                Kakao.init('YOUR_KAKAO_APP_KEY') // 🔹 카카오 JavaScript SDK 초기화
            }
        }
    }, [])

    const handleKakaoLogin = () => {
        const Kakao = window.Kakao
        Kakao.Auth.login({
            success: (response) => {
                console.log('✅ 카카오 로그인 성공!')
                console.log('🔹 access_token:', response.access_token)

                // 🔹 카카오 API를 사용하여 사용자 정보 가져오기 (백엔드 없이 테스트 가능)
                Kakao.API.request({
                    url: '/v2/user/me',
                    success: (userResponse) => {
                        console.log('🔹 카카오 사용자 정보:', userResponse)
                        alert(`카카오 로그인 성공!\n닉네임: ${userResponse.kakao_account.profile.nickname}`)
                    },
                    fail: (error) => {
                        console.error('❌ 사용자 정보 요청 실패:', error)
                    },
                })
            },
            fail: (error) => {
                console.error('❌ 카카오 로그인 실패:', error)
            },
        })
    }
    const handleLogin = (e) => {
        e.preventDefault()
        alert('로그인 성공!')
    }

    //  const handleKakaoLogin = () => {
    //      const Kakao = window.Kakao
    //      Kakao.Auth.login({
    //          success: async (response) => {
    //              console.log('카카오 로그인 성공:', response)
    //              const { access_token } = response // 토큰 받아오기

    //              // ✅ 백엔드로 access_token 전송하여 회원 여부 확인
    //              const res = await fetch('https://your-api.com/auth/kakao', {
    //                  method: 'POST',
    //                  headers: { 'Content-Type': 'application/json' },
    //                  body: JSON.stringify({ access_token }),
    //              })

    //              const data = await res.json()

    //              if (data.isNewUser) {
    //                  navigate('/signup/kakao', { state: { access_token } }) // 신규 회원 → 회원가입 페이지로 이동
    //              } else {
    //                  console.log('기존 회원 로그인 성공:', data)
    //                  navigate('/dashboard') // 기존 회원이면 로그인 후 대시보드 이동
    //              }
    //          },
    //          fail: (error) => {
    //              console.error('카카오 로그인 실패:', error)
    //          },
    //      })
    //  }

    return (
        <Container>
            <Title variant="h2">로그인</Title>

            {/* <Title className="title-comment" variant="body1" align="center" gutterBottom>
                CARDVERSE에 오신 것을 환영합니다.
            </Title> */}
            <LoginWrapper>
                <Form onSubmit={handleLogin}>
                    <FormContainer>
                        <InputField
                            // 인풋 필드
                            placeholder="이메일을 입력해 주세요."
                            name="email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            //  variant="outlined"
                        />
                        <InputField
                            // 인풋 필드
                            placeholder="비밀번호를 입력해 주세요."
                            type="password"
                            name="password"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            //  variant="outlined"
                        />
                    </FormContainer>

                    <FormContainer className="Form-btn">
                        <Button fullWidth type="submit">
                            로그인
                        </Button>

                        <Button className="signup-btn" component={Link} fullWidth to="/signup">
                            회원가입
                        </Button>
                    </FormContainer>
                </Form>
                <div>
                    <Button
                        // 브레이크 포인트

                        className="kakao-login-btn"
                        onClick={handleKakaoLogin}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/KakaoTalk_logo.svg" alt="kakao" style={{ width: '20px', height: '20px' }} />
                        카카오로 간편 로그인
                    </Button>
                </div>
            </LoginWrapper>
        </Container>
    )
}

export default Login
