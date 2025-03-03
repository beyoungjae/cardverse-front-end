import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Box, IconButton, Typography, Container } from '@mui/material'
import { styled } from '@mui/material/styles'
import { motion, AnimatePresence } from 'framer-motion'
import ShareIcon from '@mui/icons-material/Share'
import PreviewLoading from '../editor/preview/PreviewLoading'
import PreviewPanel from '../editor/preview/PreviewPanel'
import { userTemplateApi } from '../../../api/userTemplateApi'

const PreviewContainer = styled(Container)(({ theme }) => ({
   maxWidth: '600px !important',
   position: 'relative',
   minHeight: '100vh',
   padding: theme.spacing(4),
   backgroundColor: '#fff',
   zIndex: 100,
   [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2),
   },
}))

const TopBar = styled(Box)(({ theme }) => ({
   position: 'fixed',
   top: 0,
   left: 0,
   right: 0,
   padding: theme.spacing(2),
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: 'rgba(255, 255, 255, 0.95)',
   backdropFilter: 'blur(10px)',
   boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
   zIndex: 1000,
}))

const PreviewContent = styled(motion.div)(({ backgroundColor }) => ({
   width: '100%',
   height: '100%',
   overflowY: 'auto',
   WebkitOverflowScrolling: 'touch',
   padding: '24px',
   backgroundColor: backgroundColor || '#FFFFFF',
   position: 'relative',
   '&::-webkit-scrollbar': {
      display: 'none',
   },
}))

