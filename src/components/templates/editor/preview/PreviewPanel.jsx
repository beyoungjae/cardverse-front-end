import React, { useMemo, useEffect, useState, useCallback } from 'react'
import { Box, Typography, ImageList, ImageListItem, Divider, Chip, Button, IconButton, Tooltip, Skeleton } from '@mui/material'
import { styled } from '@mui/material/styles'
import { motion, AnimatePresence, LayoutGroup, LazyMotion, domAnimation } from 'framer-motion'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import EventIcon from '@mui/icons-material/Event'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import MessageIcon from '@mui/icons-material/Message'
import GroupIcon from '@mui/icons-material/Group'
import ShareIcon from '@mui/icons-material/Share'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { PreviewFrame, fadeInUp, COLORS } from '../styles/commonStyles'

// dayjs 한글 설정
dayjs.locale('ko')

const PreviewContainer = styled(Box)(({ theme }) => ({
   width: '375px',
   height: '667px',
   padding: '24px',
   backgroundColor: 'white',
   borderRadius: '36px',
   boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
   position: 'relative',
   margin: '0 auto',
   border: '12px solid #2C2C2C',
   display: 'flex',
   flexDirection: 'column',
   '&::before': {
      content: '""',
      position: 'absolute',
      top: '-2px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '150px',
      height: '24px',
      backgroundColor: '#2C2C2C',
      borderBottomLeftRadius: '12px',
      borderBottomRightRadius: '12px',
   },
}))

const PreviewSection = styled(motion.div)(({ theme }) => ({
   marginBottom: '24px',
   '&:last-child': {
      marginBottom: 0,
   },
}))

const SectionTitle = styled(Typography)(({ theme }) => ({
   fontSize: '1.2rem',
   fontWeight: 500,
   marginBottom: '16px',
   display: 'flex',
   alignItems: 'center',
   gap: '8px',
}))

const ImageGrid = styled(ImageList)(({ theme, layout }) => ({
   width: '100%',
   margin: 0,
   ...(layout === 'grid' && {
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr)) !important',
   }),
   ...(layout === 'masonry' && {
      columnCount: 3,
      [theme.breakpoints.down('sm')]: {
         columnCount: 2,
      },
   }),
   ...(layout === 'polaroid' && {
      gap: '24px !important',
      '& .MuiImageListItem-root': {
         backgroundColor: '#fff',
         padding: theme.spacing(2),
         boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
         transform: 'rotate(var(--rotation))',
         transition: 'transform 0.3s ease',
         '&:hover': {
            transform: 'rotate(var(--rotation)) scale(1.05)',
         },
      },
   }),
}))

const InfoItem = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'flex-start',
   gap: '8px',
   marginBottom: '16px',
   padding: '16px',
   backgroundColor: theme.palette.grey[50],
   borderRadius: theme.shape.borderRadius,
   transition: 'transform 0.3s ease, box-shadow 0.3s ease',
   '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows[2],
   },
}))

const PreviewDivider = styled(Divider)(({ theme }) => ({
   margin: '24px 0',
   '&::before, &::after': {
      borderColor: theme.palette.primary.main,
   },
}))

const RSVPButton = styled(Button)(({ theme }) => ({
   marginTop: '16px',
   transition: 'transform 0.3s ease',
   '&:hover': {
      transform: 'scale(1.02)',
   },
}))

const ActionBar = styled(Box)(({ theme }) => ({
   position: 'absolute',
   top: '16px',
   right: '16px',
   display: 'flex',
   gap: '8px',
   zIndex: 10,
}))

const PreviewContent = styled(Box)(({ theme }) => ({
   flex: 1,
   overflow: 'auto',
   padding: '20px 0',
   '&::-webkit-scrollbar': {
      width: '6px',
   },
   '&::-webkit-scrollbar-track': {
      background: 'transparent',
   },
   '&::-webkit-scrollbar-thumb': {
      background: COLORS.accent.main,
      borderRadius: '3px',
      '&:hover': {
         background: COLORS.accent.dark,
      },
   },
}))

const GreetingPreview = styled(Box)(({ theme }) => ({
   padding: theme.spacing(4),
   backgroundColor: COLORS.background,
   '&::before': {
      content: '""',
      display: 'block',
      width: '40px',
      height: '2px',
      background: COLORS.primary,
      marginBottom: theme.spacing(2),
   },
}))

const GreetingText = styled(Box)(({ theme }) => ({
   fontFamily: 'Noto Serif KR, serif',
   fontSize: '1rem',
   lineHeight: 1.8,
   color: COLORS.text,
   whiteSpace: 'pre-wrap',
}))

const getRandomRotation = () => {
   return Math.random() * 6 - 3 + 'deg'
}

