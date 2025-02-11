import React, { useState } from 'react'
import { TextField, Button, Typography, Divider, IconButton } from '@mui/material'
import { Container } from '@mui/system'
import { CheckCircle, RadioButtonUnchecked } from '@mui/icons-material'

const KakaoLogin = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [loading, setLoading] = useState(false)
   const [loginButtonContent, setLoginButtonContent] = useState('로그인')
   const [checked, setChecked] = useState(false)

   const handleLogin = (e) => {
      e.preventDefault()
      setLoading(true)
      setLoginButtonContent('로딩 중입니다.')

      setTimeout(() => {
         setLoading(false)
         setLoginButtonContent('로그인')
         alert('로그인 성공!')
      }, 2000)
   }

   const handleToggle = () => {
      setChecked(!checked)
   }

   return (
      <Container
         sx={{
            maxWidth: '900px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
         }}
      >
         <Typography variant="h4" align="center" gutterBottom sx={{ paddingTop: '50px', paddingBottom: '50px', fontSize: '50px' }}>
            kakao
         </Typography>

         <form onSubmit={handleLogin} style={{ width: '800px', maxWidth: '1280px', color: '#EEEEEE', border: '1px solid #EEEEEE', padding: '50px' }}>
            <TextField label="카카오메일 아이디, 이메일, 전화번호" name="email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} variant="standard" />

            <TextField label="비밀번호" type="password" name="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} variant="standard" />

            <div style={{ display: 'flex', alignItems: 'center' }}>
               <IconButton
                  onClick={handleToggle}
                  sx={{
                     width: 30,
                     height: 30,
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                     padding: 0,
                  }}
               >
                  {checked ? <CheckCircle sx={{ color: '#FFEB3B', fontSize: 20 }} /> : <RadioButtonUnchecked sx={{ color: 'gray', fontSize: 20 }} />}
               </IconButton>
               <Typography variant="body2" sx={{ marginLeft: 1, color: 'gray' }}>
                  간편로그인 정보 저장
               </Typography>
            </div>

            <Button
               variant="contained"
               fullWidth
               type="submit"
               disabled={loading}
               style={{
                  backgroundColor: '#FFEB3B',
                  color: '#000000',
                  margin: '20px 0',
                  fontWeight: 'bold',
               }}
            >
               {loginButtonContent}
            </Button>

            <Divider sx={{ width: '100%', display: 'flex', alignItems: 'center', marginY: 2 }}>
               <Typography variant="body2" color="textSecondary" sx={{ mx: 2 }}>
                  또는
               </Typography>
            </Divider>

            <Button
               variant="outlined"
               fullWidth
               style={{
                  backgroundColor: '#EEEEEE',
                  color: '#000000',
                  margin: '20px 0',
                  border: '1px solid ',
               }}
            >
               QR코드 로그인
            </Button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
               <Typography variant="body2" align="center" sx={{ fontSize: '13px', color: 'black' }}>
                  회원가입
               </Typography>

               <div style={{ display: 'flex', gap: '20px' }}>
                  <Typography variant="body2" align="center" sx={{ fontSize: '13px', color: 'black' }}>
                     계정찾기
                  </Typography>
                  <Typography variant="body2" align="center" sx={{ fontSize: '13px', color: 'black' }}>
                     비밀번호찾기
                  </Typography>
               </div>
            </div>
         </form>

         <Typography variant="body2" align="center" sx={{ mt: 2, fontSize: '13px' }}>
            한국어 | 이용약관 | 개인정보 처리방침 | 고객센터 © Kakao Corp.
         </Typography>
      </Container>
   )
}

export default KakaoLogin
