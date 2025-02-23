import { styled } from '@mui/system'
import { Box } from '@mui/material'

const Container = styled(Box)(({ theme }) => ({
   backgroundColor: '#f0f0f0',
   minWidth: '1630px',
   height: '100%',
   // overflowY: 'scroll',
   display: 'flex',
   flexDirection: 'column',
   padding: '3px',
   position: 'absolute',
   left: '280px',
   top: '0px',
}))

/* 
    ::-webkit-scrollbar-track:vertical {
    background: linear-gradient(45deg, 
      rgba(182, 153, 187, 1), 
      rgba(173, 192, 255, 0.1)
    );
  }
*/

function Content({ children }) {
   return <Container>{children}</Container>
}

export default Content