const PreviewPanel = React.memo(({ formData, theme }) => {
   const [loadedImages, setLoadedImages] = useState(new Set())

   const handleImageLoad = useCallback((index) => {
      setLoadedImages((prev) => new Set([...prev, index]))
   }, [])

   const imageUrls = useMemo(() => {
      return (
         formData.gallery?.map((image) => ({
            url: URL.createObjectURL(image),
            id: `${image.name}-${image.lastModified}`,
         })) || []
      )
   }, [formData.gallery])

   useEffect(() => {
      return () => {
         imageUrls.forEach(({ url }) => URL.revokeObjectURL(url))
      }
   }, [imageUrls])

   const formatDate = (dateString) => {
      if (!dateString) return ''
      const d = dayjs(dateString)
      return {
         full: d.format('YYYY년 MM월 DD일 HH:mm'),
         date: d.format('YYYY년 MM월 DD일'),
         day: d.format('dddd'),
         time: d.format('HH:mm'),
      }
   }

   const formattedDate = useMemo(() => formatDate(formData.date), [formData.date])

   // 애니메이션 variants
   const ANIMATION_VARIANTS = {
      initial: {
         opacity: 0,
         y: 20,
      },
      animate: {
         opacity: 1,
         y: 0,
         transition: {
            duration: 0.6,
            ease: [0.43, 0.13, 0.23, 0.96],
         },
      },
      exit: {
         opacity: 0,
         y: -20,
         transition: {
            duration: 0.5,
            ease: [0.43, 0.13, 0.23, 0.96],
         },
      },
   }

   const HOVER_VARIANTS = {
      rest: { scale: 1 },
      hover: { scale: 1.02, transition: { duration: 0.3, ease: 'easeOut' } },
   }

   const IMAGE_VARIANTS = {
      initial: { opacity: 0, y: 20 },
      animate: {
         opacity: 1,
         y: 0,
         transition: {
            type: 'spring',
            stiffness: 500,
            damping: 30,
            mass: 1,
         },
      },
      exit: {
         opacity: 0,
         y: -20,
         transition: {
            duration: 0.2,
         },
      },
   }

   const memoizedContent = useMemo(
      () => (
         <PreviewFrame component={motion.div} variants={fadeInUp} initial="initial" animate="animate" exit="exit">
            <PreviewContent>
               <GreetingPreview>
                  <GreetingText>{formData.greeting || '인사말을 입력해주세요'}</GreetingText>
               </GreetingPreview>
            </PreviewContent>
         </PreviewFrame>
      ),
      [formData.greeting]
   )

   const containerStyle = useMemo(
      () => ({
         backgroundColor: theme.backgroundColor,
      }),
      [theme.backgroundColor]
   )

   const handleShare = useCallback(() => {
      // 공유 로직
   }, [])

   return (
      <PreviewContainer style={containerStyle}>
         <PreviewContent>
            {formData.title && (
               <PreviewSection>
                  <Typography
                     variant="h5"
                     sx={{
                        color: theme.primaryColor,
                        fontFamily: theme.fontFamily,
                        textAlign: 'center',
                        mb: 3,
                     }}
                  >
                     {formData.title}
                  </Typography>
               </PreviewSection>
            )}

            {formData.greeting && (
               <PreviewSection>
                  <Box
                     sx={{
                        p: 3,
                        backgroundColor: `${theme.backgroundColor}80`,
                        borderRadius: '12px',
                        border: `1px solid ${theme.primaryColor}20`,
                     }}
                  >
                     <Typography
                        sx={{
                           color: theme.primaryColor,
                           fontFamily: theme.fontFamily,
                           whiteSpace: 'pre-line',
                           lineHeight: 1.8,
                        }}
                     >
                        {formData.greeting}
                     </Typography>
                  </Box>
               </PreviewSection>
            )}

            {formData.date && (
               <PreviewSection>
                  <Box
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 2,
                     }}
                  >
                     <EventIcon sx={{ color: theme.primaryColor }} />
                     <Typography
                        sx={{
                           color: theme.primaryColor,
                           fontFamily: theme.fontFamily,
                        }}
                     >
                        {dayjs(formData.date).format('YYYY년 MM월 DD일 HH:mm')}
                     </Typography>
                  </Box>
               </PreviewSection>
            )}

            {formData.location && (
               <PreviewSection>
                  <Box
                     sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1,
                        mb: 2,
                     }}
                  >
                     <LocationOnIcon sx={{ color: theme.primaryColor }} />
                     <Box>
                        <Typography
                           sx={{
                              color: theme.primaryColor,
                              fontFamily: theme.fontFamily,
                              fontWeight: 500,
                              mb: 0.5,
                           }}
                        >
                           {formData.location}
                        </Typography>
                        {formData.address && (
                           <Typography
                              sx={{
                                 color: theme.secondaryColor,
                                 fontFamily: theme.fontFamily,
                                 fontSize: '0.9rem',
                              }}
                           >
                              {formData.address}
                           </Typography>
                        )}
                     </Box>
                  </Box>
               </PreviewSection>
            )}

            {formData.gallery?.length > 0 && (
               <PreviewSection>
                  <ImageList
                     sx={{
                        width: '100%',
                        m: 0,
                     }}
                     cols={2}
                     rowHeight={164}
                  >
                     {formData.gallery.map((image, index) => (
                        <ImageListItem key={index}>
                           <img
                              src={URL.createObjectURL(image)}
                              alt={`Gallery ${index + 1}`}
                              loading="lazy"
                              style={{
                                 borderRadius: '8px',
                                 objectFit: 'cover',
                              }}
                           />
                        </ImageListItem>
                     ))}
                  </ImageList>
               </PreviewSection>
            )}

            {formData.rsvpEnabled && (
               <PreviewSection>
                  <Box
                     sx={{
                        p: 3,
                        backgroundColor: `${theme.backgroundColor}80`,
                        borderRadius: '12px',
                        border: `1px solid ${theme.primaryColor}20`,
                        textAlign: 'center',
                     }}
                  >
                     <Typography
                        sx={{
                           color: theme.primaryColor,
                           fontFamily: theme.fontFamily,
                           mb: 2,
                        }}
                     >
                        {formData.rsvpMessage}
                     </Typography>
                     {formData.rsvpDeadline && (
                        <Chip
                           icon={<EventIcon />}
                           label={`마감: ${dayjs(formData.rsvpDeadline).format('MM/DD HH:mm')}`}
                           sx={{
                              backgroundColor: `${theme.primaryColor}15`,
                              color: theme.primaryColor,
                           }}
                        />
                     )}
                  </Box>
               </PreviewSection>
            )}
         </PreviewContent>
      </PreviewContainer>
   )
})

PreviewPanel.displayName = 'PreviewPanel'

export default PreviewPanel
