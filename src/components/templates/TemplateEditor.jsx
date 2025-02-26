import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { Box, Button, Drawer, Snackbar, Alert, SpeedDial, SpeedDialIcon, SpeedDialAction, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import SaveIcon from '@mui/icons-material/Save'
import PreviewIcon from '@mui/icons-material/Preview'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Person as PersonIcon } from '@mui/icons-material'
import { AccountBalance as AccountBalanceIcon } from '@mui/icons-material'
import { Publish as PublishIcon } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { Typography } from '@mui/material'

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

// AdminTemplateDialog를 메인 컴포넌트 밖으로 분리하고 React.memo로 감싸기
const AdminTemplateDialog = React.memo(
   ({ open, onClose, showNotification }) => {
      const [formData, setFormData] = useState({
         title: '',
         thumbnail: null,
         thumbnailPreview: null,
         detailImages: [],
         detailImagePreviews: [],
         price: '',
         category: 'wedding',
         data: {},
      })
      const [isUploading, setIsUploading] = useState(false)
      const [errors, setErrors] = useState({})

      // 폼 초기화 함수
      const resetForm = useCallback(() => {
         setFormData({
            title: '',
            thumbnail: null,
            thumbnailPreview: null,
            detailImages: [],
            detailImagePreviews: [],
            price: '',
            category: 'wedding',
            data: {},
         })
         setErrors({})
      }, [])

      // 파일 변경 핸들러 수정
      const handleFileChange = useCallback(
         (e) => {
            const file = e.target.files[0]
            if (file) {
               if (file.size > 20000000) {
                  // 20MB 제한
                  showNotification('파일 크기는 20MB를 초과할 수 없습니다.', 'error')
                  return
               }

               const reader = new FileReader()
               reader.onload = () => {
                  setFormData((prev) => ({
                     ...prev,
                     thumbnail: file,
                     thumbnailPreview: reader.result,
                  }))
                  // 썸네일 에러 제거
                  setErrors((prev) => {
                     const newErrors = { ...prev }
                     delete newErrors.thumbnail
                     return newErrors
                  })
               }
               reader.readAsDataURL(file)
            }
         },
         [showNotification]
      )

      // 상세 이미지 핸들러 추가
      const handleDetailImagesChange = useCallback(
         (e) => {
            const files = Array.from(e.target.files)
            if (files.length > 3) {
               showNotification('최대 3개의 이미지만 선택할 수 있습니다.', 'error')
               return
            }

            const validFiles = files.filter((file) => {
               if (file.size > 20000000) {
                  showNotification('각 파일은 20MB를 초과할 수 없습니다.', 'error')
                  return false
               }
               return true
            })

            Promise.all(
               validFiles.map((file) => {
                  return new Promise((resolve) => {
                     const reader = new FileReader()
                     reader.onload = () => {
                        resolve({
                           file,
                           preview: reader.result,
                        })
                     }
                     reader.readAsDataURL(file)
                  })
               })
            ).then((results) => {
               setFormData((prev) => ({
                  ...prev,
                  detailImages: results.map((r) => r.file),
                  detailImagePreviews: results.map((r) => r.preview),
               }))
            })
         },
         [showNotification]
      )

      // 유효성 검사 함수 수정
      const validateForm = useCallback(() => {
         const newErrors = {}

         if (!formData.title.trim()) {
            newErrors.title = '제목을 입력해주세요'
         }
         if (!formData.thumbnail) {
            newErrors.thumbnail = '썸네일 이미지를 선택해주세요'
         }
         if (!formData.price) {
            newErrors.price = '가격을 입력해주세요'
         }

         setErrors(newErrors)
         return Object.keys(newErrors).length === 0
      }, [formData])

      // 제출 핸들러 수정
      const handleSubmit = useCallback(
         async (e) => {
            e.preventDefault()

            if (!validateForm()) {
               return
            }

            try {
               setIsUploading(true)
               const submitFormData = new FormData()

               // 필수 필드 추가 (null 체크 추가)
               if (!formData.title?.trim()) {
                  throw new Error('제목을 입력해주세요.')
               }
               submitFormData.append('title', formData.title)

               if (!formData.price) {
                  throw new Error('가격을 입력해주세요.')
               }
               submitFormData.append('price', formData.price)

               if (!formData.category) {
                  throw new Error('카테고리를 선택해주세요.')
               }
               submitFormData.append('category', formData.category)

               // 썸네일 필수 체크
               if (!formData.thumbnail) {
                  throw new Error('썸네일 이미지를 선택해주세요.')
               }
               submitFormData.append('thumbnail', formData.thumbnail)

               // data 필드에 기본값 설정
               const templateData = {
                  type: formData.category,
                  title: formData.title,
                  greeting: '',
                  dateTime: null,
                  showCountdown: false,
                  location: {},
                  accounts: [],
                  showAccounts: false,
                  backgroundColor: '#ffffff',
                  primaryColor: '#000000',
                  secondaryColor: '#666666',
                  fontFamily: 'Malgun Gothic',
                  animation: null,
               }
               submitFormData.append('data', JSON.stringify(templateData))

               // 상세 이미지 추가
               formData.detailImages.forEach((file) => {
                  submitFormData.append('detailImages', file)
               })

               await templateApi.createTemplate(submitFormData)
               showNotification('템플릿이 성공적으로 생성되었습니다.')
               onClose()
               resetForm()
            } catch (error) {
               showNotification(error.response?.data?.message || error.message || '템플릿 생성 중 오류가 발생했습니다.', 'error')
            } finally {
               setIsUploading(false)
            }
         },
         [formData, validateForm, showNotification, onClose, resetForm]
      )

      console.log(formData)

      // Dialog가 닫힐 때 폼 초기화
      useEffect(() => {
         if (!open) {
            resetForm()
         }
      }, [open, resetForm])

      return (
         <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>템플릿 업로드</DialogTitle>
            <DialogContent>
               <Box component="form" noValidate sx={{ mt: 1 }}>
                  <TextField fullWidth label="제목" name="title" value={formData.title} onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))} error={!!errors.title} helperText={errors.title} margin="normal" />

                  <TextField fullWidth label="가격" name="price" value={formData.price} onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value.replace(/[^0-9]/g, '') }))} error={!!errors.price} helperText={errors.price} margin="normal" />

                  <Select fullWidth label="카테고리" name="category" value={formData.category} onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))} error={!!errors.category}>
                     <MenuItem value="wedding">청첩장</MenuItem>
                     <MenuItem value="gohyeon">고희연</MenuItem>
                     <MenuItem value="newyear">연하장</MenuItem>
                     <MenuItem value="invitation">초빙장</MenuItem>
                  </Select>

                  <Box sx={{ mt: 2 }}>
                     <Typography variant="subtitle2" gutterBottom>
                        썸네일 이미지 *
                     </Typography>
                     <input type="file" accept="image/*" onChange={handleFileChange} />
                     {errors.thumbnail && (
                        <Typography color="error" variant="caption">
                           {errors.thumbnail}
                        </Typography>
                     )}
                     {formData.thumbnailPreview && (
                        <Box sx={{ mt: 2 }}>
                           <img src={formData.thumbnailPreview} alt="썸네일 미리보기" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                        </Box>
                     )}
                  </Box>

                  {/* 상세 이미지 업로드 필드 추가 */}
                  <Box sx={{ mt: 2 }}>
                     <Typography variant="subtitle2" gutterBottom>
                        상세 이미지 (최대 3개)
                     </Typography>
                     <input type="file" accept="image/*" multiple onChange={handleDetailImagesChange} />
                     {formData.detailImagePreviews.length > 0 && (
                        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                           {formData.detailImagePreviews.map((preview, index) => (
                              <img key={index} src={preview} alt={`상세 이미지 ${index + 1}`} style={{ width: 100, height: 100, objectFit: 'cover' }} />
                           ))}
                        </Box>
                     )}
                  </Box>
               </Box>
            </DialogContent>
            <DialogActions>
               <Button onClick={onClose}>취소</Button>
               <Button onClick={handleSubmit} loading={isUploading} variant="contained">
                  업로드
               </Button>
            </DialogActions>
         </Dialog>
      )
   },
   (prevProps, nextProps) => prevProps.open === nextProps.open
)

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

   // 관리자 권한 체크를 위해 auth 상태 추가
   const { isAuthenticated, user } = useSelector((state) => state.auth)
   const isAdmin = user?.role === 'admin'

   // 관리자용 폼 상태 추가
   const [adminDialogOpen, setAdminDialogOpen] = useState(false)

   // SpeedDial 액션 수정
   const speedDialActions = useMemo(() => {
      const defaultActions = [
         {
            icon: <SaveIcon />,
            name: '저장하기',
            action: async () => {
               if (isAdmin) {
                  // 관리자인 경우 다이얼로그 열기
                  setAdminDialogOpen(true)
                  return
               }

               try {
                  setIsPreviewLoading(true)
                  const data = getValues()

                  // 필수 필드 검증
                  if (!data.title?.trim()) {
                     showNotification('제목을 입력해주세요.', 'error')
                     return
                  }

                  // FormData 구성
                  const formData = new FormData()
                  formData.append('title', data.title)
                  formData.append('category', data.type || 'wedding')
                  formData.append('price', '0') // 관리자가 아닌 경우 기본값

                  // 템플릿 데이터 추가 (null 체크 및 기본값 설정)
                  const templateData = {
                     type: data.type || 'wedding',
                     title: data.title,
                     greeting: data.greeting || '',
                     dateTime: data.dateTime || null,
                     showCountdown: data.showCountdown || false,
                     location: data.location || {},
                     accounts: data.accounts || [],
                     showAccounts: data.showAccounts || false,
                     backgroundColor: data.backgroundColor || '#ffffff',
                     primaryColor: data.primaryColor || '#000000',
                     secondaryColor: data.secondaryColor || '#666666',
                     fontFamily: data.fontFamily || 'Malgun Gothic',
                     animation: data.animation || null,
                  }

                  formData.append('data', JSON.stringify(templateData))

                  const response = await templateApi.createTemplate(formData)
                  showNotification('템플릿이 성공적으로 생성되었습니다.')
                  navigate(`preview/${response.id}`)
               } catch (error) {
                  console.error('템플릿 생성 오류:', error)
                  showNotification(error.response?.data?.message || '템플릿 생성 중 오류가 발생했습니다.', 'error')
               } finally {
                  setIsPreviewLoading(false)
               }
            },
         },
         { icon: <PreviewIcon />, name: '미리보기', action: () => setIsPreviewOpen(true) },
      ]

      // 관리자인 경우 추가 액션
      if (isAdmin) {
         defaultActions.unshift({
            icon: <PublishIcon />,
            name: '템플릿 업로드',
            action: () => setAdminDialogOpen(true),
         })
      }

      return defaultActions
   }, [isAdmin, getValues, navigate, showNotification])

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
                     height: '43px',
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

         {/* 관리자용 다이얼로그 */}
         <AdminTemplateDialog open={adminDialogOpen} onClose={() => setAdminDialogOpen(false)} showNotification={showNotification} />

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
