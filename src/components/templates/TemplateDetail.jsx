import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box, Container, Typography, Button, IconButton, Dialog, DialogContent, CircularProgress, Fade } from '@mui/material'
import { styled } from '@mui/material/styles'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ShareIcon from '@mui/icons-material/Share'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { motion, AnimatePresence } from 'framer-motion'
import { templateApi } from '../../api/templateApi'

const DetailContainer = styled(Container)(({ theme }) => ({
   paddingTop: theme.spacing(4),
   paddingBottom: theme.spacing(8),
}))

const ImageContainer = styled(Box)(({ theme }) => ({
   position: 'relative',
   width: '100%',
   height: '600px',
   borderRadius: theme.spacing(2),
   overflow: 'hidden',
   boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
   [theme.breakpoints.down('md')]: {
      height: '400px',
   },
}))

const DetailImage = styled('img')({
   width: '100%',
   height: '100%',
   objectFit: 'cover',
})

const ActionBar = styled(Box)(({ theme }) => ({
   position: 'fixed',
   bottom: 0,
   left: 0,
   right: 0,
   padding: theme.spacing(2, 3),
   backgroundColor: 'rgba(255, 255, 255, 0.95)',
   backdropFilter: 'blur(8px)',
   borderTop: '1px solid rgba(0, 0, 0, 0.1)',
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   zIndex: 1000,
}))

const TemplateDetail = () => {
   const { templateId } = useParams()
   const location = useLocation()
   const navigate = useNavigate()
   const { isAuthenticated, user } = useSelector((state) => state.auth)
   const isAdmin = user?.role === 'admin'

   const [template, setTemplate] = useState(null)
   const [loading, setLoading] = useState(true)
   const [currentImageIndex, setCurrentImageIndex] = useState(0)
   const [isPreviewOpen, setIsPreviewOpen] = useState(false)

   const currentTab = location.state?.currentTab || 'wedding'

   useLayoutEffect(() => {
      const isMobile = window.innerWidth <= 768
      window.scrollTo({
         top: 0,
         left: 0,
         behavior: isMobile ? 'smooth' : 'auto',
      })
   }, [location.pathname])

   useEffect(() => {
      fetchTemplateDetail()
   }, [templateId])

   const fetchTemplateDetail = async () => {
      try {
         setLoading(true)
         const data = await templateApi.getTemplate(templateId)
         setTemplate(data)
      } catch (error) {
         console.error('템플릿 상세 정보 조회 실패:', error)
      } finally {
         setLoading(false)
      }
   }

   const handleBack = () => {
      navigate(`/template/${currentTab}`, {
         state: { currentTab },
      })
   }

   const handleEditorOpen = () => {
      if (!isAuthenticated) {
         // 로그인 페이지로 리다이렉트
         navigate('/login', { state: { from: location } })
         return
      }
      navigate(`/template/${currentTab}/edit/${templateId}`, {
         state: { templateId, currentTab },
      })
   }

   const handlePurchase = () => {
      if (!isAuthenticated) {
         navigate('/login', { state: { from: location } })
         return
      }
      navigate(`/template/${currentTab}/purchase/${templateId}`, {
         state: { template, currentTab },
      })
   }

   if (loading) {
      return (
         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
         </Box>
      )
   }

   if (!template) {
      return (
         <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6">템플릿을 찾을 수 없습니다.</Typography>
            <Button onClick={handleBack} sx={{ mt: 2 }}>
               목록으로 돌아가기
            </Button>
         </Box>
      )
   }

   return (
      <Fade in>
         <Box>
            <DetailContainer maxWidth="lg">
               <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <IconButton onClick={handleBack}>
                     <ArrowBackIcon />
                  </IconButton>
                  <Box>
                     <IconButton>
                        <ShareIcon />
                     </IconButton>
                     <IconButton>
                        <FavoriteIcon />
                     </IconButton>
                  </Box>
               </Box>

               <ImageContainer>
                  <DetailImage src={template.thumbnail} alt={template.title} />
               </ImageContainer>

               <Box sx={{ mt: 4 }}>
                  <Typography variant="h4" gutterBottom>
                     {template.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                     {template.description}
                  </Typography>
                  <Typography variant="h5" color="primary">
                     ₩{Number(template.price).toLocaleString()}
                  </Typography>
               </Box>
            </DetailContainer>

            <ActionBar>
               <Box sx={{ flex: 1 }}>
                  <Typography variant="h6">₩{Number(template.price).toLocaleString()}</Typography>
               </Box>
               <Box sx={{ display: 'flex', gap: 2 }}>
                  {isAdmin && (
                     <Button variant="outlined" onClick={handleEditorOpen}>
                        수정하기
                     </Button>
                  )}
                  <Button variant="contained" onClick={handlePurchase}>
                     구매하기
                  </Button>
               </Box>
            </ActionBar>
         </Box>
      </Fade>
   )
}

export default TemplateDetail
