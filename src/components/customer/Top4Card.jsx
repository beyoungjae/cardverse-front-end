import React from 'react'
import { Box, Typography, Card as MuiCard, CardContent, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Link } from 'react-router-dom'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

// 카드 페이지 컨테이너
const Top4CardContainer = styled(Box)(({ theme }) => ({
   width: '100%',
   backgroundColor: theme.palette.background.default,
}))

// 카드 컨테이너
const StyledCardBox = styled(Box)({
   display: 'grid',
   justifyContent: 'center',
   gridTemplateRows: '20px auto 60px', //그리드 컨테이너의 각 행의 높이를 설정
})

// 카드 그리드
const CardGrid = styled(Box)(({ theme }) => ({
   display: 'grid',
   gridTemplateColumns: 'repeat(4, 1fr)',
   padding: '30px 0 50px 0',
   gap: '2vw', // 화면 크기에 따라 갭 자동 변경(뷰포트 너비를 기준으로 gap자동 조정)
   [theme.bps.md]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
   },
   [theme.bps.sm]: {
      gridTemplateColumns: '1fr',
   },
}))

// 카드
const Card = styled(MuiCard)(({ theme }) => ({
   width: '221px',
   height: '125px',
   borderRadius: theme.shape.borderRadius.medium,
   border: '1px solid #AFAFAF',
   boxShadow: 'none',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   [theme.bps.md]: {
      width: '250px',
   },
   [theme.bps.sm]: {
      width: '290px',
   },
}))

// 카드 타이틀
const Cardtitle = styled(Typography)(() => ({
   fontSize: '15px',
   fontWeight: 'bold',
   textAlign: 'center',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   height: '100%',
   overflow: 'hidden',
}))

// 전체보기 링크
const ViewLink = styled(Typography)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'flex-end',
   color: theme.palette.text.primary,
   textDecoration: 'none',
}))

// 버튼 스타일
const CustomerButton = styled(Button)(({ theme }) => ({
   backgroundColor: theme.palette.primary.contrastText,
   padding: '6px 12px',
   border: '1px solid #D3D3D3',
   fontSize: '0.8rem',
}))

// 아이콘
const ViewIcon = styled(Typography)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   color: '#93cacc', // 아이콘 색상
}))

// 더미 데이터
const dummyCards = [{ title: 'Q. 로그인  해결방법 ' }, { title: 'Q. 회원가입 해결방법' }, { title: 'Q. 모바일청첩장 이용방법' }, { title: 'Q. 모바일청첩장 사용기간' }]

// 더미 카드 데이터 예시
const dummyCardsIcon = [<VpnKeyIcon />, <PersonIcon />, <EmailIcon />, <AccessTimeIcon />]

const Top4Card = () => {
   return (
      <Top4CardContainer>
         <StyledCardBox>
            <Box>
               <ViewLink component={Link} to="/faq">
                  전체보기 <KeyboardArrowRightIcon />
               </ViewLink>
            </Box>
            <CardGrid>
               {dummyCards.map((card, index) => (
                  <Card key={index}>
                     <CardContent>
                        <ViewIcon>{React.cloneElement(dummyCardsIcon[index], { sx: { fontSize: 40 } })}</ViewIcon>
                        <Cardtitle variant="h6">{card.title}</Cardtitle>
                     </CardContent>
                  </Card>
               ))}
            </CardGrid>
            <Box>
               <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Typography sx={{ marginRight: '8px', fontSize: '0.9rem' }}>더 자세한 질문은</Typography>
                  <Link to="/post/new">
                     <CustomerButton>1:1문의하기</CustomerButton>
                  </Link>
               </Box>
            </Box>
         </StyledCardBox>
      </Top4CardContainer>
   )
}

export default Top4Card