const TemplatePreviewer = ({ userTemplateId: propUserTemplateId }) => {
   const params = useParams()
   const userTemplateId = propUserTemplateId || params.userTemplateId

   const [userTemplate, setUserTemplate] = useState(null)
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)

   // 인트로 및 애니메이션 상태
   const [showInvitation, setShowInvitation] = useState(false)
   const [showSections, setShowSections] = useState(false)
   const [currentImageIndex, setCurrentImageIndex] = useState(0)
   const timerRef = useRef(null)

   const fetchUserTemplate = useCallback(async () => {
      try {
         setLoading(true)
         if (!userTemplateId) throw new Error('템플릿 ID가 없습니다.')

         const response = await userTemplateApi.getUserTemplate(userTemplateId)
         if (!response) throw new Error('서버에서 응답을 받지 못했습니다.')

         let userTemplateData = response.userTemplate || response
         let formData = userTemplateData.formData || userTemplateData.templateSet?.formData

         if (!formData) {
            if (userTemplateData.template?.data) {
               formData = userTemplateData.template.data
            } else if (userTemplateData.data) {
               formData = userTemplateData.data
            } else {
               throw new Error('템플릿 데이터가 없습니다.')
            }
         }

         if (typeof formData === 'string') {
            formData = JSON.parse(formData)
         }

         setUserTemplate({
            ...userTemplateData,
            formData: {
               ...formData,
               setting: formData.setting || { animation: 'fade', images: formData.images || [] },
            },
         })
      } catch (error) {
         setError(error.message || '템플릿을 불러오는 중 오류가 발생했습니다.')
      } finally {
         setTimeout(() => setLoading(false), 1000)
      }
   }, [userTemplateId])

   useEffect(() => {
      fetchUserTemplate()
   }, [fetchUserTemplate])

   // 인트로 이미지 애니메이션 처리
   useEffect(() => {
      if (!loading && userTemplate) {
         const { setting } = userTemplate.formData || {}
         const introImages = setting?.images || []

         if (introImages.length === 0) {
            // 인트로 이미지가 없으면 바로 초대장으로
            setShowInvitation(true)
            return
         }

         // 인트로 이미지 슬라이드쇼 타이머 설정
         timerRef.current = setInterval(() => {
            setCurrentImageIndex((prev) => {
               const nextIndex = prev + 1
               if (nextIndex >= introImages.length) {
                  clearInterval(timerRef.current)
                  // 마지막 이미지 후 초대장 표시
                  setTimeout(() => setShowInvitation(true), 1000)
                  return prev
               }
               return nextIndex
            })
         }, 3000) // 3초마다 이미지 변경

         return () => {
            if (timerRef.current) {
               clearInterval(timerRef.current)
            }
         }
      }
   }, [loading, userTemplate])

   // 초대장 클릭 핸들러
   const handleInvitationClick = () => {
      setShowInvitation(false)
      setShowSections(true)
   }

   if (loading) {
      return <PreviewLoading />
   }

   if (error) {
      return (
         <Box sx={{ textAlign: 'center', p: 3 }}>
            <Typography variant="h6" color="error">
               {error}
            </Typography>
         </Box>
      )
   }

   const { setting, thumbnail } = userTemplate?.formData || {}
   const introImages = setting?.images || []
   const animationType = setting?.animation || 'fade'

   // 애니메이션 변형 정의
   const variants = {
      fade: {
         enter: { opacity: 0 },
         center: {
            opacity: 1,
            scale: [0.9, 1],
            transition: { duration: 0.8, ease: 'easeInOut' },
         },
         exit: {
            opacity: 0,
            scale: [1, 1.1],
            transition: { duration: 0.8, ease: 'easeOut' },
         },
      },
      slide: {
         enter: { x: '100%', opacity: 0 },
         center: {
            x: ['3%', 0],
            opacity: 1,
            transition: { duration: 0.8, ease: 'easeInOut' },
         },
         exit: {
            x: [0, '-100%'],
            opacity: 0,
            transition: { duration: 0.8, ease: 'easeOut' },
         },
      },
   }

   return (
      <PreviewContainer>
         <TopBar>
            <Typography variant="h6">{userTemplate?.formData?.title || '미리보기'}</Typography>
         </TopBar>

         <PreviewContent>
            <AnimatePresence mode="wait">
               {!showInvitation && !showSections && introImages.length > 0 && (
                  <motion.div key="setting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                     <AnimatePresence mode="wait">
                        {introImages[currentImageIndex] && (
                           <motion.img
                              key={`intro-image-${currentImageIndex}`}
                              src={introImages[currentImageIndex].url}
                              alt={`인트로 이미지 ${currentImageIndex + 1}`}
                              variants={variants[animationType]}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              style={{
                                 position: 'absolute',
                                 width: '100%',
                                 height: '100%',
                                 objectFit: 'contain',
                                 borderRadius: '8px',
                              }}
                           />
                        )}
                     </AnimatePresence>
                  </motion.div>
               )}

               {showInvitation && !showSections && (
                  <motion.div
                     key="invitation"
                     onClick={handleInvitationClick}
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 0.5, ease: 'easeOut' }}
                     style={{
                        width: '100vw',
                        height: '100vh',
                        cursor: 'pointer',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '20px',
                        textAlign: 'center',
                        background: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        padding: '20px',
                        borderRadius: '8px',
                        zIndex: 2000,
                     }}
                  >
                     <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', textShadow: '0px 2px 10px rgba(0,0,0,0.5)' }}>
                           특별한 순간에 초대합니다
                        </Typography>
                        <Typography variant="subtitle1" sx={{ mt: 1, textShadow: '0px 1px 5px rgba(0,0,0,0.3)' }}>
                           함께하는 이 순간이 더욱 빛나길 바랍니다.
                        </Typography>
                     </motion.div>

                     <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: '#FFD700', color: '#333' }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                           padding: '12px 24px',
                           fontSize: '18px',
                           fontWeight: 'bold',
                           backgroundColor: 'white',
                           color: 'black',
                           border: 'none',
                           borderRadius: '30px',
                           cursor: 'pointer',
                           boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
                           zIndex: 2100,
                        }}
                        onClick={handleInvitationClick}
                     >
                        초대장 확인하기
                     </motion.button>

                     {/* 썸네일 사진 */}
                     <motion.img
                        src={userTemplate?.formData?.thumbnail}
                        alt="Invitation"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        style={{
                           width: 'auto',
                           maxWidth: '80vw',
                           height: 'auto',
                           maxHeight: '80vh',
                           objectFit: 'contain',
                           borderRadius: '12px',
                           boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                        }}
                     />
                  </motion.div>
               )}

               {showSections && (
                  <motion.div
                     key="sections"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 0.3 }}
                     style={{
                        width: '100%',
                        minHeight: '100vh',
                        paddingTop: '60px',
                        pointerEvents: 'auto',
                     }}
                  >
                     <PreviewPanel
                        formData={userTemplate.formData}
                        theme={{
                           backgroundColor: userTemplate.formData.backgroundColor,
                           fontFamily: userTemplate.formData.fontFamily,
                           primaryColor: userTemplate.formData.primaryColor,
                           secondaryColor: userTemplate.formData.secondaryColor,
                        }}
                     />
                  </motion.div>
               )}
            </AnimatePresence>
         </PreviewContent>
      </PreviewContainer>
   )
}

export default TemplatePreviewer
