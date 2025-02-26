import React, { useState, useEffect, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { Box, Typography, Button } from '@mui/material'

const SettingSection = ({ onComplete }) => {
   const { watch } = useFormContext()
   const setting = watch('setting') || {}
   const introImages = setting.images || []
   const animationType = setting.animation || 'fade'
   const [currentIndex, setCurrentIndex] = useState(0)
   const [currentImageLoaded, setCurrentImageLoaded] = useState(false)
   const timerRef = useRef(null)
   const completedRef = useRef(false)
   const isLastImage = currentIndex === introImages.length - 1

   const variants = {
      fade: {
         enter: { opacity: 0 },
         center: {
            opacity: 1,
            scale: [0.9, 1],
            transition: { duration: 0.8, ease: 'easeInOut' },
         },
         exit: {
            opacity: 0,
            scale: [1, 1.1],
            transition: { duration: 0.8, ease: 'easeOut' },
         },
      },
      slide: {
         enter: { x: '100%', opacity: 0 },
         center: {
            x: ['3%', 0],
            opacity: 1,
            transition: { duration: 0.8, ease: 'easeInOut' },
         },
         exit: {
            x: [0, '-100%'],
            opacity: 0,
            transition: { duration: 0.8, ease: 'easeInOut' },
         },
      },
   }

   useEffect(() => {
      if (completedRef.current) return

      if (introImages.length === 0) {
         completedRef.current = true
         onComplete()
         return
      }

      if (!currentImageLoaded) return

      if (isLastImage) {
         // 마지막 이미지: 2초 후 exit 애니메이션 후 onComplete 호출
         const delay = 2000 + (animationType === 'slide' ? 800 : 500)
         timerRef.current = setTimeout(() => {
            if (!completedRef.current) {
               completedRef.current = true
               onComplete()
            }
         }, delay)
      } else {
         // 다음 이미지로 전환
         timerRef.current = setTimeout(() => {
            setCurrentIndex((prev) => prev + 1)
            setCurrentImageLoaded(false)
         }, 2000)
      }

      return () => clearTimeout(timerRef.current)
   }, [currentIndex, currentImageLoaded, introImages.length, onComplete, isLastImage, animationType])

   if (introImages.length === 0) return null

   return (
      <Box sx={{ position: 'relative', width: '100%', height: '100%', bgcolor: '#000' }}>
         <AnimatePresence mode="wait">
            {introImages[currentIndex] && (
               <motion.img
                  key={currentIndex}
                  src={introImages[currentIndex].url}
                  alt={`Intro ${currentIndex + 1}`}
                  variants={variants[animationType] || variants.fade}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  onLoad={() => setCurrentImageLoaded(true)}
                  style={{
                     position: 'absolute',
                     width: '100%',
                     height: '100%',
                     objectFit: 'contain',
                  }}
               />
            )}
         </AnimatePresence>
      </Box>
   )
}

export default SettingSection
