import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { Box, Paper, Tabs, Tab, Button, IconButton, Typography, Drawer, Snackbar, Alert, useMediaQuery, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material'
import { styled } from '@mui/material/styles'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import SaveIcon from '@mui/icons-material/Save'
import PreviewIcon from '@mui/icons-material/Preview'
import ShareIcon from '@mui/icons-material/Share'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { HowToReg as HowToRegIcon } from '@mui/icons-material'
import { Person as PersonIcon } from '@mui/icons-material'
import { AccountBalance as AccountBalanceIcon } from '@mui/icons-material'

import {
   HelpOutline as HelpOutlineIcon,
   ArrowBackIosNew as ArrowBackIosNewIcon,
   PhoneIphone as PhoneIphoneIcon,
   Tablet as TabletIcon,
   DesktopWindows as DesktopWindowsIcon,
   Title as TitleIcon,
   Message as MessageIcon,
   Event as EventIcon,
   LocationOn as LocationOnIcon,
   PhotoLibrary as PhotoLibraryIcon,
   Group as GroupIcon,
   Palette as PaletteIcon,
} from '@mui/icons-material'

// 에디터용 컴포넌트
import TitleSection from './editor/components/TitleSection'
import GreetingSection from './editor/components/GreetingSection'
import DateTimeSection from './editor/components/DateTimeSection'
import LocationSection from './editor/components/LocationSection'
import GallerySection from './editor/components/GallerySection'
import RSVPSection from './editor/components/RSVPSection'
import ThemeSection from './editor/components/ThemeSection'
import AccountSection from './editor/components/AccountSection'
import ProfileSection from './editor/components/ProfileSection'
import PreviewPanel from './editor/preview/PreviewPanel'
import PreviewLoading from './editor/preview/PreviewLoading'

// 커스텀 훅
import useTemplateStore from '../../store/templateStore'
import useThemeControl from './editor/hooks/useThemeControl'
import useImageGallery from './editor/hooks/useImageGallery'
import { COLORS } from './editor/styles/commonStyles'

// ===================== styled components =====================

/**
 * 최상위 EditorContainer
 * - 배경 그라디언트, 반응형 레이아웃
 */
const EditorContainer = styled(Box)(({ theme }) => ({
   display: 'flex',
   gap: theme.spacing(4),
   padding: theme.spacing(4),
   minHeight: '100vh',
   background: COLORS.background.gradient,
   position: 'relative',
   [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      padding: theme.spacing(2),
   },
}))

/**
 * 오른쪽 패널(에디터 UI)
 * - Paper로 감싸고, 탭과 섹션 내용 표시
 */
const EditorPanel = styled(Box)(({ theme }) => ({
   flex: 1,
   display: 'flex',
   flexDirection: 'column',
   gap: theme.spacing(3),
   maxWidth: '50%',
   [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
      order: 2,
   },
}))

/**
 * 왼쪽 미리보기 패널
 * - 모바일 사이즈로 표시하고, Sticky 등 적용(데스크톱 전용)
 */
const PreviewContainer = styled(Box)(({ theme }) => ({
   position: 'sticky',
   top: theme.spacing(4),
   height: 'calc(100vh - 64px)',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   flex: 1,
   perspective: '1000px',
   '&::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      height: '80%',
      background: 'radial-gradient(circle at center, rgba(192,165,131,0.1) 0%, rgba(255,255,255,0) 70%)',
      zIndex: -1,
   },
   [theme.breakpoints.down('md')]: {
      position: 'relative',
      top: 0,
      height: '600px',
      order: 1,
   },
}))

/**
 * 미리보기 프레임(가로 375, 세로 667)
 */
const PreviewFrame = styled(motion.div)(({ theme }) => ({
   width: '100%',
   maxWidth: 375,
   height: '100%',
   maxHeight: 667,
   backgroundColor: '#FFFFFF',
   borderRadius: '44px', // 아이폰 스타일의 라운드 코너
   boxShadow: '0 25px 45px rgba(0, 0, 0, 0.1)',
   overflowY: 'auto',
   position: 'relative',
   WebkitOverflowScrolling: 'touch', // iOS에서 부드러운 스크롤 적용
   '&::-webkit-scrollbar': {
      display: 'none',
   },
   '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)',
      borderRadius: 'inherit',
      zIndex: 1,
   },
}))

/**
 * 탭 패널 내부
 */
const TabPanelContent = styled(Box)(({ theme }) => ({
   backgroundColor: 'transparent',
   borderRadius: theme.shape.borderRadius * 2,
   minHeight: '400px',
}))

