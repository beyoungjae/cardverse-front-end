import React, { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { Box } from '@mui/material'

const slideUpVariants = {
   enter: (direction) => ({
      y: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.1,
   }),
   center: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
         duration: 0.8,
         ease: [0.4, 0, 0.2, 1],
      },
   },
   exit: (direction) => ({
      y: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9,
      transition: {
         duration: 0.8,
         ease: [0.4, 0, 0.2, 1],
      },
   }),
}

const contentVariants = {
   hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
   },
   visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
         duration: 0.8,
         ease: [0.4, 0, 0.2, 1],
         delay: 0.3,
      },
   },
}

const SettingSection = () => {
   const { watch } = useFormContext()
   const images = watch('introImages') || []
   const [[currentIndex, direction], setCurrentIndex] = useState([0, 0])
   const [showContent, setShowContent] = useState(false)
   const [sectionComplete, setSectionComplete] = useState(false)

   // 이미지 순서 배치
   const reorderedImages = [...images]

   useEffect(() => {
      if (!reorderedImages.length) {
         setShowContent(true)
         // 이미지가 없는 경우 바로 섹션 완료 처리
         setTimeout(() => setSectionComplete(true), 1000)
         return
      }
      // 다음 이미지로 자동 전환
      const timer = setInterval(() => {
         if (currentIndex < reorderedImages.length - 1) {
            setCurrentIndex([currentIndex + 1, 1])
         } else {
            // 마지막 이미지 이후 본문 표시
            clearInterval(timer)
            setTimeout(() => {
               setShowContent(true)
               // 본문 애니메이션 완료 후 섹션 제거
               setTimeout(() => setSectionComplete(true), 2000)
            }, 800)
         }
      }, 2000)

      return () => clearInterval(timer)
   }, [currentIndex, reorderedImages.length])

   if (sectionComplete) {
      return null
   }

   return (
      <Box
         sx={{
            position: 'relative',
            width: '100%',
            height: '30%',
            overflow: 'hidden', // 모바일 프리뷰 패널 내부로 제한
         }}
      >
         {/* 이미지 슬라이드 */}
         <AnimatePresence initial={false} custom={direction} mode="wait">
            {!showContent && reorderedImages[currentIndex] && (
               <Box
                  component={motion.div}
                  key={currentIndex}
                  custom={direction}
                  variants={slideUpVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  sx={{
                     position: 'absolute',
                     top: 0,
                     left: 0,
                     width: '100%',
                     height: '100%',
                     zIndex: 10,
                  }}
               >
                  <Box
                     sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        '&::before': {
                           content: '""',
                           position: 'absolute',
                           top: 0,
                           left: 0,
                           width: '100%',
                           height: '100%',
                           backgroundColor: 'rgba(0,0,0,0.3)',
                           zIndex: 1,
                        },
                     }}
                  >
                     <img
                        src={reorderedImages[currentIndex].url}
                        alt={reorderedImages[currentIndex].name}
                        style={{
                           width: '100%',
                           height: '100%',
                           objectFit: 'contain',
                        }}
                     />
                  </Box>
               </Box>
            )}
         </AnimatePresence>
      </Box>
   )
}

export default SettingSection
