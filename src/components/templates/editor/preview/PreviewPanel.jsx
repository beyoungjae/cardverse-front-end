import React, { useMemo, useEffect, useState, useCallback } from 'react'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { motion, AnimatePresence } from 'framer-motion'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CelebrationIcon from '@mui/icons-material/Celebration'
import CakeIcon from '@mui/icons-material/Cake'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'

import AnimatedSection from './sections/AnimatedSection'

// 분리된 섹션 컴포넌트들 import
import ProfileSection from './sections/ProfileSection'
import TitleSection from './sections/TitleSection'
import GreetingSection from './sections/GreetingSection'
import DateTimeSection from './sections/DateTimeSection'
import LocationSection from './sections/LocationSection'
import AccountSection from './sections/AccountSection'
import GallerySection from './sections/GallerySection'
import SettingSection from './sections/SettingSection'

import PreviewLoading from './PreviewLoading'

import { useSelector } from 'react-redux'

// dayjs 한글 설정
dayjs.locale('ko')

const PreviewContent = styled(motion.div)(({ theme, backgroundColor }) => ({
   width: '100%',
   height: '100%',
   overflowY: 'auto',
   WebkitOverflowScrolling: 'touch', // iOS에서 부드러운 스크롤 적용
   backgroundColor: backgroundColor || '#FFFFFF',
   position: 'relative',
   '&::-webkit-scrollbar': {
      display: 'none',
   },
   '& .MuiDialog-root': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
   },
}))

const InvitationType = {
   wedding: {
      galleryTitle: '웨딩 갤러리',
      icon: <FavoriteIcon />,
      color: '#B699BB',
      gradient: 'linear-gradient(135deg, #FFF0F5 0%, #FFE4E1 100%)',
      fontFamily: 'Noto Serif KR, serif',
      animation: {
         initial: { scale: 0.9, opacity: 0 },
         animate: {
            scale: 1,
            opacity: 1,
            transition: {
               duration: 0.8,
               ease: [0.43, 0.13, 0.23, 0.96],
            },
         },
         hover: {
            scale: 1.02,
            transition: { duration: 0.3 },
         },
      },
      sectionAnimation: {
         initial: { y: 20, opacity: 0 },
         animate: {
            y: 0,
            opacity: 1,
            transition: {
               duration: 0.6,
               ease: [0.43, 0.13, 0.23, 0.96],
            },
         },
      },
   },
   newyear: {
      galleryTitle: '지난 해 추억을 담은 갤러리',
      icon: <CelebrationIcon />,
      color: '#FFD700',
      gradient: 'linear-gradient(135deg, #FFFAF0 0%, #FFF8DC 100%)',
      fontFamily: 'Pretendard, sans-serif',
      animation: {
         initial: { rotate: -5, opacity: 0 },
         animate: {
            rotate: 0,
            opacity: 1,
            transition: {
               duration: 0.8,
               ease: [0.43, 0.13, 0.23, 0.96],
            },
         },
         hover: {
            y: -5,
            transition: { duration: 0.3 },
         },
      },
      sectionAnimation: {
         initial: { x: -20, opacity: 0 },
         animate: {
            x: 0,
            opacity: 1,
            transition: {
               duration: 0.6,
               ease: [0.43, 0.13, 0.23, 0.96],
            },
         },
      },
   },
   gohyeyon: {
      galleryTitle: '고희연 갤러리',
      icon: <CakeIcon />,
      color: '#9370DB',
      gradient: 'linear-gradient(135deg, #F0E6FF 0%, #E6E6FA 100%)',
      fontFamily: 'Noto Sans KR, sans-serif',
      animation: {
         initial: { scale: 1.1, opacity: 0 },
         animate: {
            scale: 1,
            opacity: 1,
            transition: {
               duration: 0.8,
               ease: [0.43, 0.13, 0.23, 0.96],
            },
         },
         hover: {
            scale: 1.05,
            transition: { duration: 0.3 },
         },
      },
      sectionAnimation: {
         initial: { scale: 0.95, opacity: 0 },
         animate: {
            scale: 1,
            opacity: 1,
            transition: {
               duration: 0.6,
               ease: [0.43, 0.13, 0.23, 0.96],
            },
         },
      },
   },
   invitation: {
      galleryTitle: '갤러리',
      icon: <EmojiEventsIcon />,
      color: '#4169E1',
      gradient: 'linear-gradient(135deg, #F0F8FF 0%, #E6F3FF 100%)',
      fontFamily: 'Pretendard, sans-serif',
      animation: {
         initial: { y: 20, opacity: 0 },
         animate: {
            y: 0,
            opacity: 1,
            transition: {
               duration: 0.8,
               ease: [0.43, 0.13, 0.23, 0.96],
            },
         },
         hover: {
            y: -5,
            transition: { duration: 0.3 },
         },
      },
      sectionAnimation: {
         initial: { y: 20, opacity: 0 },
         animate: {
            y: 0,
            opacity: 1,
            transition: {
               duration: 0.6,
               ease: [0.43, 0.13, 0.23, 0.96],
            },
         },
      },
   },
}

