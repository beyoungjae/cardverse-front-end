import { styled } from '@mui/system'
import { Box, Typography, Button, TextField, Alert, IconButton } from '@mui/material'
import { bps } from '../../styles/responsiveStyles'

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
export const Title = styled(Typography)(({ theme }) => ({
   width: '100%',
   textAlign: 'start',
   boxSizing: 'border-box',
   minWidth: 0,
   display: 'flex',
   alignItems: 'center',
   gap: '8px',
   // border: '1px solid blue',

   //    ...bps(theme, {
   //       1600: { fontSize: '1.4rem' },
   //    }),

   [theme.breakpoints.down('lg')]: { fontSize: '1.3rem' },
   [theme.breakpoints.down('md')]: {},
   [theme.breakpoints.down('sm')]: {},
   [theme.breakpoints.down(480)]: {
      fontSize: '1.3rem',
   },
}))

export const ButtonBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   gap: '16px',
   // border: '1px solid red',
   alignItems: 'stretch',
}))

export const StyledButton = styled(Button)(({ theme }) => ({
   border: '1px solid #dddddd',
   // outline: '1px solid #dddddd',
   width: '100%',
   padding: '10px 0',
   height: 'auto',
   display: 'inline-block',
   fontSize: '1.1rem',

   '&.Mui-disabled': {
      color: '#666',
      backgroundColor: '#f5f5f5',
   },

   ...bps(theme, {
      1600: { padding: '9px 0', fontSize: '1.05rem' },
      1280: { padding: '8px 0', fontSize: '1.00rem' },
      960: { padding: '7px 0', fontSize: '0.95rem' },
      600: { padding: '6px 0', fontSize: '0.9rem' },
      480: { fontSize: '0.85rem' },
   }),
}))

export const Section = styled(Box)(({ theme }) => ({
   // backgroundColor: 'hotpink',
   // padding: '2px',
   display: 'flex',
   gap: '8px',
   flexDirection: 'column',
}))

export const StyledBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'stretch',
   gap: '8px',
   // padding: '4px',
}))

export const StyledText = styled(Typography)(({ theme }) => ({
   width: '100%',
   textAlign: 'start',
   // padding: '5px 16px',
   // boxSizing: 'border-box',
   minWidth: 0,
   // border: '1px solid black',
   fontSize: '1rem',

   '&.title': {
      textAlign: 'center',
      padding: '0 16px',
   },
   '&.valid': {
      [theme.breakpoints.down(480)]: {
         padding: '0px 0px',
         fontSize: '0.9rem',
      },
   },

   ...bps(theme, {
      1600: { fontSize: '0.95rem' },
      1280: { fontSize: '0.9rem' },
      960: { fontSize: '0.85rem' },
      600: { fontSize: '0.8rem' },
      480: { fontSize: '0.8rem' },
   }),
}))

export const InputField = styled(TextField, {
   shouldForwardProp: (prop) => prop !== '$isDisabled', // $isDisabled 제외
})(({ theme, $isDisabled }) => ({
   height: 'auto',
   display: 'flex',
   flex: 4,
   // border: '1px solid #dddddd',
   borderRadius: '6px',
   outline: 'none',

   width: '100%',

   '& .MuiInputLabel-root': {
      fontSize: '1rem',
      // top: '-5px',

      ...bps(theme, {
         480: { top: '-5px' },
      }),
   }, // ✅ 기본 상태
   '& .MuiInputLabel-shrink': { fontSize: '1rem', top: '1px' }, // ✅ 포커스 시
   '& .MuiInputBase-root': { border: 'none' },

   '& .MuiInputBase-input': {
      fontSize: '1rem',
      caretColor: $isDisabled ? 'transparent' : 'black',

      '&:-webkit-autofill': {
         WebkitBoxShadow: '0 0 0 30px #f5f5f5 inset !important',
         WebkitTextFillColor: `${theme.palette.text.primary} !important`,
         transition: 'background-color 5000s ease-in-out 0s',
      },
      '&:-webkit-autofill:hover': {
         WebkitBoxShadow: '0 0 0 30px #f5f5f5 inset !important',
      },
      '&:-webkit-autofill:focus': {
         WebkitBoxShadow: '0 0 0 30px white inset !important',
      },
      '&:-webkit-autofill:active': {
         WebkitBoxShadow: '0 0 0 30px #f5f5f5 inset !important',
      },

      ...bps(theme, {
         1600: { padding: '12px 10px' },
         1280: { padding: '12px 10px' },
         960: { padding: '12px 10px' },
         600: { padding: '12px 10px' },
         480: { fontSize: '0.9rem', padding: '12px 10px' },
      }),
      // [theme.breakpoints.down('sm')]: { padding: '8px' },
   },

   '& .MuiInputBase-input.Mui-disabled': {
      // color: '#666',
      // '-webkit-text-fill-color': '#666',
      cursor: 'not-allowed',
      backgroundColor: '#f5f5f5',
   },

   // '& .MuiOutlinedInput-notchedOutline': {
   // border: 'none', // ✅ `outlined` 테두리 제거
   // },
   // '&:hover .MuiOutlinedInput-notchedOutline': { outline: '1px solid white' }, //
   // '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
   // border: $isDisabled ? 'none' : 'none',
   // },
}))

export const StyledAlert = styled(Alert)(({ theme }) => ({
   textAlign: 'left',
   display: 'flex',
   alignItems: 'center',
   height: 'auto',
   width: '100%',
   fontSize: '1rem',

   '& .MuiAlert-message': {
      whiteSpace: 'pre-line', // 줄바꿈 처리
   },
}))
