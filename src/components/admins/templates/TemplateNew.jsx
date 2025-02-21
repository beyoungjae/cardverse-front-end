import { Box, Typography } from '@mui/material'
import { styled } from '@mui/system'
import TemplateForm from './TemplateForm'

const TitleBox = styled(Box)(({ theme }) => ({
   padding: '0 20px',
   width: '100%',
   marginBottom: '20px',
}))

const TemplateNew = () => {
   return (
      <Box>
         <TemplateForm />
      </Box>
   )
}

export default TemplateNew
