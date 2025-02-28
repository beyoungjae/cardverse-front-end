import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { styled } from '@mui/material/styles'
import { Box, Container, Typography, Grid, Paper, Avatar, Tabs, Tab, Button, CircularProgress } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchPurchaseHistory } from '../features/purchaseSlice'
import { userTemplateApi } from '../api/userTemplateApi'

// 스타일 컴포넌트
const PageContainer = styled(Container)(({ theme }) => ({
   paddingTop: theme.spacing(8),
   paddingBottom: theme.spacing(8),
   [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
   },
}))

const ProfileCard = styled(Paper)(({ theme }) => ({
   padding: theme.spacing(4),
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   gap: theme.spacing(2),
   backgroundColor: 'rgba(255, 255, 255, 0.8)',
   backdropFilter: 'blur(10px)',
   borderRadius: theme.shape.borderRadius * 2,
   boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
   transition: 'transform 0.3s ease-in-out',
   '&:hover': {
      transform: 'translateY(-5px)',
   },
   [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
   },
}))

const StyledAvatar = styled(Avatar)(({ theme }) => ({
   width: theme.spacing(15),
   height: theme.spacing(15),
   marginBottom: theme.spacing(2),
   border: `4px solid ${theme.palette.primary.main}`,
   boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
   [theme.breakpoints.down('sm')]: {
      width: theme.spacing(10),
      height: theme.spacing(10),
   },
}))

const TabPanel = styled(Box)(({ theme }) => ({
   padding: theme.spacing(3),
   [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
   },
}))

const ContentCard = styled(Paper)(({ theme }) => ({
   padding: theme.spacing(3),
   marginBottom: theme.spacing(2),
   backgroundColor: 'rgba(255, 255, 255, 0.8)',
   backdropFilter: 'blur(10px)',
   borderRadius: theme.shape.borderRadius,
   transition: 'all 0.3s ease',
   '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
   },
   [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
   },
}))

// 탭 패널 컴포넌트
const CustomTabPanel = ({ children, value, index }) => {
   return (
      <AnimatePresence mode="wait">
         {value === index && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
               <TabPanel>{children}</TabPanel>
            </motion.div>
         )}
      </AnimatePresence>
   )
}

const MyPage = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const user = useSelector((state) => state.auth.user)
   const { purchaseHistory, status } = useSelector((state) => state.purchase)
   const template = useSelector((state) => state.templates)
   const [tabValue, setTabValue] = useState(0)
   const [loadingTemplate, setLoadingTemplate] = useState(false)

   // 로그인 상태 체크 및 구매 내역 로드
   useEffect(() => {
      if (!user) {
         navigate('/', { replace: true })
         return
      }

      const loadPurchaseHistory = async () => {
         try {
            await dispatch(fetchPurchaseHistory()).unwrap()
         } catch (error) {
            if (error?.response?.status === 401) {
               navigate('/', { replace: true })
            }
            console.error('구매 내역 로드 실패:', error)
         }
      }

      loadPurchaseHistory()
   }, [user, navigate, dispatch])

   const handleTabChange = (event, newValue) => {
      setTabValue(newValue)
   }

   const handlePreviewClick = async (userTemplateId) => {
      try {
         setLoadingTemplate(true)
         const templateData = await userTemplateApi.getUserTemplate(userTemplateId)
         if (templateData) {
            navigate(`/preview/${userTemplateId}`, {
               state: { templateData },
            })
         }
      } catch (error) {
         console.error('템플릿 데이터 로드 실패:', error)
      } finally {
         setLoadingTemplate(false)
      }
   }

   const handleEditorClick = async (template) => {
      try {
         const templateData = await userTemplateApi.getUserTemplate(template.id)
         if (templateData) {
            navigate(`/template/${template.category}/editor/${template.id}`, {
               state: { templateData },
            })
         }
      } catch (error) {
         console.error('템플릿 데이터 로드 실패:', error)
      }
   }

   if (!user) return null

   // 로딩 상태 처리
   const renderContent = () => {
      if (status === 'loading') {
         return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
               <CircularProgress />
            </Box>
         )
      }

      return (
         <Grid container spacing={4}>
            {/* 프로필 섹션 */}
            <Grid item xs={12} md={4}>
               <ProfileCard component={motion.div} whileHover={{ scale: 1.02 }}>
                  <StyledAvatar src={user.profileImage} alt={user.nick}>
                     {user.nick?.charAt(0)}
                  </StyledAvatar>
                  <Typography variant="h5" gutterBottom>
                     {user.nick}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                     {user.email}
                  </Typography>
                  <Button variant="contained" color="primary" fullWidth>
                     프로필 수정
                  </Button>
               </ProfileCard>
            </Grid>

            {/* 컨텐츠 섹션 */}
            <Grid item xs={12} md={8}>
               <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                  <Tabs value={tabValue} onChange={handleTabChange} aria-label="마이페이지 탭">
                     <Tab label="구매한 템플릿" />
                     <Tab label="결제 내역" />
                     <Tab label="알림" />
                  </Tabs>
               </Box>

               {/* 구매한 템플릿 */}
               <CustomTabPanel value={tabValue} index={0}>
                  <Grid container spacing={2}>
                     {purchaseHistory?.map((purchase) => (
                        <Grid item xs={12} sm={6} key={purchase.id}>
                           <ContentCard>
                              <Typography variant="h6">{purchase.template?.title}</Typography>
                              <Typography variant="body2" color="textSecondary">
                                 구매일: {new Date(purchase.createdAt).toLocaleDateString()}
                              </Typography>
                              <Button variant="outlined" color="primary" size="small" sx={{ mt: 2 }} onClick={() => handlePreviewClick(purchase.userTemplateId)} disabled={loadingTemplate}>
                                 {loadingTemplate ? <CircularProgress size={20} /> : '보기'}
                              </Button>
                              <Button variant="outlined" color="primary" size="small" sx={{ mt: 2 }} onClick={() => handleEditorClick(purchase.template)}>
                                 수정
                              </Button>
                           </ContentCard>
                        </Grid>
                     ))}
                  </Grid>
               </CustomTabPanel>

               {/* 결제 내역 */}
               <CustomTabPanel value={tabValue} index={1}>
                  {purchaseHistory?.map((purchase) => (
                     <ContentCard key={purchase.id}>
                        <Typography variant="h6">{purchase.template?.title}</Typography>
                        <Typography variant="h6">결제금액: {Number(purchase.amount).toLocaleString()}원</Typography>
                        <Typography variant="body2" color="textSecondary">
                           결제일: {new Date(purchase.createdAt).toLocaleDateString()}
                        </Typography>
                        {/* <Typography variant="body2" color="textSecondary">
                           결제상태: {purchase.status}
                        </Typography> */}
                     </ContentCard>
                  ))}
               </CustomTabPanel>

               {/* 알림 */}
               <CustomTabPanel value={tabValue} index={2}>
                  {user.notifications?.map((notification) => (
                     <ContentCard key={notification.id}>
                        <Typography variant="h6">{notification.title}</Typography>
                        <Typography variant="body2">{notification.content}</Typography>
                        <Typography variant="caption" color="textSecondary">
                           {new Date(notification.createdAt).toLocaleDateString()}
                        </Typography>
                     </ContentCard>
                  ))}
               </CustomTabPanel>
            </Grid>
         </Grid>
      )
   }

   return <PageContainer>{renderContent()}</PageContainer>
}

export default MyPage
