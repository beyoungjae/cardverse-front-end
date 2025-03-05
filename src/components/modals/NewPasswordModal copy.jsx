import { styled } from '@mui/system'
import { Box, Typography, TextField } from '@mui/material'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

const Container = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '16px',
}))

const StyledText = styled(Typography)(({ theme }) => ({
   width: '100%',
   boxSizing: 'border-box',
   minWidth: 0,
   textAlign: 'start',
   padding: '0 16px',

   '&.sub-title': {
      fontSize: '1.2rem',
   },
   '&.main-title': {
      fontSize: '1.5rem',
      marginBottom: '30px',
   },

   '&.label': {
      flex: '5',
   },

   [theme.breakpoints.down('md')]: {},
   [theme.breakpoints.down('sm')]: {},
   [theme.breakpoints.down(480)]: {
      fontSize: '1.3rem',
   },
}))

const Wrappepr = styled(Box)(({ theme }) => ({
   display: 'flex',
   border: '1px solid #eeeeee',
}))

const IconBox = styled(Box)(({ theme }) => ({
   flex: 1,
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   border: '1px solid black',
   height: '100%',
   padding: '5px 0',
}))

const NewPasswordModal = () => {
   return (
      <Container>
         <StyledText variant="h2" className="main-title">
            비밀번호 재설정
         </StyledText>

         <TextField label="이름" variant="outlined" fullWidth />

         <Wrappepr>
            <IconBox>
               <LockOutlinedIcon />
            </IconBox>
            <StyledText variant="h3" className="label">
               새 비밀번호
            </StyledText>
         </Wrappepr>
      </Container>
   )
}

export default NewPasswordModal
