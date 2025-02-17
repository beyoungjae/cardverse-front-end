import { TextField, Button, Container, CircularProgress, InputAdornment, IconButton, MenuItem, Typography, Box, FormControlLabel, Checkbox, Grid, Card, CardContent } from '@mui/material'
import { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useTheme } from '@mui/material/styles'

const Signup = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [nickname, setNickname] = useState('')
   const [membershipType, setMembershipType] = useState('')
   const [showPassword, setShowPassword] = useState(false)
   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
   const [loading, setLoading] = useState(false)
   const [agreeTerms, setAgreeTerms] = useState(false)
   const theme = useTheme()

   const handleChange = (e) => {
      setMembershipType(e.target.value)
   }

   const handleSignup = () => {
      if (password !== confirmPassword) {
         alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.')
         return
      }
      if (!agreeTerms) {
         alert('체크박스를 체크하세요')
         return
      }
      setLoading(true)
      setTimeout(() => {
         setLoading(false)
         alert('회원가입이 완료되었습니다!')
      }, 1000)
   }

   return (
      <Container
         sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            paddingTop: { xs: theme.spacing(2), sm: theme.spacing(3), md: theme.spacing(5) },
            paddingBottom: theme.spacing(5),
            maxWidth: '100%',
         }}
      >
         <Box
            sx={{
               width: '100%',
               maxWidth: '600px',
               backgroundColor: theme.palette.background.paper,
               borderRadius: theme.shape.borderRadius.large,
               padding: { xs: theme.spacing(2), sm: theme.spacing(3), md: theme.spacing(4) },
               boxSizing: 'border-box',
               border: `1px solid ${theme.palette.divider}`,
            }}
         >
            <Typography
               variant="h4"
               align="center"
               gutterBottom
               sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '30px', sm: '35px', md: '40px' },
                  marginBottom: theme.spacing(2),
               }}
            >
               회원가입
            </Typography>
            <Typography
               variant="body1"
               align="center"
               gutterBottom
               sx={{
                  color: theme.palette.text.secondary,
                  fontSize: { xs: '12px', sm: '14px', md: '16px' },
                  marginBottom: theme.spacing(5),
               }}
            >
               회원이 되어 다양한 혜택을 경험해보세요!
            </Typography>

            <Grid container spacing={2}>
               <Grid item xs={12}>
                  <Typography variant="body1">이메일</Typography>
                  <TextField placeholder="이메일 (입력하신 이메일 주소로 인증번호가 발송됩니다)" variant="outlined" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
               </Grid>

               <Grid item xs={12}>
                  <Typography variant="body1">비밀번호</Typography>
                  <TextField
                     placeholder="비밀번호를 입력해주세요."
                     variant="outlined"
                     fullWidth
                     margin="normal"
                     type={showPassword ? 'text' : 'password'}
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     InputProps={{
                        endAdornment: (
                           <InputAdornment position="end">
                              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                 {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                           </InputAdornment>
                        ),
                     }}
                  />
               </Grid>

               <Grid item xs={12}>
                  <Typography variant="body1">비밀번호 확인</Typography>
                  <TextField
                     placeholder="비밀번호를 한번 더 입력해주세요."
                     variant="outlined"
                     fullWidth
                     margin="normal"
                     type={showConfirmPassword ? 'text' : 'password'}
                     value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                     InputProps={{
                        endAdornment: (
                           <InputAdornment position="end">
                              <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                 {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                           </InputAdornment>
                        ),
                     }}
                  />
               </Grid>

               <Grid item xs={12}>
                  <Typography variant="body1">닉네임</Typography>
                  <TextField placeholder="닉네임을 입력해주세요" variant="outlined" fullWidth margin="normal" value={nickname} onChange={(e) => setNickname(e.target.value)} />
               </Grid>

               <Grid item xs={12}>
                  <Typography variant="body1">가입유형</Typography>
                  <TextField select label="가입유형 (추천인 / 일반사용자 선택 가능)" value={membershipType} onChange={handleChange} fullWidth margin="normal" variant="outlined">
                     <MenuItem value="reference">추천인</MenuItem>
                     <MenuItem value="normal">일반사용자</MenuItem>
                  </TextField>
               </Grid>

               <Grid item xs={12}>
                  <Button
                     variant="contained"
                     color="primary"
                     onClick={handleSignup}
                     fullWidth
                     disabled={loading}
                     sx={{
                        mt: theme.spacing(2),
                        border: `1px solid ${theme.palette.divider}`,
                        backgroundColor: '#B699BB',
                        color: '#fff',
                        fontSize: { xs: '14px', sm: '16px' },
                        '&:hover': {
                           backgroundColor: '#B699BB',
                           borderColor: theme.palette.divider,
                        },
                     }}
                  >
                     {loading ? <CircularProgress size={25} sx={{ color: '#fff' }} /> : '회원가입'}
                  </Button>
               </Grid>
            </Grid>

            <Card sx={{ marginTop: theme.spacing(2), border: `1px solid ${theme.palette.divider}` }}>
               <CardContent sx={{ display: 'flex', textAlign: 'center' }}>
                  <FormControlLabel control={<Checkbox checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} />} label="로봇이 아닙니다." />
               </CardContent>
            </Card>
         </Box>
      </Container>
   )
}

export default Signup
