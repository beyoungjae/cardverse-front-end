import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { styled } from '@mui/material/styles'
import { Box, Container, Typography, Grid, Paper, Avatar, Tabs, Tab, Button, CircularProgress, Divider, Modal, TextField, IconButton, Alert, Snackbar } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchPurchaseHistory } from '../features/purchaseSlice'
import { userTemplateApi } from '../api/userTemplateApi'
import { updateProfileThunk } from '../features/authSlice'
import CloseIcon from '@mui/icons-material/Close'

// 애니메이션 변수
const fadeInUp = {
   initial: { opacity: 0, y: 60 },
   animate: { opacity: 1, y: 0 },
   exit: { opacity: 0, y: -60 },
}

const staggerContainer = {
   animate: {
      transition: {
         staggerChildren: 0.1,
      },
   },
}

// 배너 섹션
const BannerSection = styled(Box)(({ theme }) => ({
   height: '300px',
   width: '100%',
   position: 'relative',
   overflow: 'hidden',
   backgroundColor: '#0a0a0a',
   boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
   marginBottom: '10rem',
   [theme.breakpoints.down('md')]: {
      height: '250px',
   },
   [theme.breakpoints.down('sm')]: {
      height: '200px',
   },
}))

const BannerImage = styled('img')(({ theme }) => ({
   width: '100%',
   height: '100%',
   objectFit: 'cover',
   filter: 'brightness(0.7)',
}))

const BannerOverlay = styled(Box)(({ theme }) => ({
   position: 'absolute',
   top: 0,
   left: 0,
   width: '100%',
   height: '100%',
   background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.7) 100%)',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   flexDirection: 'column',
}))

const BannerTitle = styled(Typography)(({ theme }) => ({
   color: '#fff',
   fontSize: '3rem',
   fontWeight: 600,
   letterSpacing: '0.2em',
   textAlign: 'center',
   textShadow: '3px 3px 8px rgba(0,0,0,0.5)',
   [theme.breakpoints.down('md')]: {
      fontSize: '2.5rem',
   },
   [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
   },
}))

// 메인 컨테이너
const PageContainer = styled(Container)(({ theme }) => ({
   paddingTop: theme.spacing(6),
   paddingBottom: theme.spacing(8),
   position: 'relative',
   [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
   },
}))

const MainContent = styled(Box)(({ theme }) => ({
   marginTop: '-80px',
   position: 'relative',
   zIndex: 10,
   [theme.breakpoints.down('md')]: {
      marginTop: '-60px',
   },
   [theme.breakpoints.down('sm')]: {
      marginTop: '-40px',
   },
}))

// 프로필 카드
const ProfileCard = styled(Paper)(({ theme }) => ({
   padding: theme.spacing(4),
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   gap: theme.spacing(2),
   backgroundColor: 'rgba(255, 255, 255, 0.95)',
   backdropFilter: 'blur(10px)',
   borderRadius: theme.shape.borderRadius * 2,
   boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
   transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
   '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 15px 50px rgba(0, 0, 0, 0.2)',
   },
   [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3),
   },
}))

const StyledAvatar = styled(Avatar)(({ theme }) => ({
   width: theme.spacing(15),
   height: theme.spacing(15),
   marginBottom: theme.spacing(2),
   border: `4px solid ${theme.palette.primary.main}`,
   boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
   [theme.breakpoints.down('sm')]: {
      width: theme.spacing(12),
      height: theme.spacing(12),
   },
}))

const ProfileInfo = styled(Box)(({ theme }) => ({
   textAlign: 'center',
   width: '100%',
}))

const ProfileDivider = styled(Divider)(({ theme }) => ({
   width: '30%',
   margin: '16px auto',
   backgroundColor: theme.palette.primary.light,
   opacity: 0.5,
}))

