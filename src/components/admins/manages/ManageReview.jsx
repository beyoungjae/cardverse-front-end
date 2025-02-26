import TitleContainer from '../layouts/TitleContainer'
import MainContainer from '../layouts/MainContainer'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/system'

const Container = styled(Box)(() => ({
   width: '100%',
   height: '100%',
   padding: '40px 40px 20px 40px',
   borderRadius: '8px',
   backgroundColor: '#ffffff',
   border: '1px solid #ccc',
   display: 'flex',
   flexDirection: 'column',
   gap: '16px',

   margin: '0 auto',
}))

const ManageReview = () => {
   return (
      <Container>
         <TitleContainer title="리뷰" />
         <MainContainer type="list"></MainContainer>
      </Container>
   )
}

export default ManageReview
