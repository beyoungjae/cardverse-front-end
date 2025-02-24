import { Box, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { useParams, Link } from 'react-router-dom'

import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'

const Container = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   borderBottom: '1px solid #f0f0f0',
   alignItems: 'center',

   '&.sub': {
      alignItems: 'stretch',
      gap: '4px',
   },
   '&.main': {
      paddingBottom: '10px',
      width: '100%',
   },
}))

const InputContainer = styled(Box)(({ theme }) => ({
   padding: '10px 30px',
   display: 'flex',
   alignItems: 'center',
   gap: '10px',
}))

const StyledLink = styled(Link)(({ theme }) => ({
   color: 'black',
   display: 'flex',
   alignItems: 'center',
   textDecoration: 'none',
   gap: '8px',
   padding: '10px 15px 10px 10px',
   borderRadius: '4px',
   border: '1px solid #e5e5e5',

   '&:hover': {
      backgroundColor: '#eeeeee',
   },
}))

const Title = styled(Typography)(({ theme }) => ({
   fontSize: '2rem',
   letterSpacing: '1.75px',
   padding: '0',
   width: '300px',
}))

const TitleContainer = ({ title, path, add }) => {
   const { id } = useParams()

   return (
      <>
         <Container className="main">
            <Box sx={{ display: 'flex', alignItems: 'center', height: 'stretch' }}>
               <Title>{title}</Title>
            </Box>
         </Container>
      </>
   )
}

export default TitleContainer
