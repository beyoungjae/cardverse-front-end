import { Box } from '@mui/material'

import { Visibility, VisibilityOff, Lock, Error } from '@mui/icons-material'

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import React, { useState, useEffect, useRef } from 'react'
import { isEmailValid } from '../../utils/validation'

import useMessage from '../../utils/useMessage'
import { bps } from '../../styles/responsiveStyles'

import { Title, ButtonBox, StyledButton, Section, InputField, StyledBox, StyledText, StyledAlert } from '.'

function ForgotPasswordForm({ onVerifySuccess }) {
   const emailMessage = useMessage() // 이메일에 대한 메시지 관리
   const codeMessage = useMessage() // 인증 코드에 대한 메시지 관리
   const { setErrorWithType } = useMessage()

   const [email, setEmail] = useState('')
   const [emailConfirmed, setEmailConfirmed] = useState(false)
   const [verifyCode, setVerifyCode] = useState('')
   const [timer, setTimer] = useState(180)
   const [isTimerActive, setIsTimerActive] = useState(false)
   const [isButtonDisabled, setIsButtonDisabled] = useState(false)
   const [countdown, setCountdown] = useState(3) // 카운트다운 상태 추가
   const [isVerifyComplete, setIsVerifyComplete] = useState(false) // 인증 완료 상태
   const [buttonLabel, setButtonLabel] = useState('번호 발급')

   const buttonTimerRef = useRef(null)

   useEffect(() => {
      return () => {
         if (buttonTimerRef.current) {
            clearInterval(buttonTimerRef.current)
         }
      }
   }, [])

   useEffect(() => {
      if (isTimerActive && timer > 0) {
         const interval = setInterval(() => {
            setTimer((prev) => prev - 1)
         }, 1000)
         return () => clearInterval(interval)
      }

      if (timer === 0) {
         setErrorWithType('timeout', '시간 초과되었습니다. 다시 시도해주세요.')
         setIsTimerActive(false)
         setIsButtonDisabled(false)
         setButtonLabel('번호 발급')
      }
   }, [isTimerActive, timer])

   const handleEmailCheck = () => {
      const isRegistered = email === 'test@example.com'

      if (isEmailValid(email) && isRegistered) {
         emailMessage.setSuccess('인증번호가 전송되었습니다!\n재발급 대기시간: 30초')
         setEmailConfirmed(true)
         handleSendCode()
         emailMessage.setErrorWithType('', '')
      } else {
         emailMessage.setErrorWithType('email', '메일이 존재하지 않습니다!')
         setEmailConfirmed(false)
      }
   }

   const handleVerifySuccess = () => {
      if (verifyCode.length !== 6) {
         codeMessage.setErrorWithType('verify', '인증번호는 6자리여야 합니다.')
         return
      }

      const isVerify = verifyCode === '111111'

      if (!isVerify) {
         codeMessage.setErrorWithType('verify', '인증번호가 일치하지 않습니다.')
      } else {
         // 기존 타이머 정리
         if (buttonTimerRef.current) {
            clearInterval(buttonTimerRef.current)
            buttonTimerRef.current = null
         }

         codeMessage.setSuccess('인증이 완료되었습니다!')
         setButtonLabel('번호 발급')
         setIsTimerActive(false)
         setTimer(180)
         setIsButtonDisabled(true) // 인증 완료 후 버튼 비활성화
         setIsVerifyComplete(true)

         // 페이지 이동 타이머
         let count = 2
         setCountdown(count)
         const moveTimer = setInterval(() => {
            count--
            if (count >= 0) {
               setCountdown(count)
            }
            if (count === 0) {
               clearInterval(moveTimer)
               onVerifySuccess()
            }
         }, 1000)
      }
   }

   const handleSendCode = () => {
      // 이전 타이머가 있다면 정리
      if (buttonTimerRef.current) {
         clearInterval(buttonTimerRef.current)
      }

      setIsTimerActive(true)
      setTimer(180)
      setIsButtonDisabled(true)

      let count = 30
      setButtonLabel(`재발급(${count})`)

      buttonTimerRef.current = setInterval(() => {
         count--
         if (count >= 0) {
            setButtonLabel(`재발급(${count})`)
         }
         if (count === 0) {
            clearInterval(buttonTimerRef.current)
            buttonTimerRef.current = null
            setIsButtonDisabled(false)
            setButtonLabel('번호 발급')
         }
      }, 1000)
   }

   /*  const handleVerifySuccess = () => {
      if (verifyCode.length !== 6) {
         codeMessage.setErrorWithType('verify', '인증번호는 6자리여야 합니다.')
         return
      }

      const isVerify = verifyCode === '111111'

      if (!isVerify) {
         codeMessage.setErrorWithType('verify', '인증번호가 일치하지 않습니다.')
      } else {
         codeMessage.setSuccess('인증이 완료되었습니다!')
         setButtonLabel('번호 발급')
         setIsTimerActive(false)
         setTimer(180)
         setIsButtonDisabled(false)
         setIsVerifyComplete(true)

         // 비동기로 카운트다운 처리
         setTimeout(() => {
            let count = 2
            const timer = setInterval(() => {
               if (count <= 0) {
                  clearInterval(timer)
                  onVerifySuccess()
               }
               setCountdown(count)
               count--
            }, 1000)
         }, 0)
      }
   } */

   /*  const handleSendCode = () => {
      setIsTimerActive(true)
      setTimer(180) // 3분 타이머 시작
      setIsButtonDisabled(true)

      let count = 30
      setButtonLabel(`재발급(${count})`)

      const buttonTimer = setInterval(() => {
         count--
         if (count >= 0) {
            setButtonLabel(`재발급(${count})`)
         }
         if (count === 0) {
            clearInterval(buttonTimer)
            setIsButtonDisabled(false)
            setButtonLabel('번호 발급')
         }
      }, 1000)

      // 컴포넌트 언마운트나 재실행 시 이전 타이머 정리
      return () => clearInterval(buttonTimer)
   } */

   return (
      <>
         <Title variant="h3">
            <AdminPanelSettingsIcon /> 비밀번호 찾기
         </Title>

         <Section>
            <InputField $isDisabled={emailConfirmed} disabled={emailConfirmed} label="이메일을 입력해주세요" autoComplete="email" onChange={(e) => setEmail(e.target.value)} />
            <StyledBox>
               <StyledButton onClick={handleEmailCheck} disabled={emailConfirmed} sx={{ alignSelf: 'flex-end', marginLeft: 'auto' }}>
                  인증코드 발송
               </StyledButton>
            </StyledBox>
         </Section>

         {emailMessage.messages.success && (
            <StyledAlert severity="success">
               <StyledText>{emailMessage.messages.success}</StyledText>
            </StyledAlert>
         )}
         {emailMessage.messages.error.type === 'email' && (
            <StyledAlert severity="error" icon={<Error sx={{}} />}>
               <StyledText>{emailMessage.messages.error.message}</StyledText>
            </StyledAlert>
         )}

         {emailConfirmed && (
            <Section>
               <StyledBox>
                  <InputField $isDisabled={isVerifyComplete} disabled={isVerifyComplete} variant="outlined" autoComplete="one-time-code" label={`${Math.floor(timer / 60)}:${('0' + (timer % 60)).slice(-2)}`} onChange={(e) => setVerifyCode(e.target.value)} />
                  <StyledButton sx={{ width: '25%' }} onClick={handleSendCode} disabled={isButtonDisabled || isVerifyComplete}>
                     {buttonLabel}
                  </StyledButton>
               </StyledBox>
            </Section>
         )}
         {codeMessage.messages.success && (
            <StyledAlert severity="success">
               <StyledText>{codeMessage.messages.success}</StyledText>
            </StyledAlert>
         )}
         {codeMessage.messages.error.type === 'verify' && (
            <StyledAlert severity="error" icon={<Error sx={{}} />}>
               <StyledText>{codeMessage.messages.error.message}</StyledText>
            </StyledAlert>
         )}

         {emailConfirmed && (
            <ButtonBox sx={{ justifyContent: 'end' }}>
               <StyledButton onClick={handleVerifySuccess} disabled={isVerifyComplete}>
                  {isVerifyComplete ? `3초후 페이지이동 (${countdown})` : '인증확인'}
               </StyledButton>
            </ButtonBox>
         )}
      </>
   )
}

export default ForgotPasswordForm
