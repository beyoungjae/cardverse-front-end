import { Box, Typography, FormControl, OutlinedInput, InputAdornment, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'
import { Link } from 'react-router-dom'
import Top4Card from '../components/customer/Top4Card'

// 고객센터 페이지 컨테이너
const CustomerContainer = styled(Box)(({ theme }) => ({
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
   color: theme.palette.text.secondary,
   [theme.bps.md]: {
      fontSize: '2rem',
   },
   [theme.bps.sm]: {
      fontSize: '1.5rem',
   },
}))

// 검색창
const SearchBox = styled(FormControl)(({ theme }) => ({
   width: '581px',
   backgroundColor: theme.palette.background.default,
   margin: '0 auto',
   display: 'flex',
   borderRadius: '20px',
   [theme.bps.md]: {
      width: '80%',
   },
   [theme.bps.sm]: {
      width: '60%',
   },
}))

// 자주묻는질문 컨테이너
const CustomerContentContainer = styled(Box)(({ theme }) => ({
   padding: '80px 40px',
   backgroundColor: theme.palette.background.default,
   minHeight: '100vh',
   maxWidth: '1200px',
   margin: '0 auto',
   [theme.bps.md]: {
      padding: '80px 24px',
   },
   [theme.bps.sm]: {
      padding: '60px 24px',
   },
}))

// 그 외의 타이틀
const SecondeTitle = styled(Typography)(({ theme }) => ({
   ...theme.typography.h3,
   color: theme.palette.text.primary,
   fontWeight: 'bold',
   textAlign: 'left',
   marginBottom: '15px',
   [theme.bps.md]: {
      fontSize: '1.4rem',
   },
   [theme.bps.sm]: {
      fontSize: '1.2rem',
   },
}))

// 전체보기 링크
const ViewLink = styled(Typography)(({ theme }) => ({
   width: '100%',
   textAlign: 'right',
   display: 'flex',
   justifyContent: 'flex-end',
   paddingRight: '10px',
   color: 'black',
   textDecoration: 'none',
   '& img': {
      width: '10px',
      height: '10px',
      marginLeft: '4px',
   },
   [theme.bps.md]: {
      fontSize: '1.4rem',
   },
   [theme.bps.sm]: {
      fontSize: '1.2rem',
   },
}))

// 버튼 스타일
const CustomerButton = styled(Button)(({ theme }) => ({
   backgroundColor: theme.palette.primary.contrastText,
   color: 'black',
   padding: '6px 12px',
   textAlign: 'center',
   border: `1px solid #D3D3D3`,
   fontSize: '10px',
   height: '36px',
   display: 'inline-flex',
   alignItems: 'center',
   [theme.bps.lg]: {
      right: 0,
   },
   [theme.bps.md]: {
      padding: '8px 16px',
      fontSize: '0.9rem',
   },
   [theme.bps.sm]: {
      padding: '6px 12px',
      fontSize: '0.8rem',
      right: 0,
   },
}))

const CustomerPage = () => {
   return (
      <CustomerContainer>
         {/* 배너, 검색창 */}
         <Bannerimg>
            <BannerTitle>CardVerse 고객센터</BannerTitle>
            <SearchBox>
               <OutlinedInput
                  placeholder="CardVerse의 모든것을 검색해 보세요."
                  endAdornment={
                     <InputAdornment position="end">
                        <SearchIcon />
                     </InputAdornment>
                  }
                  sx={{ borderRadius: '20px' }}
               />
            </SearchBox>
         </Bannerimg>

         {/* 자주묻는질문 */}
         <CustomerContentContainer>
            <SecondeTitle>자주 묻는 질문 TOP4</SecondeTitle>
            <ViewLink>
               <Link to="/">
                  전체보기
                  <img src="images/right arrow.png" alt="arrow" />
               </Link>
            </ViewLink>
            <Top4Card />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
               <Typography sx={{ marginRight: '8px', fontSize: '10px' }}>더 자세한 질문은</Typography>
               <Link to="/">
                  <CustomerButton>1:1문의하기</CustomerButton>
               </Link>
            </Box>
         </CustomerContentContainer>
      </CustomerContainer>
   )
}

export default CustomerPage