// 탭 스타일
const StyledTabs = styled(Tabs)(({ theme }) => ({
   '& .MuiTabs-indicator': {
      height: '3px',
      borderRadius: '1.5px',
   },
   '& .MuiTab-root': {
      textTransform: 'none',
      fontSize: '1rem',
      fontWeight: 500,
      transition: 'all 0.2s',
      '&:hover': {
         color: theme.palette.primary.main,
         opacity: 1,
      },
      '&.Mui-selected': {
         color: theme.palette.primary.main,
         fontWeight: 600,
      },
   },
}))

const TabPanel = ({ children }) => {
   return (
      <Box sx={{ py: 3 }}>
         {children}
      </Box>
   )
}

const ContentCard = styled(Paper)(({ theme }) => ({
   padding: theme.spacing(3),
   marginBottom: theme.spacing(2),
   backgroundColor: 'rgba(255, 255, 255, 0.95)',
   backdropFilter: 'blur(10px)',
   borderRadius: theme.shape.borderRadius * 1.5,
   boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
   overflow: 'hidden',
   transition: 'all 0.3s ease',
   '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.12)',
   },
   [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
   },
}))

const ThumbnailImage = styled('img')({
   width: '100%',
   height: '180px',
   objectFit: 'cover',
   borderRadius: '12px',
   marginBottom: '1rem',
   transition: 'transform 0.5s ease',
   '&:hover': {
      transform: 'scale(1.03)',
   },
})

const ActionButton = styled(Button)(({ theme }) => ({
   borderRadius: '8px',
   textTransform: 'none',
   fontWeight: 600,
   boxShadow: 'none',
   padding: '10px 20px',
   transition: 'all 0.3s ease',
   backgroundColor: theme.palette.primary.main,
   color: theme.palette.primary.contrastText,
   '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      transform: 'translateY(-2px)',
   },
   '&:active': {
      transform: 'translateY(0)',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
   },
}))

const EmptyStateBox = styled(Box)(({ theme }) => ({
   textAlign: 'center',
   padding: theme.spacing(6, 2),
   backgroundColor: 'rgba(0, 0, 0, 0.02)',
   borderRadius: '12px',
   border: '1px dashed rgba(0, 0, 0, 0.1)',
}))

// 모달 스타일
const ModalContainer = styled(Box)(({ theme }) => ({
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: '90%',
   maxWidth: '500px',
   backgroundColor: '#fff',
   borderRadius: '16px',
   boxShadow: '0 24px 38px rgba(0, 0, 0, 0.14)',
   padding: theme.spacing(4),
   outline: 'none',
   [theme.breakpoints.down('sm')]: {
      width: '95%',
      padding: theme.spacing(3),
   },
}))

const ModalHeader = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginBottom: theme.spacing(3),
}))

const ModalTitle = styled(Typography)(({ theme }) => ({
   fontWeight: 600,
   fontSize: '1.5rem',
}))

const ModalTabPanel = ({ children, value, index }) => {
   return (
      <div role="tabpanel" hidden={value !== index} id={`modal-tabpanel-${index}`}>
         {value === index && (
            <Box sx={{ pt: 2 }}>
               {children}
            </Box>
         )}
      </div>
   )
}

