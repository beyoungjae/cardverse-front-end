import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Box, Button, Typography, Select, MenuItem, IconButton, LinearProgress, Grid, Tooltip } from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import DeleteIcon from '@mui/icons-material/Delete'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { SectionContainer, SectionTitle, TitleText, IconButtonWrapper, fadeInUp, COLORS } from '../styles/commonStyles'
import useImageUpload from '../hooks/useImageUpload'
import { useSelector } from 'react-redux'

// 사용할 애니메이션 옵션
const animationOptions = [
   { value: 'fade', label: '페이드' },
   { value: 'slide', label: '슬라이드' },
   { value: 'none', label: '없음' },
]

const SettingSection = () => {
   const { detail: template, status } = useSelector((state) => state.templates)
   const { control, watch, setValue } = useFormContext()
   const [uploadProgress, setUploadProgress] = useState(0)
   const setting = watch('setting') || { animation: 'fade', images: [] }
   const images = setting.images || []
   const animationType = setting.animation || 'fade'
   const { uploadImage, deleteUploadedImage, uploadMultipleImages } = useImageUpload()

   // 샘플 이미지 설정을 template 데이터 유무에 따라 처리
   const sampleImages = useMemo(() => {
      if (template?.detailImages) {
         return template.detailImages.slice(0, 3).map((url, index) => ({
            file: null,
            url,
            name: `template-image-${index + 1}.png`,
         }))
      }
      return []
   }, [template])

   useEffect(() => {
      if (!sessionStorage.getItem('userInitialized') && template) {
         setValue(
            'setting',
            {
               images: sampleImages,
               animation: template.data?.animation || 'fade',
            },
            { shouldValidate: true }
         )
         sessionStorage.setItem('userInitialized', 'true')
      }
   }, [setValue, template, sampleImages])

   const handleFileChange = useCallback(
      async (e) => {
         const files = Array.from(e.target.files)
         if (files.length + images.length > 3) {
            alert('이미지는 최대 3장까지 업로드 가능합니다.')
            return
         }

         try {
            setUploadProgress(0)
            const uploadPromises = files.map((file) => uploadImage(file, 'setting'))
            const uploadedImages = await Promise.all(uploadPromises)
            setUploadProgress(100)

            setTimeout(() => {
               setUploadProgress(0)
            }, 1000)

            const validImages = uploadedImages.filter(Boolean)
            if (validImages.length > 0) {
               setValue('setting.images', [...images, ...validImages], { shouldValidate: true })
            }
         } catch (error) {
            console.error('이미지 업로드 실패:', error)
         }
      },
      [images, setValue, uploadImage]
   )

   const handleAnimationChange = useCallback(
      (value) => {
         setValue('setting.animation', value || 'fade', { shouldValidate: true })
      },
      [setValue]
   )

   const handleDelete = useCallback(
      (index) => {
         const updated = [...images]
         updated.splice(index, 1)
         setValue('setting.images', updated, { shouldValidate: true })
      },
      [images, setValue]
   )

   const handleReset = useCallback(() => {
      setValue(
         'setting',
         {
            images: sampleImages,
            animation: 'fade',
         },
         { shouldValidate: true }
      )
   }, [setValue])

   return (
      <SectionContainer component={motion.div} variants={fadeInUp} initial="initial" animate="animate" exit="exit" sx={{ p: 3 }}>
         {/* 섹션 타이틀 */}
         <SectionTitle>
            <TitleText>
               <AutoFixHighIcon className="icon" />
               <Box className="title">인트로 이미지 & 애니메이션 설정</Box>
            </TitleText>
            <IconButtonWrapper>
               <Tooltip title="인트로 이미지 기본설정">
                  <RestartAltIcon onClick={handleReset} />
               </Tooltip>
            </IconButtonWrapper>
         </SectionTitle>

         {/* 애니메이션 타입 선택 */}
         <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500, color: COLORS.text.primary }}>
               애니메이션 타입 선택
            </Typography>
            <Controller
               name="setting.animation"
               control={control}
               defaultValue="fade"
               render={({ field }) => (
                  <Select
                     {...field}
                     onChange={(e) => {
                        field.onChange(e)
                     }}
                     size="small"
                     sx={{ minWidth: 140, backgroundColor: 'white', borderRadius: 1 }}
                  >
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
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500, color: COLORS.text.primary }}>
               이미지 업로드 (최대 3장)
            </Typography>
            <label htmlFor="intro-image-upload">
               <input id="intro-image-upload" type="file" accept="image/*" multiple onChange={handleFileChange} style={{ display: 'none' }} />
               <Button component="span" startIcon={<AddPhotoAlternateIcon />} sx={{ color: COLORS.accent.main }}>
                  이미지 선택
               </Button>
            </label>

            {uploadProgress > 0 && <LinearProgress variant="determinate" value={uploadProgress} sx={{ mt: 1, height: 6, borderRadius: 3 }} />}

            {/* 업로드된 이미지 미리보기 */}
            <Grid container spacing={2} sx={{ mt: 2 }}>
               {images.map((img, idx) => (
                  <Grid item key={idx} xs={4}>
                     <Box
                        sx={{
                           position: 'relative',
                           width: '100%',
                           height: '100%',
                           borderRadius: 2,
                           overflow: 'hidden',
                           boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           backgroundColor: '#F8F8F8',
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
                              top: 4,
                              right: 4,
                              color: 'white',
                              bgcolor: 'rgba(0,0,0,0.5)',
                              '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                           }}
                        >
                           <DeleteIcon fontSize="small" />
                        </IconButton>
                     </Box>
                  </Grid>
               ))}
            </Grid>
         </Box>
      </SectionContainer>
   )
}

export default SettingSection
