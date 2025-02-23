import { Box } from '@mui/material'
import { styled } from '@mui/system'

export const Container = styled(Box)(() => ({
   width: '100%',
   // height: '920px',
   height: '100%',
   padding: '20px 40px',
   borderRadius: '8px',
   // backgroundColor: '#f6f4f1',
   backgroundColor: '#ffffff',
   border: '1px solid #ccc',

   // width: '1280px',
   margin: '0 auto',

   '&::after': {},
}))
