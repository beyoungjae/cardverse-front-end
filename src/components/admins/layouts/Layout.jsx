import { Box } from '@mui/material'
import { styled } from '@mui/system'

const Container = styled(Box)(() => ({
   width: '100%',
   height: '100%',
   padding: '40px 40px 20px 40px',
   borderRadius: '8px',
   backgroundColor: '#ffffff',
   border: '1px solid #ccc',

   margin: '0 auto',

   '&::after': {},
}))

function Layout({ children }) {
   return <Container>{children}</Container>
}

export default Layout
