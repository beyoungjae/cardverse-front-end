import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Typography, Box, Button, Modal, IconButton, CircularProgress, MenuItem, TextField, Select, Snackbar, Alert } from '@mui/material'
import ReactPlayer from 'react-player'
import { styled as muiStyled, keyframes } from '@mui/material/styles'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import CloseIcon from '@mui/icons-material/Close'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { fetchTemplateDetail, updateTemplate, deleteTemplate} from '../../features/templateSlice'
import { checkTemplatePurchased } from '../../features/purchaseSlice'

// 애니메이션 keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

// 뒤로가기 버튼 컨테이너
const BackButtonContainer = muiStyled(Box)(({ theme }) => ({
   padding: '2rem 0',
   borderBottom: `1px solid ${theme.palette.divider}`,
}))

// 뒤로가기 버튼 스타일
const BackButton = muiStyled('div')(({ theme }) => ({
   display: 'inline-block',
   alignItems: 'center',
   gap: '0.5rem',
   color: theme.palette.text.primary,
   textDecoration: 'none',
   fontSize: '0.9rem',
   transition: 'color 0.3s ease, transform 0.3s ease',
   cursor: 'pointer',
   '&:hover': {
      color: theme.palette.text.secondary,
      transform: 'translateX(-3px)',
   },
}))

// 전체 컨테이너 스타일
const PageContainer = muiStyled(Container)(({ theme }) => ({
   maxWidth: '800px',
   margin: '0 auto',
   padding: '2rem 1rem',
}))

// 메인 이미지 스타일
const MainImageContainer = muiStyled(Box)(({ theme }) => ({
   textAlign: 'center',
   marginBottom: '2rem',
   '& img': {
      maxWidth: '500px',
      transition: 'transform 0.3s ease-in-out',
      [theme.breakpoints.down('md')]: {
         maxWidth: '350px',
      },
      [theme.breakpoints.down('sm')]: {
         maxWidth: '260px',
      },
      height: 'auto',
   },
   '& img:hover': {
      transform: 'scale(1.02)',
   },
}))

// 가격 섹션 스타일
const PriceSection = muiStyled(Box)(({ theme }) => ({
   textAlign: 'center',
   marginBottom: '10rem',
   '& .price-text': {
      fontSize: '1.2rem',
      fontWeight: 500,
      marginBottom: '2rem',
   },
   '& .title-text': {
      fontSize: '1.2rem',
      fontWeight: 500,
      marginBottom: '2rem',
   },
}))

// 버튼 그룹 스타일
const ButtonGroup = muiStyled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   gap: '0.5rem',
   marginBottom: '3rem',
}))

// 구매 전 체험 버튼
const BeforePurchasingButton = muiStyled('div')(({ theme }) => ({
   marginBottom: '2rem',
   '& .button': {
      padding: '1em 2em',
      border: 'none',
      borderRadius: '5px',
      fontWeight: 'bold',
      letterSpacing: '5px',
      textTransform: 'uppercase',
      cursor: 'pointer',
      color: '#000000',
      transition: 'all 0.3s ease',
      fontSize: '15px',
      position: 'relative',
      overflow: 'hidden',
      outline: '2px solid #000000',
      '&:hover': {
         color: '#ffffff',
         transform: 'scale(1.05)',
         boxShadow: '4px 5px 17px -4px #000000',
      },
      '&::before': {
         content: '""',
         position: 'absolute',
         left: '-50px',
         top: 0,
         width: 0,
         height: '100%',
         backgroundColor: '#000000',
         transform: 'skewX(180deg)',
         zIndex: -1,
         transition: 'width 0.3s ease',
      },
      '&:hover::before': {
         width: '250%',
      },
      '&:active': {
         transform: 'scale(0.98)',
         backgroundColor: '#000000',
         transition: 'all 0.1s ease',
      },
   },
}))

// 버튼 스타일 컴포넌트들
const ButtonStyles = {
   buyButton: {
      backgroundColor: '#000000',
      color: '#ffffff',
      padding: '15px 40px',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      '&:hover': {
         backgroundColor: '#333333',
      },
   },
   previewButton: {
      backgroundColor: '#ffffff',
      color: '#000000',
      padding: '15px 40px',
      border: '1px solid #000000',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      '&:hover': {
         backgroundColor: '#f5f5f5',
      },
   },
   tryButton: {
      width: '100%',
      padding: '15px',
      backgroundColor: '#f0f0f0',
      color: '#000000',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      '&:hover': {
         backgroundColor: '#e0e0e0',
      },
   },
}

