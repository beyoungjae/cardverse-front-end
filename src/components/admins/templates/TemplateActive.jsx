import { Box, Typography } from '@mui/material'
import { display, styled } from '@mui/system'
import { Container } from '../layouts/boxCommon'
import { Title } from '../layouts/textCommon'
import { StyledButton } from '../layouts/btnCommon'

import EditIcon from '@mui/icons-material/Edit'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import { Link } from 'react-router-dom'

const CardContainer = styled(Box)(({ theme }) => ({
   display: 'grid',
   gridTemplateColumns: 'repeat(2, 1fr)', // 2열
   gridTemplateRows: 'repeat(3, 1fr)', // 3행
   gap: '8px',
   height: '84%',
   padding: '10px',
}))

const CardItem = styled(Box)(({ theme }) => ({
   padding: '10px',
   display: 'flex',
   gap: '16px',
   backgroundColor: '#f5f5f5',

   border: '1px solid #bbbbbb',
   borderRadius: '6px',
}))

const CardImgWrap = styled(Box)(({ theme }) => ({
   boxShadow: '0 0 1px 1px #d5d5d5',
   backgroundColor: '#ffffff',
   borderRadius: '4px',
   padding: '10px',
   flex: 1,
}))

const CardInfoWrap = styled(Box)(({ theme }) => ({
   flex: 3.5,
   boxShadow: '0 0 1px 1px #d5d5d5',
   borderRadius: '4px',
   padding: '12px',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-between',
   backgroundColor: '#ffffff',
}))

const TextBox = styled(Box)(({ theme }) => ({
   display: 'grid',
   gridTemplateRows: 'repeat(5, 1fr)', // 3행
   gap: '10px',
}))

const CardTitle = styled(Typography)(({ theme }) => ({
   fontSize: '1.4rem',
   width: 'fit-content',
   flex: '7',
}))

const TitleBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   gap: '12px',
}))

const StyledLink = styled(Link)(({ theme }) => ({
   color: 'black',
   display: 'flex',
   alignItems: 'center',
   textDecoration: 'none',
   gap: '8px', // 아이콘과 텍스트 사이 간격
   padding: '10px 15px 10px 10px',
   borderRadius: '4px',
   border: '1px solid #e5e5e5',

   '&:hover': {
      backgroundColor: '#eeeeee',
   },
}))

// width: 'fit-content'

const TemplateActive = () => {
   return (
      <Container>
         <TitleBox className="main-title" sx={{ padding: '0 20px', width: '30%' }}>
            <Title>판매중 템플릿</Title>
            <StyledLink to="/admin/template/new">
               <EditIcon sx={{ fontSize: '2.2rem', color: 'black' }} />
               <Typography sx={{ fontSize: '1.2rem' }}>새 템플릿 등록</Typography>
            </StyledLink>
         </TitleBox>

         <CardContainer>
            <CardItem>
               <CardImgWrap></CardImgWrap>
               <CardInfoWrap>
                  <TitleBox>
                     <CardTitle variant="h3">타이틀: 어디어디 카드</CardTitle>
                     <StyledButton>
                        <DriveFileRenameOutlineIcon sx={{ fontSize: '2rem' }} />
                     </StyledButton>
                     <StyledButton>
                        <RemoveShoppingCartIcon sx={{ fontSize: '1.8rem' }} />
                     </StyledButton>
                  </TitleBox>

                  <TextBox>
                     <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                        구분: 연회장
                     </Typography>
                     <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                        가격: 13,000
                     </Typography>
                     <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                        등록일: yyyy-mm-dd
                     </Typography>
                     <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                        총 판매량: n개
                     </Typography>
                     <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                        평균 리뷰: ☆☆☆
                     </Typography>
                  </TextBox>
               </CardInfoWrap>
            </CardItem>
            <CardItem>
               <CardImgWrap></CardImgWrap>
            </CardItem>
            <CardItem>
               <CardImgWrap></CardImgWrap>
            </CardItem>
            <CardItem>
               <CardImgWrap></CardImgWrap>
            </CardItem>
            <CardItem>
               <CardImgWrap></CardImgWrap>
            </CardItem>
            <CardItem>
               <CardImgWrap></CardImgWrap>
            </CardItem>
         </CardContainer>
      </Container>
   )
}

export default TemplateActive
