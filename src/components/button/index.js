import { styled } from '@mui/system'
import { Button } from '@mui/material'

export { default as EditBtn } from './EditBtn'
export { default as CreateBtn } from './CreateBtn'
export { default as DeleteBtn } from './DeleteBtn'

export const StyledButton = styled(Button)(({ theme }) => ({
   border: '1px solid #cccccc',
   //    flex: 1,
   padding: '5px 0px',
   width: '35px',
   minWidth: 'unset',

   '&.create-button': {
      width: '130px',
      display: 'flex',
      //   padding: 'auto 10px',
      gap: '20px',
   },

   '&:hover': {
      backgroundColor: '#f5f5f5',
      borderColor: '#999999',
   },
}))
