import { styled } from '@mui/system'
import { Box } from '@mui/material'

const Container = styled(Box)(({ theme }) => ({
   // marginLeft: '280px',
   backgroundColor: '#f0f0f0',
   minWidth: '1630px',
   width: '1630px',
   height: '100vh',
   overflowY: 'scroll',
   display: 'flex',
   flexDirection: 'column',
   padding: '20px',
   position: 'absolute',
   left: '280px',
   top: '0px',
}))

function Content({ children }) {
   return <Container>{children}</Container>
}

export default Content
