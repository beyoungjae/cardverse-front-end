import { Box, Typography, Card as MuiCard, CardContent } from '@mui/material'
import { styled } from '@mui/material/styles'

// 카드 컨테이너
const StyledCardBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   mx: theme.spacing(2),
   my: theme.spacing(1),
}))

// 카드 그리드
const CardGrid = styled(Box)(({ theme }) => ({
   display: 'grid',
   gridTemplateColumns: 'repeat(4, 1fr)',
   padding: '50px',
   gap: '32px',
   maxWidth: '1200px',
   margin: '0 auto',
   [theme.bps.md]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '24px',
   },
   [theme.bps.sm]: {
      gridTemplateColumns: '1fr',
      gap: '16px',
   },
}))

// 카드
const Card = styled(MuiCard)(({ theme }) => ({
   width: '215px',
   height: '125px',
   borderRadius: theme.shape.borderRadius.medium,
   border: `1px solid #AFAFAF`,
   borderRadius: '20px',
   boxShadow: 'none',
}))

// 카드 타이틀
const Cardtitle = styled(Typography)(({ theme }) => ({
   fontSize: '15px',
   fontWeight: 'bold',
   textAlign: 'center',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   height: '100%',
   // whiteSpace: 'normal', // 줄 바꿈
   overflow: 'hidden',
}))

// 더미 데이터
const dummyCards = [{ title: 'Q. 로그인이 안될 경우 해결방법 ' }, { title: 'Q. 비밀번호 안될 경우 해결방법' }, { title: 'Q. 모바일청첩장 만드는방법' }, { title: 'Q. 모바일청첩장 사용기간' }]

const Top4Card = () => {
   return (
      <StyledCardBox>
         <CardGrid>
            {dummyCards.map((card, index) => (
               <Card key={index}>
                  <CardContent>
                     <Cardtitle variant="h6">{card.title}</Cardtitle>
                  </CardContent>
               </Card>
            ))}
         </CardGrid>
      </StyledCardBox>
   )
}

export default Top4Card