// 버튼 컴포넌트들
const ActionButton = muiStyled('button')(({ variant = 'buy' }) => ({
   ...(variant === 'buy' ? ButtonStyles.buyButton : variant === 'preview' ? ButtonStyles.previewButton : ButtonStyles.tryButton),
}))

// 구매 버튼 스타일
const BuyButton = muiStyled(Button)(({ theme }) => ({
   padding: '0.5rem 2rem',
   borderRadius: '8px',
   backgroundColor: '#B699BB',
   color: 'white',
   transition: 'background-color 0.3s ease',
   '&:hover': {
      backgroundColor: '#D8B6DD',
   },
}))

// 미리보기 버튼 스타일
const PreviewButton = muiStyled(Button)(({ theme }) => ({
   padding: '0.5rem 2rem',
   borderRadius: '8px',
   backgroundColor: '#dddddd',
   color: '#000000',
   transition: 'background-color 0.3s ease',
   '&:hover': {
      backgroundColor: '#eeeeee',
   },
}))

// 상세 정보 섹션 스타일
const DetailSection = muiStyled(Box)(({ theme }) => ({
   borderTop: `0.5px solid ${theme.palette.divider}`,
   '& .detail-title': {
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.text.disabled,
      textAlign: 'center',
      margin: '5rem 0',
      fontSize: '1.2rem',
      letterSpacing: '1em',
      [theme.breakpoints.down('md')]: {
         fontSize: '1rem',
      },
      [theme.breakpoints.down('sm')]: {
         fontSize: '0.8rem',
      },
   },
   '& .detail-images': {
      position: 'relative',
      width: '320px',
      height: '640px',
      margin: '0 auto',
      [theme.breakpoints.down('md')]: {
         width: '250px',
         height: '500px',
      },
      [theme.breakpoints.down('sm')]: {
         width: '200px',
         height: '400px',
      },
      '& .iphone-mockup': {
         width: '100%',
         height: '100%',
         position: 'relative',
         zIndex: 2,
         objectFit: 'contain',
      },
      '& .screen-content': {
         position: 'absolute',
         top: '2.5%',
         left: '4%',
         width: '92%',
         height: '95%',
         overflow: 'hidden',
         borderRadius: '40px',
         '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            opacity: 0,
            transform: 'scale(1.2)',
            transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
            position: 'absolute',
            top: 0,
            left: 0,
            '&.active': {
               opacity: 1,
               transform: 'scale(1)',
            },
         },
      },
   },
}))

// 상세 정보 섹션 타이틀 스타일
const DetailSectionTitle = muiStyled('div')(({ theme }) => ({
   ...theme.typography.h2,
   textAlign: 'center',
   margin: '10rem 0',
   [theme.breakpoints.down('md')]: {
      fontSize: '1.4rem',
   },
   [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem',
   },
}))

// 비디오 섹션 스타일
const VideoSection = muiStyled(Box)(({ theme }) => ({
   position: 'relative',
   width: '100%',
   backgroundColor: '#f5f5f5',
   borderRadius: '10px',
   padding: '2rem',
   marginBottom: '3rem',
   '& .video-container': {
      position: 'relative',
      paddingTop: '56.25%', // 16:9 비율
      width: '100%',
      height: 0,
      overflow: 'hidden',
      borderRadius: '8px',
   },
   '& .react-player': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
   },
}))

// 비디오 섹션 서브 코멘트 스타일
const VideoSectionSubComment = muiStyled('div')(({ theme }) => ({
   ...theme.typography.body2,
   textAlign: 'right',
   color: '#B699BB',
   marginBottom: '10rem',
   [theme.breakpoints.down('md')]: {
      fontSize: '0.7rem',
   },
   [theme.breakpoints.down('sm')]: {
      fontSize: '0.5rem',
   },
}))