const StyledTabs = styled(Tabs)(({ theme }) => ({
   borderBottom: `1px solid ${COLORS.accent.main}15`,
   '& .MuiTab-root': {
      textTransform: 'none',
      fontFamily: 'Pretendard, sans-serif',
      fontSize: '0.9rem',
      minHeight: 48,
      padding: '6px 16px',
      color: COLORS.text.secondary,
      '&.Mui-selected': {
         color: COLORS.accent.main,
         fontWeight: 500,
      },
   },
   '& .MuiTabs-indicator': {
      backgroundColor: COLORS.accent.main,
   },
}))

const TabPanel = styled(Box)({
   padding: '24px 0',
})

const MobileSpeedDial = styled(SpeedDial)(({ theme }) => ({
   position: 'fixed',
   bottom: theme.spacing(2),
   right: theme.spacing(2),
   '& .MuiSpeedDial-fab': {
      backgroundColor: COLORS.accent.main,
      '&:hover': {
         backgroundColor: COLORS.accent.dark,
      },
   },
}))

const GreetingPreview = styled(motion.div)(({ theme }) => ({
   padding: theme.spacing(4),
   backgroundColor: '#FFFFFF',
   borderRadius: theme.shape.borderRadius * 2,
   position: 'relative',
   '&::before': {
      content: '"""',
      position: 'absolute',
      top: theme.spacing(2),
      left: theme.spacing(2),
      color: '#C0A583',
      fontSize: '2rem',
      fontFamily: 'serif',
      opacity: 0.2,
   },
   '&::after': {
      content: '"""',
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      color: '#C0A583',
      fontSize: '2rem',
      fontFamily: 'serif',
      opacity: 0.2,
   },
}))

const GreetingText = styled(Typography)(({ theme }) => ({
   fontSize: '1.1rem',
   lineHeight: 1.8,
   color: theme.palette.text.primary,
   textAlign: 'center',
   whiteSpace: 'pre-line',
   fontFamily: 'Noto Serif KR, serif',
   '& strong': {
      color: '#C0A583',
      fontWeight: 500,
   },
}))

const TabsContainer = styled(Box)(({ theme }) => ({
   display: 'flex',
   gap: '8px',
   padding: '16px',
   overflowX: 'auto',
   WebkitOverflowScrolling: 'touch', // iOS에서 부드러운 스크롤 적용
   '&::-webkit-scrollbar': {
      height: '4px',
   },
   '&::-webkit-scrollbar-track': {
      background: 'transparent',
   },
   '&::-webkit-scrollbar-thumb': {
      background: COLORS.accent.main,
      borderRadius: '2px',
   },
}))

const TabButton = styled(Button)(({ theme, selected }) => ({
   minWidth: 'unset',
   padding: '8px 16px',
   borderRadius: '8px',
   backgroundColor: selected ? `${COLORS.accent.main}15` : 'transparent',
   color: selected ? COLORS.accent.main : COLORS.text.secondary,
   border: `1px solid ${selected ? COLORS.accent.main : 'transparent'}`,
   '&:hover': {
      backgroundColor: selected ? `${COLORS.accent.main}25` : 'rgba(0, 0, 0, 0.04)',
   },
   whiteSpace: 'nowrap',
}))

// ===================== sections / 탭 구성 =====================
function createSections(control, watch, themeProps) {
   return [
      { id: 'profile', label: '기본 정보', icon: <PersonIcon /> },
      { id: 'title', label: '제목', icon: <TitleIcon /> },
      { id: 'greeting', label: '인사말', icon: <MessageIcon /> },
      { id: 'datetime', label: '날짜/시간', icon: <EventIcon /> },
      { id: 'location', label: '장소', icon: <LocationOnIcon /> },
      { id: 'gallery', label: '갤러리', icon: <PhotoLibraryIcon /> },
      { id: 'account', label: '계좌번호', icon: <AccountBalanceIcon /> },
      { id: 'rsvp', label: 'RSVP', icon: <HowToRegIcon /> },
      { id: 'theme', label: '테마', icon: <PaletteIcon /> },
   ]
}

// 애니메이션 variants를 정의

/**
 * 컨테이너 애니메이션
 * - 모바일 미리보기 패널 애니메이션
 *
 * 컨테이너 애니메이션은 모바일 미리보기 패널 애니메이션을 정의
 * 사용법 : <EditorContainer variants={containerVariants} initial="initial" animate="animate">
 */
const containerVariants = {
   initial: { opacity: 0 }, // 초기 상태
   animate: {
      opacity: 1, // 애니메이션 종료 상태
      transition: {
         staggerChildren: 0.1, // 자식 요소들 간의 애니메이션 지연
      },
   },
}

/**
 * 미리보기 애니메이션
 * - 모바일 미리보기 패널 애니메이션
 *
 * 미리보기 애니메이션은 모바일 미리보기 패널 애니메이션을 정의
 * 사용법 : <PreviewContainer variants={previewVariants} initial="initial" animate="animate">
 */
