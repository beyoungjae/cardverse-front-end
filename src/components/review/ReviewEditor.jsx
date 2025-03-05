import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { Box, Typography, TextField, Button, Rating, CircularProgress, Alert, ClickAwayListener, Paper, Tooltip } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { createReview, fetchUserReviews } from '../../features/reviewSlice'
import { fetchTemplates } from '../../features/templateSlice'
import { fetchPurchaseHistory } from '../../features/purchaseSlice'

// 컨테이너 스타일
const WriteReviewContainer = styled(Box)(({ theme }) => ({
   padding: '120px 40px',
   backgroundColor: theme.palette.background.default,
   minHeight: '100vh',
   backgroundImage: 'linear-gradient(to bottom, #f8f9fa, #ffffff)',
   [theme.bps.md]: {
      padding: '80px 24px',
   },
   [theme.bps.sm]: {
      padding: '60px 16px',
   },
}))

// 폼 스타일
const ReviewForm = styled(Box)(({ theme }) => ({
   maxWidth: '600px',
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

// 페이지 타이틀 스타일
const PageTitle = styled(Typography)(({ theme }) => ({
   marginBottom: '40px',
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

// 평점 컨테이너 스타일
const RatingContainer = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'flex-start',
   gap: '8px',
   padding: '16px',
   backgroundColor: 'rgba(0, 0, 0, 0.02)',
   borderRadius: theme.shape.borderRadius,
   border: `1px solid ${theme.palette.divider}`,
}))

// 평점 레이블 스타일
const RatingLabel = styled(Typography)(({ theme }) => ({
   fontWeight: 600,
   marginBottom: '4px',
   color: theme.palette.text.primary,
}))

// 커스텀 드롭다운 스타일
const DropdownContainer = styled(Box)(({ theme }) => ({
   position: 'relative',
   width: '100%',
}))

const DropdownButton = styled(Button)(({ theme }) => ({
   width: '100%',
   padding: '12px 16px',
   textAlign: 'left',
   justifyContent: 'space-between',
   borderRadius: theme.shape.borderRadius,
   color: theme.palette.text.primary,
   border: `1px solid ${theme.palette.divider}`,
   boxShadow: 'none',
   opacity: 0.7,
   '&:hover': {
      borderColor: theme.palette.primary.light,
   },
}))

const DropdownList = styled(Paper)(({ theme }) => ({
   position: 'absolute',
   top: 'calc(100% + 4px)',
   left: 0,
   right: 0,
   zIndex: 10,
   maxHeight: '300px',
   overflowY: 'auto',
   borderRadius: theme.shape.borderRadius,
   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
   border: `1px solid ${theme.palette.divider}`,
}))

const DropdownItem = styled(Box)(({ theme }) => ({
   padding: '12px 16px',
   cursor: 'pointer',
   color: theme.palette.primary.main,
   fontWeight: 600,
   transition: 'all 0.2s ease',
   '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.06)',
   },
}))

const DropdownLabel = styled(Typography)(({ theme }) => ({
   fontWeight: 600,
   marginBottom: '8px',
   color: theme.palette.text.primary,
}))

// 커스텀 드롭다운 컴포넌트
const CustomDropdown = ({ label, value, onChange, options, isLoading, disabled }) => {
   const [isOpen, setIsOpen] = useState(false)
   const selectedOption = options.find((option) => option.value === value)

   const handleToggle = () => {
      if (!disabled) {
         setIsOpen((prev) => !prev)
      }
   }

   const handleSelect = (option) => {
      onChange({
         target: {
            name: 'templateId',
            value: option.value,
         },
      })
      setIsOpen(false)
   }

   return (
      <ClickAwayListener onClickAway={() => setIsOpen(false)}>
         <DropdownContainer>
            <DropdownLabel>{label}</DropdownLabel>
            <DropdownButton
               type="button"
               onClick={handleToggle}
               endIcon={
                  <KeyboardArrowDownIcon
                     sx={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                        color: isOpen ? 'primary.main' : 'text.secondary',
                     }}
                  />
               }
            >
               {isLoading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                     <CircularProgress size={20} />
                     <span>로딩 중...</span>
                  </Box>
               ) : selectedOption ? (
                  <Typography
                     component="span"
                     sx={{
                        fontWeight: 500,
                        color: 'text.primary',
                        display: 'block',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                     }}
                  >
                     {selectedOption.label}
                  </Typography>
               ) : (
                  <Typography
                     component="span"
                     sx={{
                        color: 'text.secondary',
                        fontStyle: 'italic',
                     }}
                  >
                     템플릿을 선택해주세요
                  </Typography>
               )}
            </DropdownButton>

            {isOpen && (
               <DropdownList>
                  {isLoading ? (
                     <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress size={24} />
                     </Box>
                  ) : options.length === 0 ? (
                     <Typography sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>구매한 템플릿이 없습니다. 먼저 템플릿을 구매해주세요.</Typography>
                  ) : (
                     <>
                        {options.map((option) => (
                           <DropdownItem key={option.value} onClick={() => handleSelect(option)}>
                              <Typography
                                 component="span"
                                 sx={{
                                    fontWeight: value === option.value ? 600 : 400,
                                    transition: 'all 0.2s ease',
                                 }}
                              >
                                 {option.label}
                              </Typography>
                           </DropdownItem>
                        ))}
                     </>
                  )}
               </DropdownList>
            )}
         </DropdownContainer>
      </ClickAwayListener>
   )
}

