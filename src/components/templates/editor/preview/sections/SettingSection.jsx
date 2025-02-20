import React, { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { Box } from '@mui/material'

const SettingSection = ({ onComplete }) => {
   const { watch } = useFormContext()
   const introImages = watch('introImages') || []
   const animationType = watch('introAnimation') || 'fade'
   const [[currentIndex, direction], setCurrentIndex] = useState([0, 0])
   const [showContent, setShowContent] = useState(false)
   const [sectionComplete, setSectionComplete] = useState(false)
   const [imagesLoaded, setImagesLoaded] = useState(new Set())

   // 애니메이션 variants 정의
   const variants = {
      fade: {
         enter: { opacity: 0 },
         center: { opacity: 1 },
         exit: { opacity: 0 },
      },
      slide: {
         enter: (direction) => ({
            y: direction > 0 ? '100%' : '-100%',
            opacity: 0,
         }),
         center: {
            y: 0,
            opacity: 1,
         },
         exit: (direction) => ({
            y: direction < 0 ? '100%' : '-100%',
            opacity: 0,
         }),
      },
   }

   // 이미지 로드 완료 핸들러
   const handleImageLoad = (index) => {
      setImagesLoaded((prev) => new Set([...prev, index]))
   }

   useEffect(() => {
      let timer
      const startAnimation = () => {
         // 모든 이미지가 로드되었는지 확인
         if (imagesLoaded.size === introImages.length) {
            if (!introImages.length) {
               setShowContent(true)
               setTimeout(() => {
                  setSectionComplete(true)
                  onComplete?.()
               }, 1000)
               return
            }

            timer = setInterval(() => {
               setCurrentIndex((prev) => {
                  const [index] = prev
                  if (index < introImages.length - 1) {
                     return [index + 1, 1]
                  } else {
                     clearInterval(timer)
                     setShowContent(true)
                     setTimeout(() => {
                        setSectionComplete(true)
                        onComplete?.()
                     }, 2000)
                     return prev
                  }
               })
            }, 2000)
         }
      }

      startAnimation()
      return () => {
         if (timer) clearInterval(timer)
      }
   }, [introImages, onComplete, imagesLoaded])

   if (sectionComplete) return null

   return (
      <Box
         sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            backgroundColor: '#000',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
         }}
      >
         {/* 이미지 프리로드 */}
         <Box sx={{ display: 'none' }}>
            {introImages.map((img, idx) => (
               <img key={`preload-${idx}`} src={img.url} alt="" onLoad={() => handleImageLoad(idx)} />
            ))}
         </Box>

         <AnimatePresence initial={false} custom={direction} mode="wait">
            {!showContent && introImages[currentIndex] && imagesLoaded.has(currentIndex) && (
               <Box
                  component={motion.div}
                  key={currentIndex}
                  custom={direction}
                  variants={variants[animationType] || variants.fade}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                     duration: 0.8,
                     ease: [0.4, 0, 0.2, 1],
                  }}
                  sx={{
                     position: 'absolute',
                     top: 0,
                     left: 0,
                     width: '100%',
                     height: '50vh',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                  }}
               >
                  <img
                     src={introImages[currentIndex].url}
                     alt={introImages[currentIndex].name}
                     style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        objectPosition: 'top center',
                     }}
                  />
               </Box>
            )}
         </AnimatePresence>
      </Box>
   )
}

export default SettingSection
