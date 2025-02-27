import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, IconButton, Typography, Container } from '@mui/material'
import { styled } from '@mui/material/styles'
import { motion, AnimatePresence } from 'framer-motion'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ShareIcon from '@mui/icons-material/Share'
import PreviewLoading from '../editor/preview/PreviewLoading'
import PreviewPanel from '../editor/preview/PreviewPanel'
import { userTemplateApi } from '../../../api/userTemplateApi'

const PreviewContainer = styled(Container)(({ theme }) => ({
   position: 'relative',
   minHeight: '100vh',
   padding: theme.spacing(4),
   [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2),
   },
}))

const PreviewFrame = styled(motion.iframe)({
   width: '100%',
   height: '100vh',
   border: 'none',
   borderRadius: '16px',
   boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
})

const TopBar = styled(Box)(({ theme }) => ({
   position: 'fixed',
   top: 0,
   left: 0,
   right: 0,
   padding: theme.spacing(2),
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   backgroundColor: 'rgba(255, 255, 255, 0.9)',
   backdropFilter: 'blur(8px)',
   zIndex: 1000,
}))

const TemplatePreviewer = () => {
   const { userTemplateId } = useParams()
   const navigate = useNavigate()
   const [userTemplate, setUserTemplate] = useState(null)
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)
   const [previewState, setPreviewState] = useState({
      showInvitation: false,
      showSections: true,
      sectionAnimationIndex: -1,
   })

   useEffect(() => {
      fetchUserTemplate()
   }, [userTemplateId])

   const fetchUserTemplate = async () => {
      try {
         setLoading(true)
         const response = await userTemplateApi.getUserTemplate(userTemplateId)

         if (!response.success || !response.userTemplate) {
            throw new Error('템플릿을 찾을 수 없습니다.')
         }

         // formData가 이미 파싱되어 있는지 확인
         const formData = response.userTemplate.formData
         setUserTemplate({
            ...response.userTemplate,
            formData: typeof formData === 'string' ? JSON.parse(formData) : formData,
         })
      } catch (error) {
         setError(error.message)
      } finally {
         setTimeout(() => setLoading(false), 1000)
      }
   }

   const handleBack = () => {
      navigate(-1)
   }

   const handleShare = async () => {
      try {
         if (navigator.share) {
            await navigator.share({
               title: userTemplate.template.title || '나만의 초대장',
               text: '내가 만든 템플릿을 확인해보세요!',
               url: window.location.href,
            })
         } else {
            // Web Share API가 지원되지 않는 경우
            const url = window.location.href
            navigator.clipboard.writeText(url)
            alert('링크가 클립보드에 복사되었습니다.')
         }
      } catch (error) {
         console.error('공유하기 실패:', error)
      }
   }

   const handlePreviewStateChange = (newState) => {
      setPreviewState((prev) => ({
         ...prev,
         ...newState,
      }))
   }

   if (loading) {
      return <PreviewLoading />
   }

   if (error) {
      return (
         <Box
            sx={{
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               justifyContent: 'center',
               height: '100vh',
               textAlign: 'center',
               p: 3,
            }}
         >
            <Typography variant="h6" color="error" gutterBottom>
               {error}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
               잠시 후 다시 시도해주세요.
            </Typography>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
               <Typography
                  onClick={handleBack}
                  sx={{
                     cursor: 'pointer',
                     color: 'primary.main',
                     '&:hover': { textDecoration: 'underline' },
                  }}
               >
                  돌아가기
               </Typography>
            </motion.div>
         </Box>
      )
   }

   // 사용자 템플릿의 formData를 그대로 PreviewPanel에 전달
   const formData = typeof userTemplate.formData === 'string' ? JSON.parse(userTemplate.formData) : userTemplate.formData

   // 템플릿의 기본 테마 정보
   const theme = {
      backgroundColor: formData.backgroundColor || '#ffffff',
      primaryColor: formData.primaryColor || '#000000',
      secondaryColor: formData.secondaryColor || '#666666',
      fontFamily: formData.fontFamily || 'Malgun Gothic',
      animation: formData.animation || null,
   }

   const previewPanelProps = {
      formData,
      theme,
      previewState,
      onPreviewStateChange: handlePreviewStateChange,
      isDrawer: false,
   }

   return (
      <AnimatePresence mode="wait">
         <PreviewContainer>
            <TopBar>
               <IconButton onClick={handleBack}>
                  <ArrowBackIcon />
               </IconButton>
               <Box>
                  <IconButton onClick={handleShare}>
                     <ShareIcon />
                  </IconButton>
               </Box>
            </TopBar>

            <Box
               sx={{
                  width: '100%',
                  maxWidth: '375px',
                  height: '667px',
                  margin: '0 auto',
                  marginTop: '64px',
                  borderRadius: '44px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
               }}
            >
               <PreviewPanel {...previewPanelProps} />
            </Box>
         </PreviewContainer>
      </AnimatePresence>
   )
}

export default TemplatePreviewer
