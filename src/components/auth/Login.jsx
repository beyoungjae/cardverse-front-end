import React, { useState, useEffect } from 'react'
import { TextField, Typography, Box } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import KakaoLogin from './KakaoLogin'
import { styled } from '@mui/system'

const Button = styled('button')(({}) => ({
    backgroundColor: '#B699BB',
    color: '#000',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 15px',
    fontSize: '16px',
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
}))

const Container = styled(Box)(({}) => ({
    padding: '32px',
    maxWidth: '600px',
    margin: '32px auto',
    border: '1px solid black',
    borderRadius: '8px',
}))

/* 
   sx={{
                                border: '1px solid #C6C6C6',
                                color: 'black',
                                fontSize: { xs: '12px', sm: '14px' },
                                '&:hover': {
                                    borderColor: '#C6C6C6',
                                },
                            }}
*/

/* 

backgroundColor: '#B699BB',
                                color: 'white',
                                border: '1px solid #C6C6C6',
                                mt: 2,
                                mb: 2,
                                fontSize: { xs: '12px', sm: '14px' },
                                '&:hover': {
                                    backgroundColor: '#B699BB',
                                    borderColor: '#C6C6C6',
*/

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
            <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{
                    fontWeight: 'bold',
                    fontSize: { xs: '28px', sm: '35px', md: '40px' },
                    marginBottom: '20px',
                    color: 'black',
                }}>
                로그인
            </Typography>
            <Typography
                variant="body1"
                align="center"
                gutterBottom
                sx={{
                    color: '#666666',
                    fontSize: { xs: '12px', sm: '14px' },
                    marginBottom: '40px',
                }}>
                CARDVERSE에 오신 것을 환영합니다.
            </Typography>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <TextField
                    placeholder="이메일을 입력해 주세요."
                    name="email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    sx={{
                        fontSize: { xs: '12px', sm: '14px' },
                    }}
                />
                <TextField
                    placeholder="비밀번호를 입력해 주세요."
                    type="password"
                    name="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                    sx={{
                        fontSize: { xs: '12px', sm: '14px' },
                    }}
                />
                <Button fullWidth type="submit">
                    로그인
                </Button>
                <Button className="signup-btn" component={Link} fullWidth to="/signup">
                    회원가입
                </Button>
            </form>
            <Typography
                variant="body2"
                color="textSecondary"
                align="center"
                sx={{
                    padding: '30px',
                    fontSize: { xs: '8px', sm: '10px' },
                }}>
                소셜아이디로 간편하게 로그인할 수 있습니다.
            </Typography>
            <div style={{ marginTop: '10px' }}>
                <Button className="kakao-login-btn" onClick={handleKakaoLogin}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/KakaoTalk_logo.svg" alt="kakao" style={{ width: '20px', height: '20px' }} />
                    카카오로 로그인하기
                </Button>
            </div>
        </Container>
    )
}

export default Login
