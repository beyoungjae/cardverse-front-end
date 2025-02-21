import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextField, Button, Box, Typography, CircularProgress, Alert } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { signup, clearMessages } from '../store/signupSlice'
import { signupSchema } from '../utils/validationSchema'

const Signup = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ resolver: yupResolver(signupSchema) })

   const dispatch = useDispatch()
   const { loading, successMessage, errorMessage } = useSelector((state) => state.signup)

   const onSubmit = (data) => {
      dispatch(signup(data))
   }

   return (
      <Box sx={{ width: '400px', padding: '32px', background: 'white', borderRadius: '8px', boxShadow: 3 }}>
         <Typography variant="h5" fontWeight="bold" mb={2}>
            회원가입
         </Typography>

         {/* 성공/에러 메시지 */}
         {successMessage && <Alert severity="success">{successMessage}</Alert>}
         {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

         {/* 이메일 입력 */}
         <TextField {...register('email')} label="이메일" fullWidth error={!!errors.email} helperText={errors.email?.message} sx={{ mb: 2 }} />

         {/* 비밀번호 입력 */}
         <TextField {...register('password')} type="password" label="비밀번호" fullWidth error={!!errors.password} helperText={errors.password?.message} sx={{ mb: 2 }} />

         {/* 비밀번호 확인 */}
         <TextField {...register('confirmPassword')} type="password" label="비밀번호 확인" fullWidth error={!!errors.confirmPassword} helperText={errors.confirmPassword?.message} sx={{ mb: 2 }} />

         {/* 가입하기 버튼 */}
         <Button onClick={handleSubmit(onSubmit)} variant="contained" fullWidth disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : '회원가입'}
         </Button>

         {/* 메시지 초기화 버튼 */}
         <Button onClick={() => dispatch(clearMessages())} variant="text" fullWidth sx={{ mt: 1 }}>
            메시지 초기화
         </Button>
      </Box>
   )
}

export default Signup
