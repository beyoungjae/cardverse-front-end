import React, { useState } from 'react'
import { Box, Container, Tabs, Tab, Button, Snackbar, Alert, IconButton } from '@mui/material'
import { styled as muiStyled } from '@mui/material/styles'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useNavigate } from 'react-router-dom'

// 컴포넌트 임포트
import TitleSection from './editor/components/TitleSection'
import GreetingSection from './editor/components/GreetingSection'
import DateTimeSection from './editor/components/DateTimeSection'
import LocationSection from './editor/components/LocationSection'
import GallerySection from './editor/components/GallerySection'
import RSVPSection from './editor/components/RSVPSection'
import ThemeSection from './editor/components/ThemeSection'
import PreviewPanel from './editor/preview/PreviewPanel'
import PreviewLoading from './editor/preview/PreviewLoading'

// 커스텀 훅 임포트
import useTemplateForm from './editor/hooks/useTemplateForm'
import useThemeControl from './editor/hooks/useThemeControl'
import useImageGallery from './editor/hooks/useImageGallery'

// 스타일 컴포넌트
const EditorContainer = muiStyled(Container)(({ theme }) => ({
   display: 'flex',
   gap: '2rem',
   padding: '2rem',
   minHeight: '100vh',
   backgroundColor: '#f5f5f5',
   [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      padding: '1rem',
   },
}))

const EditorSection = muiStyled(Box)(({ theme }) => ({
   flex: 1,
   backgroundColor: 'white',
   padding: '2rem',
   borderRadius: theme.shape.borderRadius,
   boxShadow: theme.shadows[1],
}))

const PreviewSection = muiStyled(Box)(({ theme }) => ({
   flex: 1,
   position: 'sticky',
   top: '2rem',
   height: 'calc(100vh - 4rem)',
   backgroundColor: 'white',
   borderRadius: theme.shape.borderRadius,
   boxShadow: theme.shadows[1],
   overflow: 'hidden',
}))

const TabPanel = ({ children, value, index }) => (
   <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
   </div>
)

const TemplateEditor = () => {
   const navigate = useNavigate()
   const [currentTab, setCurrentTab] = useState(0)
   const [isPreviewLoading, setIsPreviewLoading] = useState(false)
   const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' })

   // 커스텀 훅 사용
   const {
      control,
      handleSubmit,
      watch,
      formState: { errors },
   } = useTemplateForm()
   const { theme, handleThemeChange, resetTheme } = useThemeControl()
   const { images, handleImageUpload, handleImageDelete } = useImageGallery()

   // 폼 데이터 감시
   const formData = watch()

   const showNotification = (message, severity = 'success') => {
      setNotification({ open: true, message, severity })
   }

   const handleTabChange = (event, newValue) => {
      setCurrentTab(newValue)
   }

   const handleBack = () => {
      navigate(-1)
   }

   const handleTempSave = async () => {
      try {
         const result = await handleSubmit((data) => {
            // 임시 저장 로직
            localStorage.setItem('template_draft', JSON.stringify({ ...data, style: theme }))
            return { success: true }
         })()

         if (result.success) {
            showNotification('임시저장되었습니다.')
         }
      } catch (error) {
         showNotification('임시저장에 실패했습니다.', 'error')
      }
   }

   const onSubmit = async (data) => {
      try {
         setIsPreviewLoading(true)
         const result = await handleSubmit((formData) => {
            // 실제 저장 로직
            return { success: true }
         })()

         if (result.success) {
            showNotification('템플릿이 저장되었습니다.')
            navigate(-1)
         }
      } catch (error) {
         showNotification('저장에 실패했습니다.', 'error')
      } finally {
         setIsPreviewLoading(false)
      }
   }

   return (
      <EditorContainer maxWidth="xl">
         <EditorSection>
            <Box sx={{ mb: 3 }}>
               <IconButton onClick={handleBack} sx={{ mb: 2 }}>
                  <ArrowBackIosNewIcon />
               </IconButton>
            </Box>

            <Tabs value={currentTab} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
               <Tab label="기본 정보" />
               <Tab label="테마 설정" />
            </Tabs>

            <TabPanel value={currentTab} index={0}>
               <TitleSection control={control} />
               <GreetingSection control={control} />
               <DateTimeSection control={control} />
               <LocationSection control={control} />
               <GallerySection value={images} onChange={handleImageUpload} />
               <RSVPSection control={control} />
            </TabPanel>

            <TabPanel value={currentTab} index={1}>
               <ThemeSection theme={theme} onThemeChange={handleThemeChange} />
            </TabPanel>

            <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
               <Button variant="outlined" onClick={handleTempSave}>
                  임시저장
               </Button>
               <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                  저장하기
               </Button>
            </Box>
         </EditorSection>

         <PreviewSection>{isPreviewLoading ? <PreviewLoading /> : <PreviewPanel formData={formData} theme={theme} />}</PreviewSection>

         <Snackbar open={notification.open} autoHideDuration={3000} onClose={() => setNotification({ ...notification, open: false })}>
            <Alert severity={notification.severity} sx={{ width: '100%' }}>
               {notification.message}
            </Alert>
         </Snackbar>
      </EditorContainer>
   )
}

export default TemplateEditor