const ReviewEditor = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const [reviewData, setReviewData] = useState({
      templateId: '',
      rating: 5,
      content: '',
      templateType: '',
   })

   const [error, setError] = useState('')
   const [successMessage, setSuccessMessage] = useState('')

   const { status, userReviews = [] } = useSelector((state) => state.reviews)
   const { data: templates, status: templateStatus } = useSelector((state) => state.templates)
   const { isAuthenticated, authData, user } = useSelector((state) => state.auth)
   const { purchaseHistory, status: purchaseStatus } = useSelector((state) => state.purchase)

   // 사용자 ID 가져오기
   const userId = authData?.id || user?.id

   // 구매한 템플릿 목록 필터링
   const purchasedTemplates = templates.filter((template) => purchaseHistory.some((purchase) => purchase.template?.id === template.id))

   // 이미 리뷰를 작성한 템플릿 ID 목록
   const reviewedTemplateIds = userReviews.map((review) => review.templateId || review.Template?.id)

   useEffect(() => {
      if (!isAuthenticated) {
         navigate('/login', { state: { from: '/review/write' } })
      }

      dispatch(fetchTemplates())
      dispatch(fetchPurchaseHistory())
      dispatch(fetchUserReviews(userId))
   }, [dispatch, isAuthenticated, navigate, userId])

   const handleChange = (e) => {
      const { name, value } = e.target

      // value가 객체인 경우 처리
      const processedValue = typeof value === 'object' && value !== null ? (value.val ? value.val.toString() : JSON.stringify(value)) : value

      setReviewData({
         ...reviewData,
         [name]: processedValue,
      })

      // 템플릿 선택 시 템플릿 타입도 자동으로 설정
      if (name === 'templateId') {
         const selectedTemplate = templates.find((template) => template.id === Number(processedValue))
         if (selectedTemplate) {
            setReviewData((prev) => ({
               ...prev,
               templateType: selectedTemplate.category,
            }))
         }
      }
   }

   const handleRatingChange = (event, newValue) => {
      setReviewData({
         ...reviewData,
         rating: newValue,
      })
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      setError('')

      if (!reviewData.templateId) {
         setError('템플릿을 선택해주세요.')
         return
      }

      if (!reviewData.content) {
         setError('리뷰 내용을 입력해주세요.')
         return
      }

      // 이미 리뷰를 작성한 템플릿인지 확인
      const templateId = parseInt(reviewData.templateId, 10)
      if (reviewedTemplateIds.includes(templateId)) {
         setError('이미 이 템플릿에 대한 리뷰를 작성했습니다.')
         return
      }

      try {
         // 데이터 정리 - 객체가 아닌 원시 값만 포함하도록
         const cleanedData = {
            templateId: templateId,
            rating: parseInt(reviewData.rating, 10),
            content: String(reviewData.content),
            templateType: String(reviewData.templateType),
         }

         // 데이터 유효성 검사
         if (isNaN(cleanedData.templateId) || cleanedData.templateId <= 0) {
            setError('유효하지 않은 템플릿입니다.')
            return
         }

         if (isNaN(cleanedData.rating) || cleanedData.rating < 1 || cleanedData.rating > 5) {
            cleanedData.rating = 5 // 기본값 설정
         }

         const result = await dispatch(createReview(cleanedData)).unwrap()

         setSuccessMessage('리뷰가 성공적으로 등록되었습니다.')

         // 3초 후 리뷰 목록 페이지로 이동
         setTimeout(() => {
            navigate('/review')
         }, 3000)
      } catch (err) {
         console.error('리뷰 등록 오류:', err)
         setError(typeof err === 'string' ? err : err?.message || '리뷰 등록에 실패했습니다.')
      }
   }

   const isLoading = status === 'loading'

   return (
      <WriteReviewContainer>
         <PageTitle variant="h4" component="h1" align="center" gutterBottom sx={{ mb: 4 }}>
            리뷰 작성하기
         </PageTitle>

         <ReviewForm component="form" onSubmit={handleSubmit}>
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
               <CustomDropdown
                  label="템플릿 선택"
                  value={reviewData.templateId}
                  onChange={handleChange}
                  options={purchasedTemplates
                     .filter((template) => !reviewedTemplateIds.includes(template.id))
                     .map((template) => ({
                        value: template.id,
                        label: template.title,
                     }))}
                  isLoading={templateStatus === 'loading' || purchaseStatus === 'loading'}
                  disabled={templateStatus === 'loading' || purchaseStatus === 'loading'}
               />
            </FormField>

            <FormField>
               <RatingContainer>
                  <RatingLabel component="legend">평점</RatingLabel>
                  <Rating name="rating" value={reviewData.rating} onChange={handleRatingChange} size="large" />
               </RatingContainer>
            </FormField>

            <FormField>
               <TextField id="content" name="content" label="리뷰 내용" multiline rows={6} value={reviewData.content} onChange={handleChange} fullWidth placeholder="템플릿에 대한 솔직한 리뷰를 작성해주세요." />
            </FormField>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
               <CancelButton onClick={() => navigate('/review')}>취소</CancelButton>
               <SubmitButton type="submit" disabled={isLoading}>
                  {isLoading ? <CircularProgress size={24} /> : '리뷰 등록하기'}
               </SubmitButton>
            </Box>
         </ReviewForm>
      </WriteReviewContainer>
   )
}

export default ReviewEditor
