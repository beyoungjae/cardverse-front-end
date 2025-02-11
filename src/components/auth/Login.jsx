import React, { useState } from 'react'
import { TextField, Button, Typography, Container, Box } from '@mui/material'
import { Link } from 'react-router-dom'

const Login = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [loading, setLoading] = useState(false)
   const [loginButtonContent, setLoginButtonContent] = useState('로그인')

   const handleLogin = (e) => {
      e.preventDefault()
      setLoading(true)
      setLoginButtonContent('로그인 중입니다.')
      setTimeout(() => {
         setLoading(false)
         setLoginButtonContent('로그인')
         alert('로그인 성공!')
      }, 2000)
   }

   return (
      <Container
         sx={{
            maxWidth: 'md',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
         }}
      >
         {/* 상단 배경 */}
         <Box
            sx={{
               backgroundImage: 'url(/images/위쪽.png)',
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               height: '40%',
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'center',
               alignItems: 'center',
               position: 'relative',
            }}
         >
            <Box
               sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
               }}
            />
            <Typography variant="h5" sx={{ marginBottom: '5px', zIndex: 1, color: 'white', fontSize: '45px', paddingTop: '50px' }}>
               로그인
            </Typography>
            <p style={{ zIndex: 1, color: 'white', fontSize: '14px', paddingBottom: 'px' }}>CAREVERSE에 오신 것을 환영합니다.</p>
         </Box>

         {/* 하단 배경 */}
         <Box
            sx={{
               height: '60%',
               backgroundColor: '#EEEEEE',
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'center',
               alignItems: 'center',
               padding: 4,
            }}
         >
            <div
               style={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: '30px',
                  width: '100%',
                  maxWidth: '480px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
               }}
            >
               <form onSubmit={handleLogin} style={{ width: '100%' }}>
                  <div>
                     이메일
                     <TextField label="이메일을 입력해 주세요." name="email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} variant="outlined" />
                  </div>
                  <div>
                     비밀번호
                     <TextField label="비밀번호를 입력해 주세요." type="password" name="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} variant="outlined" />
                  </div>
                  <Button
                     variant="contained"
                     fullWidth
                     type="submit"
                     disabled={loading}
                     sx={{
                        backgroundColor: '#B39DDB',
                        color: '#FFFFFF',
                        mt: 2,
                        mb: 2,
                     }}
                  >
                     {loginButtonContent}
                  </Button>
                  <Button
                     variant="contained"
                     component={Link}
                     fullWidth
                     to="/signup"
                     sx={{
                        backgroundColor: '#FFFFFF',
                        color: '#000000',
                     }}
                  >
                     회원가입
                  </Button>
                  <Typography variant="body2" color="textSecondary" align="center" sx={{ padding: '30px', fontSize: '10px' }}>
                     소셜아이디로 간편하게 로그인할 수 있습니다.
                  </Typography>

                  <Button
                     variant="standard"
                     component={Link}
                     fullWidth
                     to="/kaka"
                     sx={{
                        backgroundColor: '#FFEB3B',
                        color: '#000000',
                        borderRadius: '20px',
                        fontWeight: 'bold',
                        padding: '10px 0',
                        mt: 2,
                     }}
                  >
                     카카오로 3초 만에 시작하기
                  </Button>
               </form>
            </div>
         </Box>
      </Container>
   )
}

export default Login
