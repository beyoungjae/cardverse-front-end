import { styled } from '@mui/system'
import { Box, IconButton, TextField, Typography, Alert } from '@mui/material'

import { Visibility, VisibilityOff, Lock, Error } from '@mui/icons-material'

import CloseIcon from '@mui/icons-material/Close'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isEmailValid } from '../../utils/validation'

import useMessage from '../../utils/useMessage'
import { bps } from '../../styles/responsiveStyles'

const Wrapper = styled(Box)(({ theme }) => ({
   display: 'flex',
   gap: '32px',
   justifyContent: 'center',
   alignItems: 'center',
   alignItems: 'stretch',
   // align-items: stretch;
   '&.verify-code-wrap': {
      gap: '16px',
      ...bps(theme, {
         1600: { gap: '13px' },
         1280: { gap: '10px' },
         960: { gap: '6px' },
         600: { gap: '4px' },
      }),
   },

   border: '1px solid red',
   ...bps(theme, {
      1600: { gap: '26px' },
      1280: { gap: '20px' },
      960: { gap: '12px' },
      600: { gap: '8px' },
   }),
}))

const Section = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '8px',

   ...bps(theme, {
      1600: { gap: '7px' },
      1280: { gap: '6px' },
      960: { gap: '5px' },
      600: { gap: '4px' },
   }),
}))

const StyledText = styled(Typography)(({ theme }) => ({
   width: '100%',
   textAlign: 'start',
   padding: '5px 16px',
   boxSizing: 'border-box',
   minWidth: 0,

   '&.title': {
      textAlign: 'center',
      padding: '0 16px',
   },
   '&.valid': {
      [theme.breakpoints.down(480)]: {
         padding: '0px 0px',
         fontSize: '0.9rem',
      },
   },
   [theme.breakpoints.down('lg')]: { fontSize: '1.3rem' },

   [theme.breakpoints.down('md')]: {},
   [theme.breakpoints.down('sm')]: {},
   [theme.breakpoints.down(480)]: {
      fontSize: '1.3rem',
   },
}))

const SubTitle = styled(Typography)(({ theme }) => ({
   textAlign: 'start',
   fontSize: '1rem',
   [theme.breakpoints.down(1600)]: { fontSize: '0.9rem' },
   [theme.breakpoints.down('lg')]: { fontSize: '0.8   rem' },
   [theme.breakpoints.down('md')]: {},
   [theme.breakpoints.down('sm')]: {},
   [theme.breakpoints.down(480)]: {},
}))

const InputField = styled(TextField, {
   shouldForwardProp: (prop) => prop !== '$isDisabled', // $isDisabled 제외
})(({ theme, $isDisabled }) => ({
   flex: '4',
   // maxHeight: '30px',
   height: 'auto',
   display: 'flex',

   '& .MuiInputBase-input': {
      fontSize: '0.9rem',
      caretColor: $isDisabled ? 'transparent' : 'black',

      ...bps(theme, {
         1600: { padding: '12px' },
         1280: { padding: '10px' },
         960: { padding: '9px' },
         600: { padding: '9px' },
         480: { padding: '9px' },
      }),
      // [theme.breakpoints.down('sm')]: { padding: '8px' },
   },

   '&.verify-code-input': {
      flex: '2.5',
   },
}))

const StyledButton = styled('button')(({ theme }) => ({
   flex: '1',
   padding: '14px 10px',
   fontSize: '1rem',
   backgroundColor: '#dddddd',
   outline: 0,
   border: 'none',
   boxShadow: '0 0 1px 1px #bbbbbb',
   borderRadius: '4px',
   cursor: 'pointer',
   display: 'inline-block',
   height: 'auto',
   boxShadow: 'none',
   border: '1px solid #cccccc',

   ...bps(theme, {
      1600: { fontSize: '0.9rem', padding: '11px 0px' },
      1280: { fontSize: '0.84rem', padding: '10px 0px' },
      960: { fontSize: '0.78rem', padding: '9px 0px' },
      600: { fontSize: '0.72rem', padding: '9px 0px' },
      480: { fontSize: '0.7rem', padding: '9px 0px' },
   }),
}))

const TimerBox = styled(Box)({
   flex: '1.5',
   display: 'flex',
   justifyContent: 'start',
   alignItems: 'center',
   color: 'red',
   fontWeight: 'bold',
   height: 'auto',
   border: '1px solid blue',
})

const ForgotPasswordModal = ({ onVerifySuccess }) => {
   const { errorMessage, successMessage, setError, setSuccess, clearMessages } = useMessage()
   const [isClosing, setIsClosing] = useState(false)

   const [email, setEmail] = useState('')
   const [emailStatus, setEmailStatus] = useState('메일을 인증해주세요') // 이메일 인증 상태
   const [emailConfirmed, setEmailConfirmed] = useState(false)
   const [code, setCode] = useState('')
   const [step, setStep] = useState(1) // 1: 이메일 입력, 2: 인증번호 입력
   const [timer, setTimer] = useState(180)
   const [isTimerActive, setIsTimerActive] = useState(false)
   const [checkVerify, setCheckVerify] = useState(false)

   const navigate = useNavigate()

   useEffect(() => {
      if (isTimerActive && timer > 0) {
         const interval = setInterval(() => {
            setTimer((prev) => prev - 1)
         }, 1000)
         return () => clearInterval(interval)
      }
   }, [isTimerActive, timer])

   const handleWrapper = () => {
      navigate('/reset-password') // 비밀번호 변경 페이지로 이동
   }

   const handleEmailCheck = () => {
      const isRegistered = email === 'test@example.com'

      if (isEmailValid(email)) {
         setSuccess('메일이 인증에 성공했습니다!')
         setEmailConfirmed(true)
      } else {
         setError('메일이 존재하지 않습니다!')
      }

      if (isRegistered) {
         setSuccess('메일이 인증에 성공했습니다!')
         setEmailConfirmed(true)
      } else {
         setError('메일이 존재하지 않습니다!')
         setEmailConfirmed(false)
      }
   }

   const handleSendCode = () => {
      setIsTimerActive(true)
      setTimer(180) // 3분 타이머 시작
   }

   const handleCheckVerify = () => {
      setCheckVerify(true)
      onVerifySuccess('new')
   }

   return (
      <>
         <StyledText className="title" variant="h2">
            비밀번호 찾기
         </StyledText>

         <Section>
            <SubTitle>1. 이메일 인증하기</SubTitle>
            <Wrapper className="email-wrap">
               <InputField placeholder="이메일을 입력해 주세요." name="email" fullWidth autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={emailConfirmed} $isDisabled={emailConfirmed} />
               <StyledButton onClick={handleEmailCheck} disabled={emailConfirmed}>
                  확인
               </StyledButton>
            </Wrapper>
         </Section>

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

         <Section>
            <SubTitle>2. 인증번호 발급받기</SubTitle>
            <Wrapper className="verify-code-wrap">
               <InputField placeholder="6자리 코드" className="verify-code-input" />
               <TimerBox>
                  {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}
               </TimerBox>
               <StyledButton disabled={!emailConfirmed} onClick={handleSendCode}>
                  번호 발급
               </StyledButton>
            </Wrapper>
         </Section>

         <Section>
            <SubTitle>3. 인증 확인하기</SubTitle>
            <Wrapper>
               <StyledButton onClick={handleSendCode}>재발급 받기</StyledButton>

               <StyledButton onClick={handleCheckVerify}>인증 하기</StyledButton>
            </Wrapper>
         </Section>
      </>
   )
}

export default ForgotPasswordModal
