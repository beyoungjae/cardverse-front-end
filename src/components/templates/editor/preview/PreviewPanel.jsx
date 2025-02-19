import React, { useMemo, useEffect, useState, useCallback } from 'react'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { motion } from 'framer-motion'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CelebrationIcon from '@mui/icons-material/Celebration'
import CakeIcon from '@mui/icons-material/Cake'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import { COLORS } from '../styles/commonStyles'

import AnimatedSection from './sections/AnimatedSection'

// 분리된 섹션 컴포넌트들 import
import ProfileSection from './sections/ProfileSection'
import TitleSection from './sections/TitleSection'
import GreetingSection from './sections/GreetingSection'
import DateTimeSection from './sections/DateTimeSection'
import LocationSection from './sections/LocationSection'
import AccountSection from './sections/AccountSection'
import GallerySection from './sections/GallerySection'

// dayjs 한글 설정
dayjs.locale('ko')

const PreviewContainer = styled(Box)(({ theme }) => ({
   width: '100%',
   height: '100vh',
   backgroundColor: '#FFFFFF',
   borderRadius: '16px',
   position: 'relative',
   overflow: 'hidden',
}))

const PreviewContent = styled(motion.div)(({ theme, backgroundColor }) => ({
   width: '100%',
   height: '100%',
   overflowY: 'auto',
   WebkitOverflowScrolling: 'touch', // iOS에서 부드러운 스크롤 적용
   padding: '24px',
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

const PreviewCalendarHeader = styled(Box)(({ theme }) => ({
   textAlign: 'center',
   marginBottom: '16px',
   position: 'relative',
   zIndex: 1,
}))

const PreviewCalendarGrid = styled(Box)(({ theme }) => ({
   display: 'grid',
   gridTemplateColumns: 'repeat(7, 1fr)',
   gap: '4px',
   textAlign: 'center',
   position: 'relative',
   zIndex: 1,
}))

const PreviewWeekDay = styled(Typography)(({ theme }) => ({
   fontSize: '0.8rem',
   color: COLORS.text.secondary,
   padding: '4px 0',
}))

const PreviewDateCell = styled(Box)(({ isSelected, isCurrentMonth, isSunday, isSaturday }) => ({
   padding: '4px',
   fontSize: '0.9rem',
   color: isSunday ? '#FF6B6B' : isSaturday ? '#4169E1' : !isCurrentMonth ? COLORS.text.hint : COLORS.text.primary,
   fontWeight: isSelected ? 600 : 400,
   position: 'relative',
   ...(isSelected && {
      '&::after': {
         content: '""',
         position: 'absolute',
         top: '50%',
         left: '50%',
         transform: 'translate(-50%, -50%)',
         width: '24px',
         height: '24px',
         borderRadius: '50%',
         backgroundColor: COLORS.accent.main,
         opacity: 0.15,
         zIndex: -1,
      },
   }),
}))

const InvitationType = {
   wedding: {
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
   newYear: {
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
   birthday: {
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
   { id: 'newYear', label: '연하장', icon: <CelebrationIcon />, format: '새해 첫날까지 (D-Day)일 남았습니다.' },
   { id: 'birthday', label: '고희연', icon: <CakeIcon />, format: '(이름)님의 칠순잔치가 (D-Day)일 남았습니다.' },
   { id: 'invitation', label: '초빙장', icon: <EmojiEventsIcon />, format: '특별한 행사가 (D-Day)일 남았습니다.' },
]

const PreviewPanel = React.memo(({ formData, theme }) => {
   const [loadedImages, setLoadedImages] = useState(new Set())
   const [selectedType, setSelectedType] = useState('wedding')
   const [selectedImageIndex, setSelectedImageIndex] = useState(null)

   console.log('formData:', formData) // 디버깅을 위한 로그 추가

   useEffect(() => {
      // formData.type이 있으면 해당 값을 사용, 없으면 프로필의 type 확인
      if (formData.type) {
         setSelectedType(formData.type)
      } else if (formData.profiles?.[0]?.type) {
         setSelectedType(formData.profiles[0].type)
      }
   }, [formData.type, formData.profiles])

   // selectedType 대신 formData.type을 우선적으로 사용
   const type = formData.type || selectedType
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
         '& .profile-avatar': {
            bgcolor: `${theme?.primaryColor}15` || '#00000015',
         },
         '& .profile-name': {
            color: theme?.primaryColor || '#000000',
         },
         '& .profile-info': {
            color: theme?.secondaryColor || '#666666',
         },
      }),
      [theme?.backgroundColor, theme?.primaryColor, theme?.secondaryColor]
   )

   // 계좌 섹션 스타일 메모이제이션
   const accountStyle = useMemo(
      () => ({
         backgroundColor: `${theme?.backgroundColor}dd` || '#ffffffdd',
         '& .account-label': {
            color: theme?.secondaryColor || '#666666',
         },
         '& .account-number': {
            color: theme?.primaryColor || '#000000',
         },
         '& .account-holder': {
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
         '& .gallery-title': {
            color: theme?.primaryColor || '#000000',
         },
      }),
      [theme?.backgroundColor, theme?.primaryColor]
   )

   const getAccountLabel = (index) => {
      const type = formData.type || 'wedding'
      const labels = {
         wedding: ['신랑측', '신부측'],
         newYear: ['보내는 분'],
         birthday: ['자녀대표'],
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
            format = format.replace('(신랑)', formData?.profiles?.[0]?.name || '').replace('(신부)', formData?.profiles?.[1]?.name || '')
         } else if (type === 'birthday') {
            format = format.replace('(이름)', formData?.profiles?.[0]?.name || '')
         } else if (type === 'invitation') {
            format = format.replace('(이름)', formData?.profiles?.[0]?.name || '')
         } else if (type === 'newYear') {
            format = format.replace('(이름)', formData?.profiles?.[0]?.name || '')
         }

         return format.replace('(D-Day)', diff)
      },
      [formData]
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
      if (selectedImageIndex < formData.images.length - 1) {
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
         setSelectedImageIndex(formData.images.length - 1) // 첫 이미지에서 마지막으로 순환
      }
   }

   // 애니메이션 variants 정의
   const animationVariants = useMemo(
      () => ({
         fade: {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
         },
         slide: {
            initial: { x: -20, opacity: 0 },
            animate: { x: 0, opacity: 1 },
            exit: { x: 20, opacity: 0 },
         },
         zoom: {
            initial: { scale: 0.8, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
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

   // 애니메이션이 적용될 요소인지 확인하는 함수
   const shouldAnimate = useCallback((elementId) => theme?.animationTargets?.includes(elementId), [theme?.animationTargets])

   // 현재 선택된 애니메이션 variant
   const currentAnimation = useMemo(() => animationVariants[theme?.animation || 'fade'], [animationVariants, theme?.animation])

   return (
      <PreviewContainer style={containerStyle}>
         <PreviewContent
            className="PreviewContent"
            style={{
               background: combinedStyle.gradient,
               fontFamily: combinedStyle.fontFamily,
            }}
         >
            {/* 프로필 섹션 */}
            <AnimatedSection shouldAnimate={shouldAnimate('profile')} animation={currentAnimation}>
               {formData.showProfiles && formData.profiles?.length > 0 && <ProfileSection profiles={formData.profiles} style={profileStyle} combinedStyle={combinedStyle} textStyle={textStyle} />}
            </AnimatedSection>

            {/* 제목 섹션 */}
            <AnimatedSection shouldAnimate={shouldAnimate('title')} animation={currentAnimation}>
               {formData.title && <TitleSection title={formData.title} style={sectionStyle} combinedStyle={combinedStyle} />}
            </AnimatedSection>

            {/* 인사말 섹션 */}
            <AnimatedSection shouldAnimate={shouldAnimate('greeting')} animation={currentAnimation}>
               {formData.greeting && <GreetingSection greeting={formData.greeting} style={sectionStyle} combinedStyle={combinedStyle} textStyle={textStyle} />}
            </AnimatedSection>

            {/* 날짜/시간 섹션 */}
            <AnimatedSection shouldAnimate={shouldAnimate('datetime')} animation={currentAnimation}>
               {formData.dateTime && <DateTimeSection dateTime={formData.dateTime} showCountdown={formData.showCountdown} style={sectionStyle} typeStyle={typeStyle} formatDDay={formatDDay} type={formData.type} textStyle={textStyle} />}
            </AnimatedSection>

            {/* 장소 섹션 */}
            <AnimatedSection shouldAnimate={shouldAnimate('location')} animation={currentAnimation}>
               {formData.location && Object.values(formData.location).some((value) => value) && <LocationSection formData={formData} style={sectionStyle} textStyle={typeStyle} />}
            </AnimatedSection>

            {/* 계좌 섹션 */}
            <AnimatedSection shouldAnimate={shouldAnimate('account')} animation={currentAnimation}>
               {formData.showAccounts && formData.accounts?.length > 0 && <AccountSection accounts={formData.accounts} style={accountStyle} typeStyle={typeStyle} type={formData.type} getAccountLabel={getAccountLabel} textStyle={textStyle} />}
            </AnimatedSection>

            {/* 갤러리 섹션 */}
            <AnimatedSection shouldAnimate={shouldAnimate('gallery')} animation={currentAnimation}>
               {formData.images?.length > 0 && (
                  <GallerySection images={formData.images} layout={formData.galleryLayout} style={galleryStyle} typeStyle={typeStyle} selectedImageIndex={selectedImageIndex} onImageClick={handleImageClick} onCloseModal={handleCloseModal} onPrevImage={handlePrevImage} onNextImage={handleNextImage} />
               )}
            </AnimatedSection>
         </PreviewContent>
      </PreviewContainer>
   )
})

PreviewPanel.displayName = 'PreviewPanel'

export default PreviewPanel
