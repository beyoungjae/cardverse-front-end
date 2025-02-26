import React, { useState, useCallback, useMemo } from 'react'
import { Box, Button, Drawer, Snackbar, Alert, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material'
import { styled } from '@mui/material/styles'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import SaveIcon from '@mui/icons-material/Save'
import PreviewIcon from '@mui/icons-material/Preview'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Person as PersonIcon } from '@mui/icons-material'
import { AccountBalance as AccountBalanceIcon } from '@mui/icons-material'

import { Title as TitleIcon, Message as MessageIcon, Event as EventIcon, LocationOn as LocationOnIcon, PhotoLibrary as PhotoLibraryIcon, Palette as PaletteIcon, Settings as SettingsIcon } from '@mui/icons-material'

// 에디터용 컴포넌트
import TitleSection from './editor/components/TitleSection'
import GreetingSection from './editor/components/GreetingSection'
import DateTimeSection from './editor/components/DateTimeSection'
import LocationSection from './editor/components/LocationSection'
import GallerySection from './editor/components/GallerySection'
import ThemeSection from './editor/components/ThemeSection'
import AccountSection from './editor/components/AccountSection'
import ProfileSection from './editor/components/ProfileSection'
import SettingSection from './editor/components/SettingSection'
import PreviewPanel from './editor/preview/PreviewPanel'
import PreviewLoading from './editor/preview/PreviewLoading'

// 커스텀 훅
import useThemeControl from './editor/hooks/useThemeControl'
import { COLORS } from './editor/styles/commonStyles'

// API
import { templateApi } from '../../api/templateApi'

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
}))

/**
 * 탭 컨테이너
 * - 탭 버튼 그룹 표시
 */
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

/**
 * 탭 버튼
 * - 탭 버튼 스타일 정의
 */
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

/**
 * 공통 SpeedDial
 */
const UniversalSpeedDial = styled(SpeedDial)(({ theme }) => ({
   position: 'fixed',
   bottom: theme.spacing(2),
   right: theme.spacing(2),
   zIndex: 1000,
   '& .MuiSpeedDial-fab': {
      backgroundColor: COLORS.accent.main,
      '&:hover': {
         backgroundColor: COLORS.accent.dark,
      },
   },
   [theme.breakpoints.up('md')]: {
      bottom: theme.spacing(4),
      right: theme.spacing(4),
   },
}))

// ===================== sections / 탭 구성 =====================
function createSections() {
   return [
      { id: 'setting', label: '설정', icon: <SettingsIcon /> },
      { id: 'profile', label: '기본 정보', icon: <PersonIcon /> },
      { id: 'title', label: '제목', icon: <TitleIcon /> },
      { id: 'greeting', label: '인사말', icon: <MessageIcon /> },
      { id: 'datetime', label: '날짜/시간', icon: <EventIcon /> },
      { id: 'location', label: '장소', icon: <LocationOnIcon /> },
      { id: 'gallery', label: '갤러리', icon: <PhotoLibraryIcon /> },
      { id: 'account', label: '계좌번호', icon: <AccountBalanceIcon /> },
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
         stiffness: 100, // 스프링 애니메이션 강도
         damping: 15, // 스프링 애니메이션 감쇠 비율
      },
   },
}

