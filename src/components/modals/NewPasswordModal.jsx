import React, { useState } from 'react'
import { Box, Typography, TextField, Button, IconButton, InputAdornment, Alert } from '@mui/material'
import { Visibility, VisibilityOff, Lock, Error } from '@mui/icons-material'
import { styled } from '@mui/system'

import { isNewPasswordValid } from '../../utils/validation'

const StyledText = styled(Typography)(({ theme }) => ({
   whiteSpace: 'pre-line',
   fontSize: '1.1em',

   [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
   },
}))

const StyledForm = styled('form')(({ theme }) => ({
   background: 'white',
   padding: '40px 0px',
   borderRadius: '10px',
   textAlign: 'center',
   display: 'flex',
   flexDirection: 'column',
   gap: '40px',
   [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
   },
}))

const NewPasswordModal = ({ onClose }) => {
   const [currentPassword, setCurrentPassword] = useState('')
   const [newPassword, setNewPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [showPassword, setShowPassword] = useState(false)
   const [errorMessage, setErrorMessage] = useState('')
   const [successMessage, setSuccessMessage] = useState('')

   const handlePasswordVisibility = () => {
      setShowPassword(!showPassword)
   }

   const handlePasswordChange = () => {
      if (!isNewPasswordValid(newPassword)) {
         setErrorMessage(`비밀번호는 영문 + 특수문자 포함\n8자리 이상으로 설정해주세요.`)
         setSuccessMessage('')
         return
      }

      if (newPassword !== confirmPassword) {
         setErrorMessage('비밀번호가 일치하지 않습니다.')
         setSuccessMessage('')
         return
      }
      setSuccessMessage('비밀번호가 성공적으로 변경되었습니다!')
      setErrorMessage('')
   }

   const handleBlur = (field) => {
      if (field === 'newPassword' && newPassword.trim() === '') {
         setErrorMessage('새 비밀번호는 빈칸일 수 없습니다.')
      } else if (field === 'confirmPassword' && confirmPassword.trim() === '') {
         setErrorMessage('새 비밀번호 확인은 빈칸일 수 없습니다.')
      }
   }

   const handleSubmit = styled(Box)(({ theme }) => ({}))

   return (
      <StyledForm>
         <Typography variant="h3" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Lock /> 비밀번호 변경
         </Typography>

         <TextField
            label="아이디 (숨김)"
            type="text"
            value=""
            autoComplete="username"
            style={{ display: 'none' }} // 시각적으로 숨김
            inputProps={{
               'aria-hidden': true,
               tabIndex: -1, // 포커스되지 않도록
            }}
         />

         <TextField
            label="새 비밀번호"
            type={showPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            onBlur={() => handleBlur('newPassword')}
            fullWidth
            required
            error={!!errorMessage}
            variant="standard" // 아래쪽 라인만 생김
            autoComplete="none"
            InputProps={{
               endAdornment: (
                  <InputAdornment position="end">
                     <IconButton onClick={handlePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                     </IconButton>
                  </InputAdornment>
               ),
            }}
         />

         <TextField
            label="새 비밀번호 확인"
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            required
            error={!!errorMessage}
            variant="standard" // 아래쪽 라인만 생김
            autoComplete="new-password"
            InputProps={{
               endAdornment: (
                  <InputAdornment position="end">
                     <IconButton onClick={handlePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                     </IconButton>
                  </InputAdornment>
               ),
               form: {
                  name: '', // HTML 유효성 검사 비활성화
               },
            }}
         />

         {errorMessage && (
            <Alert severity="error" icon={<Error />} sx={{ textAlign: 'left' }}>
               <StyledText>{errorMessage}</StyledText>
            </Alert>
         )}

         {successMessage && (
            <Alert severity="success" sx={{ textAlign: 'left' }}>
               {successMessage}
            </Alert>
         )}

         {/* 버튼 그룹 */}
         <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
            <Button variant="contained" color="grey" onClick={onClose}>
               닫기
            </Button>
            <Button variant="contained" color="error" onClick={handlePasswordChange}>
               변경하기
            </Button>
         </Box>
      </StyledForm>
   )
}

export default NewPasswordModal
