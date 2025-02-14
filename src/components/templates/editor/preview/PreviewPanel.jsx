import React, { useMemo } from 'react'
import { Box, Typography, ImageList, ImageListItem, Divider, Chip, Button, IconButton, Tooltip } from '@mui/material'
import { styled } from '@mui/material/styles'
import { motion, AnimatePresence } from 'framer-motion'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import EventIcon from '@mui/icons-material/Event'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import MessageIcon from '@mui/icons-material/Message'
import GroupIcon from '@mui/icons-material/Group'
import ShareIcon from '@mui/icons-material/Share'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

// dayjs 한글 설정
dayjs.locale('ko')

const PreviewContainer = styled(Box)(({ theme }) => ({
   width: '100%',
   height: '100%',
   padding: theme.spacing(3),
   backgroundColor: 'white',
   borderRadius: theme.shape.borderRadius,
   boxShadow: theme.shadows[1],
   overflow: 'auto',
   scrollBehavior: 'smooth',
   position: 'relative',
   '&::-webkit-scrollbar': {
      width: '8px',
   },
   '&::-webkit-scrollbar-track': {
      background: theme.palette.grey[100],
      borderRadius: '4px',
   },
   '&::-webkit-scrollbar-thumb': {
      background: theme.palette.grey[400],
      borderRadius: '4px',
      '&:hover': {
         background: theme.palette.grey[500],
      },
   },
}))

const PreviewSection = styled(motion.div)(({ theme }) => ({
   marginBottom: theme.spacing(4),
   '&:last-child': {
      marginBottom: 0,
   },
}))

const SectionTitle = styled(Typography)(({ theme }) => ({
   fontSize: '1.2rem',
   fontWeight: 500,
   marginBottom: theme.spacing(2),
   display: 'flex',
   alignItems: 'center',
   gap: theme.spacing(1),
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
   gap: theme.spacing(1),
   marginBottom: theme.spacing(2),
   padding: theme.spacing(2),
   backgroundColor: theme.palette.grey[50],
   borderRadius: theme.shape.borderRadius,
   transition: 'transform 0.3s ease, box-shadow 0.3s ease',
   '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows[2],
   },
}))

const PreviewDivider = styled(Divider)(({ theme }) => ({
   margin: theme.spacing(3, 0),
   '&::before, &::after': {
      borderColor: theme.palette.primary.main,
   },
}))

const RSVPButton = styled(Button)(({ theme }) => ({
   marginTop: theme.spacing(2),
   transition: 'transform 0.3s ease',
   '&:hover': {
      transform: 'scale(1.02)',
   },
}))

const ActionBar = styled(Box)(({ theme }) => ({
   position: 'absolute',
   top: theme.spacing(2),
   right: theme.spacing(2),
   display: 'flex',
   gap: theme.spacing(1),
   zIndex: 10,
}))

const sectionVariants = {
   initial: { opacity: 0, y: 20 },
   animate: { opacity: 1, y: 0 },
   exit: { opacity: 0, y: -20 },
}

const getRandomRotation = () => {
   return Math.random() * 6 - 3 + 'deg'
}

