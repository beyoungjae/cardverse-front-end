import TitleContainer from '../layouts/TitleContainer'
import MainContainer from '../layouts/MainContainer'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { items } from '../test/noticeItem'

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

const ManageNotice = () => {
   return (
      <Container>
         <TitleContainer title="공지사항" />
         <MainContainer type="accordion" itemData={items}></MainContainer>
      </Container>
   )
}

export default ManageNotice