const MyPage = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const user = useSelector((state) => state.auth.user)
   const { purchaseHistory, status } = useSelector((state) => state.purchase)
   const [tabValue, setTabValue] = useState(0)

   // 프로필 수정 모달 상태
   const [openModal, setOpenModal] = useState(false)
   const [modalTabValue, setModalTabValue] = useState(0)
   const [nickname, setNickname] = useState('')
   const [nicknameError, setNicknameError] = useState('')
   const [snackbar, setSnackbar] = useState({
      open: false,
      message: '',
      severity: 'success'
   })
   const updateLoading = useSelector((state) => state.auth.loading)

   // 로그인 상태 체크 및 구매 내역 로드
   useEffect(() => {
      if (!user) {
         navigate('/login')
         return
      }

      dispatch(fetchPurchaseHistory())
   }, [dispatch, navigate, user])

   // 모달 열기/닫기 핸들러
   const handleOpenModal = () => {
      if (user) {
         setNickname(user?.nick || '')
      }
      setOpenModal(true)
   }

   const handleCloseModal = () => {
      setOpenModal(false)
      setNicknameError('')
   }

   // 모달 탭 변경 핸들러
   const handleModalTabChange = (event, newValue) => {
      setModalTabValue(newValue)
   }

   // 닉네임 변경 핸들러
   const handleNicknameChange = (e) => {
      setNickname(e.target.value)
      if (e.target.value.trim() === '') {
         setNicknameError('닉네임을 입력해주세요')
      } else if (e.target.value.length < 2) {
         setNicknameError('닉네임은 최소 2자 이상이어야 합니다')
      } else if (e.target.value.length > 20) {
         setNicknameError('닉네임은 최대 20자까지 가능합니다')
      } else {
         setNicknameError('')
      }
   }

   // 프로필 업데이트 핸들러
   const handleUpdateProfile = async () => {
      if (nicknameError || nickname.trim() === '') {
         setSnackbar({
            open: true,
            message: '유효한 닉네임을 입력해주세요',
            severity: 'error'
         })
         return
      }

      try {
         await dispatch(updateProfileThunk({ nick: nickname })).unwrap()
         setSnackbar({
            open: true,
            message: '프로필이 성공적으로 업데이트되었습니다',
            severity: 'success'
         })
         handleCloseModal()
      } catch (error) {
         setSnackbar({
            open: true,
            message: error?.message || '프로필 업데이트 중 오류가 발생했습니다',
            severity: 'error'
         })
      }
   }

   // 스낵바 닫기 핸들러
   const handleCloseSnackbar = () => {
      setSnackbar({
         ...snackbar,
         open: false
      })
   }

   const handleEditProfile = () => {
      handleOpenModal()
   }

   // 탭 변경 핸들러
   const handleTabChange = (event, newValue) => {
      setTabValue(newValue)
   }

   // 에디터로 이동 핸들러
   const handleEditorClick = async (template) => {
      try {
         const templateData = await userTemplateApi.getUserTemplate(template.id)
         if (templateData) {
            navigate(`/template/${template.category}/edit/${template.id}`, {
               state: { templateData },
            })
         }
      } catch (error) {
         console.error('템플릿 데이터 로드 실패:', error)
      }
   }

   // 콘텐츠 렌더링
   const renderContent = () => {
      if (status === 'loading' || !user) {
         return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
               <CircularProgress size={50} />
            </Box>
         )
      }

      return (
         <Grid container spacing={4} component={motion.div} variants={staggerContainer} initial="initial" animate="animate">
            {/* 프로필 섹션 */}
            <Grid item xs={12} md={4} component={motion.div} variants={fadeInUp}>
               <ProfileCard>
                  <ProfileInfo>
                     <Typography variant="h5" fontWeight={600}>
                        {user?.nick || '사용자'}님 환영합니다.
                     </Typography>
                     <ProfileDivider />
                     <Typography variant="body2" color="textSecondary" gutterBottom>
                        {user?.email || ''}
                     </Typography>
                  </ProfileInfo>
                  <ActionButton variant="contained" color="primary" fullWidth onClick={handleEditProfile}>
                     프로필 수정
                  </ActionButton>
               </ProfileCard>
            </Grid>

            {/* 탭 섹션 */}
            <Grid item xs={12} md={8} component={motion.div} variants={fadeInUp}>
               <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                  <StyledTabs value={tabValue} onChange={handleTabChange} aria-label="마이페이지 탭">
                     <Tab label="구매한 템플릿" />
                     <Tab label="결제 내역" />
                     <Tab label="알림" />
                  </StyledTabs>
               </Box>

               <Box>
                  {/* 구매한 템플릿 */}
                  {tabValue === 0 && (
                     <motion.div
                        key="tab-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                     >
                        <TabPanel>
                           <Grid container spacing={3}>
                              {purchaseHistory && purchaseHistory.length > 0 ? (
                                 purchaseHistory.map((purchase, index) => (
                                    <Grid item xs={12} sm={6} key={purchase.id || `purchase-template-${purchase.templateId}-${index}`}>
                                       <ContentCard>
                                          <ThumbnailImage 
                                             src={purchase.template?.thumbnail || '/images/placeholder-image.jpg'} 
                                             alt={purchase.template?.title || '템플릿'} 
                                          />
                                          <Typography variant="h6" fontWeight={600} gutterBottom>
                                             {purchase.template?.title || '템플릿'}
                                          </Typography>
                                          <Typography variant="body2" color="textSecondary" gutterBottom>
                                             구매일: {purchase.createdAt ? new Date(purchase.createdAt).toLocaleDateString() : '날짜 정보 없음'}
                                          </Typography>
                                          <ActionButton 
                                             variant="contained" 
                                             color="primary" 
                                             fullWidth
                                             sx={{ mt: 2 }} 
                                             onClick={() => handleEditorClick(purchase.template)}
                                          >
                                             에디터로 이동
                                          </ActionButton>
                                       </ContentCard>
                                    </Grid>
                                 ))
                              ) : (
                                 <Grid item xs={12}>
                                    <EmptyStateBox>
                                       <Typography variant="h6" color="textSecondary" gutterBottom>
                                          구매한 템플릿이 없습니다
                                       </Typography>
                                       <Typography variant="body2" color="textSecondary" paragraph>
                                          다양한 템플릿을 구매하고 사용해보세요
                                       </Typography>
                                       <ActionButton 
                                          variant="contained" 
                                          color="primary"
                                          onClick={() => navigate('/template')}
                                       >
                                          템플릿 둘러보기
                                       </ActionButton>
                                    </EmptyStateBox>
                                 </Grid>
                              )}
                           </Grid>
                        </TabPanel>
                     </motion.div>
                  )}

                  {/* 결제 내역 */}
                  {tabValue === 1 && (
                     <motion.div
                        key="tab-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                     >
                        <TabPanel>
                           {purchaseHistory && purchaseHistory.length > 0 ? (
                              purchaseHistory.map((purchase, index) => (
                                 <ContentCard 
                                    key={purchase.id || `purchase-payment-${purchase.templateId}-${index}`}
                                 >
                                    <Grid container spacing={2} alignItems="center">
                                       <Grid item xs={12} sm={4}>
                                          <ThumbnailImage 
                                             src={purchase.template?.thumbnail || '/images/placeholder-image.jpg'} 
                                             alt={purchase.template?.title || '템플릿'} 
                                             style={{ height: '120px' }}
                                          />
                                       </Grid>
                                       <Grid item xs={12} sm={8}>
                                          <Typography variant="h6" fontWeight={600}>
                                             {purchase.template?.title || '템플릿'}
                                          </Typography>
                                          <Typography variant="h6" color="primary" fontWeight={600} sx={{ my: 1 }}>
                                             {Number(purchase.amount || 0).toLocaleString()}원
                                          </Typography>
                                          <Typography variant="body2" color="textSecondary">
                                             결제일: {purchase.createdAt ? new Date(purchase.createdAt).toLocaleDateString() : '날짜 정보 없음'}
                                          </Typography>
                                       </Grid>
                                    </Grid>
                                 </ContentCard>
                              ))
                           ) : (
                              <EmptyStateBox>
                                 <Typography variant="h6" color="textSecondary" gutterBottom>
                                    결제 내역이 없습니다
                                 </Typography>
                                 <Typography variant="body2" color="textSecondary">
                                    아직 구매한 템플릿이 없습니다
                                 </Typography>
                              </EmptyStateBox>
                           )}
                        </TabPanel>
                     </motion.div>
                  )}

                  {/* 알림 */}
                  {tabValue === 2 && (
                     <motion.div
                        key="tab-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                     >
                        <TabPanel>
                           {(user?.notifications || []).length > 0 ? (
                              (user?.notifications || []).map((notification, index) => (
                                 <ContentCard 
                                    key={notification?.id || `notification-${index}`}
                                 >
                                    <Typography variant="h6" fontWeight={600} gutterBottom>
                                       {notification?.title || '알림'}
                                    </Typography>
                                    <Typography variant="body1" paragraph>
                                       {notification?.content || '내용이 없습니다.'}
                                    </Typography>
                                    <Typography variant="caption" color="textSecondary">
                                       {notification?.createdAt ? new Date(notification.createdAt).toLocaleDateString() : '날짜 정보 없음'}
                                    </Typography>
                                 </ContentCard>
                              ))
                           ) : (
                              <EmptyStateBox>
                                 <Typography variant="h6" color="textSecondary" gutterBottom>
                                    알림이 없습니다
                                 </Typography>
                                 <Typography variant="body2" color="textSecondary" gutterBottom>
                                    새로운 알림이 도착하면 이곳에 표시됩니다
                                 </Typography>
                                 <ActionButton
                                    variant="contained"
                                    color="primary"
                                    onClick={() => navigate('/template')}
                                    sx={{ mt: 2 }}
                                 >
                                    템플릿 둘러보기
                                 </ActionButton>
                              </EmptyStateBox>
                           )}
                        </TabPanel>
                     </motion.div>
                  )}
               </Box>
            </Grid>
         </Grid>
      )
   }

   return (
      <>
         <BannerSection>
            <BannerImage src="/images/mypage-banner.png" alt="마이페이지 배너" />
            <BannerOverlay>
               <BannerTitle component={motion.h1} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                  My Page
               </BannerTitle>
            </BannerOverlay>
         </BannerSection>
         <PageContainer>
            <MainContent>
               {renderContent()}
            </MainContent>
         </PageContainer>

         {/* 프로필 수정 모달 */}
         <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="profile-edit-modal"
         >
            <ModalContainer>
               <ModalHeader>
                  <ModalTitle id="profile-edit-modal">프로필 설정</ModalTitle>
                  <IconButton onClick={handleCloseModal} size="small">
                     <CloseIcon />
                  </IconButton>
               </ModalHeader>

               <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={modalTabValue} onChange={handleModalTabChange} aria-label="프로필 설정 탭">
                     <Tab label="기본 정보" />
                     <Tab label="비밀번호 변경" disabled />
                     <Tab label="계정 설정" disabled />
                  </Tabs>
               </Box>

               {/* 기본 정보 탭 */}
               <ModalTabPanel value={modalTabValue} index={0}>
                  <TextField
                     fullWidth
                     label="닉네임"
                     variant="outlined"
                     value={nickname}
                     onChange={handleNicknameChange}
                     error={!!nicknameError}
                     helperText={nicknameError}
                     margin="normal"
                  />
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                     <Button
                        variant="outlined"
                        color="inherit"
                        onClick={handleCloseModal}
                        sx={{ mr: 2 }}
                     >
                        취소
                     </Button>
                     <ActionButton
                        variant="contained"
                        color="primary"
                        onClick={handleUpdateProfile}
                        disabled={updateLoading || !!nicknameError}
                     >
                        {updateLoading ? '저장 중...' : '저장'}
                     </ActionButton>
                  </Box>
               </ModalTabPanel>

               {/* 비밀번호 변경 탭 - 나중에 구현 */}
               <ModalTabPanel value={modalTabValue} index={1}>
                  <Typography>비밀번호 변경 기능은 준비 중입니다.</Typography>
               </ModalTabPanel>

               {/* 계정 설정 탭 - 나중에 구현 */}
               <ModalTabPanel value={modalTabValue} index={2}>
                  <Typography>계정 설정 기능은 준비 중입니다.</Typography>
               </ModalTabPanel>
            </ModalContainer>
         </Modal>

         {/* 알림 스낵바 */}
         <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
         >
            <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
               {snackbar.message}
            </Alert>
         </Snackbar>
      </>
   )
}

export default MyPage
