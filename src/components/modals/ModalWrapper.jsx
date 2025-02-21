import React, { useState, useEffect, useCallback } from 'react'

import { styled } from '@mui/system'
import { Box, IconButton, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import ForgotPasswordModal from './ForgotPasswordModal'
import NewPasswordModal from './NewPasswordModal'

import ForgotPasswordForm from './ForgotPasswordForm'
import NewPasswordForm from './NewPasswordForm'

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

const ModalWrap = styled('div')(({ theme, $modalType, $isClosing }) => ({
   background: 'white',
   padding: '64px 64px',
   width: '30vw',
   maxWidth: '500px',
   borderRadius: '10px',
   textAlign: 'center',
   boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
   animation: `${$isClosing ? 'fadeOut' : 'fadeIn'} 0.3s ease-in-out`,
   position: 'relative',
   transition: 'all 0.3s ease',
   display: 'flex',
   flexDirection: 'column',
   gap: '30px',
   // maxHeight: '80vh', // ✅ 줌인 시 화면을 벗어나지 않도록 제한
   // overflowY: 'auto',

   [theme.breakpoints.down(1920)]: {
      width: '35vw',
   },
   [theme.breakpoints.down(1600)]: {
      width: '40vw',
   },
   [theme.breakpoints.down(1280)]: {
      width: '45vw',
      padding: '48px 40px',
      gap: '25px',
   },
   [theme.breakpoints.down(960)]: {
      width: '50vw',
      padding: '48px 30px',
   },
   [theme.breakpoints.down(600)]: {
      width: '70vw',
      padding: '44px 20px',
      gap: '20px',
   },
   [theme.breakpoints.down(480)]: {
      width: '90vw',
      padding: '40px 20px',
   },
}))

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

const ModalWrapper = ({ onClose }) => {
   const [isClosing, setIsClosing] = useState(false)
   const [modalType, setModalType] = useState('forgot') // 'forgot' or 'new'

   const handleVerifySuccess = useCallback(() => {
      setModalType('new') // 인증 성공 시 'new' 모달로 전환
   }, [])

   const handleClose = () => {
      setIsClosing(true)
      setTimeout(() => {
         onClose() // 부모에서 모달을 완전히 제거
      }, 300) // 애니메이션 지속 시간과 맞춤
   }

   const handleGoBack = () => {
      setModalType('forgot')
   }

   return (
      <>
         <GlobalStyle />
         <Overlay>
            <ModalWrap $isClosing={isClosing} $modalType={modalType}>
               <CloseButton onClick={handleClose}>
                  <CloseIcon />
               </CloseButton>
               {/* {modalType === 'forgot' && <ForgotPasswordModal onVerifySuccess={handleVerifySuccess} />} */}
               {/* {modalType === 'new' && <NewPasswordModal onGoBack={handleGoBack} />} */}

               {modalType === 'forgot' && <ForgotPasswordForm onVerifySuccess={handleVerifySuccess} />}
               {modalType === 'new' && <NewPasswordForm onGoBack={handleGoBack} />}
            </ModalWrap>
         </Overlay>
      </>
   )
}

export default ModalWrapper