// QR 코드 섹션 타이틀 스타일
const QRSectionTitle = muiStyled('div')(({ theme }) => ({
   ...theme.typography.h3,
   textAlign: 'center',
   margin: '10rem 0',
   [theme.breakpoints.down('md')]: {
      fontSize: '1.3rem',
   },
   [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
   },
}))

// QR 코드 섹션 스타일
const QRSection = muiStyled(Box)(({ theme }) => ({
   textAlign: 'center',
   marginBottom: '10rem',
   '& .qr-code-images': {
      position: 'relative',
      width: '200px',
      height: 'auto',
      margin: '0 auto',
      [theme.breakpoints.down('md')]: {
         width: '150px',
      },
      [theme.breakpoints.down('sm')]: {
         width: '100px',
      },
      '& .iphone-mockup': {
         width: '100%',
         height: '100%',
         position: 'relative',
         zIndex: 2,
         objectFit: 'contain',
      },
      '& .qr-code': {
         position: 'absolute',
         top: '2.5%',
         left: '4%',
         width: '92%',
         height: '95%',
         objectFit: 'contain',
         borderRadius: '40px',
         zIndex: 1,
      },
   },
}))

// 모달 스타일
const PreviewModal = muiStyled(Modal)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   '& .modal-content': {
      position: 'relative',
      width: '100%',
      maxWidth: '800px',
      maxHeight: '90vh',
      margin: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      outline: 'none',
      animation: `${fadeIn} 0.5s ease-out`,
   },
   '& .close-button': {
      position: 'absolute',
      right: '10px',
      top: '10px',
      zIndex: 1,
   },
   '& .slide-container': {
      position: 'relative',
      width: '100%',
      height: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   '& .slide-image': {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain',
      [theme.breakpoints.down('md')]: {
         width: '80%',
      },
      [theme.breakpoints.down('sm')]: {
         width: '65%',
      },
   },
   '& .nav-button': {
      position: 'absolute',
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      transition: 'background-color 0.3s ease',
      '&:hover': {
         backgroundColor: 'rgba(255, 255, 255, 0.2)',
      },
   },
   '& .prev-button': {
      left: '10px',
   },
   '& .next-button': {
      right: '10px',
   },
   '& .button-container': {
      marginTop: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
   },
}))

// 템플릿 수정 모달 스타일
const modalStyle = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: '400px',
   bgcolor: 'background.paper',
   border: '2px solid #000',
   boxShadow: 24,
   p: 4,
   display: 'flex',
   flexDirection: 'column',
   gap: '10px',
}

// 템플릿 수정 모달
const TemplateEditModal = ({ open, onClose, template, showNotification, templateId }) => {
   const dispatch = useDispatch()
   const { register, handleSubmit, reset } = useForm({
      defaultValues: {
         title: template.title,
         price: Number(template.price).toLocaleString('ko-KR'),
         category: template.category,
         // 이미지 파일은 input[type="file"]로 새로 선택해야 하므로 기본값은 비워둡니다.
      },
   })

   // 템플릿 데이터가 변경되면 reset 호출
   useEffect(() => {
      if (template) {
         reset({
            title: template.title,
            price: Number(template.price).toLocaleString('ko-KR'),
            category: template.category,
         })
      }
   }, [template, reset])

   const onSubmit = async (data) => {
      try {
         const formData = new FormData()
         formData.append('title', data.title)
         formData.append('price', data.price)
         formData.append('category', data.category)

         // 썸네일 새 파일 선택 시 (파일 input은 controlled되지 않으므로, onChange로 따로 처리)
         if (data.thumbnail && data.thumbnail[0]) {
            formData.append('thumbnail', data.thumbnail[0])
         }
         // 상세 이미지 새 파일 선택 시
         if (data.detailImages && data.detailImages.length > 0) {
            Array.from(data.detailImages).forEach((file) => {
               formData.append('detailImages', file)
            })
         }
         // 필요시 기존 데이터와의 병합이나 추가 필드 처리 가능

         await dispatch(updateTemplate({ templateId, templateData: formData })).unwrap()
         showNotification('템플릿이 성공적으로 수정되었습니다.')
         onClose()
      } catch (error) {
         showNotification(error.message || '템플릿 수정 중 오류가 발생했습니다.', 'error')
      }
   }

   return (
      <Modal open={open} onClose={onClose} aria-labelledby="template-edit-modal">
         <Box sx={modalStyle}>
            <IconButton onClick={onClose} sx={{ position: 'absolute', right: 10, top: 10 }}>
               <CloseIcon />
            </IconButton>
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
               템플릿 수정
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
               <TextField fullWidth label="제목" {...register('title', { required: true })} margin="normal" />
               <TextField fullWidth label="가격" {...register('price', { required: true })} margin="normal" />
               <Select fullWidth {...register('category', { required: true })} defaultValue={template.category}>
                  <MenuItem value="wedding">청첩장</MenuItem>
                  <MenuItem value="newyear">연하장</MenuItem>
                  <MenuItem value="gohyeon">고희연</MenuItem>
                  <MenuItem value="invitation">초빙장</MenuItem>
               </Select>
               <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2">썸네일 이미지</Typography>
                  <input type="file" accept="image/*" {...register('thumbnail')} />
               </Box>
               <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2">상세 이미지 (최대 3개)</Typography>
                  <input type="file" accept="image/*" multiple {...register('detailImages')} />
               </Box>
               <Button type="submit" variant="contained" sx={{ mt: 3 }}>
                  저장하기
               </Button>
            </form>
         </Box>
      </Modal>
   )
}

