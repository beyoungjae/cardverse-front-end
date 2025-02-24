import { useNavigate, useParams } from 'react-router-dom'

import AddIcon from '@mui/icons-material/Add'
import { StyledButton } from '.'
import { Typography } from '@mui/material'

const CreateBtn = ({ type }) => {
   const navigate = useNavigate()

   const handleCreate = () => {
      if (!type) {
         console.error('Type is required')
         return
      }
      navigate(`/admin/${type}/new`)
   }

   return (
      <StyledButton className="create-button" onClick={handleCreate}>
         <AddIcon sx={{ fontSize: '1.3rem' }} />
         <Typography>작성</Typography>
      </StyledButton>
   )
}

export default CreateBtn
