// src/components/admins/templates/TemplateForm.jsx
import React, { useState, useCallback } from 'react'
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Button, Typography, Grid, Paper, InputAdornment, Alert, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'

const FormContainer = styled(Paper)(({ theme }) => ({
   padding: theme.spacing(3),
   margin: theme.spacing(2),
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

const TemplateForm = () => {
   const [formData, setFormData] = useState({
      title: '',
      thumbnail: null,
      thumbnailPreview: null,
      category: 'wedding',
      content: '',
      price: 10000,
      data: {},
      status: 'draft',
   })
   const [error, setError] = useState(null)

   const handleChange = useCallback((e) => {
      const { name, value } = e.target
      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }))
      setError(null)
   }, [])

   const handleFileChange = useCallback((e) => {
      const file = e.target.files[0]
      if (file) {
         if (file.size > 5000000) {
            // 5MB 제한
            setError('파일 크기는 5MB를 초과할 수 없습니다.')
            return
         }
         const reader = new FileReader()
         reader.onload = () => {
            setFormData((prev) => ({
               ...prev,
               thumbnail: file,
               thumbnailPreview: reader.result,
            }))
         }
         reader.readAsDataURL(file)
      }
   }, [])

   const handleSubmit = useCallback(
      async (e) => {
         e.preventDefault()
         try {
            // API 호출 로직
            console.log('제출된 데이터:', formData)
         } catch (err) {
            setError('템플릿 등록 중 오류가 발생했습니다.')
         }
      },
      [formData]
   )

   return (
      <FormContainer>
         <Typography variant="h5" gutterBottom>
            새 템플릿 등록
         </Typography>

         {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
               {error}
            </Alert>
         )}

         <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
               <Grid item xs={12}>
                  <TextField fullWidth label="템플릿 제목" name="title" value={formData.title} onChange={handleChange} required error={!formData.title} helperText={!formData.title && '제목을 입력해주세요'} />
               </Grid>

               <Grid item xs={12}>
                  <Button component="label" variant="outlined" startIcon={<CloudUploadIcon />} sx={{ mr: 2 }}>
                     썸네일 업로드
                     <VisuallyHiddenInput type="file" accept="image/*" onChange={handleFileChange} />
                  </Button>
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
                  <FormControl fullWidth>
                     <InputLabel>카테고리</InputLabel>
                     <Select name="category" value={formData.category} onChange={handleChange} required>
                        <MenuItem value="wedding">청첩장</MenuItem>
                        <MenuItem value="invitation">초대장</MenuItem>
                        <MenuItem value="newyear">연하장</MenuItem>
                        <MenuItem value="gohyeon">고현</MenuItem>
                     </Select>
                  </FormControl>
               </Grid>

               <Grid item xs={12} md={6}>
                  <TextField
                     fullWidth
                     label="가격"
                     name="price"
                     type="number"
                     value={formData.price}
                     onChange={handleChange}
                     InputProps={{
                        startAdornment: <InputAdornment position="start">₩</InputAdornment>,
                     }}
                     required
                  />
               </Grid>

               <Grid item xs={12}>
                  <TextField fullWidth label="템플릿 설명" name="content" multiline rows={4} value={formData.content} onChange={handleChange} />
               </Grid>

               <Grid item xs={12}>
                  <FormControl fullWidth>
                     <InputLabel>상태</InputLabel>
                     <Select name="status" value={formData.status} onChange={handleChange} required>
                        <MenuItem value="draft">작성중</MenuItem>
                        <MenuItem value="published">판매중</MenuItem>
                        <MenuItem value="ended">판매종료</MenuItem>
                        <MenuItem value="deleted">삭제됨</MenuItem>
                     </Select>
                  </FormControl>
               </Grid>

               <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                     <Button variant="outlined" color="secondary" onClick={() => window.history.back()}>
                        취소
                     </Button>
                     <Button type="submit" variant="contained" color="primary" startIcon={<SaveIcon />}>
                        템플릿 등록
                     </Button>
                  </Box>
               </Grid>
            </Grid>
         </Box>
      </FormContainer>
   )
}

export default TemplateForm
