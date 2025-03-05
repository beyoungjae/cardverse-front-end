import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { Box, Typography, TextField, Button, Alert, FormControlLabel, Checkbox } from '@mui/material'

import Dropdown from '../components/shared/Dropdown'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPostThunk } from '../features/postSlice'

// 컨테이너 스타일
const PostContainer = styled(Box)(({ theme }) => ({
   padding: '50px 40px',
   backgroundColor: theme.palette.background.default,
   minHeight: '100vh',
   backgroundImage: 'linear-gradient(to bottom, #f8f9fa, #ffffff)',
   [theme.bps.md]: {
      padding: '60px 24px',
   },
   [theme.bps.sm]: {
      padding: '40px 16px',
   },
}))

// 폼 스타일
const PostForm = styled(Box)(({ theme }) => ({
   maxWidth: '800px',
   margin: '0 auto',
   backgroundColor: theme.palette.background.paper,
   padding: '40px',
   borderRadius: theme.shape.borderRadius * 2,
   boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
   position: 'relative',
   overflow: 'hidden',
   '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '6px',
      background: 'linear-gradient(to right, #000000, #333333)',
   },
   [theme.bps.sm]: {
      padding: '24px',
   },
}))

// 폼 필드 스타일
const FormField = styled(Box)(({ theme }) => ({
   marginBottom: '28px',
   position: 'relative',
}))

// 취소 버튼 스타일
const CancelButton = styled(Button)(({ theme }) => ({
   height: '48px',
   padding: '0 28px',
   borderRadius: theme.shape.borderRadius * 1.5,
   fontWeight: 600,
   border: `1px solid ${theme.palette.divider}`,
   backgroundColor: 'transparent',
   color: theme.palette.text.primary,
   transition: 'all 0.3s ease',
   '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      borderColor: theme.palette.text.primary,
   },
}))

// 버튼 스타일
const SubmitButton = styled(Button)(({ theme }) => ({
   height: '48px',
   padding: '0 28px',
   borderRadius: theme.shape.borderRadius * 1.5,
   fontWeight: 600,
   backgroundColor: theme.palette.primary.main,
   color: '#ffffff',
   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
   transition: 'all 0.3s ease',
   '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
      backgroundColor: theme.palette.primary.dark,
   },
   '&:disabled': {
      backgroundColor: theme.palette.action.disabledBackground,
      color: theme.palette.action.disabled,
   },
}))

// 페이지 타이틀
const PageTitle = styled(Typography)(({ theme }) => ({
   marginBottom: '50px',
   fontWeight: 700,
   position: 'relative',
   display: 'flex',
   justifyContent: 'center',
   color: theme.palette.text.primary,
   '&:after': {
      content: '""',
      position: 'absolute',
      bottom: '-10px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '60px',
      height: '4px',
      backgroundColor: theme.palette.primary.main,
      borderRadius: '2px',
   },
}))

const options = [
   { key: 'account', label: '계정 문의' },
   { key: 'payment', label: '결제 문의' },
   { key: 'event_coupon', label: '이벤트 및 쿠폰 문의' },
   { key: 'site_usage', label: '사이트 이용 문의' },
   { key: 'etc', label: '기타 문의' },
]

const QnaPostPage = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [isPrivate, setIsPrivate] = useState(false)

   const [formData, setFormData] = useState({
      category: '',
      title: '',
      content: '',
      isPrivate: false,
   })
   console.log(formData)

   const [error, setError] = useState('')
   const [successMessage, setSuccessMessage] = useState('')

   const handleCheckboxChange = (e) => {
      setIsPrivate(e.target.checked)
   }

   const handleChange = (e) => {
      const { name, value, type, checked } = e.target

      // 🛠️ 체크박스일 경우 `checked` 값을 사용
      const processedValue = type === 'checkbox' ? checked : typeof value === 'object' && value !== null ? (value.val ? value.val.toString() : JSON.stringify(value)) : value

      setFormData((prevData) => ({
         ...prevData, // 기존 데이터 유지
         [name]: processedValue, // 변경된 값 업데이트
      }))
   }
   //    const handleChange = (e) => {
   //       const { name, value } = e.target

   //       const processedValue = typeof value === 'object' && value !== null ? (value.val ? value.val.toString() : JSON.stringify(value)) : value

   //       setFormData((prevData) => ({
   //          ...prevData, // 기존 데이터 유지
   //          [name]: processedValue, // 변경된 값 업데이트
   //       }))
   //    }

   const handleSubmit = async (e) => {
      e.preventDefault()
      setError('')

      if (!formData.category) {
         setError('문의 유형을 선택해주세요')
         return
      }

      if (!formData.title) {
         setError('문의 제목을 입력해주세요')
         return
      }

      if (!formData.content) {
         setError('문의 내용을 입력해주세요')
         return
      }

      try {
         const cleanedData = {
            type: 'qna',
            postData: {
               title: String(formData.title),
               content: String(formData.content),
               category: String(formData.category),
               isPrivate: formData.isPrivate,
            },
         }

         const result = await dispatch(createPostThunk(cleanedData)).unwrap()

         setSuccessMessage('문의가 성공적으로 등록되었습니다.')

         setTimeout(() => {
            navigate('/support')
         }, 3000)
      } catch (error) {}
   }

   return (
      <PostContainer>
         <PageTitle variant="h4" component="h1" align="center" gutterBottom>
            1:1 문의하기
         </PageTitle>

         <PostForm component="form" onSubmit={handleSubmit}>
            {error && (
               <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
               </Alert>
            )}
            {successMessage && (
               <Alert severity="success" sx={{ mb: 3 }}>
                  {successMessage}
               </Alert>
            )}

            <FormField>
               <Dropdown label="문의 선택" options={options} name="category" onChange={handleChange} value={formData.category} disabled={options.length === 0} />
            </FormField>

            <FormField>
               <TextField id="title" name="title" label="제목" value={formData.title} onChange={handleChange} fullWidth placeholder="문의 제목을 작성해주세요" />
            </FormField>

            <FormField>
               <TextField id="content" name="content" label="문의 내용을 작성해주세요" multiline rows={10} value={formData.content} onChange={handleChange} fullWidth placeholder="템플릿에 대한 솔직한 리뷰를 작성해주세요." />
            </FormField>

            <FormField>
               <FormControlLabel control={<Checkbox name="isPrivate" checked={formData.isPrivate} onChange={handleChange} />} label="비공개로 등록" />
            </FormField>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
               <CancelButton onClick={() => navigate('/support')}>취소</CancelButton>
               <SubmitButton type="submit">질문 등록</SubmitButton>
            </Box>
         </PostForm>
      </PostContainer>
   )
}

export default QnaPostPage
