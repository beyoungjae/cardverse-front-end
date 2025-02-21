import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Button, Typography, Grid, Paper, InputAdornment, Alert, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import { CATEGORIES, INITIAL_FORM_DATA } from '../constants/template'

const FormContainer = styled(Paper)(({ theme }) => ({
   padding: '48px',
   maxWidth: '960px',
   margin: 'auto',
   backgroundColor: '#fff',
   borderRadius: '8px',
   boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
}))

const VisuallyHiddenInput = styled('input')({
   clip: 'rect(0 0 0 0)',
   clipPath: 'inset(50%)',
   height: 1,
   overflow: 'hidden',
   position: 'absolute',
   bottom: 0,
   left: 0,
   whiteSpace: 'nowrap',
   width: 1,
})

const PreviewImage = styled('img')({
   maxWidth: '200px',
   maxHeight: '200px',
   objectFit: 'contain',
   margin: '10px 0',
})

const ButtonBox = styled(Box)(() => ({
   display: 'flex',
   gap: 2,
   justifyContent: 'flex-end',
}))

function TemplateForm() {
   const [error, setError] = useState(null)
   const [errors, setErrors] = useState({})
   const [isSubmitted, setIsSubmitted] = useState(false)
   const [touchedFields, setTouchedFields] = useState({
      title: false,
      price: false,
      thumbnail: false,
   })
   const [formData, setFormData] = useState(INITIAL_FORM_DATA) // 상수는 constants 폴더에서 임포트

   // 유즈이펙트: 메모리누수 방지
   useEffect(() => {
      return () => {
         if (formData.thumbnailPreview) {
            URL.revokeObjectURL(formData.thumbnailPreview)
         }
      }
   }, [formData.thumbnailPreview])

   // 카테고리 메뉴 리턴문 최적화(유즈메모)
   const categoryMenuItems = useMemo(
      () =>
         CATEGORIES.map((category) => (
            <MenuItem key={category.value} value={category.value}>
               {category.label}
            </MenuItem>
         )),
      []
   )

   // 폼 유효성 검사(유즈콜백)
   const validateForm = useCallback(() => {
      const newErrors = {}
      if (!formData.title.trim()) {
         newErrors.title = '제목을 입력해주세요'
      }
      if (!formData.thumbnail) {
         newErrors.thumbnail = '썸네일 이미지를 업로드해주세요'
      }
      if (!formData.price || formData.price <= 0) {
         newErrors.price = '올바른 가격을 입력해주세요'
      }
      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
   }, [formData.title, formData.thumbnail, formData.price])

   // 핸들: 텍스트체인지
   const handleChange = useCallback((e) => {
      const { name, value } = e.target
      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }))
      setError(null)
   }, [])

   // 핸들: 금액체인지
   const handlePriceChange = (e) => {
      const { name, value } = e.target
      // 문자열은 제거로직
      const numericValue = value.replace(/[^0-9]/g, '')
      setFormData((prev) => ({
         ...prev,
         [name]: numericValue,
      }))
   }

   // 핸들: 파일체인지
   const handleFileChange = useCallback(
      (e) => {
         const file = e.target.files[0]
         if (file) {
            if (file.size > 5000000) {
               setErrors((prev) => ({
                  ...prev,
                  thumbnail: '파일 크기는 5MB를 초과할 수 없습니다.',
               }))
               return
            }
            const reader = new FileReader()
            reader.onload = () => {
               setFormData((prev) => ({
                  ...prev,
                  thumbnail: file,
                  thumbnailPreview: reader.result,
               }))
               if (isSubmitted) {
                  setErrors((prev) => {
                     const newErrors = { ...prev }
                     delete newErrors.thumbnail
                     return newErrors
                  })
               }
            }
            reader.readAsDataURL(file)
         }
      },
      [isSubmitted]
   )

   // 마우스 블러 이벤트
   const handleBlur = (fieldName) => {
      setTouchedFields((prev) => ({
         ...prev,
         [fieldName]: true,
      }))
   }

   // 제출
   const handleSubmit = useCallback(
      async (e) => {
         e.preventDefault()
         setIsSubmitted(true)

         if (!validateForm()) {
            return
         }

         try {
            // API 호출 로직
            console.log('제출된 데이터:', formData)
         } catch (err) {
            setErrors((prev) => ({
               ...prev,
               submit: '템플릿 등록 중 오류가 발생했습니다.',
            }))
         }
      },
      [formData]
   )

   return (
      <FormContainer>
         <Typography variant="h3" gutterBottom sx={{ paddingBottom: '16px', marginBottom: '32px', borderBottom: '1px solid #c0c0c0' }}>
            새 템플릿 등록
         </Typography>

         {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
               {error}
            </Alert>
         )}

         <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={4}>
               <Grid item xs={12}>
                  <TextField
                     // 타이틀
                     fullWidth
                     label="템플릿 제목"
                     name="title"
                     value={formData.title}
                     onChange={handleChange}
                     onBlur={() => handleBlur('title')}
                     required
                     error={touchedFields.title && !formData.title.trim()}
                     helperText={touchedFields.title && !formData.title.trim() ? '제목을 입력해주세요' : ''}
                  />
               </Grid>
               <Grid item xs={12}>
                  <Button component="label" variant="outlined" startIcon={<CloudUploadIcon />} sx={{ mr: 2 }}>
                     썸네일 업로드
                     <VisuallyHiddenInput type="file" accept="image/*" onChange={handleFileChange} />
                  </Button>

                  {isSubmitted && errors.thumbnail && (
                     <Typography color="error" variant="caption" display="block" sx={{ mt: 1 }}>
                        {errors.thumbnail}
                     </Typography>
                  )}
                  {formData.thumbnailPreview && (
                     <Box>
                        <PreviewImage src={formData.thumbnailPreview} alt="썸네일 미리보기" />
                        <IconButton onClick={() => setFormData((prev) => ({ ...prev, thumbnail: null, thumbnailPreview: null }))}>
                           <DeleteIcon />
                        </IconButton>
                     </Box>
                  )}
               </Grid>
               <Grid item xs={12} md={6}>
                  <FormControl fullWidth variant="outlined">
                     <InputLabel
                        id="category-label"
                        sx={{
                           backgroundColor: 'white',
                           px: 1,
                           '&.Mui-focused': {
                              backgroundColor: 'white',
                           },
                        }}
                     >
                        카테고리
                     </InputLabel>
                     <Select labelId="category-label" name="category" value={formData.category} onChange={handleChange} required label="카테고리">
                        {categoryMenuItems}
                     </Select>
                  </FormControl>
               </Grid>
               <Grid item xs={12} md={6}>
                  <TextField
                     // 가격
                     fullWidth
                     label="가격"
                     name="price"
                     type="number"
                     value={formData.price}
                     onChange={handlePriceChange}
                     onBlur={() => handleBlur('price')}
                     InputProps={{
                        startAdornment: <InputAdornment position="start">₩</InputAdornment>,
                        inputProps: {
                           min: 0,
                           step: 1000,
                        },
                     }}
                     required
                     error={touchedFields.price && (!formData.price || formData.price <= 0)}
                     helperText={touchedFields.price && (!formData.price || formData.price <= 0) ? '가격을 입력해주세요' : ''}
                  />
               </Grid>
               <Grid item xs={12}>
                  <TextField fullWidth label="템플릿 설명" name="content" multiline rows={12} value={formData.content} onChange={handleChange} />
               </Grid>
               <Grid item xs={12}>
                  <ButtonBox>
                     <Button variant="outlined" color="secondary" onClick={() => window.history.back()}>
                        취소
                     </Button>
                     <Button type="submit" variant="contained" color="primary" startIcon={<SaveIcon />}>
                        템플릿 등록
                     </Button>
                  </ButtonBox>
               </Grid>
            </Grid>
         </Box>
      </FormContainer>
   )
}

export default TemplateForm
