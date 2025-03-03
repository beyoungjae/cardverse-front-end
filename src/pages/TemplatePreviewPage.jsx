import React, { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import TemplatePreviewer from '../components/templates/preview/TemplatePreviewer'
import { Box, IconButton, Typography, Modal, Paper, Button, Snackbar, Alert } from '@mui/material'
import { styled } from '@mui/material/styles'
import ShareIcon from '@mui/icons-material/Share'
import CloseIcon from '@mui/icons-material/Close'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { QRCodeSVG } from 'qrcode.react'

// QR 코드 모달 스타일
const QRModal = styled(Modal)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   zIndex: 99999,
}))

const QRPaper = styled(Paper)(({ theme }) => ({
   backgroundColor: theme.palette.background.paper,
   boxShadow: theme.shadows[5],
   padding: theme.spacing(4),
   borderRadius: '16px',
   textAlign: 'center',
   position: 'relative',
   maxWidth: '90%',
   width: '350px',
}))

const ShareButton = styled(IconButton)(({ theme }) => ({
   position: 'fixed',
   top: '8px',
   right: '20px',
   backgroundColor: 'rgba(255, 255, 255, 0.8)',
   boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
   zIndex: 99998,
   padding: '10px',
   '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 1)',
   },
}))

const StyledAlert = styled(Alert)(({ theme }) => ({
   zIndex: 999999,
}))

/**
 * URL을 난독화하는 함수
 * ID를 Base64로 인코딩하고 타임스탬프를 추가하여 난독화
 */
const encodeTemplateId = (id) => {
   // 타임스탬프를 추가하여 동일한 ID도 다른 URL이 되도록 함
   const timestamp = Date.now();
   const data = `${id}-${timestamp}`;
   
   // Base64로 인코딩
   return btoa(data);
};

/**
 * 난독화된 URL에서 템플릿 ID를 추출하는 함수
 */
const decodeTemplateId = (encoded) => {
   try {
      // Base64 디코딩
      const decoded = atob(encoded);
      
      // ID와 타임스탬프 분리
      const [id] = decoded.split('-');
      return id;
   } catch (error) {
      console.error('URL 디코딩 오류:', error);
      return null;
   }
};

/**
 * 템플릿 미리보기 전용 페이지
 * 독립적인 라우팅으로 처리되며, 레이아웃 없이 전체 화면으로 표시됩니다.
 */
const TemplatePreviewPage = () => {
   const { userTemplateId: encodedId } = useParams()
   const location = useLocation()
   const navigate = useNavigate()
   const [qrModalOpen, setQrModalOpen] = useState(false)
   const [snackbarOpen, setSnackbarOpen] = useState(false)
   const [actualId, setActualId] = useState(null)
   
   useEffect(() => {
      // URL이 인코딩된 형식인지 확인
      if (encodedId && encodedId.length > 10) {
         // 인코딩된 ID로 보이면 디코딩 시도
         const decodedId = decodeTemplateId(encodedId);
         if (decodedId) {
            setActualId(decodedId);
         } else {
            // 디코딩 실패 시 원본 ID 사용
            setActualId(encodedId);
         }
      } else {
         // 일반 ID인 경우 그대로 사용
         setActualId(encodedId);
      }
   }, [encodedId]);
   
   // 공유 URL 생성
   const getShareableUrl = () => {
      // 현재 URL이 이미 인코딩된 형식인지 확인
      if (encodedId && encodedId.length > 10) {
         return window.location.href;
      }
      
      // 새로운 인코딩된 URL 생성
      const encoded = encodeTemplateId(encodedId);
      const baseUrl = window.location.origin;
      return `${baseUrl}/preview/${encoded}`;
   };
   
   const handleShareClick = () => {
      console.log('Share button clicked')
      setQrModalOpen(true)
   }
   
   const handleCopyLink = () => {
      navigator.clipboard.writeText(getShareableUrl())
         .then(() => {
            console.log('링크가 복사되었습니다')
            setSnackbarOpen(true)
         })
         .catch(err => {
            console.error('링크 복사 실패:', err)
         })
   }
   
   const handleSnackbarClose = (event, reason) => {
      if (reason === 'clickaway') {
         return
      }
      setSnackbarOpen(false)
   }

   return (
      <>
         <Box
            sx={{
               position: 'fixed',
               top: 0,
               left: 0,
               right: 0,
               bottom: 0,
               width: '100vw',
               height: '100vh',
               overflow: 'auto',
               bgcolor: '#fff',
               zIndex: 9999,
            }}
         >
            {actualId && <TemplatePreviewer userTemplateId={actualId} standalone={true} />}
         </Box>

         {/* 공유 버튼 */}
         <ShareButton
            color="primary"
            onClick={handleShareClick}
            aria-label="초대장 공유하기"
            size="large"
         >
            <ShareIcon />
         </ShareButton>

         {/* QR 코드 모달 */}
         <QRModal
            open={qrModalOpen}
            onClose={() => setQrModalOpen(false)}
            aria-labelledby="qr-code-modal"
         >
            <QRPaper>
               <IconButton
                  sx={{ position: 'absolute', right: 8, top: 8 }}
                  onClick={() => setQrModalOpen(false)}
               >
                  <CloseIcon />
               </IconButton>
               <Typography variant="h6" sx={{ mb: 2 }}>
                  초대장 공유하기
               </Typography>
               <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <QRCodeSVG
                     value={getShareableUrl()}
                     size={200}
                     bgColor={"#ffffff"}
                     fgColor={"#000000"}
                     level={"L"}
                     includeMargin={false}
                  />
               </Box>
               <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  QR 코드를 스캔하여 초대장을 공유하세요
               </Typography>
               <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ContentCopyIcon />}
                  onClick={handleCopyLink}
                  fullWidth
                  sx={{
                     mt: 1,
                     backgroundColor: '#000000',
                     '&:hover': {
                        backgroundColor: '#333333',
                     }
                  }}
               >
                  링크 복사하기
               </Button>
            </QRPaper>
         </QRModal>
         
         {/* 링크 복사 알림 */}
         <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            sx={{ zIndex: 999999 }}
         >
            <StyledAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
               링크가 클립보드에 복사되었습니다!
            </StyledAlert>
         </Snackbar>
      </>
   )
}

export default TemplatePreviewPage
