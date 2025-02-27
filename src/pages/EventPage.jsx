import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Event from '../components/customer/Event'

// 이벤트 페이지 컨테이너
const EventContainer = styled(Box)(({ theme }) => ({
   width: '100%',
   backgroundColor: theme.palette.background.default,
   minHeight: '100vh',
}))

// 배너 이미지
const Bannerimg = styled(Box)(() => ({
   width: '100%',
   height: '212px',
   backgroundImage: "url('/images/home/login-background.png')",
   backgroundSize: 'cover',
   backgroundPosition: 'center',
   backgroundRepeat: 'no-repeat',
}))

// 배너 타이틀
const BannerTitle = styled(Typography)(({ theme }) => ({
   ...theme.typography.h1,
   textAlign: 'center',
   lineHeight: '185px',
   color: theme.palette.text.primary,
   [theme.breakpoints.md]: {
      fontSize: '2rem',
   },
   [theme.breakpoints.sm]: {
      fontSize: '1.5rem',
   },
}))

const EventPage = () => {
   return (
      <EventContainer>
         {/* 배너, 제목 */}
         <Bannerimg>
            <BannerTitle>EVENT</BannerTitle>
         </Bannerimg>
         {/* 이벤트카드 */}
         <Event />
      </EventContainer>
   )
}

export default EventPage
