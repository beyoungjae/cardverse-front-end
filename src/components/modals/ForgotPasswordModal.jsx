import { styled } from '@mui/system'
import { Box, IconButton, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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

const Modal = styled(Box)(({ theme, $isClosing }) => ({
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
    gap: '48px',
}))

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

// 🔹 닫기 버튼 스타일
const CloseButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: '10px',
    right: '10px',
    color: '#555',
}))

const Wrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: '32px',
    // padding: '0 32px',
    justifyContent: 'center',
    alignItems: 'center',
    '&.verify-code-wrap': {
        gap: '16px',
    },
}))

const StyledText = styled(Typography)(({ theme }) => ({
    // flex: '4',
    width: '100%',
    textAlign: 'start',
    padding: '5px 16px',
    boxSizing: 'border-box',
    minWidth: 0,
    display: 'flex',
}))

const SubTitle = styled(Typography)(({ theme }) => ({
    textAlign: 'start',
}))

const InputField = styled(TextField)(({ theme }) => ({
    flex: '4',
    // border: '1px solid blue',

    '& .MuiInputBase-input': {
        padding: '10px',
    },
    '&.verify-code-input': {
        flex: '2',
        width: '20%',
    },
}))

const StyledButton = styled('button')(({ theme }) => ({
    flex: '1',
    padding: '10px 10px',
    // border: '1px solid red',
}))

const TimerBox = styled(Box)({
    // width: '50px',
    // height: '50px',
    flex: '2',
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
                <Modal $isClosing={isClosing}>
                    <CloseButton onClick={handleClose}>
                        <CloseIcon />
                    </CloseButton>

                    <Typography variant="h2" sx={{ marginBottom: '40px' }}>
                        비밀번호 찾기
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', boxSizing: 'border-box' }}>
                        <SubTitle>2. 인증번호 발급받기</SubTitle>
                        <Wrapper className="verify-wrap">
                            <Box sx={{ flex: '4' }}>
                                <StyledText color={emailStatus.includes('존재') ? 'red' : emailStatus.includes('인증') ? 'green' : 'black'}>{emailStatus}</StyledText>
                            </Box>
                            <StyledButton disabled={!emailConfirmed} onClick={handleSendCode}>
                                번호 발급
                            </StyledButton>
                        </Wrapper>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', boxSizing: 'border-box' }}>
                        <SubTitle>3. 인증 확인하기</SubTitle>
                        <Wrapper className="verify-code-wrap">
                            <InputField className="verify-code-input" />
                            <TimerBox>
                                {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}
                            </TimerBox>
                            <StyledButton>인증확인</StyledButton>
                        </Wrapper>
                    </Box>
                </Modal>
            </Overlay>
        </>
    )
}

export default ForgotPasswordModal
