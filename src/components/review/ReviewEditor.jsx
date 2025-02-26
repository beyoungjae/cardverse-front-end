import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, TextField, Rating, Button, Paper, FormControl, Select, MenuItem, InputLabel } from '@mui/material'
import { motion } from 'framer-motion'

// 리뷰 에디터 컨테이너
const EditorContainer = styled(Box)(({ theme }) => ({
   padding: '120px 40px',
   backgroundColor: theme.palette.background.default,
   minHeight: '100vh',
   [theme.bps.md]: {
      padding: '80px 24px',
   },
   [theme.bps.sm]: {
      padding: '60px 16px',
   },
}))

// 리뷰 폼 컨테이너
const ReviewForm = styled(Paper)(({ theme }) => ({
   maxWidth: '800px',
   margin: '0 auto',
   padding: '40px',
   borderRadius: theme.shape.borderRadius,
   boxShadow: theme.shadows[1],
   [theme.bps.sm]: {
      padding: '24px',
   },
}))

// 폼 섹션
const FormSection = styled(Box)(({ theme }) => ({
   marginBottom: '32px',
   '&:last-child': {
      marginBottom: 0,
   },
}))

// 버튼 컨테이너
const ButtonContainer = styled(Box)(({ theme }) => ({
   display: 'flex',
   gap: '16px',
   justifyContent: 'flex-end',
   marginTop: '40px',
}))

// 애니메이션 설정
const formVariants = {
   initial: { opacity: 0, y: 20 },
   animate: { opacity: 1, y: 0 },
   exit: { opacity: 0, y: -20 },
}

// 구매 내역 조회 로직 백엔드 연동 후 구현 (구매하지 않았을 시 리뷰 작성 불가)

// 리뷰 작성은 1회만 가능하도록 제한 설정 (구매 내역 조회 후 리뷰 작성 가능)

const ReviewEditor = () => {
   const navigate = useNavigate()
   const [isLoggedIn, setIsLoggedIn] = useState(false) // 실제로는 Redux나 Context에서 관리
   const [formData, setFormData] = useState({
      rating: 0,
      templateType: '',
      title: '',
      content: '',
   })

   // 로그인 체크 (실제로는 Redux나 Context에서 상태 확인)
   //    useEffect(() => {
   //       // 임시 로그인 체크 로직
   //       const checkLoginStatus = () => {
   //          const isUserLoggedIn = false // 실제로는 토큰이나 세션 체크
   //          setIsLoggedIn(isUserLoggedIn)

   //          if (!isUserLoggedIn) {
   //             navigate('/login', { state: { from: '/review/write' } })
   //          }
   //       }

   //       checkLoginStatus()
   //    }, [navigate])

   const handleChange = (e) => {
      const { name, value } = e.target
      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }))
   }

   const handleRatingChange = (value) => {
      setFormData((prev) => ({
         ...prev,
         rating: value,
      }))
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      // 백엔드 연동 시 구현
      console.log('Form submitted:', formData)
      navigate('/review')
   }

   const handleCancel = () => {
      navigate('/review')
   }

   //    if (!isLoggedIn) return null

   return (
      <EditorContainer>
         <motion.div variants={formVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}>
            <ReviewForm component="form" onSubmit={handleSubmit}>
               <Typography variant="h2" gutterBottom>
                  리뷰 작성
               </Typography>

               <FormSection>
                  <Typography variant="subtitle1" gutterBottom>
                     전체 평점
                  </Typography>
                  <Rating name="rating" value={formData.rating} onChange={(_, value) => handleRatingChange(value)} size="large" />
               </FormSection>

               <FormSection>
                  <FormControl fullWidth>
                     <InputLabel>템플릿 종류</InputLabel>
                     <Select name="templateType" value={formData.templateType} onChange={handleChange} label="템플릿 종류">
                        {/* 템플릿 종류는 본인이 구매한 종류만 나타나지게 설정되도록 구현 예정 */}
                        <MenuItem value="wedding">클래식 청첩장</MenuItem>
                        <MenuItem value="birthday">클래식 연하장</MenuItem>
                        <MenuItem value="anniversary">클래식 고희연</MenuItem>
                        <MenuItem value="newyear">클래식 초빙장</MenuItem>
                     </Select>
                  </FormControl>
               </FormSection>

               <FormSection>
                  <TextField fullWidth label="리뷰 내용" name="content" value={formData.content} onChange={handleChange} multiline rows={6} variant="outlined" />
               </FormSection>

               <ButtonContainer>
                  <Button variant="outlined" onClick={handleCancel} sx={{ minWidth: '120px' }}>
                     취소
                  </Button>
                  <Button type="submit" variant="contained" sx={{ minWidth: '120px' }}>
                     작성완료
                  </Button>
               </ButtonContainer>
            </ReviewForm>
         </motion.div>
      </EditorContainer>
   )
}

export default ReviewEditor
