import React, { useState, useEffect } from 'react'

import { styled } from '@mui/system'
import { Box, IconButton, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import ForgotPasswordModal from './ForgotPasswordModal'
import NewPasswordModal from './NewPasswordModal'

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
   width: '500px',
   borderRadius: '10px',
   textAlign: 'center',
   boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
   animation: `${$isClosing ? 'fadeOut' : 'fadeIn'} 0.3s ease-in-out`,
   position: 'relative',
   transition: 'width 0.3s ease, height 0.3s ease, aspect-ratio 0.3s ease',
   display: 'flex',
   flexDirection: 'column',
   gap: '30px',
   //    aspectRatio: '1 / 1.5',
   //    aspectRatio: $modalType === 'new' ? '1 / 1' : '1 / 1',

   [theme.breakpoints.down('md')]: {
      gap: '60px',
   },
   [theme.breakpoints.down('sm')]: {
      gap: '30px',
      padding: '48px 30px',
      margin: '0px 20px',
      width: '320px',
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

   const handleVerifySuccess = () => {
      setModalType('new') // 인증 성공 시 'new' 모달로 전환
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
            <ModalWrap $isClosing={isClosing} $modalType={modalType}>
               <CloseButton onClick={handleClose}>
                  <CloseIcon />
               </CloseButton>
               {modalType === 'forgot' && <ForgotPasswordModal onVerifySuccess={handleVerifySuccess} />}

               {modalType === 'new' && <NewPasswordModal onClose={onClose} />}
            </ModalWrap>
         </Overlay>
      </>
   )
}

export default ModalWrapper
