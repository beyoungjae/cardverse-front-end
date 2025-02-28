import React, { useState, useEffect } from 'react'
import { Box, Container, Typography, Button, Stepper, Step, StepLabel, Paper, Divider, TextField, FormControl, RadioGroup, FormControlLabel, Radio, CircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PaymentIcon from '@mui/icons-material/Payment'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CreditCard from '@mui/icons-material/CreditCard'
import AccountBalance from '@mui/icons-material/AccountBalance'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTemplateDetail } from '../../../features/templateSlice'
import { processPurchaseTemplate, resetPurchaseStatus } from '../../../features/purchaseSlice'

// 컨테이너 스타일링
const PurchaseContainer = styled(Container)(({ theme }) => ({
   maxWidth: '1200px',
   padding: theme.spacing(4),
   [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2),
   },
}))

// 상품 미리보기 스타일링
const ProductPreview = styled(motion.div)(({ theme }) => ({
   display: 'flex',
   gap: theme.spacing(4),
   marginBottom: theme.spacing(6),
   [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      gap: theme.spacing(2),
   },
}))

// 이미지 섹션 스타일링
const ImageSection = styled(Box)(({ theme }) => ({
   flex: '0 0 50%',
   position: 'relative',
   borderRadius: '16px',
   overflow: 'hidden',
   boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
   '&::before': {
      content: '""',
      display: 'block',
      paddingTop: '140%',
   },
   '& img': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.3s ease',
   },
   '&:hover img': {
      transform: 'scale(1.05)',
   },
}))

// 상품 정보 스타일링
const ProductInfo = styled(Box)(({ theme }) => ({
   flex: 1,
   display: 'flex',
   flexDirection: 'column',
   gap: theme.spacing(2),
}))

// 가격 태그 스타일링
const PriceTag = styled(Typography)(({ theme }) => ({
   fontSize: '2rem',
   fontWeight: 600,
   color: theme.palette.primary.main,
   marginBottom: theme.spacing(2),
}))

// 스텝 스타일링
const StyledStepper = styled(Stepper)(({ theme }) => ({
   marginBottom: theme.spacing(4),
   '& .MuiStepLabel-root': {
      [theme.breakpoints.down('sm')]: {
         flexDirection: 'column',
         '& .MuiStepLabel-labelContainer': {
            marginTop: theme.spacing(1),
         },
      },
   },
}))

// 결제 섹션 스타일링
const PaymentSection = styled(Paper)(({ theme }) => ({
   padding: theme.spacing(4),
   borderRadius: theme.spacing(2),
   marginTop: theme.spacing(4),
   boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
   '& .section-title': {
      fontSize: '1.2rem',
      fontWeight: 500,
      marginBottom: theme.spacing(2),
   },
}))

// 결제 버튼 스타일링
const PurchaseButton = styled(Button)(({ theme }) => ({
   height: '48px',
   fontSize: '1rem',
   fontWeight: 600,
   borderRadius: '8px',
   boxShadow: 'none',
   '&:hover': {
      backgroundColor: theme.palette.primary.light,
      boxShadow: 'none',
      transition: 'background-color 0.3s ease',
      transform: 'translateY(-1px)',
      transition: 'transform 0.3s ease',
      '&:active': {
         transform: 'translateY(0px)',
         transition: 'transform 0.3s ease',
      },
   },
}))

// 쿠폰 입력 스타일링
const CouponInput = styled(Box)(({ theme }) => ({
   display: 'flex',
   gap: theme.spacing(2),
   marginBottom: theme.spacing(1),
   '& .MuiButton-root': {
      minWidth: '100px',
      height: '40px',
      background: theme.palette.primary.main,
      color: 'white',
      '&:hover': {
         background: theme.palette.primary.dark,
      },
   },
}))

// 가격 분해 스타일링
const PriceBreakdown = styled(Box)(({ theme }) => ({
   backgroundColor: theme.palette.grey[50],
   padding: theme.spacing(2),
   borderRadius: theme.spacing(1),
   marginTop: theme.spacing(3),
   '& .MuiTypography-root': {
      marginBottom: theme.spacing(1),
   },
}))

