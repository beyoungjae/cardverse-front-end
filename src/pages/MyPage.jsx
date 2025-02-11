import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import { createBox } from '../utils/muiSystem'

const Container = createBox({
   maxWidth: '1280px',
   margin: '0 auto',
   padding: '16px',
   backgroundColor: 'black',
   color: 'white',
   height: '1200px',
})

const SideNavbar = createBox({
   width: '50px',
   backgroundColor: 'white',
})

// const Container = styled(Box)(({ theme }) => ({
//     maxWidth: '1280px',
//     margin: '0 auto',
//     padding: '16px',

//     backgroundColor: 'black',
// }))

// const SideNavbar = styled(Box)(({ theme }) => ({}))

const MyPage = () => {
   return (
      <Container>
         <></>
      </Container>
      // <Container>
      // <></>
      // </Container>
   )
}

export default MyPage

const flex = {
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
}
