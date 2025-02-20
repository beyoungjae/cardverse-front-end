import { Box, Typography, TextField, InputAdornment, Card, CardContent } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { styled } from '@mui/system'
import SearchIcon from '@mui/icons-material/Search'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'

/* 배너 컨테이너 */
const BannerContainer = styled(Box)(({ theme }) => ({
   width: '100%',
   height: '212px',
   position: 'relative',
   overflow: 'hidden',
   [theme.breakpoints.down('lg')]: {
      height: '550px',
   },
   [theme.breakpoints.down('md')]: {
      height: '450px',
   },
   [theme.breakpoints.down('sm')]: {
      height: '250px',
   },
}))

/* 배너 이미지 */
const Bannerimg = styled('img')(({ theme }) => ({
   width: '100%',
   height: '100%',
   objectFit: 'cover',
   [theme.breakpoints.down('sm')]: {
      objectPosition: 'center center',
   },
}))

/* 검색창 */
const SearchBox = styled(Box)(({ theme }) => ({
   position: 'absolute',
   top: '320px',
   left: '50%',
   transform: 'translateX(-50%)',
   width: '30%',
   zIndex: 10,
   backgroundColor: 'white',
   [theme.breakpoints.down('sm')]: {
      width: '80%',
      top: '250px',
   },
}))

/* 카드 */
const CardBox = styled(Box)(({ theme }) => ({
   display: 'inline-block',
   width: '200px',
   height: '240px',
   mx: theme.spacing(2),
   my: theme.spacing(1),
   transform: 'scale(0.8)',
}))

const CustomerPage = () => {
   const theme = useTheme()

   return (
      <div>
         <style>
            {`
             @font-face {
             font-family: 'Cafe24Oneprettynight';
             src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.1/Cafe24Oneprettynight.woff') format('woff');
             font-weight: normal;
             font-style: normal;
               }
            `}
         </style>

         <BannerContainer>
            <Bannerimg src="/images/home/login-background.png" alt="Banner Image" />
            <Box
               sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  color: theme.palette.primary.contrastText,
               }}
            >
               <Typography
                  variant="h2"
                  sx={{
                     fontFamily: 'Cafe24Oneprettynight, sans-serif',
                     fontWeight: 200,
                     fontSize: '50px',
                     color: '#3C3A3A',
                     [theme.breakpoints.down('sm')]: {
                        fontSize: '24px',
                     },
                  }}
               >
                  CardVerse 고객센터
               </Typography>
            </Box>
         </BannerContainer>

         <SearchBox>
            <TextField
               fullWidth
               placeholder="CardVerse의 모든 것을 검색해 보세요"
               id="search"
               variant="outlined"
               InputProps={{
                  endAdornment: (
                     <InputAdornment position="end">
                        <SearchIcon />
                     </InputAdornment>
                  ),
               }}
            />
         </SearchBox>

         <Box
            sx={{
               paddingTop: '100px',
               display: 'flex',
               flexDirection: 'row',
               justifyContent: 'center',
               alignItems: 'center',
               gap: theme.spacing(50),
            }}
         >
            <Typography
               variant="h6"
               sx={{
                  //   paddingLeft: '500px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: '24px',
               }}
            >
               자주 묻는 질문 TOP4
            </Typography>

            <Typography sx={{ fontSize: '24px', textDecoration: 'none', textAlign: 'center' }}>
               <Link to="/">전체보기</Link>
            </Typography>
         </Box>

         <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <CardBox>
               <Card variant="outlined">
                  <CardContent>
                     <Typography variant="h6">Q. 로그인이 안될 경우 해결방법</Typography>
                     <Link to="/" style={{ textDecoration: 'none', color: theme.palette.primary.main, fontSize: '10px' }}>
                        자세히 보기
                     </Link>
                  </CardContent>
               </Card>
            </CardBox>
            <CardBox>
               <Card variant="outlined">
                  <CardContent>
                     <Typography variant="h6">Q. 로그인이 안될 경우 해결방법</Typography>
                     <Link to="/" style={{ textDecoration: 'none', color: theme.palette.primary.main, fontSize: '10px' }}>
                        자세히 보기
                     </Link>
                  </CardContent>
               </Card>
            </CardBox>
            <CardBox>
               <Card variant="outlined">
                  <CardContent>
                     <Typography variant="h6">Q. 로그인이 안될 경우 해결방법</Typography>
                     <Link to="/" style={{ textDecoration: 'none', color: theme.palette.primary.main, fontSize: '10px' }}>
                        자세히 보기
                     </Link>
                  </CardContent>
               </Card>
            </CardBox>
            <CardBox>
               <Card variant="outlined">
                  <CardContent>
                     <Typography variant="h6">Q. 로그인이 안될 경우 해결방법</Typography>
                     <Link to="/" style={{ textDecoration: 'none', color: theme.palette.primary.main, fontSize: '10px' }}>
                        자세히 보기
                     </Link>
                  </CardContent>
               </Card>
            </CardBox>
         </Box>

         <div style={{ fontSize: '13px', textAlign: 'right', paddingBottom: '50px', paddingRight: '580px' }}>
            더자세한 질문은{' '}
            <Button variant="outlined" component={Link} to="/" sx={{ size: 'small', fontSize: '12px' }}>
               1:1문의하기
            </Button>
         </div>
      </div>
   )
}

export default CustomerPage