const previewVariants = {
   initial: {
      opacity: 0, // 초기 상태
      x: -50, // 애니메이션 시작 위치
   },
   animate: {
      opacity: 1, // 애니메이션 종료 상태
      x: 0, // 애니메이션 종료 위치
      transition: {
         type: 'spring', // 스프링 애니메이션 타입
         stiffness: 300, // 스프링 애니메이션 강도
         damping: 30, // 스프링 애니메이션 감쇠 비율
      },
   },
}

/**
 * 편집기 애니메이션
 * - 모바일 편집기 패널 애니메이션
 *
 * 편집기 애니메이션은 모바일 편집기 패널 애니메이션을 정의
 * 사용법 : <EditorPanel variants={editorVariants} initial="initial" animate="animate">
 */
const editorVariants = {
   initial: {
      opacity: 0, // 초기 상태
      x: 50, // 애니메이션 시작 위치
   },
   animate: {
      opacity: 1, // 애니메이션 종료 상태
      x: 0, // 애니메이션 종료 위치
      transition: {
         type: 'spring', // 스프링 애니메이션 타입
         stiffness: 300, // 스프링 애니메이션 강도
         damping: 30, // 스프링 애니메이션 감쇠 비율
      },
   },
}

const TemplateEditor = () => {
   const navigate = useNavigate()
   const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'))

   // Zustand store
   const { template, isLoading, error, updateTemplate, saveTemplate } = useTemplateStore()

   // react-hook-form
   const methods = useForm({
      defaultValues: {
         // 기본 정보
         profiles: [],
         showProfiles: false,
         // 초대장 타입
         type: 'wedding',
         // 제목
         title: '',
         // 인사말
         greeting: '',
         // 날짜/시간
         dateTime: null,
         showCountdown: false,
         // 장소
         location: {
            name: '',
            address: '',
            detail: '',
         },
         showMap: true,
         // 갤러리
         images: [],
         // 계좌번호
         accounts: [],
         showAccounts: false,
         // RSVP
         rsvpTitle: '',
         rsvpDescription: '',
         // 테마
         backgroundColor: '#ffffff',
         primaryColor: '#000000',
         secondaryColor: '#666666',
         fontFamily: 'Malgun Gothic',
         animation: null,
      },
   })

   // react-hook-form 훅 : 폼 상태 관리
   const {
      control, // 컨트롤러
      watch, // 감시
      handleSubmit, // 폼 제출
      formState: { isDirty }, // 폼 상태
      getValues, // 폼 값 가져오기
      reset, // 폼 초기화
   } = methods

   // 테마 훅
   const { theme: themeSettings, handleThemeChange, resetTheme, undo, redo, canUndo, canRedo } = useThemeControl()

   // 이미지 갤러리 훅
   const { images, handleImageUpload, handleImageDelete, reorderImages } = useImageGallery()

   // sections
   const themeProps = {
      handleThemeChange, // 테마 변경
      resetTheme, // 테마 초기화
      undo, // 실행 취소
      redo, // 실행 복원
      canUndo, // 실행 취소 가능 여부
      canRedo, // 실행 복원 가능 여부
      theme: themeSettings, // 테마
   }

   const sections = useMemo(() => createSections(control, watch, themeProps), [control, watch, themeProps])
   const [currentTab, setCurrentTab] = useState(0)
   const [isPreviewLoading, setIsPreviewLoading] = useState(false)
   const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' })
   const [autoSaveStatus, setAutoSaveStatus] = useState('idle') // 'idle', 'saving', 'saved', 'error'
   const [isPreviewOpen, setIsPreviewOpen] = useState(false)
   const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false)
   const [previewSize, setPreviewSize] = useState('mobile') // mobile, tablet, desktop
   const [activeSection, setActiveSection] = useState('title')

   // type 관련 상태와 핸들러
   const currentType = watch('type') || 'wedding'
   const handleTypeChange = useCallback(
      (newType) => {
         methods.setValue('type', newType, { shouldValidate: true })
      },
      [methods]
   )

   // 섹션 공통 props
   const sectionProps = useMemo(
      () => ({
         currentType,
         onTypeChange: handleTypeChange,
      }),
      [currentType, handleTypeChange]
   )

   // 미디어쿼리나 상태에 따라 탭 변경
   const handleTabChange = useCallback((event, newValue) => {
      setIsPreviewLoading(true)
      setCurrentTab(newValue)
      setTimeout(() => setIsPreviewLoading(false), 500)
   }, [])

   // 뒤로가기 처리
   const handleBack = useCallback(() => {
      if (isDirty) {
         if (window.confirm('저장하지 않은 변경사항이 있습니다. 정말 나가시겠습니까?')) {
            navigate(-1)
         }
      } else {
         navigate(-1)
      }
   }, [navigate, isDirty])

   // 알림 표시
   const showNotification = useCallback((message, severity = 'success') => {
      setNotification({ open: true, message, severity })
   }, [])

   // 임시 저장
   const handleTempSave = useCallback(async () => {
      setIsPreviewLoading(true)
      try {
         const data = getValues()
         await updateTemplate(data)
         await saveTemplate()
         setAutoSaveStatus('saved')
         showNotification('임시저장되었습니다.')
      } catch (error) {
         setAutoSaveStatus('error')
         showNotification('임시저장 실패', 'error')
      } finally {
         setIsPreviewLoading(false)
      }
   }, [getValues, updateTemplate, saveTemplate, showNotification])

   // 폼 제출
   const onSubmit = useCallback(
      async (data) => {
         try {
            setIsPreviewLoading(true)
            // 실제 API 연동 대신, 가짜 처리
            await new Promise((resolve) => setTimeout(resolve, 1500))
            showNotification('템플릿이 저장되었습니다.')
            navigate(-1)
         } catch (error) {
            showNotification('저장에 실패했습니다.', 'error')
         } finally {
            setIsPreviewLoading(false)
         }
      },
      [navigate, showNotification]
   )

   // 미리보기 사이즈 아이콘
   const previewSizeIcons = {
      mobile: <PhoneIphoneIcon />,
      tablet: <TabletIcon />,
      desktop: <DesktopWindowsIcon />,
   }

   // SpeedDial 액션 (모바일 화면에서만 보여짐)
   const speedDialActions = [
      { icon: <SaveIcon />, name: '저장하기', action: handleSubmit(onSubmit) },
      { icon: <PreviewIcon />, name: '미리보기', action: () => setIsPreviewOpen(true) },
   ]

   return (
      <FormProvider {...methods}>
         <EditorContainer variants={containerVariants} initial="initial" animate="animate">
            <PreviewContainer variants={previewVariants}>
               <PreviewFrame>
                  <PreviewPanel
                     formData={{
                        ...watch(),
                        type: currentType,
                     }}
                     previewSize={previewSize}
                     theme={themeSettings}
                  />
               </PreviewFrame>
            </PreviewContainer>

            <EditorPanel variants={editorVariants}>
               <TabsContainer>
                  {sections.map((section) => (
                     <TabButton key={section.id} selected={activeSection === section.id} onClick={() => setActiveSection(section.id)} startIcon={section.icon}>
                        {section.label}
                     </TabButton>
                  ))}
               </TabsContainer>
               <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
                  <AnimatePresence mode="wait">
                     {activeSection === 'profile' && <ProfileSection key="profile" {...sectionProps} />}
                     {activeSection === 'title' && <TitleSection key="title" {...sectionProps} />}
                     {activeSection === 'greeting' && <GreetingSection key="greeting" {...sectionProps} />}
                     {activeSection === 'datetime' && <DateTimeSection key="datetime" {...sectionProps} />}
                     {activeSection === 'location' && <LocationSection key="location" {...sectionProps} />}
                     {activeSection === 'gallery' && <GallerySection key="gallery" {...sectionProps} />}
                     {activeSection === 'account' && <AccountSection key="account" {...sectionProps} />}
                     {activeSection === 'rsvp' && <RSVPSection key="rsvp" {...sectionProps} />}
                     {activeSection === 'theme' && <ThemeSection key="theme" {...sectionProps} />}
                  </AnimatePresence>
               </Box>
            </EditorPanel>

            {/* 모바일에서의 드로어 미리보기 */}
            <Drawer
               anchor="right"
               open={isPreviewOpen}
               onClose={() => setIsPreviewOpen(false)}
               sx={{
                  '& .MuiDrawer-paper': {
                     width: '100%',
                     maxWidth: 375,
                     height: '100%',
                  },
               }}
            >
               {isPreviewLoading ? <PreviewLoading /> : <PreviewPanel formData={watch()} theme={themeSettings} />}
            </Drawer>

            {/* 모바일 환경 SpeedDial */}
            {isMobile && (
               <MobileSpeedDial ariaLabel="SpeedDial" icon={<SpeedDialIcon openIcon={<MoreVertIcon />} />} direction="up">
                  {speedDialActions.map((action) => (
                     <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={action.action} />
                  ))}
               </MobileSpeedDial>
            )}
         </EditorContainer>

         {/* 알림 메시지 */}
         <Snackbar open={notification.open} autoHideDuration={3000} onClose={() => setNotification((prev) => ({ ...prev, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert severity={notification.severity} sx={{ width: '100%' }}>
               {notification.message}
            </Alert>
         </Snackbar>
      </FormProvider>
   )
}

export default TemplateEditor
