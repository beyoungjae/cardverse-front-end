import { useNavigate, useParams } from 'react-router-dom'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import { StyledButton } from '.'

const EditBtn = ({ type, id }) => {
   const navigate = useNavigate()

   const handleEdit = () => {
      if (!type) {
         console.error('Type is required')
         return
      }
      navigate(`/admin/edit/${type}/${id}`)
   }

   return (
      <StyledButton
         onClick={handleEdit}
         sx={{
            '&:hover': {
               color: '#1976d2',
            },
         }}>
         <DriveFileRenameOutlineIcon sx={{ fontSize: '1.3rem' }} />
      </StyledButton>
   )
}

export default EditBtn
