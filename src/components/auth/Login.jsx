import React, { useState } from 'react'
import { TextField, Button, Typography, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'

const Login = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const theme = useTheme()

   const handleLogin = (e) => {
      e.preventDefault()
      alert('로그인 성공!')
   }

   return (
      <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
         <Box
            sx={{
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'center',
               alignItems: 'center',
               width: '100%',
               maxWidth: '600px',
               backgroundColor: theme.palette.background.paper,
               borderRadius: theme.spacing(1),
               padding: theme.spacing(3),
               border: `1px solid ${theme.palette.divider}`,
               minHeight: '60vh',
               maxHeight: '80vh',
               marginTop: theme.spacing(5),
               marginBottom: theme.spacing(5),
            }}
         >
            <Typography
               variant="h4"
               align="center"
               gutterBottom
               sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '28px', sm: '35px', md: '40px' },
                  marginBottom: theme.spacing(2),
                  color: theme.palette.text.primary,
               }}
            >
               로그인
            </Typography>

            <Typography
               variant="body1"
               align="center"
               gutterBottom
               sx={{
                  color: theme.palette.text.secondary,
                  fontSize: { xs: '12px', sm: '14px' },
                  marginBottom: theme.spacing(4),
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
                  autoComplete="email"
                  sx={{
                     fontSize: { xs: '12px', sm: '14px' },
                     marginBottom: theme.spacing(2),
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
                  autoComplete="current-password"
                  sx={{
                     fontSize: { xs: '12px', sm: '14px' },
                     marginBottom: theme.spacing(2),
                  }}
               />
               <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  sx={{
                     backgroundColor: '#B699BB',
                     color: theme.palette.primary.contrastText,
                     border: `1px solid ${theme.palette.divider}`,
                     mt: 2,
                     mb: 2,
                     fontSize: { xs: '12px', sm: '14px' },
                     '&:hover': {
                        backgroundColor: '#B699BB',
                        borderColor: theme.palette.divider,
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
                     border: `1px solid ${theme.palette.divider}`,
                     color: theme.palette.text.primary,
                     fontSize: { xs: '12px', sm: '14px' },
                     '&:hover': {
                        borderColor: theme.palette.divider,
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
                     padding: theme.spacing(3),
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
   )
}

export default Login
