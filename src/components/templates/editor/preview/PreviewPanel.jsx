import React, { useMemo, useEffect } from 'react'
import { Box, Typography, ImageList, ImageListItem, Divider, Chip, Button, IconButton, Tooltip } from '@mui/material'
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
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

// dayjs 한글 설정
dayjs.locale('ko')

const PreviewContainer = styled(Box)(({ theme }) => ({
   width: '100%',
   height: '100%',
   padding: '24px',
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
   marginBottom: '32px',
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

   const formattedDate = useMemo(() => formatDate(formData.date), [formData.date])

   // 애니메이션 variants
   const containerVariants = {
      initial: { opacity: 0 },
      animate: {
         opacity: 1,
         transition: {
            staggerChildren: 0.1,
         },
      },
      exit: { opacity: 0 },
   }

   const sectionVariants = {
      initial: { opacity: 0, y: 20 },
      animate: {
         opacity: 1,
         y: 0,
         transition: {
            type: 'spring',
            stiffness: 300,
            damping: 30,
         },
      },
      exit: { opacity: 0, y: -20 },
   }

   const itemVariants = {
      initial: { opacity: 0, x: -20 },
      animate: {
         opacity: 1,
         x: 0,
         transition: {
            type: 'spring',
            stiffness: 500,
            damping: 30,
         },
      },
      exit: { opacity: 0, x: 20 },
   }

   return (
      <PreviewContainer style={{ backgroundColor: theme.backgroundColor }} component={motion.div} variants={containerVariants} initial="initial" animate="animate" exit="exit">
         <LayoutGroup>
            <AnimatePresence mode="wait">
               {/* 제목 섹션 */}
               <PreviewSection key="title" variants={sectionVariants} layout layoutId="title-section">
                  <Typography
                     variant="h4"
                     component={motion.h4}
                     style={{
                        color: theme.primaryColor,
                        fontFamily: theme.fontFamily,
                        textAlign: 'center',
                        marginBottom: '2rem',
                     }}
                     variants={itemVariants}
                     whileHover={{ scale: 1.02 }}
                     transition={{ duration: 0.3 }}
                     layout
                     layoutId="title-text"
                  >
                     {formData.title || '제목을 입력하세요'}
                  </Typography>
               </PreviewSection>

               {/* 인사말 섹션 */}
               {formData.greeting && (
                  <PreviewSection key="greeting" variants={sectionVariants} layout layoutId="greeting-section">
                     <motion.div variants={itemVariants} layout>
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
                           layout
                           layoutId="greeting-text"
                        >
                           {formData.greeting}
                        </Typography>
                     </motion.div>
                     <PreviewDivider />
                  </PreviewSection>
               )}

               {/* 날짜 및 장소 섹션 */}
               {(formData.date || formData.location) && (
                  <PreviewSection key="details" variants={sectionVariants} layout layoutId="details-section">
                     {formData.date && (
                        <InfoItem component={motion.div} variants={itemVariants} whileHover={{ scale: 1.02 }} layout layoutId="date-item">
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
                        <InfoItem component={motion.div} variants={itemVariants} whileHover={{ scale: 1.02 }} layout layoutId="location-item">
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
                  <PreviewSection key="gallery" variants={sectionVariants} layout layoutId="gallery-section">
                     <motion.div variants={itemVariants} layout>
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
                                    layout
                                    layoutId={`gallery-item-${index}`}
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
                     </motion.div>
                     <PreviewDivider />
                  </PreviewSection>
               )}

               {/* RSVP 섹션 */}
               {formData.rsvpEnabled && (
                  <PreviewSection key="rsvp" variants={sectionVariants} layout layoutId="rsvp-section">
                     <motion.div variants={itemVariants} layout>
                        <SectionTitle style={{ color: theme.primaryColor, fontFamily: theme.fontFamily }}>
                           <GroupIcon /> 참석 여부
                        </SectionTitle>
                        {formData.attendance && (
                           <Typography
                              style={{
                                 color: theme.secondaryColor,
                                 fontFamily: theme.fontFamily,
                                 marginBottom: '16px',
                              }}
                           >
                              {formData.attendance}
                           </Typography>
                        )}
                        {formData.rsvpDeadline && <Chip label={`회신 마감일: ${formatDate(formData.rsvpDeadline).date}`} color="primary" size="small" style={{ marginBottom: '16px' }} />}
                        <RSVPButton
                           variant="contained"
                           fullWidth
                           style={{
                              backgroundColor: theme.primaryColor,
                              color: '#fff',
                              fontFamily: theme.fontFamily,
                           }}
                           component={motion.button}
                           whileHover={{ scale: 1.02 }}
                           whileTap={{ scale: 0.98 }}
                           layout
                           layoutId="rsvp-button"
                        >
                           참석 여부 응답하기
                        </RSVPButton>
                     </motion.div>
                  </PreviewSection>
               )}
            </AnimatePresence>
         </LayoutGroup>
      </PreviewContainer>
   )
}

export default PreviewPanel
