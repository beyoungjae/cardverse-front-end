import React, { useState, useCallback } from 'react'
import { Box, Container, Tabs, Tab, Button, Snackbar, Alert, IconButton, useMediaQuery, Drawer, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material'
import { styled as muiStyled } from '@mui/material/styles'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import TabletIcon from '@mui/icons-material/Tablet'
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows'
import SaveIcon from '@mui/icons-material/Save'
import PreviewIcon from '@mui/icons-material/Preview'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

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
   [theme.breakpoints.down('lg')]: {
      padding: '1.5rem',
      gap: '1.5rem',
   },
   [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      padding: '1rem',
      gap: '1rem',
   },
}))

const EditorSection = muiStyled(motion.div)(({ theme }) => ({
   flex: 1,
   backgroundColor: 'white',
   padding: '2rem',
   borderRadius: theme.shape.borderRadius,
   boxShadow: theme.shadows[1],
   [theme.breakpoints.down('md')]: {
      padding: '1.5rem',
   },
   [theme.breakpoints.down('sm')]: {
      padding: '1rem',
   },
}))

const PreviewSection = muiStyled(motion.div)(({ theme, previewSize }) => ({
   flex: previewSize === 'desktop' ? 1 : 'none',
   width: previewSize === 'mobile' ? '375px' : previewSize === 'tablet' ? '768px' : '100%',
   height: previewSize === 'mobile' ? '667px' : previewSize === 'tablet' ? '1024px' : '100%',
   position: 'sticky',
   top: '2rem',
   backgroundColor: 'white',
   borderRadius: theme.shape.borderRadius,
   boxShadow: theme.shadows[1],
   overflow: 'hidden',
   transition: 'all 0.3s ease',
   [theme.breakpoints.down('md')]: {
      position: 'relative',
      top: 0,
      width: '100%',
      height: '600px',
   },
}))

const PreviewFrame = muiStyled(Box)(({ theme }) => ({
   width: '100%',
   height: '100%',
   overflow: 'hidden',
   position: 'relative',
   '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)',
      pointerEvents: 'none',
   },
}))

const PreviewControls = muiStyled(Box)(({ theme }) => ({
   position: 'absolute',
   top: theme.spacing(2),
   right: theme.spacing(2),
   zIndex: 10,
   display: 'flex',
   gap: theme.spacing(1),
   [theme.breakpoints.down('md')]: {
      display: 'none',
   },
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
   const [previewSize, setPreviewSize] = useState('mobile')
   const [isPreviewOpen, setIsPreviewOpen] = useState(false)
   const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'))

   // 커스텀 훅 사용
   const {
      control,
      handleSubmit,
      watch,
      formState: { errors, isDirty },
      saveDraft,
      loadDraft,
      autoSaveStatus,
   } = useTemplateForm()
   const { theme, handleThemeChange, resetTheme, undo, redo, canUndo, canRedo } = useThemeControl()
   const { images, handleImageUpload, handleImageDelete, reorderImages } = useImageGallery()

   // 폼 데이터 감시
   const formData = watch()

   const showNotification = useCallback((message, severity = 'success') => {
      setNotification({ open: true, message, severity })
   }, [])

   const handleTabChange = (event, newValue) => {
      setCurrentTab(newValue)
   }

   const handleBack = () => {
      if (isDirty) {
         // 저장하지 않은 변경사항이 있을 경우 확인
         if (window.confirm('저장하지 않은 변경사항이 있습니다. 정말 나가시겠습니까?')) {
            navigate(-1)
         }
      } else {
         navigate(-1)
      }
   }

   const handleTempSave = async () => {
      try {
         setIsPreviewLoading(true)
         const result = await handleSubmit((data) => {
            saveDraft(data)
            return { success: true }
         })()

         if (result.success) {
            showNotification('임시저장되었습니다.')
         }
      } catch (error) {
         showNotification('임시저장에 실패했습니다.', 'error')
      } finally {
         setIsPreviewLoading(false)
      }
   }

   const onSubmit = async (data) => {
      try {
         setIsPreviewLoading(true)
         const result = await handleSubmit((formData) => {
            // 실제 저장 로직
            return new Promise((resolve) => {
               setTimeout(() => {
                  resolve({ success: true })
               }, 1500)
            })
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

   const previewSizeIcons = {
      mobile: <PhoneIphoneIcon />,
      tablet: <TabletIcon />,
      desktop: <DesktopWindowsIcon />,
   }

   const speedDialActions = [
      { icon: <SaveIcon />, name: '저장', onClick: handleSubmit(onSubmit) },
      { icon: <PreviewIcon />, name: '미리보기', onClick: () => setIsPreviewOpen(true) },
   ]

   return (
      <EditorContainer maxWidth="xl">
         <EditorSection initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
               <IconButton onClick={handleBack}>
                  <ArrowBackIosNewIcon />
               </IconButton>
               {!isMobile && (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                     <Button variant="outlined" onClick={handleTempSave} disabled={!isDirty}>
                        임시저장
                     </Button>
                     <Button variant="contained" onClick={handleSubmit(onSubmit)} disabled={!isDirty}>
                        저장하기
                     </Button>
                  </Box>
               )}
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
               <GallerySection value={images} onChange={handleImageUpload} onDelete={handleImageDelete} onReorder={reorderImages} />
               <RSVPSection control={control} />
            </TabPanel>

            <TabPanel value={currentTab} index={1}>
               <ThemeSection theme={theme} onThemeChange={handleThemeChange} onReset={resetTheme} onUndo={undo} onRedo={redo} canUndo={canUndo} canRedo={canRedo} />
            </TabPanel>
         </EditorSection>

         {!isMobile && (
            <PreviewSection previewSize={previewSize} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
               <PreviewControls>
                  {Object.entries(previewSizeIcons).map(([size, icon]) => (
                     <IconButton key={size} onClick={() => setPreviewSize(size)} color={previewSize === size ? 'primary' : 'default'}>
                        {icon}
                     </IconButton>
                  ))}
               </PreviewControls>
               <PreviewFrame>{isPreviewLoading ? <PreviewLoading /> : <PreviewPanel formData={formData} theme={theme} />}</PreviewFrame>
            </PreviewSection>
         )}

         {/* 모바일 환경에서의 미리보기 드로어 */}
         <Drawer
            anchor="right"
            open={isPreviewOpen}
            onClose={() => setIsPreviewOpen(false)}
            sx={{
               '& .MuiDrawer-paper': {
                  width: '100%',
                  maxWidth: '375px',
                  height: '100%',
               },
            }}
         >
            <PreviewFrame>{isPreviewLoading ? <PreviewLoading /> : <PreviewPanel formData={formData} theme={theme} />}</PreviewFrame>
         </Drawer>

         {/* 모바일 환경에서의 SpeedDial */}
         {isMobile && (
            <SpeedDial ariaLabel="템플릿 에디터 작업" sx={{ position: 'fixed', bottom: 16, right: 16 }} icon={<SpeedDialIcon />}>
               {speedDialActions.map((action) => (
                  <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={action.onClick} />
               ))}
            </SpeedDial>
         )}

         <Snackbar open={notification.open} autoHideDuration={3000} onClose={() => setNotification({ ...notification, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert severity={notification.severity} sx={{ width: '100%' }}>
               {notification.message}
            </Alert>
         </Snackbar>

         {/* 자동 저장 상태 표시 */}
         <Snackbar open={autoSaveStatus === 'saving'} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <Alert severity="info" sx={{ width: '100%' }}>
               변경사항 저장 중...
            </Alert>
         </Snackbar>
      </EditorContainer>
   )
}

export default TemplateEditor