const TemplateEditor = () => {
   const navigate = useNavigate()
   const { templateId } = useParams() // URL에서 templateId 가져오기

   // react-hook-form
   const methods = useForm({
      defaultValues: {
         setting: {
            animation: 'fade',
            images: [
               { file: null, url: '/images/samples/wedding-sample1.png', name: 'wedding-sample1.png' },
               { file: null, url: '/images/samples/wedding-sample2.png', name: 'wedding-sample2.png' },
               { file: null, url: '/images/samples/wedding-sample3.png', name: 'wedding-sample3.png' },
            ],
         },
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
         // 날짜 카운트다운 표시
         showCountdown: false,
         // 장소 정보
         location: {
            name: '',
            address: '',
            detail: '',
            guide: '',
            showMap: false,
            coordinates: { lat: 37.5665, lng: 126.978 },
         },
         // 갤러리
         images: [],
         // 계좌번호
         accounts: [],
         showAccounts: false,
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
   const [isPreviewLoading, setIsPreviewLoading] = useState(false)
   const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' })
   const [isPreviewOpen, setIsPreviewOpen] = useState(false)
   const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false)
   const [activeSection, setActiveSection] = useState('profile')
   const [previewState, setPreviewState] = useState({
      showInvitation: false,
      showSections: false,
      sectionAnimationIndex: -1,
   })

   // type 관련 상태와 핸들러
   const currentType = watch('type') || 'wedding'
   const handleTypeChange = useCallback(
      (newType) => {
         requestAnimationFrame(() => {
            methods.setValue('type', newType, { shouldValidate: true })
         })
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

   // 알림 표시
   const showNotification = useCallback((message, severity = 'success') => {
      setNotification({ open: true, message, severity })
   }, [])

   // SpeedDial 액션
   const speedDialActions = useMemo(
      () => [
         {
            icon: <SaveIcon />,
            name: '저장하기',
            action: async () => {
               try {
                  setIsPreviewLoading(true)
                  const data = getValues()
                  const response = await templateApi.updateTemplate(templateId, {
                     templateSet: {
                        intro: {
                           type: data.type,
                           title: data.title,
                        },
                        greeting: {
                           content: data.greeting,
                        },
                        calendar: {
                           dateTime: data.dateTime,
                           showCountdown: data.showCountdown,
                        },
                        map: {
                           name: data.location.name,
                           address: data.location.address,
                           detail: data.location.detail,
                           guide: data.location.guide,
                           showMap: data.location.showMap,
                           coordinates: data.location.coordinates,
                        },
                        gallery: {
                           images: data.images,
                           layout: data.galleryLayout,
                        },
                        bankAccount: {
                           accounts: data.accounts,
                           showAccounts: data.showAccounts,
                        },
                        other: {
                           backgroundColor: data.backgroundColor,
                           primaryColor: data.primaryColor,
                           secondaryColor: data.secondaryColor,
                           fontFamily: data.fontFamily,
                           animation: data.animation,
                        },
                     },
                  })

                  showNotification('템플릿이 저장되었습니다.')
                  navigate(`preview/${response.id}`)
               } catch (error) {
                  showNotification('저장에 실패했습니다.', 'error')
               } finally {
                  setIsPreviewLoading(false)
               }
            },
         },
         { icon: <PreviewIcon />, name: '미리보기', action: () => setIsPreviewOpen(true) },
      ],
      [getValues, templateId, navigate, showNotification]
   )

   // ThemeSection에 전달할 props
   const themeSectionProps = {
      theme: themeSettings,
      onThemeChange: handleThemeChange,
   }

   const formData = watch()

   const handlePreviewStateChange = useCallback((newState) => {
      setPreviewState((prev) => ({
         ...prev,
         ...newState,
      }))
   }, [])

   const previewPanelProps = useMemo(
      () => ({
         formData,
         theme: themeSettings,
         previewState,
         setPreviewState,
         isDrawer: false,
      }),
      [formData, themeSettings, previewState]
   )

   const drawerPreviewProps = useMemo(
      () => ({
         ...previewPanelProps,
         isDrawer: true,
         onPreviewStateChange: (newState) => {
            setPreviewState((prev) => ({
               ...prev,
               ...newState,
            }))
         },
      }),
      [previewPanelProps, previewState]
   )

   return (
      <FormProvider {...methods}>
         <EditorContainer variants={containerVariants} initial="initial" animate="animate">
            <PreviewContainer>
               <PreviewFrame>{isPreviewLoading ? <PreviewLoading /> : <PreviewPanel {...previewPanelProps} onPreviewStateChange={handlePreviewStateChange} />}</PreviewFrame>
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
                     {activeSection === 'setting' && <SettingSection key="setting" {...sectionProps} />}
                     {activeSection === 'profile' && <ProfileSection key="profile" {...sectionProps} />}
                     {activeSection === 'title' && <TitleSection key="title" {...sectionProps} />}
                     {activeSection === 'greeting' && <GreetingSection key="greeting" {...sectionProps} />}
                     {activeSection === 'datetime' && <DateTimeSection key="datetime" {...sectionProps} />}
                     {activeSection === 'location' && <LocationSection key="location" {...sectionProps} />}
                     {activeSection === 'gallery' && <GallerySection key="gallery" {...sectionProps} />}
                     {activeSection === 'account' && <AccountSection key="account" {...sectionProps} />}
                     {activeSection === 'theme' && <ThemeSection key="theme" {...themeSectionProps} />}
                  </AnimatePresence>
               </Box>
            </EditorPanel>

            {/* 드로어 미리보기 */}
            <Drawer
               anchor="right"
               open={isPreviewOpen}
               onClose={() => setIsPreviewOpen(false)}
               sx={{
                  '& .MuiDrawer-paper': {
                     width: '100%',
                     maxWidth: 500,
                     height: '100%',
                  },
               }}
            >
               {isPreviewLoading ? <PreviewLoading /> : <PreviewPanel {...drawerPreviewProps} />}
               <Button
                  onClick={() => setIsPreviewOpen(false)}
                  sx={{
                     position: 'absolute',
                     top: 8,
                     right: 8,
                     minWidth: '20px',
                     height: '40px',
                     background: 'rgba(0, 0, 0, 0.4)',
                     color: '#fff',
                     borderRadius: '50%',
                     '&:hover': {
                        background: 'rgba(0, 0, 0, 0.7)',
                     },
                  }}
               >
                  ✕
               </Button>
            </Drawer>

            {/* 공통 SpeedDial */}
            <UniversalSpeedDial ariaLabel="SpeedDial" icon={<SpeedDialIcon openIcon={<MoreVertIcon />} />} direction="up" open={isSpeedDialOpen} onOpen={() => setIsSpeedDialOpen(true)} onClose={() => setIsSpeedDialOpen(false)}>
               {speedDialActions.map((action) => (
                  <SpeedDialAction
                     key={action.name}
                     icon={action.icon}
                     tooltipTitle={action.name}
                     onClick={() => {
                        action.action()
                        setIsSpeedDialOpen(false)
                     }}
                  />
               ))}
            </UniversalSpeedDial>
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
