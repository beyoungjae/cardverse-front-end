import React, { useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem, TextField, Box, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

//내부 컨테이너
const InnerContainer = styled(Box)(({ theme }) => ({
   width: '100%',
   backgroundColor: theme.palette.background.default,
}))

//내부 텍스트 컨테이너
const TextContainer = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   gap: '16px',
}))

// 카테고리 컨트롤러
const CategoryControl = styled(FormControl)(({ theme }) => ({
   marginBottom: '16px',
   height: '54px',
   width: '561px',
   [theme.bps.md]: {
      width: '80%',
   },
   [theme.bps.sm]: {
      width: '60%',
   },
}))

// 카테고리
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
   padding: '10px 20px',
   color: theme.palette.text.primary,
   fontSize: '1rem',
   display: 'flex',
   [theme.bps.md]: {
      fontSize: '0.9rem',
   },
   [theme.bps.sm]: {
      fontSize: '0.8rem',
   },
}))

// 제목
const TitleField = styled(TextField)(({ theme }) => ({
   marginBottom: '16px',
   width: '561px',
   [theme.bps.md]: {
      width: '80%',
   },
   [theme.bps.sm]: {
      width: '60%',
   },
}))

// 내용
const ContentField = styled(TextField)(({ theme }) => ({
   marginBottom: '16px',
   width: '561px',
   [theme.bps.md]: {
      width: '80%',
   },
   [theme.bps.sm]: {
      width: '60%',
   },
}))

export const InnerText = ({ onSubmit }) => {
   const [category, setCategory] = useState('')
   const [title, setTitle] = useState('')
   const [content, setContent] = useState('')
   const [visibility, setVisibility] = useState('public')
   const [error, setError] = useState(false)

   const handleCategoryChange = (event) => {
      setCategory(event.target.value)
   }

   const handleTitleChange = (event) => {
      setTitle(event.target.value)
   }

   const handleContentChange = (event) => {
      setContent(event.target.value)
   }

   const handleVisibilityChange = (event) => {
      setVisibility(event.target.value)
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      if (!category || !title || !content) {
         setError(true)
      } else {
         setError(false)
         onSubmit({ category, title, content, visibility })
      }
   }

   return (
      <InnerContainer onSubmit={handleSubmit}>
         <TextContainer>
            <CategoryControl error={error}>
               <InputLabel>카테고리 선택하세요</InputLabel>
               <Select value={category} label="카테고리 선택하세요" onChange={handleCategoryChange}>
                  <StyledMenuItem value="login">로그인</StyledMenuItem>
                  <StyledMenuItem value="template">템플릿</StyledMenuItem>
                  <StyledMenuItem value="event">이벤트</StyledMenuItem>
                  <StyledMenuItem value="coupon">쿠폰</StyledMenuItem>
                  <StyledMenuItem value="error">오류</StyledMenuItem>
               </Select>
            </CategoryControl>

            <TitleField placeholder="제목" variant="outlined" value={title} onChange={handleTitleChange} error={error && !title} helperText={error && !title ? '제목을 입력해주세요!' : ''} />

            <ContentField placeholder="내용" variant="outlined" multiline rows={4} value={content} onChange={handleContentChange} error={error && !content} helperText={error && !content ? '내용을 입력해주세요!' : ''} />

            <Box display="flex" gap="16px">
               <RadioGroup row value={visibility} onChange={handleVisibilityChange}>
                  <FormControlLabel value="public" control={<Radio />} label="공개" />
                  <FormControlLabel value="private" control={<Radio />} label="비공개" />
               </RadioGroup>
            </Box>
            {visibility === 'private' && (
               <Typography color="error" variant="body2">
                  비공개 체크시 나와 운영자만 볼수있습니다.
               </Typography>
            )}
         </TextContainer>
      </InnerContainer>
   )
}

export default InnerText