// 모의 쿠폰 목록
const MOCK_COUPONS = {
   WELCOME2024: { discount: 0.1, name: '신규 가입 할인' }, // 10% 할인
   CARDVERSE: { discount: 0.15, name: '특별 할인' }, // 15% 할인
   FIRST2024: { discount: 0.2, name: '첫 구매 할인' }, // 20% 할인
   QUDWOWKDWKDAOS: { discount: 1, name: '100% 할인' }, // 100% 할인
}

const steps = ['상품 확인', '결제 정보', '결제 완료']

const PurchaseTemplate = () => {
   // 상태 관리
   const [currentStep, setCurrentStep] = useState(0)
   const [paymentInfo, setPaymentInfo] = useState({
      cardNumber: '',
      expiry: '',
      cvv: '',
      name: '',
   })
   const [couponCode, setCouponCode] = useState('')
   const [paymentMethod, setPaymentMethod] = useState('card')
   const [isProcessing, setIsProcessing] = useState(false)
   const [appliedCoupon, setAppliedCoupon] = useState(null)
   const [couponError, setCouponError] = useState('')
   const [currentTemplate, setCurrentTemplate] = useState(null)

   // 계산 함수들을 먼저 정의
   const calculateDiscount = () => {
      if (!appliedCoupon) return 0
      const price = parseInt(currentTemplate?.price?.replace(/,/g, ''))
      return Math.floor(price * appliedCoupon.discount)
   }

   const calculateTotal = () => {
      const price = parseInt(currentTemplate?.price?.replace(/,/g, ''))
      const discount = calculateDiscount()
      return price - discount
   }

   // 나머지 상태 및 훅들
   const { user } = useSelector((state) => state.auth)
   const { detail: template, status } = useSelector((state) => state.templates)
   const { templateId } = useParams()
   const navigate = useNavigate()
   const location = useLocation()
   const dispatch = useDispatch()
   const { status: purchaseStatus, error: purchaseError } = useSelector((state) => state.purchase)

   useEffect(() => {
      if (templateId) {
         dispatch(fetchTemplateDetail(templateId))
      }
   }, [dispatch, templateId])

   useEffect(() => {
      if (template) {
         setCurrentTemplate(template)
      } else if (location.state?.templateData) {
         setCurrentTemplate(location.state.templateData)
      }
   }, [template, location.state])

   useEffect(() => {
      if (calculateTotal() === 0) {
         setPaymentMethod('free')
      }
   }, [appliedCoupon])

   useEffect(() => {
      return () => {
         dispatch(resetPurchaseStatus())
      }
   }, [dispatch])

   useEffect(() => {
      if (purchaseStatus === 'succeeded') {
         setCurrentStep(2)
         setIsProcessing(false)
      } else if (purchaseStatus === 'failed') {
         alert(purchaseError || '결제 처리 중 오류가 발생했습니다.')
         setIsProcessing(false)
      }
   }, [purchaseStatus, purchaseError])

   if (status === 'loading') {
      return (
         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
         </Box>
      )
   }

   if (!currentTemplate && status !== 'loading') {
      return (
         <Box sx={{ textAlign: 'center', p: 3 }}>
            <Typography variant="h6" color="error">
               템플릿 정보를 찾을 수 없습니다.
            </Typography>
         </Box>
      )
   }

   // 카드 번호 포맷팅
   const formatCardNumber = (value) => {
      const numbers = value.replace(/[^\d]/g, '')
      const groups = numbers.match(/.{1,4}/g)
      return groups ? groups.join('-').substr(0, 19) : numbers
   }

   // 유효기간 포맷팅 함수
   const formatExpiry = (value) => {
      const numbers = value.replace(/[^\d]/g, '')
      if (numbers.length >= 2) {
         return `${numbers.substr(0, 2)}/${numbers.substr(2, 2)}`
      }
      return numbers
   }

   // 입력 핸들러 수정
   const handlePaymentInfoChange = (field) => (event) => {
      let value = event.target.value

      switch (field) {
         case 'cardNumber':
            value = formatCardNumber(value)
            break
         case 'expiry':
            value = formatExpiry(value)
            break
         case 'cvv':
            value = value.replace(/[^\d]/g, '').substr(0, 3)
            break
         default:
            break
      }

      setPaymentInfo((prev) => ({
         ...prev,
         [field]: value,
      }))
   }

   // 결제 처리 함수
   const handleNext = async () => {
      if (!user || !user.id) {
         alert('로그인이 필요한 서비스입니다.')
         navigate('/login', {
            state: {
               from: location.pathname,
               templateId: template.id,
            },
         })
         return
      }

      if (currentStep === 1) {
         setIsProcessing(true)
         try {
            const purchaseData = {
               templateId: template.id,
               paymentInfo: {
                  method: paymentMethod,
                  ...paymentInfo,
               },
               totalAmount: calculateTotal(),
            }

            console.log('결제 요청 데이터:', purchaseData)
            dispatch(processPurchaseTemplate(purchaseData))
         } catch (error) {
            if (error.response?.status === 401) {
               alert('로그인이 만료되었습니다. 다시 로그인해주세요.')
               navigate('/login', {
                  state: {
                     from: location.pathname,
                     templateId: template.id,
                  },
               })
            }
         }
      } else {
         setCurrentStep((prev) => prev + 1)
      }
   }

   // 쿠폰 적용 함수
   const handleApplyCoupon = () => {
      setCouponError('')
      if (!couponCode.trim()) {
         setCouponError('쿠폰 코드를 입력해주세요.')
         return
      }

      // 모의 쿠폰 처리
      const coupon = MOCK_COUPONS[couponCode.toUpperCase()]
      if (coupon) {
         setAppliedCoupon(coupon)
         setCouponError('')
      } else {
         setCouponError('유효하지 않은 쿠폰 코드입니다.')
      }
   }

   // 결제 버튼 렌더링
   const renderPaymentButton = () => {
      const isLoading = purchaseStatus === 'loading'

      if (calculateTotal() === 0) {
         return (
            <PurchaseButton fullWidth variant="contained" onClick={handleNext} disabled={isLoading} sx={{ mt: 3 }}>
               무료 결제하기
            </PurchaseButton>
         )
      }
      return (
         <PurchaseButton fullWidth variant="contained" startIcon={isLoading ? <CircularProgress size={24} color="inherit" /> : <PaymentIcon />} onClick={handleNext} disabled={isLoading} sx={{ mt: 3 }}>
            {isLoading ? '결제 처리 중...' : '결제하기'}
         </PurchaseButton>
      )
   }

   // 애니메이션 variants
   const pageVariants = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
   }

   return (
      <PurchaseContainer>
         <StyledStepper activeStep={currentStep} alternativeLabel>
            {steps.map((label) => (
               <Step key={label}>
                  <StepLabel>{label}</StepLabel>
               </Step>
            ))}
         </StyledStepper>

         <AnimatePresence mode="wait">
            {currentStep === 0 && template && (
               <ProductPreview key="product" initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={{ duration: 0.5 }}>
                  <ImageSection>
                     <img src={template?.thumbnail} alt="Template Preview" />
                  </ImageSection>

                  <ProductInfo>
                     <Typography variant="h4" gutterBottom>
                        {template.title}
                     </Typography>
                     <Typography variant="body1" color="text.secondary" paragraph>
                        {template.description}
                     </Typography>
                     <PriceTag>₩{Number(template.price)?.toLocaleString() || '0'}</PriceTag>

                     <Box sx={{ mt: 'auto' }}>
                        <PurchaseButton fullWidth variant="contained" startIcon={<ShoppingCartIcon />} onClick={handleNext}>
                           구매하기
                        </PurchaseButton>
                     </Box>
                  </ProductInfo>
               </ProductPreview>
            )}

            {currentStep === 1 && (
               <PaymentSection component={motion.div} key="payment" initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={{ duration: 0.5 }}>
                  <Typography variant="h6" gutterBottom>
                     쿠폰
                  </Typography>
                  <CouponInput>
                     <TextField
                        fullWidth
                        size="small"
                        placeholder="쿠폰 코드를 입력하세요"
                        value={couponCode}
                        onChange={(e) => {
                           setCouponCode(e.target.value)
                           setCouponError('')
                        }}
                        error={!!couponError}
                        helperText={couponError}
                     />
                     <Button variant="contained" onClick={handleApplyCoupon} disabled={!!appliedCoupon}>
                        적용
                     </Button>
                  </CouponInput>
                  {appliedCoupon && (
                     <Box
                        sx={{
                           mt: 1,
                           mb: 2,
                           p: 1.5,
                           bgcolor: 'success.light',
                           borderRadius: 1,
                           color: 'success.dark',
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'space-between',
                        }}
                     >
                        <Typography variant="body2">
                           {appliedCoupon.name} ({appliedCoupon.discount * 100}% 할인)
                        </Typography>
                        <Button
                           size="small"
                           onClick={() => {
                              setAppliedCoupon(null)
                              setCouponCode('')
                           }}
                           sx={{ color: 'success.dark' }}
                        >
                           취소
                        </Button>
                     </Box>
                  )}

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="h6" gutterBottom>
                     결제 수단 선택
                  </Typography>
                  <FormControl component="fieldset">
                     <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                        <FormControlLabel
                           value="card"
                           control={<Radio />}
                           label={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                 <CreditCard />
                                 <span>신용/체크카드 (현재 모의결제 중)</span>
                              </Box>
                           }
                        />
                        <FormControlLabel
                           value="transfer"
                           control={<Radio />}
                           label={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                 <AccountBalance />
                                 <span>후원하기</span>
                              </Box>
                           }
                        />
                     </RadioGroup>
                  </FormControl>

                  {paymentMethod === 'card' && (
                     <Box sx={{ mt: 3 }}>
                        <Typography className="section-title">카드 정보 입력</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                           <TextField
                              label="카드 번호"
                              value={paymentInfo.cardNumber}
                              onChange={handlePaymentInfoChange('cardNumber')}
                              fullWidth
                              placeholder="0000-0000-0000-0000"
                              inputProps={{
                                 maxLength: 19,
                              }}
                           />
                           <form onSubmit={(e) => e.preventDefault()}>
                              <Box sx={{ display: 'flex', gap: 2 }}>
                                 <TextField
                                    label="유효기간"
                                    value={paymentInfo.expiry}
                                    onChange={handlePaymentInfoChange('expiry')}
                                    placeholder="MM/YY"
                                    fullWidth
                                    inputProps={{
                                       maxLength: 5,
                                    }}
                                 />
                                 <TextField
                                    label="CVV"
                                    value={paymentInfo.cvv}
                                    onChange={handlePaymentInfoChange('cvv')}
                                    type="password"
                                    placeholder="000"
                                    fullWidth
                                    inputProps={{
                                       maxLength: 3,
                                    }}
                                    autoComplete="off"
                                 />
                              </Box>
                           </form>
                        </Box>
                     </Box>
                  )}

                  {paymentMethod === 'transfer' && (
                     <Box sx={{ mt: 3 }}>
                        <Typography className="section-title">후원 정보</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                           아래 계좌로 후원해 주세요.
                           <br />
                           개발 팀에 후원해 주시면 감사하겠습니다.
                        </Typography>
                        <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
                           <Typography variant="body2">
                              은행명: 카카오뱅크
                              <br />
                              계좌번호: 3333067590933
                              <br />
                              예금주: 정병재
                           </Typography>
                        </Box>
                     </Box>
                  )}

                  <PriceBreakdown>
                     <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography color="text.secondary">상품 금액</Typography>
                        <Typography>₩{Number(template.price)?.toLocaleString() || '0'}</Typography>
                     </Box>
                     {appliedCoupon && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                           <Typography color="text.secondary">쿠폰 할인</Typography>
                           <Typography color="error">-₩{calculateDiscount().toLocaleString()}</Typography>
                        </Box>
                     )}
                     <Divider sx={{ my: 1 }} />
                     <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                        <Typography>총 결제 금액</Typography>
                        <Typography color="primary">₩{calculateTotal().toLocaleString()}</Typography>
                     </Box>
                  </PriceBreakdown>

                  {renderPaymentButton()}
               </PaymentSection>
            )}

            {currentStep === 2 && (
               <Box
                  component={motion.div}
                  key="complete"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={{ duration: 0.5 }}
                  sx={{
                     textAlign: 'center',
                     py: 8,
                  }}
               >
                  <CheckCircleIcon
                     sx={{
                        fontSize: 80,
                        color: 'success.main',
                        mb: 3,
                     }}
                  />
                  <Typography variant="h4" gutterBottom>
                     결제가 완료되었습니다!
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                     구매하신 템플릿은 마이페이지에서 확인하실 수 있습니다.
                  </Typography>
                  <PurchaseButton variant="contained" sx={{ mt: 4 }} onClick={() => navigate('/my')}>
                     마이페이지로 이동
                  </PurchaseButton>
               </Box>
            )}
         </AnimatePresence>
      </PurchaseContainer>
   )
}

export default PurchaseTemplate
