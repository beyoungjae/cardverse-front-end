import React, { useState, useEffect, useCallback } from 'react'
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
   justifyContent: 'space-between',
   alignItems: 'center',
   backgroundColor: 'rgba(255, 255, 255, 0.95)',
   backdropFilter: 'blur(10px)',
   boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
   zIndex: 1000,
}))

const TemplatePreviewer = ({ userTemplateId: propUserTemplateId, standalone = false }) => {
   const params = useParams()
   const navigate = useNavigate()

   // props로 전달된 userTemplateId가 있으면 사용하고, 없으면 URL 파라미터에서 가져옴
   const userTemplateId = propUserTemplateId || params.userTemplateId

   const [userTemplate, setUserTemplate] = useState(null)
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)

   // PreviewPanel에 전달할 상태 초기화 - 인트로 이미지 애니메이션을 위해 showInvitation을 true로 설정
   const [previewState, setPreviewState] = useState({
      showInvitation: true,
      showSections: false,
      sectionAnimationIndex: -1,
   })

   const fetchUserTemplate = useCallback(async () => {
      try {
         setLoading(true)
         console.log('템플릿 데이터 요청 시작, ID:', userTemplateId)

         if (!userTemplateId) {
            console.error('템플릿 ID가 없습니다.')
            throw new Error('템플릿 ID가 없습니다.')
         }

         const response = await userTemplateApi.getUserTemplate(userTemplateId)

         if (!response) {
            console.error('API 응답이 없습니다.')
            throw new Error('서버에서 응답을 받지 못했습니다.')
         }

         // 응답 구조 확인 및 처리
         let userTemplateData = response.userTemplate || response

         if (!userTemplateData) {
            console.error('템플릿 데이터가 없습니다:', response)
            throw new Error('템플릿을 찾을 수 없습니다.')
         }

         // formData가 이미 파싱되어 있는지 확인
         let formData = userTemplateData.formData || userTemplateData.templateSet?.formData

         if (!formData) {
            console.error('formData가 없습니다:', userTemplateData)

            // 대체 경로 시도
            if (userTemplateData.template?.data) {
               console.log('template.data를 formData로 사용합니다')
               formData = userTemplateData.template.data
            } else if (userTemplateData.data) {
               console.log('data를 formData로 사용합니다')
               formData = userTemplateData.data
            } else {
               throw new Error('템플릿 데이터가 없습니다.')
            }
         }

         // formData가 문자열인 경우 파싱
         if (typeof formData === 'string') {
            try {
               formData = JSON.parse(formData)
            } catch (parseError) {
               console.error('formData 파싱 오류:', parseError)
               throw new Error('템플릿 데이터 형식이 올바르지 않습니다.')
            }
         }

         // 기본값 설정
         const processedFormData = {
            type: formData.type || 'wedding',
            title: formData.title || '제목 없음',
            greeting: formData.greeting || '',
            dateTime: formData.dateTime || null,
            showCountdown: formData.showCountdown || false,
            location: formData.location || {},
            accounts: formData.accounts || [],
            showAccounts: formData.showAccounts || false,
            backgroundColor: formData.backgroundColor || '#ffffff',
            primaryColor: formData.primaryColor || '#000000',
            secondaryColor: formData.secondaryColor || '#666666',
            fontFamily: formData.fontFamily || 'Malgun Gothic',
            animation: formData.animation || null,
            images: formData.images || [],
            // setting 섹션이 없으면 기본값 설정 (인트로 이미지 애니메이션을 위해 필요)
            setting: formData.setting || {
               animation: 'fade',
               images: formData.images || [],
            },
            ...formData,
         }

         console.log('처리된 formData:', processedFormData)

         setUserTemplate({
            ...userTemplateData,
            formData: processedFormData,
         })
      } catch (error) {
         console.error('템플릿 로드 오류:', error)
         setError(error.message || '템플릿을 불러오는 중 오류가 발생했습니다.')
      } finally {
         // 로딩 상태를 약간 지연시켜 UI가 깜빡이는 것을 방지
         setTimeout(() => {
            setLoading(false)
         }, 1000)
      }
   }, [userTemplateId])

   useEffect(() => {
      const loadTemplate = async () => {
         try {
            await fetchUserTemplate()
         } catch (err) {
            console.error('템플릿 로드 중 오류:', err)
         }
      }

      loadTemplate()

      return () => {
         // 컴포넌트 언마운트 시 정리 작업
      }
   }, [userTemplateId, fetchUserTemplate])

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

   // PreviewPanel에서 상태 변경 이벤트를 처리하는 함수
   const handlePreviewStateChange = useCallback((newState) => {
      console.log('미리보기 상태 변경:', newState)
      setPreviewState((prev) => ({
         ...prev,
         ...newState,
      }))
   }, [])

   if (loading) {
      return (
         <Box
            sx={{
               position: 'fixed',
               top: 0,
               left: 0,
               right: 0,
               bottom: 0,
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               bgcolor: '#fff',
               zIndex: 9999,
            }}
         >
            <PreviewLoading />
         </Box>
      )
   }

   if (error) {
      return (
         <Box
            sx={{
               position: 'fixed',
               top: 0,
               left: 0,
               right: 0,
               bottom: 0,
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               justifyContent: 'center',
               height: '100vh',
               textAlign: 'center',
               p: 3,
               bgcolor: '#fff',
               zIndex: 9999,
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
   const formData = userTemplate?.formData || {}

   // 템플릿의 기본 테마 정보 - formData에서 직접 가져와 테마 설정이 제대로 적용되도록 함
   const theme = {
      backgroundColor: formData.backgroundColor || '#ffffff',
      primaryColor: formData.primaryColor || '#000000',
      secondaryColor: formData.secondaryColor || '#666666',
      fontFamily: formData.fontFamily || 'Malgun Gothic',
      animation: formData.animation || 'fade',
   }

   console.log('적용될 테마 설정:', theme)

   // standalone 모드일 때는 Box 컨테이너를 사용하지 않음
   if (standalone) {
      return (
         <AnimatePresence mode="wait">
            <PreviewContainer maxWidth="lg">
               <TopBar>
                  <IconButton onClick={handleBack} sx={{ color: '#333' }}>
                     <ArrowBackIcon />
                  </IconButton>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                     <Typography variant="subtitle1" sx={{ mr: 1, fontWeight: 'bold', color: '#333' }}>
                        {formData.title || '미리보기'}
                     </Typography>
                     <IconButton onClick={handleShare} sx={{ color: '#333' }}>
                        <ShareIcon />
                     </IconButton>
                  </Box>
               </TopBar>

               {/* 미리보기 컨테이너 - 전체 화면 사용 */}
               <Box
                  sx={{
                     width: '100%',
                     minHeight: 'calc(100vh - 128px)',
                     margin: '0 auto',
                     marginTop: '64px',
                     marginBottom: '64px',
                     borderRadius: '12px',
                     overflow: 'hidden',
                     boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                     position: 'relative',
                     zIndex: 10,
                     backgroundColor: theme.backgroundColor || '#ffffff',
                     border: '1px solid rgba(0, 0, 0, 0.05)',
                  }}
               >
                  {/* 조건부 렌더링 추가 */}
                  {userTemplate && formData ? (
                     <PreviewPanel formData={formData} theme={theme} isDrawer={false} onPreviewStateChange={handlePreviewStateChange} />
                  ) : (
                     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
                        <Typography variant="h6">템플릿 데이터를 불러오는 중...</Typography>
                        <Typography variant="body2">userTemplateId: {userTemplateId}</Typography>
                     </Box>
                  )}
               </Box>
            </PreviewContainer>
         </AnimatePresence>
      )
   }

   return (
      <Box
         sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: '#fff',
            zIndex: 9999,
            overflow: 'auto',
         }}
      >
         <AnimatePresence mode="wait">
            <PreviewContainer maxWidth="lg">
               <TopBar>
                  <IconButton onClick={handleBack} sx={{ color: '#333' }}>
                     <ArrowBackIcon />
                  </IconButton>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                     <Typography variant="subtitle1" sx={{ mr: 1, fontWeight: 'bold', color: '#333' }}>
                        {formData.title || '미리보기'}
                     </Typography>
                     <IconButton onClick={handleShare} sx={{ color: '#333' }}>
                        <ShareIcon />
                     </IconButton>
                  </Box>
               </TopBar>

               {/* 미리보기 컨테이너 - 전체 화면 사용 */}
               <Box
                  sx={{
                     width: '100%',
                     minHeight: 'calc(100vh - 128px)',
                     margin: '0 auto',
                     marginTop: '64px',
                     marginBottom: '64px',
                     borderRadius: '12px',
                     overflow: 'hidden',
                     boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                     position: 'relative',
                     zIndex: 10,
                     backgroundColor: theme.backgroundColor || '#ffffff',
                     border: '1px solid rgba(0, 0, 0, 0.05)',
                  }}
               >
                  {/* 조건부 렌더링 추가 */}
                  {userTemplate && formData ? (
                     <PreviewPanel formData={formData} theme={theme} isDrawer={false} onPreviewStateChange={handlePreviewStateChange} />
                  ) : (
                     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
                        <Typography variant="h6">템플릿 데이터를 불러오는 중...</Typography>
                        <Typography variant="body2">userTemplateId: {userTemplateId}</Typography>
                     </Box>
                  )}
               </Box>
            </PreviewContainer>
         </AnimatePresence>
      </Box>
   )
}

export default TemplatePreviewer
