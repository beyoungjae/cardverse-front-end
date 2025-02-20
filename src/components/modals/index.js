import { styled } from '@mui/system'
import { Box } from '@mui/material'

export const GlobalStyle = styled('style')`
   @keyframes fadeIn {
      from {
         opacity: 0;
         transform: translateY(-20px);
      }
      to {
         opacity: 1;
         transform: translateY(0);
      }
   }

   @keyframes fadeOut {
      from {
         opacity: 1;
         transform: translateY(0px);
      }
      to {
         opacity: 0;
         transform: translateY(-20px);
      }
   }
`

export const Overlay = styled(Box)(({ theme }) => ({
   position: 'fixed',
   top: 0,
   left: 0,
   width: '100%',
   height: '100%',
   background: 'rgba(0, 0, 0, 0.5)' /* 반투명 검은색 */,
   backdropFilter: 'blur(5px)' /* 배경 흐림 처리 */,
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   zIndex: '999',
}))


export const Modal = styled('div')(({ theme, $isClosing }) => ({
   background: 'white',
   padding: '40px 64px',
   width: '500px',
   borderRadius: '10px',
   textAlign: 'center',
   boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
   animation: `${$isClosing ? 'fadeOut' : 'fadeIn'} 0.3s ease-in-out`,
   position: 'relative',
   display: 'flex',
   flexDirection: 'column',
   gap: '80px',
   aspectRatio: '1 / 1.5',

   [theme.breakpoints.down('md')]: {
      gap: '60px',
   },
   [theme.breakpoints.down('sm')]: {
      gap: '40px',
      padding: '30px 40px',
      margin: '0px 20px',
   },
}))