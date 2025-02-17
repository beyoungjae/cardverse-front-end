import React, { useMemo, useEffect, useState, useCallback } from 'react'
import { Box, Typography, ImageList, ImageListItem, Divider, Chip, Button, IconButton, Tooltip, Skeleton, Avatar } from '@mui/material'
import { styled } from '@mui/material/styles'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import EventIcon from '@mui/icons-material/Event'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import MessageIcon from '@mui/icons-material/Message'
import GroupIcon from '@mui/icons-material/Group'
import ShareIcon from '@mui/icons-material/Share'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CelebrationIcon from '@mui/icons-material/Celebration'
import CakeIcon from '@mui/icons-material/Cake'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import { PreviewFrame, fadeInUp, COLORS } from '../styles/commonStyles'

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
   '&::-webkit-scrollbar': {
      display: 'none',
   },
}))

const Section = styled(motion.div)(({ theme }) => ({
   marginBottom: '24px',
   textAlign: 'center',
}))

const ProfileSection = styled(Section)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   gap: '32px',
   marginBottom: '32px',
   '& .profile-item': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
   },
   '& .profile-avatar': {
      width: '80px',
      height: '80px',
      marginBottom: '8px',
   },
   '& .profile-name': {
      fontSize: '1.1rem',
      fontWeight: 500,
   },
   '& .profile-info': {
      fontSize: '0.9rem',
      color: 'rgba(0,0,0,0.6)',
   },
}))

const TitleSection = styled(Section)(({ theme }) => ({
   '& .title-text': {
      fontSize: '2rem',
      fontWeight: 600,
      background: 'linear-gradient(45deg, #333, #666)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: theme.spacing(2),
   },
}))

const GreetingSection = styled(Section)(({ theme }) => ({
   '& .greeting-text': {
      fontSize: '1.1rem',
      lineHeight: 2,
      whiteSpace: 'pre-line',
      color: COLORS.text.primary,
      fontFamily: 'Noto Serif KR, serif',
   },
}))

const DateTimeSection = styled(Section)(({ theme }) => ({
   '& .date': {
      fontSize: '1.3rem',
      fontWeight: 500,
      marginBottom: theme.spacing(1),
   },
   '& .countdown': {
      fontSize: '1.1rem',
      color: COLORS.accent.main,
   },
}))

const LocationSection = styled(Section)(({ theme }) => ({
   '& .location-name': {
      fontSize: '1.2rem',
      fontWeight: 500,
      marginBottom: theme.spacing(1),
   },
   '& .location-address': {
      color: COLORS.text.secondary,
      marginBottom: theme.spacing(1),
   },
   '& .location-detail': {
      whiteSpace: 'pre-line',
      color: COLORS.text.secondary,
      fontSize: '0.9rem',
   },
}))

const GallerySection = styled(Section)(({ theme }) => ({
   '& .gallery-grid': {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: theme.spacing(2),
      marginTop: theme.spacing(2),
   },
   '& .gallery-image': {
      width: '100%',
      aspectRatio: '1',
      objectFit: 'cover',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      '&:hover': {
         transform: 'scale(1.05) rotate(2deg)',
      },
   },
}))

const AccountSection = styled(Section)(({ theme }) => ({
   '& .account-item': {
      backgroundColor: 'rgba(255,255,255,0.8)',
      padding: '16px',
      borderRadius: '8px',
      marginBottom: '12px',
   },
   '& .account-label': {
      fontSize: '0.9rem',
      color: 'rgba(0,0,0,0.6)',
      marginBottom: '4px',
   },
   '& .account-number': {
      fontSize: '1rem',
      fontWeight: 500,
   },
   '& .account-holder': {
      fontSize: '0.9rem',
      color: 'rgba(0,0,0,0.6)',
      marginTop: '4px',
   },
}))

const RSVPSection = styled(Section)(({ theme }) => ({
   textAlign: 'center',
   '& .rsvp-title': {
      fontSize: '1.2rem',
      color: COLORS.text.primary,
      marginBottom: theme.spacing(1),
   },
   '& .rsvp-description': {
      color: COLORS.text.secondary,
      marginBottom: theme.spacing(2),
   },
   '& .rsvp-options': {
      display: 'flex',
      flexWrap: 'wrap',
      gap: theme.spacing(1),
      justifyContent: 'center',
      marginBottom: theme.spacing(2),
   },
}))

