import React, { useState } from 'react'
import { TextField, Button, Typography, Box } from '@mui/material'
import { Link } from 'react-router-dom'

const Login = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const handleLogin = (e) => {
      e.preventDefault()
      alert('로그인 성공!')
   }

   return (
      <Box sx={{ width: '100%', height: '100vh' }}>
         <Box
            sx={{
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'center',
               alignItems: 'center',
               width: '100%',
               height: 'calc(100vh - 120px)',
               paddingTop: { xs: '20px', sm: '50px' },
               paddingBottom: '50px',
            }}
         >
            <Box
               sx={{
                  width: '100%',
                  maxWidth: '600px',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: { xs: '20px', sm: '30px' },
                  border: '1px solid #A4A4A4',
               }}
            >
               <Typography
                  variant="h4"
                  align="center"
                  gutterBottom
                  sx={{
                     fontWeight: 'bold',
                     fontSize: { xs: '28px', sm: '35px', md: '40px' },
                     marginBottom: '20px',
                     color: 'black',
                  }}
               >
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
                  }}
               >
                  CARDVERSE에 오신 것을 환영합니다.
               </Typography>

               <form onSubmit={handleLogin} style={{ width: '100%' }}>
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
                  <Button
                     variant="contained"
                     fullWidth
                     type="submit"
                     sx={{
                        backgroundColor: '#B699BB',
                        color: 'white',
                        border: '1px solid #C6C6C6',
                        mt: 2,
                        mb: 2,
                        fontSize: { xs: '12px', sm: '14px' },
                        '&:hover': {
                           backgroundColor: '#B699BB',
                           borderColor: '#C6C6C6',
                        },
                     }}
                  >
                     로그인
                  </Button>
                  <Button
                     variant="outlined"
                     component={Link}
                     fullWidth
                     to="/signup"
                     sx={{
                        border: '1px solid #C6C6C6',
                        color: 'black',
                        fontSize: { xs: '12px', sm: '14px' },
                        '&:hover': {
                           borderColor: '#C6C6C6',
                        },
                     }}
                  >
                     회원가입
                  </Button>

                  <Typography
                     variant="body2"
                     color="textSecondary"
                     align="center"
                     sx={{
                        padding: '30px',
                        fontSize: { xs: '8px', sm: '10px' },
                     }}
                  >
                     소셜아이디로 간편하게 로그인할 수 있습니다.
                  </Typography>

                  <Button
                     variant="contained"
                     component={Link}
                     fullWidth
                     to="/kaka"
                     sx={{
                        backgroundColor: '#FFEB3B',
                        color: '#000000',
                        borderRadius: '20px',
                        fontWeight: 'bold',
                        mt: 2,
                        fontSize: { xs: '12px', sm: '14px' },
                        '&:hover': {
                           backgroundColor: '#FFEB3B',
                        },
                     }}
                  >
                     카카오로 3초 만에 시작하기
                  </Button>
               </form>
            </Box>
         </Box>
      </Box>
   )
}

export default Login
