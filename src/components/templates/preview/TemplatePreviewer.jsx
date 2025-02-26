import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, IconButton, Typography, Container } from '@mui/material'
import { styled } from '@mui/material/styles'
import { motion, AnimatePresence } from 'framer-motion'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ShareIcon from '@mui/icons-material/Share'
import PreviewLoading from '../editor/preview/PreviewLoading'
import { templateApi } from '../../../api/templateApi'

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
   const { templateId } = useParams()
   const navigate = useNavigate()
   const [template, setTemplate] = useState(null)
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)

   useEffect(() => {
      fetchTemplatePreview()
   }, [templateId])

   const fetchTemplatePreview = async () => {
      try {
         setLoading(true)
         const data = await templateApi.getTemplate(templateId)
         setTemplate(data)
      } catch (error) {
         console.error('템플릿 미리보기 로드 실패:', error)
         setError('템플릿을 불러오는데 실패했습니다.')
      } finally {
         // 로딩 애니메이션을 위해 최소 1.5초 대기
         setTimeout(() => setLoading(false), 1500)
      }
   }

   const handleBack = () => {
      navigate(-1)
   }

   const handleShare = async () => {
      try {
         await navigator.share({
            title: template.title,
            text: template.description,
            url: window.location.href,
         })
      } catch (error) {
         console.error('공유하기 실패:', error)
      }
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

            <PreviewFrame initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} src={template.previewUrl} title="Template Preview" />
         </PreviewContainer>
      </AnimatePresence>
   )
}

export default TemplatePreviewer
