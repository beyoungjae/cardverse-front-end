import { styled } from '@mui/system'
import { Box, IconButton, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const GlobalStyle = styled('style')`
   @keyframes fadeIn {
      from {
         opacity: 0;
         transform: translateY(-20px);
      }
      to {
         opacity: 1;
         transform: translateY(0);
      }
   }

   @keyframes fadeOut {
      from {
         opacity: 1;
         transform: translateY(0px);
      }
      to {
         opacity: 0;
         transform: translateY(-20px);
      }
   }
`

const Overlay = styled(Box)(({ theme }) => ({
   position: 'fixed',
   top: 0,
   left: 0,
   width: '100%',
   height: '100%',
   background: 'rgba(0, 0, 0, 0.5)' /* 반투명 검은색 */,
   backdropFilter: 'blur(5px)' /* 배경 흐림 처리 */,
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   zIndex: '999',
}))

const Modal = styled('div')(({ theme, $isClosing }) => ({
   background: 'white',
   padding: '40px 64px',
   width: '500px',
   borderRadius: '10px',
   textAlign: 'center',
   boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
   // animation: ' fadeIn 0.3s ease-in-out',
   animation: `${$isClosing ? 'fadeOut' : 'fadeIn'} 0.3s ease-in-out`,
   position: 'relative',
   display: 'flex',
   flexDirection: 'column',
   gap: '80px',
   // height: '80vh',
   aspectRatio: '1 / 1.5',

   [theme.breakpoints.down('md')]: {
      gap: '60px',
   },
   [theme.breakpoints.down('sm')]: {
      gap: '40px',
      padding: '30px 40px',
      margin: '0px 20px',
   },
}))

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
   },
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
   // flex: '4',
   width: '100%',
   textAlign: 'start',
   padding: '5px 16px',
   boxSizing: 'border-box',
   minWidth: 0,
   //    display: 'flex',

   '&.title': {
      textAlign: 'center',
      padding: '0 16px',
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

const InputField = styled(TextField)(({ theme }) => ({
   flex: '4',
   // border: '1px solid blue',

   '& .MuiInputBase-input': {
      padding: '10px',
      fontSize: '0.9rem',
   },
   '&.verify-code-input': {
      flex: '2.5',
      width: '20%',
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
   // width: '50px',
   // height: '50px',
   flex: '1.5',
   // padding: '10px',
   // backgroundColor: 'red',
   display: 'flex',
   justifyContent: 'start',
   alignItems: 'center',
   color: 'red',
   fontWeight: 'bold',
})

const ForgotPasswordModal = ({ onClose }) => {
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
      onClose() // 모달 닫기
      navigate('/reset-password') // 비밀번호 변경 페이지로 이동
   }

   // const handleEmailCheck = () => {
   //     // 이메일이 가입되어 있는지 확인하는 API 호출 (예제에서는 바로 true)
   //     setEmailConfirmed(true)
   // }

   const handleEmailCheck = () => {
      // 실제 API로 가입된 이메일 확인하는 로직을 넣을 것
      const isRegistered = email === 'test@example.com' // 예제

      if (isRegistered) {
         setEmailStatus('메일이 인증되었습니다!')
         setEmailConfirmed(true)
      } else {
         setEmailStatus('메일이 존재하지 않습니다!')
         setEmailConfirmed(false)
      }
   }

   const handleSendCode = () => {
      setIsTimerActive(true)
      setTimer(180) // 3분 타이머 시작
   }

   const handleCheckVerify = () => {
      setCheckVerify(true)
   }

   const handleClose = () => {
      setIsClosing(true)
      setTimeout(() => {
         onClose() // 부모에서 모달을 완전히 제거
      }, 300) // 애니메이션 지속 시간과 맞춤
   }

   return (
      <>
         <GlobalStyle />
         <Overlay>
            {checkVerify ? (
               <Modal>
                  <CloseButton onClick={handleClose}>
                     <CloseIcon />
                  </CloseButton>

                  <StyledText className="title" variant="h2" sx={{ letterSpacing: '1.2px' }}>
                     인증이 완료되었습니다!
                  </StyledText>
               </Modal>
            ) : (
               <Modal $isClosing={isClosing}>
                  <CloseButton onClick={handleClose}>
                     <CloseIcon />
                  </CloseButton>

                  <StyledText
                     className="title"
                     variant="h2"
                     sx={{
                        marginBottom: {
                           xs: '30px', // xs: 0px ~ 600px
                           sm: '35px', // sm: 600px ~ 960px
                           md: '40px', // md: 960px ~ 1280px
                        },
                     }}
                  >
                     비밀번호 찾기
                  </StyledText>

                  <Section sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                     <SubTitle>1. 이메일 인증하기</SubTitle>
                     <Wrapper className="email-wrap">
                        <InputField
                           // 인풋 필드
                           placeholder="이메일을 입력해 주세요."
                           name="email"
                           fullWidth
                           autoComplete="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                        />
                        <StyledButton onClick={handleEmailCheck} disabled={emailConfirmed}>
                           확인
                        </StyledButton>
                     </Wrapper>
                  </Section>

                  <Section>
                     <SubTitle>2. 인증번호 발급받기</SubTitle>
                     <Wrapper className="verify-wrap">
                        <Box sx={{ flex: '4' }}>
                           <StyledText color={emailStatus.includes('존재') ? 'red' : emailStatus.includes('인증') ? 'green' : 'black'}>{emailStatus}</StyledText>
                        </Box>
                        <StyledButton disabled={!emailConfirmed} onClick={handleSendCode}>
                           번호 발급
                        </StyledButton>
                     </Wrapper>
                  </Section>

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
               </Modal>
            )}
         </Overlay>
      </>
   )
}

export default ForgotPasswordModal
