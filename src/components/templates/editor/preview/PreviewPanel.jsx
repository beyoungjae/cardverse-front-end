import React, { useMemo, useEffect, useState, useCallback } from 'react'
import { Box, Typography, ImageList, ImageListItem, Divider, Chip, Button, IconButton, Tooltip, Skeleton, Avatar, Dialog, DialogContent } from '@mui/material'
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
import DirectionsIcon from '@mui/icons-material/Directions'
import MapIcon from '@mui/icons-material/Map'
import CloseIcon from '@mui/icons-material/Close'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { PreviewFrame, fadeInUp, COLORS } from '../styles/commonStyles'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCards } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-cards'

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

const Section = styled(motion.div)(({ theme }) => ({
   marginBottom: '100px',
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

   return (
      <PreviewContainer style={containerStyle}>
         <PreviewContent
            className="PreviewContent"
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
                  </CalendarPreview>
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
               </Section>
            )}

            {formData.locationName && (
               <Section>
                  <Typography sx={{ color: typeStyle.color, fontWeight: 500, mb: 2 }}>오시는 길</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                     <Box
                        sx={{
                           p: 3,
                           borderRadius: '16px',
                           background: 'rgba(255, 255, 255, 0.95)',
                           boxShadow: `0 8px 32px ${COLORS.accent.main}15`,
                           border: `1px solid ${COLORS.accent.main}15`,
                        }}
                     >
                        <Box
                           sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1.5,
                              mb: 2,
                           }}
                        >
                           <LocationOnIcon sx={{ color: typeStyle.color }} />
                           <Typography
                              sx={{
                                 fontSize: '1.3rem',
                                 fontWeight: 600,
                                 color: typeStyle.color,
                              }}
                           >
                              {formData.locationName}
                           </Typography>
                        </Box>

                        <Box
                           sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 2,
                           }}
                        >
                           <Typography
                              sx={{
                                 color: COLORS.text.primary,
                                 fontSize: '1rem',
                                 display: 'flex',
                                 alignItems: 'center',
                                 gap: 1,
                              }}
                           >
                              {formData.locationAddress}
                           </Typography>

                           {formData.locationDetail && (
                              <Box
                                 sx={{
                                    p: 2,
                                    borderRadius: '8px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                    border: `1px solid ${COLORS.accent.main}15`,
                                 }}
                              >
                                 <Typography
                                    sx={{
                                       color: COLORS.text.secondary,
                                       fontSize: '0.95rem',
                                       whiteSpace: 'pre-line',
                                    }}
                                 >
                                    {formData.locationDetail}
                                 </Typography>
                              </Box>
                           )}

                           {formData.locationGuide && (
                              <Box
                                 sx={{
                                    p: 2,
                                    borderRadius: '8px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                    border: `1px solid ${COLORS.accent.main}15`,
                                 }}
                              >
                                 <Box
                                    sx={{
                                       display: 'flex',
                                       alignItems: 'center',
                                       gap: 1,
                                       mb: 1,
                                       color: typeStyle.color,
                                    }}
                                 >
                                    <DirectionsIcon fontSize="small" />
                                    <Typography
                                       sx={{
                                          fontWeight: 500,
                                          fontSize: '0.9rem',
                                       }}
                                    >
                                       교통편 안내
                                    </Typography>
                                 </Box>
                                 <Typography
                                    sx={{
                                       color: COLORS.text.secondary,
                                       fontSize: '0.95rem',
                                       whiteSpace: 'pre-line',
                                    }}
                                 >
                                    {formData.locationGuide}
                                 </Typography>
                              </Box>
                           )}

                           {formData.showMap && (
                              <Box
                                 sx={{
                                    mt: 1,
                                    p: 2,
                                    borderRadius: '12px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                    border: `1px dashed ${typeStyle.color}50`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 1,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                       backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                       transform: 'translateY(-2px)',
                                    },
                                 }}
                              >
                                 <MapIcon sx={{ color: typeStyle.color }} />
                                 <Typography
                                    sx={{
                                       color: typeStyle.color,
                                       fontWeight: 500,
                                       fontSize: '0.95rem',
                                    }}
                                 >
                                    지도 보기
                                 </Typography>
                              </Box>
                           )}

                           {formData.showNavigation && (
                              <Box
                                 sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: 1,
                                    mt: 1,
                                 }}
                              >
                                 {['카카오맵', '네이버맵', '티맵'].map((app) => (
                                    <Chip
                                       key={app}
                                       icon={<DirectionsIcon />}
                                       label={app}
                                       sx={{
                                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                          border: `1px solid ${typeStyle.color}25`,
                                          '&:hover': {
                                             backgroundColor: 'white',
                                             transform: 'translateY(-2px)',
                                             boxShadow: `0 4px 12px ${typeStyle.color}15`,
                                          },
                                          transition: 'all 0.3s ease',
                                       }}
                                    />
                                 ))}
                              </Box>
                           )}
                        </Box>
                     </Box>
                  </Box>
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
                  <Typography sx={{ color: typeStyle.color, fontWeight: 500, mb: 2 }}>{formData.type === 'wedding' ? '웨딩 갤러리' : formData.type === 'newYear' ? '갤러리' : formData.type === 'birthday' ? '생일 축하 갤러리' : '갤러리'}</Typography>
                  <Box
                     sx={{
                        ...(formData.galleryLayout === 'grid' && {
                           display: 'grid',
                           gridTemplateColumns: 'repeat(3, 1fr)',
                           gap: 2,
                           p: 2,
                        }),
                        ...(formData.galleryLayout === 'masonry' && {
                           columnCount: 2,
                           columnGap: '16px',
                           p: 2,
                        }),
                        ...(formData.galleryLayout === 'polaroid' && {
                           height: '400px',
                           width: '100%',
                           p: 2,
                           position: 'relative',
                           overflow: 'hidden',
                        }),
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '16px',
                        boxShadow: `0 8px 32px ${COLORS.accent.main}15`,
                        border: `1px solid ${COLORS.accent.main}15`,
                     }}
                  >
                     {formData.galleryLayout === 'polaroid' ? (
                        <Swiper
                           modules={[Autoplay, EffectCards]}
                           effect="cards"
                           grabCursor={true}
                           autoplay={{
                              delay: 2500,
                              disableOnInteraction: false,
                           }}
                           loop={true}
                           style={{
                              width: '100%',
                              height: '100%',
                              padding: '30px',
                           }}
                        >
                           {formData.images.map((image, index) => (
                              <SwiperSlide key={index}>
                                 <Box
                                    sx={{
                                       width: '100%',
                                       height: '100%',
                                       backgroundColor: '#fff',
                                       borderRadius: '4px',
                                       padding: '12px',
                                       boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                       display: 'flex',
                                       flexDirection: 'column',
                                       gap: 1,
                                    }}
                                 >
                                    <Box
                                       component="img"
                                       src={image.url}
                                       alt=""
                                       sx={{
                                          width: '100%',
                                          height: '100%',
                                          objectFit: 'contain',
                                          borderRadius: '2px',
                                       }}
                                    />
                                    <Typography
                                       sx={{
                                          fontSize: '0.8rem',
                                          color: COLORS.text.secondary,
                                          width: '100%',
                                          textAlign: 'center',
                                          fontFamily: 'Pretendard, sans-serif',
                                       }}
                                    ></Typography>
                                 </Box>
                              </SwiperSlide>
                           ))}
                        </Swiper>
                     ) : (
                        <>
                           {formData.images.map((image, index) => (
                              <Box
                                 key={index}
                                 component={motion.div}
                                 initial={{ opacity: 0, scale: 0.8 }}
                                 animate={{ opacity: 1, scale: 1 }}
                                 transition={{ delay: index * 0.1 }}
                                 onClick={() => handleImageClick(index)}
                                 sx={{
                                    ...(formData.galleryLayout === 'grid' && {
                                       position: 'relative',
                                       paddingTop: '100%',
                                       borderRadius: '8px',
                                       overflow: 'hidden',
                                       cursor: 'pointer',
                                    }),
                                    ...(formData.galleryLayout === 'masonry' && {
                                       breakInside: 'avoid',
                                       marginBottom: 2,
                                       borderRadius: '8px',
                                       overflow: 'hidden',
                                       cursor: 'pointer',
                                    }),
                                 }}
                              >
                                 <Box
                                    component="img"
                                    src={image.url}
                                    alt=""
                                    sx={{
                                       ...(formData.galleryLayout === 'grid' && {
                                          position: 'absolute',
                                          top: 0,
                                          left: 0,
                                          width: '100%',
                                          height: '100%',
                                          objectFit: 'cover',
                                       }),
                                       ...(formData.galleryLayout === 'masonry' && {
                                          width: '100%',
                                          height: 'auto',
                                          display: 'block',
                                       }),
                                    }}
                                 />
                              </Box>
                           ))}

                           {/* 이미지 모달 - 그리드와 매소니리 레이아웃에서만 표시 */}
                           <Dialog
                              open={selectedImageIndex !== null}
                              onClose={handleCloseModal}
                              sx={{
                                 '& .MuiDialog-container': {
                                    position: 'absolute',
                                    inset: 0,
                                    margin: 0,
                                    height: '100%',
                                 },
                                 '& .MuiBackdrop-root': {
                                    position: 'absolute',
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                 },
                                 '& .MuiDialog-paper': {
                                    position: 'absolute',
                                    margin: 0,
                                    width: '100%',
                                    height: '100%',
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    backgroundColor: 'transparent',
                                    boxShadow: 'none',
                                 },
                              }}
                              PaperProps={{
                                 style: {
                                    background: 'transparent',
                                 },
                              }}
                              BackdropProps={{
                                 onClick: handleCloseModal,
                              }}
                              container={() => document.querySelector('.PreviewContent')}
                           >
                              <DialogContent
                                 sx={{
                                    position: 'relative',
                                    padding: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100%',
                                    overflow: 'hidden',
                                 }}
                              >
                                 {selectedImageIndex !== null && (
                                    <Box
                                       sx={{
                                          position: 'relative',
                                          width: '100%',
                                          height: '100%',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                       }}
                                    >
                                       <IconButton
                                          onClick={handleCloseModal}
                                          sx={{
                                             position: 'absolute',
                                             top: 8,
                                             right: 8,
                                             color: 'white',
                                             backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                             '&:hover': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                             },
                                             zIndex: 2,
                                          }}
                                       >
                                          <CloseIcon />
                                       </IconButton>
                                       <IconButton
                                          onClick={handlePrevImage}
                                          sx={{
                                             position: 'absolute',
                                             left: 8,
                                             top: '50%',
                                             transform: 'translateY(-50%)',
                                             color: 'white',
                                             backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                             '&:hover': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                             },
                                             zIndex: 2,
                                          }}
                                       >
                                          <ArrowBackIosIcon />
                                       </IconButton>
                                       <Box
                                          component="img"
                                          src={formData.images[selectedImageIndex].url}
                                          alt=""
                                          sx={{
                                             maxWidth: '90%',
                                             maxHeight: '90%',
                                             objectFit: 'contain',
                                             borderRadius: '4px',
                                          }}
                                       />
                                       <IconButton
                                          onClick={handleNextImage}
                                          sx={{
                                             position: 'absolute',
                                             right: 8,
                                             top: '50%',
                                             transform: 'translateY(-50%)',
                                             color: 'white',
                                             backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                             '&:hover': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                             },
                                             zIndex: 2,
                                          }}
                                       >
                                          <ArrowForwardIosIcon />
                                       </IconButton>
                                    </Box>
                                 )}
                              </DialogContent>
                           </Dialog>
                        </>
                     )}
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