const PreviewPanel = ({ formData, theme }) => {
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

   const handleShare = () => {
      // 공유 기능 구현
      console.log('Share clicked')
   }

   const handleLike = () => {
      // 좋아요 기능 구현
      console.log('Like clicked')
   }

   const handleCopy = () => {
      // 복사 기능 구현
      console.log('Copy clicked')
   }

   const formattedDate = useMemo(() => formatDate(formData.date), [formData.date])

   return (
      <PreviewContainer style={{ backgroundColor: theme.backgroundColor }}>
         <ActionBar>
            <Tooltip title="공유하기">
               <IconButton onClick={handleShare} size="small">
                  <ShareIcon />
               </IconButton>
            </Tooltip>
            <Tooltip title="좋아요">
               <IconButton onClick={handleLike} size="small">
                  <FavoriteIcon />
               </IconButton>
            </Tooltip>
            <Tooltip title="복사하기">
               <IconButton onClick={handleCopy} size="small">
                  <ContentCopyIcon />
               </IconButton>
            </Tooltip>
         </ActionBar>

         <AnimatePresence mode="wait">
            {/* 제목 섹션 */}
            <PreviewSection key="title" variants={sectionVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}>
               <Typography
                  variant="h4"
                  component={motion.h4}
                  style={{
                     color: theme.primaryColor,
                     fontFamily: theme.fontFamily,
                     textAlign: 'center',
                     marginBottom: '2rem',
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
               >
                  {formData.title || '제목을 입력하세요'}
               </Typography>
            </PreviewSection>

            {/* 인사말 섹션 */}
            {formData.greeting && (
               <PreviewSection key="greeting" variants={sectionVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5, delay: 0.1 }}>
                  <SectionTitle style={{ color: theme.primaryColor, fontFamily: theme.fontFamily }}>
                     <MessageIcon /> 인사말
                  </SectionTitle>
                  <Typography
                     component={motion.div}
                     style={{
                        color: theme.secondaryColor,
                        fontFamily: theme.fontFamily,
                        whiteSpace: 'pre-line',
                     }}
                     whileHover={{ scale: 1.01 }}
                     transition={{ duration: 0.3 }}
                  >
                     {formData.greeting}
                  </Typography>
                  <PreviewDivider />
               </PreviewSection>
            )}

            {/* 날짜 및 장소 섹션 */}
            {(formData.date || formData.location) && (
               <PreviewSection key="details" variants={sectionVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5, delay: 0.2 }}>
                  {formData.date && (
                     <InfoItem component={motion.div} whileHover={{ scale: 1.02 }}>
                        <EventIcon style={{ color: theme.primaryColor }} />
                        <Box>
                           <Typography variant="subtitle1" style={{ color: theme.primaryColor, fontFamily: theme.fontFamily }}>
                              {formattedDate.full}
                           </Typography>
                           <Typography variant="body2" style={{ color: theme.secondaryColor, fontFamily: theme.fontFamily }}>
                              {formattedDate.day}요일
                           </Typography>
                        </Box>
                     </InfoItem>
                  )}

                  {formData.location && (
                     <InfoItem component={motion.div} whileHover={{ scale: 1.02 }}>
                        <LocationOnIcon style={{ color: theme.primaryColor }} />
                        <Box>
                           <Typography variant="subtitle1" style={{ color: theme.primaryColor, fontFamily: theme.fontFamily }}>
                              {formData.location}
                           </Typography>
                           {formData.traffic && (
                              <Typography
                                 variant="body2"
                                 style={{
                                    color: theme.secondaryColor,
                                    fontFamily: theme.fontFamily,
                                    whiteSpace: 'pre-line',
                                 }}
                              >
                                 {formData.traffic}
                              </Typography>
                           )}
                        </Box>
                     </InfoItem>
                  )}
                  <PreviewDivider />
               </PreviewSection>
            )}

            {/* 갤러리 섹션 */}
            {formData.gallery?.length > 0 && (
               <PreviewSection key="gallery" variants={sectionVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5, delay: 0.3 }}>
                  <SectionTitle style={{ color: theme.primaryColor, fontFamily: theme.fontFamily }}>갤러리</SectionTitle>
                  <ImageGrid layout={formData.galleryLayout || 'grid'} cols={3} gap={16}>
                     <AnimatePresence>
                        {formData.gallery.map((image, index) => (
                           <ImageListItem
                              key={index}
                              component={motion.div}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.3 }}
                              style={{
                                 '--rotation': getRandomRotation(),
                              }}
                           >
                              <motion.img
                                 src={URL.createObjectURL(image)}
                                 alt={`갤러리 이미지 ${index + 1}`}
                                 loading="lazy"
                                 style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '4px',
                                 }}
                                 whileHover={{ scale: 1.05 }}
                                 transition={{ duration: 0.3 }}
                              />
                           </ImageListItem>
                        ))}
                     </AnimatePresence>
                  </ImageGrid>
                  <PreviewDivider />
               </PreviewSection>
            )}

            {/* RSVP 섹션 */}
            {formData.rsvpEnabled && (
               <PreviewSection key="rsvp" variants={sectionVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5, delay: 0.4 }}>
                  <SectionTitle style={{ color: theme.primaryColor, fontFamily: theme.fontFamily }}>
                     <GroupIcon /> 참석 여부
                  </SectionTitle>
                  {formData.attendance && (
                     <Typography
                        style={{
                           color: theme.secondaryColor,
                           fontFamily: theme.fontFamily,
                           marginBottom: theme.spacing(2),
                        }}
                     >
                        {formData.attendance}
                     </Typography>
                  )}
                  {formData.rsvpDeadline && <Chip label={`회신 마감일: ${formatDate(formData.rsvpDeadline).date}`} color="primary" size="small" style={{ marginBottom: theme.spacing(2) }} />}
                  <RSVPButton
                     variant="contained"
                     fullWidth
                     style={{
                        backgroundColor: theme.primaryColor,
                        color: '#fff',
                        fontFamily: theme.fontFamily,
                     }}
                  >
                     참석 여부 응답하기
                  </RSVPButton>
               </PreviewSection>
            )}
         </AnimatePresence>
      </PreviewContainer>
   )
}

export default PreviewPanel
