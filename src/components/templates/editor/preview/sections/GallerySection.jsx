import React, { useState, useEffect } from 'react'
import { Box, Typography, Dialog, DialogContent, IconButton } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCards } from 'swiper/modules'
import CloseIcon from '@mui/icons-material/Close'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Section } from '../styles/PreviewStyles'
import { COLORS } from '../../styles/commonStyles'

const GallerySection = ({ images, layout, style, typeStyle }) => {
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [selectedIndex, setSelectedIndex] = useState(null)
   const [swiper, setSwiper] = useState(null)

   // 탭 전환시 상태 초기화
   useEffect(() => {
      return () => {
         setIsModalOpen(false)
         setSelectedIndex(null)
      }
   }, [])

   const handleImageClick = (index) => {
      setSelectedIndex(index)
      setIsModalOpen(true)
   }

   const handleModalClose = () => {
      setIsModalOpen(false)
      setSelectedIndex(null)
   }

   const handlePrevImage = () => {
      setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
   }

   const handleNextImage = () => {
      setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
   }

   // Grid/Masonry 레이아웃
   const renderGridMasonry = () => {
      return (
         <Box
            sx={{
               display: layout === 'grid' ? 'grid' : 'block',
               gridTemplateColumns: layout === 'grid' ? 'repeat(3, 1fr)' : 'unset',
               columnCount: layout === 'masonry' ? 2 : 'unset',
               gap: 1.5, // 간격 조정
            }}
         >
            {images.map((image, index) => (
               <Box
                  key={index}
                  onClick={() => handleImageClick(index)}
                  sx={{
                     cursor: 'pointer',
                     mb: layout === 'masonry' ? 1.5 : 0, // 간격 일관성
                     breakInside: layout === 'masonry' ? 'avoid' : 'unset',
                     transition: 'all 0.3s ease',
                     position: 'relative',
                     '&:hover': {
                        transform: 'translateY(-4px)',
                        '&::after': {
                           opacity: 1,
                        },
                     },
                     '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.1)',
                        borderRadius: '8px',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                     },
                  }}
               >
                  <Box
                     sx={{
                        borderRadius: '8px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                     }}
                  >
                     <img
                        src={typeof image === 'string' ? image : image.url}
                        alt={`Gallery ${index + 1}`}
                        style={{
                           width: '100%',
                           height: layout === 'grid' ? '240px' : 'auto', // 높이 조정
                           objectFit: 'cover',
                           display: 'block',
                        }}
                     />
                  </Box>
               </Box>
            ))}
         </Box>
      )
   }

   // Polaroid 레이아웃
   const renderPolaroid = () => {
      return (
         <Swiper effect="cards" grabCursor={true} modules={[Autoplay, EffectCards]} autoplay={{ delay: 3000, disableOnInteraction: false }} onSwiper={setSwiper} className="polaroid-swiper">
            {images.map((image, index) => (
               <SwiperSlide key={index}>
                  <Box
                     sx={{
                        position: 'relative',
                        height: '100%',
                        width: '100%',
                        backgroundColor: 'white',
                        padding: '12px',
                        borderRadius: '12px',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                        transform: 'rotate(-2deg)', // 폴라로이드 효과
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                           transform: 'rotate(0deg) scale(1.02)',
                        },
                     }}
                  >
                     <Box
                        sx={{
                           width: '100%',
                           height: '100%',
                           overflow: 'hidden',
                           borderRadius: '8px',
                           position: 'relative',
                        }}
                     >
                        <img
                           src={typeof image === 'string' ? image : image.url}
                           alt={`Gallery ${index + 1}`}
                           style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                           }}
                        />
                     </Box>
                  </Box>
               </SwiperSlide>
            ))}
         </Swiper>
      )
   }

   return (
      <Section style={style}>
         <Typography
            sx={{
               textAlign: 'center',
               color: style.color,
               fontWeight: 'bold',
               mb: 2.5,
               fontSize: '1.1rem',
            }}
         >
            {typeStyle.galleryTitle || '갤러리'}
         </Typography>
         <Box
            sx={{
               p: 2.5,
               backgroundColor: 'rgba(255, 255, 255, 0.97)',
               borderRadius: '16px',
               boxShadow: `0 8px 32px ${COLORS.accent.main}15`,
               border: `1px solid ${COLORS.accent.main}15`,
               ...(layout === 'polaroid' && {
                  height: '420px',
                  position: 'relative',
                  overflow: 'hidden',
               }),
            }}
         >
            {layout === 'polaroid' ? renderPolaroid() : renderGridMasonry()}
         </Box>

         <Dialog
            open={isModalOpen}
            onClose={handleModalClose}
            maxWidth="lg"
            fullWidth
            PaperProps={{
               sx: {
                  bgcolor: 'black',
                  borderRadius: '16px',
               },
            }}
         >
            <DialogContent sx={{ position: 'relative', p: 0, bgcolor: 'black' }}>
               <IconButton
                  onClick={handleModalClose}
                  sx={{
                     position: 'absolute',
                     right: 8,
                     top: 8,
                     color: 'white',
                     bgcolor: 'rgba(0,0,0,0.5)',
                     '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                     zIndex: 1,
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
                     bgcolor: 'rgba(0,0,0,0.5)',
                     '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                     zIndex: 1,
                  }}
               >
                  <ArrowBackIosIcon />
               </IconButton>
               <IconButton
                  onClick={handleNextImage}
                  sx={{
                     position: 'absolute',
                     right: 8,
                     top: '50%',
                     transform: 'translateY(-50%)',
                     color: 'white',
                     bgcolor: 'rgba(0,0,0,0.5)',
                     '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                     zIndex: 1,
                  }}
               >
                  <ArrowForwardIosIcon />
               </IconButton>
               <img
                  src={typeof images[selectedIndex] === 'string' ? images[selectedIndex] : images[selectedIndex]?.url}
                  alt={`Gallery ${selectedIndex + 1}`}
                  style={{
                     width: '100%',
                     height: '80vh',
                     objectFit: 'contain',
                  }}
               />
            </DialogContent>
         </Dialog>
      </Section>
   )
}

export default GallerySection
