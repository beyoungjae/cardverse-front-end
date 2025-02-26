import React, { useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import { StyledButton } from '.'

const DeleteBtn = ({ type, id }) => {
   const [open, setOpen] = useState(false)

   const handleDelete = async () => {
      try {
         switch (type) {
            case 'template':
               //   await deleteTemplate(id)
               break
            case 'event':
               //   await deleteEvent(id)
               break
            case 'manage':
               //   await deleteManageItem(id)
               break
            default:
               throw new Error('Unknown type')
         }
         // 삭제 성공 처리
         setOpen(false)
      } catch (error) {
         console.error('Delete failed:', error)
         // 에러 처리
      }
   }

   return (
      <>
         <StyledButton
            onClick={() => setOpen(true)}
            sx={{
               '&:hover': {
                  color: '#d32f2f',
               },
            }}>
            <DeleteIcon sx={{ fontSize: '1.3rem' }} />
         </StyledButton>

         {/* 확인 다이얼로그 */}
         <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>삭제 확인</DialogTitle>
            <DialogContent>정말 삭제하시겠습니까?</DialogContent>
            <DialogActions>
               <Button onClick={() => setOpen(false)}>취소</Button>
               <Button onClick={handleDelete} color="error">
                  삭제
               </Button>
            </DialogActions>
         </Dialog>
      </>
   )
}

export default DeleteBtn
