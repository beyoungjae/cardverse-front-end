import { Box, Typography } from '@mui/material'
import { styled } from '@mui/system'

export const Container = styled(Box)(() => ({
   width: '100%',
   height: '100%',
   padding: '40px 40px 20px 40px',
   borderRadius: '8px',
   backgroundColor: '#ffffff',
   border: '1px solid #ccc',

   margin: '0 auto',

   '&::after': {},
}))

export const TitleContainer = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   paddingBottom: '4px',
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

export const Titles = ({ title }) => {
   return (
      <>
         <TitleContainer className="main">
            <Box sx={{ display: 'flex', alignItems: 'center', height: 'stretch' }}>
               <Typography sx={{ fontSize: '2rem', letterSpacing: '1.75px', padding: '0' }}>{title}</Typography>

               <Box
                  sx={{
                     padding: '10px 30px',
                     display: 'flex',
                     alignItems: 'center',
                     gap: '10px',
                  }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                     구분:
                  </Typography>
               </Box>
            </Box>
         </TitleContainer>
      </>
   )
}