const invitationTypes = [
   { id: 'wedding', label: '청첩장', icon: <FavoriteIcon />, format: '(신랑), (신부)의 결혼식이 (D-Day)일 남았습니다.' },
   { id: 'newyear', label: '연하장', icon: <CelebrationIcon />, format: '새해 첫날까지 (D-Day)일 남았습니다.' },
   { id: 'gohyeyon', label: '고희연', icon: <CakeIcon />, format: '(이름)님의 칠순잔치가 (D-Day)일 남았습니다.' },
   { id: 'invitation', label: '초빙장', icon: <EmojiEventsIcon />, format: '특별한 행사가 (D-Day)일 남았습니다.' },
]

const PreviewPanel = ({ formData, theme, isDrawer, onPreviewStateChange, previewState, onSettingComplete, onInvitationClick }) => {
   const { detail: template, status } = useSelector((state) => state.templates)

   const [selectedType, setSelectedType] = useState(template?.data?.type || 'wedding')
   const [selectedImageIndex, setSelectedImageIndex] = useState(null)

   // 외부에서 상태를 받아오는 경우 내부 상태 대신 사용
   const [showInvitation, setShowInvitation] = useState(previewState?.showInvitation ?? false)
   const [showSections, setShowSections] = useState(previewState?.showSections ?? false)
   const [sectionAnimationIndex, setSectionAnimationIndex] = useState(previewState?.sectionAnimationIndex ?? -1)

   // 외부 상태가 변경되면 내부 상태도 업데이트
   useEffect(() => {
      if (previewState) {
         setShowInvitation(previewState.showInvitation)
         setShowSections(previewState.showSections)
         setSectionAnimationIndex(previewState.sectionAnimationIndex)
      }
   }, [previewState])

   const sectionOrder = useMemo(() => ['title', 'profile', 'greeting', 'datetime', 'location', 'account', 'gallery'], [])

   // formData 기본값 설정
   const defaultFormData = {
      setting: { animation: null, imgs: [] },
      profiles: [],
      showProfiles: false,
      type: template?.data?.type || 'wedding',
      title: '',
      greeting: '',
      dateTime: null,
      showCountdown: false,
      location: {
         name: '',
         address: '',
         detail: '',
         guide: '',
         showMap: false,
         coordinates: { lat: 37.5665, lng: 126.978 },
      },
      images: [],
      accounts: [],
      showAccounts: false,
      backgroundColor: template?.data?.backgroundColor || '#ffffff',
      primaryColor: template?.data?.primaryColor || '#000000',
      secondaryColor: template?.data?.secondaryColor || '#666666',
      fontFamily: template?.data?.fontFamily || 'Malgun Gothic',
      animation: template?.data?.animation || null,
   }

   // formData와 defaultFormData 병합
   const mergedFormData = useMemo(
      () => ({
         ...defaultFormData,
         ...formData,
      }),
      [formData]
   )

   // SettingSection 완료 핸들러
   const handleSettingComplete = useCallback(() => {
      // 외부에서 제공된 핸들러가 있으면 사용
      if (onSettingComplete) {
         onSettingComplete()
         return
      }

      // 직접 상태를 변경
      setShowInvitation(true)
      setShowSections(false)
      setSectionAnimationIndex(-1)

      // 부모 컴포넌트에도 상태 변경을 알림
      onPreviewStateChange({
         showInvitation: true,
         showSections: false,
         sectionAnimationIndex: -1,
      })
   }, [onPreviewStateChange, onSettingComplete])

   const startSectionAnimations = useCallback(() => {
      let currentIndex = 0

      const animateNextSection = () => {
         if (currentIndex < sectionOrder.length) {
            // 로컬 상태와 부모 상태 모두 업데이트
            setSectionAnimationIndex(currentIndex)
            onPreviewStateChange({
               showInvitation: false,
               showSections: true,
               sectionAnimationIndex: currentIndex,
            })

            currentIndex++
            setTimeout(animateNextSection, 800)
         }
      }

      animateNextSection()
   }, [onPreviewStateChange, sectionOrder])

   const handleInvitationClick = useCallback(() => {
      // 외부에서 제공된 핸들러가 있으면 사용
      if (onInvitationClick) {
         onInvitationClick()
         return
      }

      // 로컬 상태 변경
      setShowInvitation(false)
      setShowSections(true)
      setSectionAnimationIndex(-1)

      // 부모 컴포넌트 상태 변경
      onPreviewStateChange({
         showInvitation: false,
         showSections: true,
         sectionAnimationIndex: -1,
      })

      // 약간의 지연 후 섹션 애니메이션 시작
      setTimeout(() => {
         startSectionAnimations()
      }, 300)
   }, [onPreviewStateChange, startSectionAnimations, onInvitationClick])

   // useEffect(() => {
   //    // formData.type이 있으면 해당 값을 사용, 없으면 프로필의 type 확인
   //    if (mergedFormData.type) {
   //       setSelectedType(mergedFormData.type)
   //    } else if (mergedFormData.profiles?.[0]?.type) {
   //       setSelectedType(mergedFormData.profiles[0].type)
   //    }
   // }, [mergedFormData.type, mergedFormData.profiles])

   useEffect(() => {
      if (template && template.data) {
         setSelectedType(template?.data?.type)
      }
   }, [template])

   // selectedType 대신 mergedFormData.type을 우선적으로 사용
   const type = mergedFormData.type || selectedType
   const typeStyle = InvitationType[type]

   // typeStyle과 theme를 결합하되, theme가 우선순위를 가지도록 설정
   const combinedStyle = useMemo(
      () => ({
         gradient: theme?.backgroundColor ? `linear-gradient(135deg, ${theme.backgroundColor}, ${theme.backgroundColor}dd)` : typeStyle.gradient,
         color: theme?.primaryColor || typeStyle.color,
         fontFamily: theme?.fontFamily || typeStyle.fontFamily,
      }),
      [theme?.backgroundColor, theme?.primaryColor, theme?.fontFamily, typeStyle]
   )

   // 컨테이너 스타일 메모이제이션
   const containerStyle = useMemo(
      () => ({
         background: combinedStyle.gradient,
         color: combinedStyle.color,
         fontFamily: combinedStyle.fontFamily,
      }),
      [combinedStyle]
   )

   // 텍스트 스타일 메모이제이션
   const textStyle = useMemo(
      () => ({
         color: theme?.secondaryColor || typeStyle.color,
         fontFamily: combinedStyle.fontFamily,
      }),
      [theme?.secondaryColor, combinedStyle.fontFamily, typeStyle.color]
   )

   // 섹션 스타일 메모이제이션
   const sectionStyle = useMemo(
      () => ({
         backgroundColor: `${theme?.backgroundColor || '#ffffff'}dd`,
         borderColor: `${theme?.primaryColor || typeStyle.color}15`,
      }),
      [theme?.backgroundColor, theme?.primaryColor, typeStyle.color]
   )

   // 프로필 섹션 스타일 메모이제이션
   const profileStyle = useMemo(
      () => ({
         backgroundColor: `${theme?.backgroundColor}dd` || '#ffffffdd',
         color: theme?.primaryColor || '#000000',
         '& .profileAvatar': {
            bgcolor: `${theme?.primaryColor}15` || '#00000015',
         },
         '& .profileName': {
            color: theme?.primaryColor || '#000000',
         },
         '& .profileInfo': {
            color: theme?.secondaryColor || '#666666',
         },
      }),
      [theme?.backgroundColor, theme?.primaryColor, theme?.secondaryColor]
   )

   // 계좌 섹션 스타일 메모이제이션
   const accountStyle = useMemo(
      () => ({
         backgroundColor: `${theme?.backgroundColor}dd` || '#ffffffdd',
         '& .accountLabel': {
            color: theme?.secondaryColor || '#666666',
         },
         '& .accountNumber': {
            color: theme?.primaryColor || '#000000',
         },
         '& .accountHolder': {
            color: theme?.secondaryColor || '#666666',
         },
      }),
      [theme?.backgroundColor, theme?.primaryColor, theme?.secondaryColor]
   )

   // 갤러리 섹션 스타일 메모이제이션
   const galleryStyle = useMemo(
      () => ({
         backgroundColor: `${theme?.backgroundColor}dd` || '#ffffffdd',
         borderColor: `${theme?.primaryColor}15` || '#00000015',
         '& .galleryTitle': {
            color: theme?.primaryColor || '#000000',
         },
      }),
      [theme?.backgroundColor, theme?.primaryColor]
   )

   const getAccountLabel = (index) => {
      const type = mergedFormData.type || 'wedding'
      const labels = {
         wedding: ['신랑측', '신부측'],
         newyear: ['보내는 분'],
         gohyeyon: ['자녀대표'],
         invitation: ['대표계좌'],
      }
      return labels[type][index] || labels[type][0]
   }

   const formatDDay = useCallback(
      (date, type = 'wedding') => {
         if (!date) return ''
         const today = dayjs()
         const targetDate = dayjs(date)
         const diff = targetDate.diff(today, 'day')

         const invitationType = invitationTypes.find((t) => t.id === type) || invitationTypes[0]
         let format = invitationType.format

         // 동적으로 포맷 문자열 치환
         if (type === 'wedding') {
            format = format.replace('(신랑)', mergedFormData?.profiles?.[0]?.name || '').replace('(신부)', mergedFormData?.profiles?.[1]?.name || '')
         } else if (type === 'gohyeyon') {
            format = format.replace('(이름)', mergedFormData?.profiles?.[0]?.name || '')
         } else if (type === 'invitation') {
            format = format.replace('(이름)', mergedFormData?.profiles?.[0]?.name || '')
         } else if (type === 'newyear') {
            format = format.replace('(이름)', mergedFormData?.profiles?.[0]?.name || '')
         }

         return format.replace('(D-Day)', diff)
      },
      [mergedFormData]
   )

   // 이미지 모달 열기
   const handleImageClick = (index) => {
      setSelectedImageIndex(index)
   }

   // 이미지 모달 닫기
   const handleCloseModal = () => {
      setSelectedImageIndex(null)
   }

   // 다음 이미지로 이동
   const handleNextImage = (e) => {
      e.stopPropagation()
      if (selectedImageIndex < mergedFormData.images.length - 1) {
         setSelectedImageIndex((prev) => prev + 1)
      } else {
         setSelectedImageIndex(0) // 마지막 이미지에서 처음으로 순환
      }
   }

   // 이전 이미지로 이동
   const handlePrevImage = (e) => {
      e.stopPropagation()
      if (selectedImageIndex > 0) {
         setSelectedImageIndex((prev) => prev - 1)
      } else {
         setSelectedImageIndex(mergedFormData.images.length - 1) // 첫 이미지에서 마지막으로 순환
      }
   }

   // 애니메이션 variants
   const animationVariants = useMemo(
      () => ({
         fade: {
            initial: { opacity: 0 },
            animate: {
               opacity: 1,
               transition: { duration: 0.5 },
            },
            exit: { opacity: 0 },
         },
         slide: {
            initial: { x: -20, opacity: 0 },
            animate: {
               x: 0,
               opacity: 1,
               transition: { duration: 0.5 },
            },
            exit: { x: 20, opacity: 0 },
         },
         zoom: {
            initial: { scale: 0.8, opacity: 0 },
            animate: {
               scale: 1,
               opacity: 1,
               transition: { duration: 0.5 },
            },
            exit: { scale: 1.2, opacity: 0 },
         },
         bounce: {
            initial: { y: -20, opacity: 0 },
            animate: {
               y: 0,
               opacity: 1,
               transition: { type: 'spring', stiffness: 300, damping: 15 },
            },
            exit: { y: 20, opacity: 0 },
         },
      }),
      []
   )

   const containerVariants = {
      initial: {},
      animate: {
         transition: {
            staggerChildren: 0.3,
         },
      },
   }

   // 현재 선택된 애니메이션 variant
   const currentAnimation = useMemo(() => {
      const animationType = theme?.animation || mergedFormData.setting?.animation || 'fade'
      return animationVariants[animationType]
   }, [animationVariants, theme?.animation, mergedFormData.setting?.animation])

   const shouldShowSection = useCallback(
      (sectionId) => {
         return showSections && sectionAnimationIndex >= sectionOrder.indexOf(sectionId)
      },
      [showSections, sectionAnimationIndex, sectionOrder]
   )

   // AnimatedSection 컴포넌트에 새로운 props 전달
   const renderSection = (sectionId, content) => (
      <AnimatedSection key={sectionId} variants={currentAnimation}>
         {content}
      </AnimatedSection>
   )

   // isDrawer prop을 분리하고 나머지 props만 전달
   const containerProps = {
      sx: {
         height: '100%',
         overflow: 'auto',
         position: 'relative',
      },
   }

   // 로딩 상태 처리
   if (status === 'loading') {
      return <PreviewLoading />
   }

   // template이 없는 경우 처리
   if (!template && status === 'succeeded') {
      return <Box>템플릿을 찾을 수 없습니다.</Box>
   }

   // 조건부 렌더링 로직
   if (!isDrawer) {
      return (
         <Box {...containerProps}>
            <PreviewContent
               className="PreviewContent"
               style={{
                  background: combinedStyle.gradient,
                  fontFamily: combinedStyle.fontFamily,
               }}
            >
               <motion.div variants={containerVariants} initial="initial" animate="animate">
                  {renderSection('title', mergedFormData.title && <TitleSection title={mergedFormData.title} style={sectionStyle} combinedStyle={combinedStyle} />)}
                  {renderSection('profile', mergedFormData.showProfiles && mergedFormData.profiles?.length > 0 && <ProfileSection profiles={mergedFormData.profiles} style={profileStyle} combinedStyle={combinedStyle} textStyle={textStyle} />)}
                  {renderSection('greeting', mergedFormData.greeting && <GreetingSection greeting={mergedFormData.greeting} style={sectionStyle} combinedStyle={combinedStyle} textStyle={textStyle} />)}
                  {renderSection(
                     'datetime',
                     mergedFormData.dateTime && <DateTimeSection dateTime={mergedFormData.dateTime} showCountdown={mergedFormData.showCountdown} style={sectionStyle} typeStyle={typeStyle} formatDDay={formatDDay} type={mergedFormData.type} textStyle={textStyle} combinedStyle={combinedStyle} />
                  )}
                  {renderSection('location', mergedFormData.location && Object.values(mergedFormData.location).some((value) => value) && <LocationSection formData={mergedFormData} style={sectionStyle} textStyle={textStyle} combinedStyle={combinedStyle} isDrawer={isDrawer} />)}
                  {renderSection(
                     'account',
                     mergedFormData.showAccounts && mergedFormData.accounts?.length > 0 && <AccountSection accounts={mergedFormData.accounts} style={accountStyle} typeStyle={typeStyle} type={mergedFormData.type} getAccountLabel={getAccountLabel} textStyle={textStyle} combinedStyle={combinedStyle} />
                  )}
                  {renderSection(
                     'gallery',
                     mergedFormData.images?.length > 0 && (
                        <GallerySection
                           images={mergedFormData.images}
                           layout={mergedFormData.galleryLayout}
                           style={galleryStyle}
                           typeStyle={typeStyle}
                           // selectedImageIndex={selectedImageIndex}
                           // onImageClick={handleImageClick}
                           // onCloseModal={handleCloseModal}
                           // onPrevImage={handlePrevImage}
                           // onNextImage={handleNextImage}
                           combinedStyle={combinedStyle}
                        />
                     )
                  )}
               </motion.div>
            </PreviewContent>
         </Box>
      )
   }

   // 드로어 미리보기 패널
   return (
      <Box {...containerProps}>
         <PreviewContent
            className="PreviewContent"
            style={{
               background: combinedStyle.gradient,
               fontFamily: combinedStyle.fontFamily,
            }}
         >
            <AnimatePresence
               mode="wait"
               onExitComplete={() => {
                  // console.log('Animation exit completed', {
                  //    showInvitation,
                  //    showSections,
                  //    sectionAnimationIndex,
                  // })
               }}
            >
               {!showInvitation && !showSections && (
                  <motion.div key="setting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} style={{ width: '100%', height: '100%' }}>
                     <SettingSection onComplete={handleSettingComplete} />
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
                        width: '100%',
                        height: '100%',
                        cursor: 'pointer',
                        position: 'absolute',
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
                        }}
                     >
                        초대장 확인하기
                     </motion.button>

                     {/* 썸네일 사진 */}
                     <motion.img
                        src={template?.thumbnail}
                        alt="Invitation"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        style={{
                           width: '100%',
                           height: '100%',
                           objectFit: 'contain',
                           position: 'absolute',
                           top: 0,
                           left: 0,
                           borderRadius: '8px',
                           zIndex: -1,
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
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        padding: '24px',
                     }}
                  >
                     {sectionOrder.map((sectionId, index) => (
                        <AnimatePresence key={`${sectionId}-${index}`} mode="wait">
                           {shouldShowSection(sectionId) && (
                              <motion.div key={`${sectionId}-section-${index}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, delay: index * 0.2 }}>
                                 {sectionId === 'title' && mergedFormData.title && <TitleSection key={`title-content-${index}`} title={mergedFormData.title} style={sectionStyle} combinedStyle={combinedStyle} />}
                                 {sectionId === 'profile' && mergedFormData.showProfiles && mergedFormData.profiles?.length > 0 && <ProfileSection profiles={mergedFormData.profiles} style={profileStyle} combinedStyle={combinedStyle} textStyle={textStyle} />}
                                 {sectionId === 'greeting' && mergedFormData.greeting && <GreetingSection greeting={mergedFormData.greeting} style={sectionStyle} combinedStyle={combinedStyle} textStyle={textStyle} />}
                                 {sectionId === 'datetime' && mergedFormData.dateTime && (
                                    <DateTimeSection dateTime={mergedFormData.dateTime} showCountdown={mergedFormData.showCountdown} style={sectionStyle} typeStyle={typeStyle} formatDDay={formatDDay} type={mergedFormData.type} textStyle={textStyle} combinedStyle={combinedStyle} />
                                 )}
                                 {sectionId === 'location' && mergedFormData.location && Object.values(mergedFormData.location).some((value) => value) && <LocationSection formData={mergedFormData} style={sectionStyle} textStyle={textStyle} combinedStyle={combinedStyle} isDrawer={isDrawer} />}
                                 {sectionId === 'account' && mergedFormData.showAccounts && mergedFormData.accounts?.length > 0 && (
                                    <AccountSection accounts={mergedFormData.accounts} style={accountStyle} typeStyle={typeStyle} type={mergedFormData.type} getAccountLabel={getAccountLabel} textStyle={textStyle} combinedStyle={combinedStyle} />
                                 )}
                                 {sectionId === 'gallery' && mergedFormData.images?.length > 0 && (
                                    <GallerySection
                                       images={mergedFormData.images}
                                       layout={mergedFormData.galleryLayout}
                                       style={galleryStyle}
                                       typeStyle={typeStyle}
                                       selectedImageIndex={selectedImageIndex}
                                       // onImageClick={handleImageClick}
                                       // onCloseModal={handleCloseModal}
                                       // onPrevImage={handlePrevImage}
                                       // onNextImage={handleNextImage}
                                       combinedStyle={combinedStyle}
                                    />
                                 )}
                              </motion.div>
                           )}
                        </AnimatePresence>
                     ))}
                  </motion.div>
               )}
            </AnimatePresence>
         </PreviewContent>
      </Box>
   )
}

PreviewPanel.displayName = 'PreviewPanel'

export default PreviewPanel
