import { useNavigate, useParams } from 'react-router-dom'

import AddIcon from '@mui/icons-material/Add'
import { StyledButton } from '.'
import { Typography } from '@mui/material'

const CreateBtn = ({ type }) => {
   const navigate = useNavigate()

   const handleCreate = () => {
      switch (type) {
         case 'template':
            navigate('/admin/template/new')
            break
         case 'event':
            navigate('/admin/event/new')
            break
         case 'manage':
            navigate('/admin/manage/new')
            break
         default:
            console.error('Unknown type')
      }
   }

   return (
      <StyledButton className="create-button" onClick={handleCreate}>
         <AddIcon sx={{ fontSize: '1.3rem' }} />
         <Typography>작성</Typography>
      </StyledButton>
   )
}

export default CreateBtn