const CalendarPreview = styled(Box)(({ theme }) => ({
   backgroundColor: 'rgba(255, 255, 255, 0.9)',
   borderRadius: '12px',
   padding: '20px',
   width: '100%',
   maxWidth: '280px',
   margin: '0 auto',
   boxShadow: `0 4px 12px ${COLORS.accent.main}15`,
   border: `1px solid ${COLORS.accent.main}15`,
   position: 'relative',
   overflow: 'hidden',
   '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `linear-gradient(45deg, ${COLORS.accent.main}08 25%, transparent 25%, transparent 50%, ${COLORS.accent.main}08 50%, ${COLORS.accent.main}08 75%, transparent 75%, transparent)`,
      backgroundSize: '20px 20px',
      opacity: 0.5,
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

   const containerStyle = useMemo(
      () => ({
         background: typeStyle.gradient,
         color: theme.primaryColor || '#000000',
         fontFamily: typeStyle.fontFamily,
      }),
      [typeStyle, theme.primaryColor]
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

   return (
      <PreviewContainer style={containerStyle}>
         <PreviewContent
            style={{
               background: typeStyle.gradient,
               fontFamily: typeStyle.fontFamily,
            }}
            initial="initial"
            animate="animate"
            variants={{
               initial: { opacity: 0 },
               animate: { opacity: 1 },
            }}
         >
            {formData.showProfiles && formData.profiles?.length > 0 && (
               <ProfileSection>
                  {formData.profiles.map((profile, index) => (
                     <Box key={index} className="profile-item">
                        <Avatar
                           src={profile.image}
                           className="profile-avatar"
                           sx={{
                              bgcolor: `${typeStyle.color}15`,
                           }}
                        />
                        <Typography className="profile-name" style={{ color: typeStyle.color }}>
                           {profile.name}
                        </Typography>
                        {profile.phone && <Typography className="profile-info">{profile.phone}</Typography>}
                        {profile.parents_father && <Typography className="profile-info">부</Typography>}
                        {profile.parents_father && <Typography className="profile-info">{profile.parents_father}</Typography>}
                        {profile.parents_mother && <Typography className="profile-info">모</Typography>}
                        {profile.parents_mother && <Typography className="profile-info">{profile.parents_mother}</Typography>}
                     </Box>
                  ))}
               </ProfileSection>
            )}

            {formData.title && (
               <Section>
                  <Typography variant="h5" sx={{ color: typeStyle.color, mb: 2 }}>
                     {formData.title}
                  </Typography>
               </Section>
            )}

            {formData.greeting && (
               <Section>
                  <Typography sx={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>{formData.greeting}</Typography>
               </Section>
            )}

            {formData.dateTime && (
               <Section>
                  <CalendarPreview>
                     <PreviewCalendarHeader>
                        <Typography
                           sx={{
                              fontSize: '1.2rem',
                              fontWeight: 500,
                              color: typeStyle.color,
                              mb: 0.5,
                           }}
                        >
                           {dayjs(formData.dateTime).format('YYYY.MM')}
                        </Typography>
                        <Typography
                           sx={{
                              fontSize: '0.9rem',
                              color: COLORS.text.secondary,
                           }}
                        >
                           {dayjs(formData.dateTime).format('dddd A hh:mm')}
                        </Typography>
                     </PreviewCalendarHeader>

                     <PreviewCalendarGrid>
                        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                           <PreviewWeekDay key={day}>{day}</PreviewWeekDay>
                        ))}
                     </PreviewCalendarGrid>

                     <PreviewCalendarGrid>
                        {(() => {
                           const date = dayjs(formData.dateTime)
                           const startOfMonth = date.startOf('month')
                           const endOfMonth = date.endOf('month')
                           const startDate = startOfMonth.startOf('week')
                           const endDate = endOfMonth.endOf('week')

                           const days = []
                           let currentDate = startDate

                           while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
                              days.push(
                                 <PreviewDateCell key={currentDate.format('YYYY-MM-DD')} isSelected={currentDate.format('YYYY-MM-DD') === date.format('YYYY-MM-DD')} isCurrentMonth={currentDate.month() === date.month()} isSunday={currentDate.day() === 0} isSaturday={currentDate.day() === 6}>
                                    {currentDate.date()}
                                 </PreviewDateCell>
                              )
                              currentDate = currentDate.add(1, 'day')
                           }

                           return days
                        })()}
                     </PreviewCalendarGrid>

                     {formData.showCountdown && (
                        <Box
                           sx={{
                              mt: 2,
                              textAlign: 'center',
                              color: typeStyle.color,
                              fontWeight: 500,
                              fontSize: '0.9rem',
                           }}
                        >
                           {formatDDay(formData.dateTime, formData.type)}
                        </Box>
                     )}
                  </CalendarPreview>
               </Section>
            )}

            {formData.location?.name && (
               <Section>
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 500, mb: 1 }}>{formData.location.name}</Typography>
                  <Typography sx={{ color: 'rgba(0,0,0,0.6)', mb: 1 }}>{formData.location.address}</Typography>
                  {formData.location.detail && <Typography sx={{ fontSize: '0.9rem', color: 'rgba(0,0,0,0.6)' }}>{formData.location.detail}</Typography>}
               </Section>
            )}

            {formData.showAccounts && formData.accounts?.length > 0 && (
               <AccountSection>
                  <Typography sx={{ color: typeStyle.color, fontWeight: 500, mb: 2 }}>{formData.type === 'wedding' ? '마음 전하실 곳' : formData.type === 'newYear' ? '새해 선물 전하실 곳' : formData.type === 'birthday' ? '축하의 마음 전하실 곳' : '감사의 마음 전하실 곳'}</Typography>
                  {formData.accounts.map((account, index) => (
                     <Box key={index} className="account-item">
                        <Typography className="account-label">{getAccountLabel(index)}</Typography>
                        <Typography className="account-number">
                           {account.bank} {account.number}
                        </Typography>
                        <Typography className="account-holder">{account.holder}</Typography>
                     </Box>
                  ))}
               </AccountSection>
            )}

            {formData.images?.length > 0 && (
               <Section>
                  <Box
                     sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                        gap: 2,
                     }}
                  >
                     {formData.images.map((image, index) => (
                        <img
                           key={index}
                           src={image.url}
                           alt=""
                           style={{
                              width: '100%',
                              height: '120px',
                              objectFit: 'cover',
                              borderRadius: '8px',
                           }}
                        />
                     ))}
                  </Box>
               </Section>
            )}

            {formData.rsvpTitle && (
               <Section>
                  <Typography sx={{ color: typeStyle.color, fontWeight: 500, mb: 1 }}>{formData.rsvpTitle}</Typography>
                  <Typography sx={{ color: 'rgba(0,0,0,0.6)', fontSize: '0.9rem' }}>{formData.rsvpDescription}</Typography>
               </Section>
            )}
         </PreviewContent>
      </PreviewContainer>
   )
})

PreviewPanel.displayName = 'PreviewPanel'

export default PreviewPanel
