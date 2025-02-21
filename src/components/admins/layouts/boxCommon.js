import { Box } from '@mui/material'
import { styled } from '@mui/system'

export const Container = styled(Box)(() => ({
   width: '100%',
   height: '100%',
   padding: '10px',
   borderRadius: '8px',
   backgroundColor: '#ffffff',
   border: '1px solid black',

   '&::after': {},
}))
