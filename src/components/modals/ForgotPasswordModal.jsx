import { styled, shouldForwardProp } from '@mui/system'
import { Box, IconButton, TextField, Typography, Alert } from '@mui/material'

import { Visibility, VisibilityOff, Lock, Error } from '@mui/icons-material'

import CloseIcon from '@mui/icons-material/Close'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isEmailValid } from '../../utils/validation'

// 🔹 닫기 버튼 스타일
const CloseButton = styled(IconButton)(({ theme }) => ({
   position: 'absolute',
   top: '10px',
   right: '10px',
   color: '#555',
   backgroundColor: '#f2f2f2',

   '&:hover': {
      backgroundColor: '#e0e0e0',
   },
}))

const Wrapper = styled(Box)(({ theme }) => ({
   display: 'flex',
   gap: '32px',
   justifyContent: 'center',
   alignItems: 'center',
   '&.verify-code-wrap': {
      gap: '16px',
      [theme.breakpoints.down('sm')]: { gap: '4px' },
   },

   [theme.breakpoints.down('md')]: {},
   [theme.breakpoints.down('sm')]: { gap: '8px' },
   [theme.breakpoints.down('md')]: {},
}))

const Section = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '8px',

   [theme.breakpoints.down('md')]: {},
   [theme.breakpoints.down('sm')]: {
      gap: '4px',
   },
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

   [theme.breakpoints.down('md')]: {},
   [theme.breakpoints.down('sm')]: {},
   [theme.breakpoints.down(480)]: {
      fontSize: '1.3rem',
   },
}))

const SubTitle = styled(Typography)(({ theme }) => ({
   textAlign: 'start',
}))

const InputField = styled(TextField, {
   shouldForwardProp: (prop) => prop !== '$isDisabled', // $isDisabled 제외
})(({ theme, $isDisabled }) => ({
   flex: '4',
   caretColor: 'transparent',

   '& .MuiInputBase-input': {
      fontSize: '0.9rem',
      caretColor: $isDisabled ? 'transparent' : 'black',

      [theme.breakpoints.down('sm')]: { padding: '8px' },
   },

   '&.verify-code-input': {
      flex: '2.5',
   },
}))

const StyledButton = styled('button')(({ theme }) => ({
   flex: '1',
   padding: '10px 10px',
   fontSize: '1rem',
   backgroundColor: '#dddddd',
   outline: 0,
   border: 'none',
   boxShadow: '0 0 1px 1px #bbbbbb',
   borderRadius: '4px',
   cursor: 'pointer',

   [theme.breakpoints.down('md')]: {},
   [theme.breakpoints.down('sm')]: {
      fontSize: '0.7rem',
   },
}))

const TimerBox = styled(Box)({
   flex: '1.5',
   display: 'flex',
   justifyContent: 'start',
   alignItems: 'center',
   color: 'red',
   fontWeight: 'bold',
})

const ForgotPasswordModal = ({ onVerifySuccess }) => {
   const [isClosing, setIsClosing] = useState(false)
   const [errorMessage, setErrorMessage] = useState('')
   const [successMessage, setSuccessMessage] = useState('')

   const [email, setEmail] = useState('')
   const [emailStatus, setEmailStatus] = useState('메일을 인증해주세요') // 이메일 인증 상태
   const [emailConfirmed, setEmailConfirmed] = useState(false)
   const [code, setCode] = useState('')
   const [step, setStep] = useState(1) // 1: 이메일 입력, 2: 인증번호 입력
   const [timer, setTimer] = useState(180)
   const [isTimerActive, setIsTimerActive] = useState(false)
   const [checkVerify, setCheckVerify] = useState(false)

   const navigate = useNavigate()

   // const handleSendCode = () => {
   //     console.log('이메일로 인증 코드 전송:', email)
   //     // 서버에 인증번호 요청 API 호출
   //     setStep(2) // 다음 단계로 이동 (인증번호 입력)
   // }

   useEffect(() => {
      if (isTimerActive && timer > 0) {
         const interval = setInterval(() => {
            setTimer((prev) => prev - 1)
         }, 1000)
         return () => clearInterval(interval)
      }
   }, [isTimerActive, timer])

   const handleWrapper = () => {
      console.log('입력한 인증번호:', code)
      // 서버에서 인증번호 확인 API 호출 후 성공 시:
      //   onClose() // 모달 닫기
      navigate('/reset-password') // 비밀번호 변경 페이지로 이동
   }

   // const handleEmailCheck = () => {
   //     // 이메일이 가입되어 있는지 확인하는 API 호출 (예제에서는 바로 true)
   //     setEmailConfirmed(true)
   // }

   const handleEmailCheck = () => {
      // 실제 API로 가입된 이메일 확인하는 로직을 넣을 것
      const isRegistered = email === 'test@example.com' // 예제

      if (isEmailValid(email)) {
         setEmailStatus('메일이 인증에 성공했습니다!')
         setEmailConfirmed(true)
      } else {
         //  setEmailStatus('메일이 존재하지 않습니다!')
         setEmailConfirmed(false)
         setSuccessMessage('')
      }

      if (isRegistered) {
         setEmailStatus('메일이 인증에 성공했습니다!')
         setEmailConfirmed(true)
         setSuccessMessage('메일 인증에 성공했습니다!')
      } else {
         setEmailStatus('메일이 존재하지 않습니다!')
         setEmailConfirmed(false)
         //  setErrorMessage('메일이 존재하지 않습니다!')
         setSuccessMessage('')
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
         {/* <CloseButton onClick={handleClose}>
                  <CloseIcon />
               </CloseButton> */}

         <StyledText className="title" variant="h2">
            비밀번호 찾기
         </StyledText>

         <Section>
            <SubTitle>1. 이메일 인증하기</SubTitle>
            <Wrapper className="email-wrap">
               <InputField
                  // 인풋 필드
                  //   label="이메일을 입력해 주세요"
                  placeholder="이메일을 입력해 주세요."
                  name="email"
                  //   variant="standard" // 아래쪽 라인만 생김
                  fullWidth
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={emailConfirmed}
                  $isDisabled={emailConfirmed}
               />
               <StyledButton onClick={handleEmailCheck} disabled={emailConfirmed}>
                  확인
               </StyledButton>
            </Wrapper>
         </Section>

         {errorMessage && (
            <Alert severity="error" icon={<Error />} sx={{ textAlign: 'left' }}>
               <StyledText>{emailStatus}</StyledText>
            </Alert>
         )}

         {successMessage && (
            <Alert severity="success" sx={{ textAlign: 'left' }}>
               {emailStatus}
            </Alert>
         )}

         <Section>
            <SubTitle>2. 인증번호 발급받기</SubTitle>
            <Wrapper className="verify-code-wrap">
               <InputField className="verify-code-input" />
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
               <StyledButton>인증 확인</StyledButton>

               <StyledButton onClick={handleCheckVerify}>번호 재발급</StyledButton>
            </Wrapper>
         </Section>
      </>
   )
}

export default ForgotPasswordModal

/* 

         <Section>
            <SubTitle>3. 인증 확인하기</SubTitle>
            <Wrapper className="verify-code-wrap">
               <InputField className="verify-code-input" />
               <TimerBox>
                  {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}
               </TimerBox>
               <StyledButton onClick={handleCheckVerify}>인증확인</StyledButton>
            </Wrapper>
         </Section>
*/