const TemplateDetail = () => {
   const { templateId } = useParams()
   const location = useLocation()
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const { detail: template, status, error } = useSelector((state) => state.templates)
   const { isAuthenticated, user } = useSelector((state) => state.auth)
   const { isPurchased, checkingPurchase } = useSelector((state) => state.purchase)
   const isAdmin = user?.role === 'admin'

   const [activeIndex, setActiveIndex] = useState(0)
   const [isPreviewOpen, setIsPreviewOpen] = useState(false)
   const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0)
   const [imagesLoaded, setImagesLoaded] = useState(false)

   // 모달 오픈 상태 관리
   const [isEditModalOpen, setIsEditModalOpen] = useState(false)

   // 안전하게 detailImages 배열 가져오기
   const detailImages = template?.detailImages || []

   const currentTab = location.state?.currentTab || 'wedding'

   useLayoutEffect(() => {
      // 모바일에서는 smooth, 데스크톱에서는 auto 사용
      const isMobile = window.innerWidth <= 768
      window.scrollTo({
         top: 0,
         left: 0,
         behavior: isMobile ? 'smooth' : 'auto',
      })
   }, [location.pathname])

   useEffect(() => {
      if (!template || template.id !== Number(templateId)) {
         dispatch(fetchTemplateDetail(templateId))
      }
   }, [dispatch, templateId, template])

   // 템플릿 구매 여부 확인
   useEffect(() => {
      if (isAuthenticated && templateId) {
         dispatch(checkTemplatePurchased(templateId))
      }
   }, [dispatch, isAuthenticated, templateId])

   // 이미지 로딩 상태 초기화
   useEffect(() => {
      if (template && detailImages.length > 0) {
         setImagesLoaded(false)

         // 모든 이미지 프리로드
         const loadImages = async () => {
            try {
               const promises = detailImages.map(src => {
                  return new Promise((resolve, reject) => {
                     const img = new Image()
                     img.src = src
                     img.onload = resolve
                     img.onerror = reject
                  })
               })

               await Promise.all(promises)
               setImagesLoaded(true)
            } catch (error) {
               console.error('이미지 로딩 중 오류:', error)
               // 오류가 있어도 렌더링은 시도
               setImagesLoaded(true)
            }
         }

         loadImages()
      }
   }, [template, detailImages])

   const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

   // 알림 표시 함수
   const showNotification = (message, severity = 'success') => {
      setNotification({
         open: true,
         message,
         severity
      });
   };

   // 알림 닫기 함수
   const handleCloseNotification = (event, reason) => {
      if (reason === 'clickaway') {
         return;
      }
      setNotification({ ...notification, open: false });
   };

   const handleBack = () => {
      navigate(`/template/${currentTab}`, {
         state: { currentTab },
      })
   }

   // 사용자가 수정 페이지로 이동할 때 데이터를 같이 넘겨줌
   const handleEditorOpen = () => {
      if (!isAuthenticated) {
         navigate('/login', { state: { from: location } })
         return
      }
      navigate(`/template/${currentTab}/edit/${templateId}`, { state: { templateId } })
   }

   // 어드민은 타이틀/가격/타입/썸네일 이미지/상세이미지 (최대 3개) 이거를 교체할 수 있음
   const handleAdminEditorOpen = () => {
      if (!isAuthenticated && !isAdmin) {
         navigate('/login', { state: { from: location } })
         return
      }
      setIsEditModalOpen(true)
   }

   const handleDelete = () => {
      if (!isAuthenticated && !isAdmin) {
         navigate('/login', { state: { from: location } })
         return
      }
      if (window.confirm('템플릿을 삭제하시겠습니까?')) {
         dispatch(deleteTemplate(templateId))
         navigate(`/template/${currentTab}`, {
            state: { currentTab },
         })
      } else {
         return
      }
   }
   const handlePurchase = () => {
      if (!isAuthenticated) {
         navigate('/login', { state: { from: location } })
         return
      }
      navigate(`/template/${currentTab}/purchase/${templateId}`, {
         state: { template, currentTab },
      })
   }

   useEffect(() => {
      // detailImages가 비어있거나 로딩 중이면 인터벌 설정하지 않음
      if (!detailImages.length) return

      const interval = setInterval(() => {
         setActiveIndex((prev) => (prev + 1) % detailImages.length)
      }, 3000) // 3초마다 이미지 전환

      return () => clearInterval(interval)
   }, [detailImages]) // detailImages가 변경될 때마다 인터벌 재설정

   const handlePreviewOpen = () => {
      setIsPreviewOpen(true)
      setCurrentPreviewIndex(0)
   }

   const handlePreviewClose = () => {
      setIsPreviewOpen(false)
   }

   const handlePrevImage = () => {
      setCurrentPreviewIndex((prev) => (prev === 0 ? detailImages.length - 1 : prev - 1))
   }

   const handleNextImage = () => {
      setCurrentPreviewIndex((prev) => (prev + 1) % detailImages.length)
   }

   if (status === 'loading') {
      return (
         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
         </Box>
      )
   }

   if (status === 'loading' || !template) {
      return (
         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
         </Box>
      )
   }

   if (!template) {
      return (
         <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6">템플릿을 찾을 수 없습니다.</Typography>
         </Box>
      )
   }
   return (
      <>
         <BackButtonContainer>
            <Container maxWidth="lg">
               <BackButton onClick={handleBack}>
                  <ArrowBackIosNewIcon sx={{ fontSize: '0.7rem', pointerEvents: 'auto' }} />
                  <span>Back Template</span>
               </BackButton>
            </Container>
         </BackButtonContainer>

         <PageContainer>
            <MainImageContainer>
               <img src={template.thumbnail} alt="Template Preview" />
            </MainImageContainer>

            <PriceSection>
               <BeforePurchasingButton>
                  <button className="button" onClick={handleEditorOpen}>
                     구매하기 전 잠깐 사용해보기
                  </button>
               </BeforePurchasingButton>
               <Typography className="title-text">{template.title}</Typography>
               <Typography className="price-text">Price | {Number(template.price).toLocaleString('ko-KR')}원</Typography>
               <ButtonGroup>
                  {isPurchased ? (
                     <Typography 
                        sx={{ 
                           color: 'success.main', 
                           fontWeight: 'bold', 
                           padding: '10px 20px',
                           border: '1px solid',
                           borderColor: 'success.main',
                           borderRadius: '4px'
                        }}
                     >
                        이미 구매한 템플릿입니다
                     </Typography>
                  ) : (
                     <BuyButton onClick={handlePurchase} disabled={checkingPurchase}>
                        {checkingPurchase ? '확인 중...' : '구매하기'}
                     </BuyButton>
                  )}
                  <PreviewButton onClick={handlePreviewOpen}>미리보기</PreviewButton>
               </ButtonGroup>
               {isAdmin && (
                  <ButtonGroup>
                     <Button variant="contained" onClick={handleAdminEditorOpen}>
                        템플릿 수정하기
                     </Button>
                     <Button variant="contained" onClick={handleDelete}>
                        템플릿 삭제하기
                     </Button>
                  </ButtonGroup>
               )}
            </PriceSection>

            <DetailSection>
               <Typography className="detail-title">TEMPLATE DETAILS</Typography>
               <Box className="detail-images">
                  <img src="/images/iphone-mockup.png" alt="iPhone mockup" className="iphone-mockup" />
                  <Box className="screen-content">
                     {status === 'loading' ? (
                        <CircularProgress size={40} />
                     ) : detailImages.length > 0 ? (
                        detailImages.map((image, index) => (
                           <img 
                              key={`detail-image-${index}`} 
                              src={image} 
                              alt={`Detail ${index + 1}`} 
                              className={activeIndex === index ? 'active' : ''}
                              onError={(e) => {
                                 console.error(`이미지 로드 실패: ${image}`)
                                 e.target.src = '/images/placeholder.png' // 대체 이미지
                              }}
                           />
                        ))
                     ) : (
                        <Typography>이미지를 불러올 수 없습니다.</Typography>
                     )}
                  </Box>
               </Box>
            </DetailSection>

            <DetailSectionTitle>클릭 몇 번으로 나만의 감성을 담은 초대장을 완성하세요.</DetailSectionTitle>

            <VideoSection>
               <div className="video-container">
                  <ReactPlayer
                     url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                     className="react-player"
                     controls
                     width="100%"
                     height="100%"
                  />
               </div>
            </VideoSection>
            <VideoSectionSubComment>
               템플릿의 다채로운 기능과 세련된 디자인을 영상으로 확인하세요. <br />본 영상은 예시이며, 실제 템플릿은 자유롭게 편집 가능합니다.
            </VideoSectionSubComment>

            <QRSectionTitle>디지털 초대장으로 손쉽고 세련되게, 소중한 순간을 공유하세요.</QRSectionTitle>
            <QRSection>
               <Box className="qr-code-images">
                  <img src="/images/iphone-mockup.png" alt="iPhone mockup" className="iphone-mockup" />
                  <img src="/images/qrcodeEX.png" alt="QR Code" className="qr-code" />
               </Box>
            </QRSection>
         </PageContainer>

         {/* 미리보기 모달 */}
         <PreviewModal open={isPreviewOpen} onClose={handlePreviewClose} aria-labelledby="preview-modal">
            <div className="modal-content">
               <IconButton className="close-button" onClick={handlePreviewClose}>
                  <CloseIcon />
               </IconButton>
               <div className="slide-container">
                  <IconButton className="nav-button prev-button" onClick={handlePrevImage}>
                     <NavigateBeforeIcon />
                  </IconButton>
                  {detailImages.length > 0 ? (
                     <img 
                        src={detailImages[currentPreviewIndex]} 
                        alt={`Preview ${currentPreviewIndex + 1}`} 
                        className="slide-image"
                        onError={(e) => {
                           console.error(`미리보기 이미지 로드 실패: ${detailImages[currentPreviewIndex]}`)
                           e.target.src = '/images/placeholder.png' // 대체 이미지
                        }}
                     />
                  ) : (
                     <Typography>이미지를 불러올 수 없습니다.</Typography>
                  )}
                  <IconButton className="nav-button next-button" onClick={handleNextImage}>
                     <NavigateNextIcon />
                  </IconButton>
               </div>
               <div className="button-container">
                  <ActionButton variant="try" onClick={handleEditorOpen}>
                     구매하기 전 잠깐 사용해보기
                  </ActionButton>
                  <ActionButton variant="buy" onClick={handlePurchase}>
                     구매하기
                  </ActionButton>
               </div>
            </div>
         </PreviewModal>

         {/* 템플릿 수정 모달 */}
         {isEditModalOpen && template && (
            <TemplateEditModal
               open={isEditModalOpen}
               onClose={() => setIsEditModalOpen(false)}
               template={template}
               templateId={templateId}
               showNotification={showNotification}
            />
         )}

         {/* 알림 스낵바 */}
         <Snackbar 
            open={notification.open} 
            autoHideDuration={6000} 
            onClose={handleCloseNotification}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
         >
            <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
               {notification.message}
            </Alert>
         </Snackbar>
      </>
   )
}

export default TemplateDetail
