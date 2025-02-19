import React, { useState, useCallback, useEffect } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Box, Button, Typography, Select, MenuItem, IconButton, LinearProgress } from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import DeleteIcon from '@mui/icons-material/Delete'
import { COLORS, SectionContainer } from '../styles/commonStyles'

// 사용할 애니메이션 타입들 예시
const animationOptions = [
   { value: 'fade', label: '페이드' },
   { value: 'slide', label: '슬라이드' },
   { value: 'none', label: '없음' },
]

// 샘플 이미지 데이터
const sampleImages = [
   {
      file: null,
      url: '/images/samples/wedding-sample1.png',
      name: 'wedding-sample1.png',
   },
   {
      file: null,
      url: '/images/samples/wedding-sample2.png',
      name: 'wedding-sample2.png',
   },
   {
      file: null,
      url: '/images/samples/wedding-sample3.png',
      name: 'wedding-sample3.png',
   },
]

// 페이드인 애니메이션
const fadeInVariants = {
   initial: {
      opacity: 0,
      y: 20,
   },
   animate: {
      opacity: 1,
      y: 0,
      transition: {
         duration: 0.5,
         ease: 'easeOut',
      },
   },
   exit: {
      opacity: 0,
      y: -20,
      transition: {
         duration: 0.3,
      },
   },
}

const SettingSection = () => {
   const { control, watch, setValue } = useFormContext()
   const [uploadProgress, setUploadProgress] = useState(0)
   const images = watch('introImages') || []
   const animationType = watch('introAnimation') || 'fade'

   // 컴포넌트 마운트시 샘플 이미지 설정
   useEffect(() => {
      if (images.length === 0) {
         setValue('introImages', sampleImages, { shouldValidate: true })
      }
   }, [])

   // 파일 업로드 핸들러
   const handleFileChange = useCallback(
      (e) => {
         const files = Array.from(e.target.files).filter((file) => file.type.startsWith('image/'))
         if (files.length + images.length > 3) {
            alert('이미지는 최대 3장까지 업로드 가능합니다.')
            return
         }

         // 진행도 표시 애니메이션
         setUploadProgress(0)
         const interval = setInterval(() => {
            setUploadProgress((prev) => {
               if (prev >= 100) {
                  clearInterval(interval)
                  setTimeout(() => setUploadProgress(0), 1000)
                  return 100
               }
               return prev + 20
            })
         }, 200)

         // 새 이미지 객체 생성
         const newImages = files.map((file) => ({
            file,
            url: URL.createObjectURL(file),
            name: file.name,
         }))
         setValue('introImages', [...images, ...newImages], { shouldValidate: true })
      },
      [images, setValue]
   )

   // 이미지 삭제
   const handleDelete = useCallback(
      (index) => {
         const updated = [...images]
         updated.splice(index, 1)
         setValue('introImages', updated, { shouldValidate: true })
      },
      [images, setValue]
   )

   // 샘플 이미지로 리셋
   const handleReset = useCallback(() => {
      setValue('introImages', sampleImages, { shouldValidate: true })
   }, [setValue])

   return (
      <SectionContainer component={motion.div} variants={fadeInVariants} initial="initial" animate="animate" exit="exit" sx={{ p: 2, border: `1px solid ${COLORS.accent.main}30`, borderRadius: 2 }}>
         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">초기 이미지 & 애니메이션 설정</Typography>
            <Button
               onClick={handleReset}
               size="small"
               sx={{
                  color: COLORS.accent.main,
                  '&:hover': {
                     backgroundColor: `${COLORS.accent.main}15`,
                  },
               }}
            >
               샘플로 리셋
            </Button>
         </Box>

         {/* 애니메이션 타입 선택 */}
         <Box sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
               애니메이션 타입
            </Typography>
            <Controller
               name="introAnimation"
               control={control}
               defaultValue="fade"
               render={({ field }) => (
                  <Select {...field} size="small" sx={{ minWidth: 120 }}>
                     {animationOptions.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                           {opt.label}
                        </MenuItem>
                     ))}
                  </Select>
               )}
            />
         </Box>

         {/* 이미지 업로드 */}
         <Box>
            <Typography variant="body1" sx={{ mb: 1 }}>
               최대 3장 이미지 업로드
            </Typography>
            <label htmlFor="intro-image-upload">
               <input id="intro-image-upload" type="file" accept="image/*" multiple onChange={handleFileChange} style={{ display: 'none' }} />
               <Button
                  component="span"
                  startIcon={<AddPhotoAlternateIcon />}
                  sx={{
                     color: COLORS.accent.main,
                     mb: 1,
                     '&:hover': {
                        backgroundColor: `${COLORS.accent.main}15`,
                     },
                  }}
               >
                  이미지 선택
               </Button>
            </label>

            {uploadProgress > 0 && (
               <LinearProgress
                  variant="determinate"
                  value={uploadProgress}
                  sx={{
                     mt: 1,
                     mb: 1,
                     height: 6,
                     borderRadius: 3,
                     backgroundColor: `${COLORS.accent.main}15`,
                     '& .MuiLinearProgress-bar': {
                        backgroundColor: COLORS.accent.main,
                     },
                  }}
               />
            )}

            {/* 업로드된 이미지 미리보기 */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 1 }}>
               {images.map((img, idx) => (
                  <Box
                     key={idx}
                     sx={{
                        position: 'relative',
                        width: 80,
                        height: 80,
                        borderRadius: 1,
                        overflow: 'hidden',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                     }}
                  >
                     <img
                        src={img.url}
                        alt={img.name}
                        style={{
                           width: '100%',
                           height: '100%',
                           objectFit: 'cover',
                        }}
                     />
                     <IconButton
                        onClick={() => handleDelete(idx)}
                        size="small"
                        sx={{
                           position: 'absolute',
                           top: 2,
                           right: 2,
                           color: 'white',
                           bgcolor: 'rgba(0,0,0,0.5)',
                           '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                        }}
                     >
                        <DeleteIcon fontSize="small" />
                     </IconButton>
                  </Box>
               ))}
            </Box>
         </Box>
      </SectionContainer>
   )
}

export default SettingSection
