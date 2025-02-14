import React, { useState } from 'react'
import { Box, TextField, Typography, FormControlLabel, Switch, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Chip, Collapse, Button, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { Controller } from 'react-hook-form'
import { styled } from '@mui/material/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { motion, AnimatePresence } from 'framer-motion'
import dayjs from 'dayjs'

const SectionTitle = styled(Typography)(({ theme }) => ({
   fontSize: '1.1rem',
   fontWeight: 500,
   marginBottom: theme.spacing(2),
   color: theme.palette.text.primary,
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
   '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
         borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
         borderColor: theme.palette.primary.main,
      },
   },
}))

const RSVPList = styled(List)(({ theme }) => ({
   marginTop: theme.spacing(2),
   backgroundColor: theme.palette.background.paper,
   borderRadius: theme.shape.borderRadius,
   border: `1px solid ${theme.palette.divider}`,
}))

const RSVPItem = styled(motion.div)(({ theme }) => ({
   borderBottom: `1px solid ${theme.palette.divider}`,
   '&:last-child': {
      borderBottom: 'none',
   },
}))

const StatusChip = styled(Chip)(({ theme, status }) => ({
   ...(status === 'attending' && {
      backgroundColor: theme.palette.success.light,
      color: theme.palette.success.dark,
   }),
   ...(status === 'not_attending' && {
      backgroundColor: theme.palette.error.light,
      color: theme.palette.error.dark,
   }),
   ...(status === 'pending' && {
      backgroundColor: theme.palette.warning.light,
      color: theme.palette.warning.dark,
   }),
}))

const PreviewBox = styled(motion.div)(({ theme }) => ({
   marginTop: theme.spacing(2),
   padding: theme.spacing(2),
   backgroundColor: theme.palette.grey[50],
   borderRadius: theme.shape.borderRadius,
   border: `1px solid ${theme.palette.divider}`,
}))

// 가상의 RSVP 데이터
const mockRSVPData = [
   { id: 1, name: '김철수', status: 'attending', message: '축하드립니다! 꼭 참석하겠습니다.' },
   { id: 2, name: '이영희', status: 'not_attending', message: '죄송하지만 참석이 어려울 것 같습니다.' },
   { id: 3, name: '박지성', status: 'pending', message: '일정을 조율해보고 다시 연락드리겠습니다.' },
]

const RSVPSection = ({ control }) => {
   const [editDialog, setEditDialog] = useState({ open: false, data: null })
   const [rsvpList, setRsvpList] = useState(mockRSVPData)

   const handleStatusChange = (id, newStatus) => {
      setRsvpList((prev) => prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item)))
   }

   const handleDelete = (id) => {
      setRsvpList((prev) => prev.filter((item) => item.id !== id))
   }

   const handleEdit = (item) => {
      setEditDialog({ open: true, data: item })
   }

   const handleEditSave = (editedData) => {
      setRsvpList((prev) => prev.map((item) => (item.id === editedData.id ? editedData : item)))
      setEditDialog({ open: false, data: null })
   }

   const getStatusLabel = (status) => {
      switch (status) {
         case 'attending':
            return '참석'
         case 'not_attending':
            return '불참'
         case 'pending':
            return '미정'
         default:
            return status
      }
   }

   return (
      <Box sx={{ mb: 4 }}>
         <SectionTitle>참석 여부</SectionTitle>

         <Box sx={{ mb: 3 }}>
            <Controller name="rsvpEnabled" control={control} defaultValue={false} render={({ field: { value, onChange } }) => <FormControlLabel control={<Switch checked={value} onChange={(e) => onChange(e.target.checked)} />} label="RSVP 기능 활성화" />} />
         </Box>

         <Collapse in={control._formValues.rsvpEnabled}>
            <Controller
               name="attendance"
               control={control}
               defaultValue=""
               rules={{
                  required: control._formValues.rsvpEnabled ? '참석 여부 메시지를 입력해주세요' : false,
               }}
               render={({ field, fieldState: { error } }) => <StyledTextField {...field} fullWidth multiline rows={3} variant="outlined" placeholder="참석 여부를 확인하는 메시지를 입력하세요" error={!!error} helperText={error?.message} sx={{ mb: 2 }} />}
            />

            <Controller
               name="rsvpDeadline"
               control={control}
               defaultValue=""
               rules={{
                  required: control._formValues.rsvpEnabled ? 'RSVP 마감일을 선택해주세요' : false,
               }}
               render={({ field, fieldState: { error } }) => (
                  <StyledTextField
                     {...field}
                     fullWidth
                     type="date"
                     variant="outlined"
                     label="RSVP 마감일"
                     error={!!error}
                     helperText={error?.message}
                     InputLabelProps={{
                        shrink: true,
                     }}
                     sx={{ mb: 3 }}
                  />
               )}
            />

            <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
               RSVP 현황
            </Typography>

            <RSVPList>
               <AnimatePresence>
                  {rsvpList.map((rsvp) => (
                     <RSVPItem key={rsvp.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }}>
                        <ListItem>
                           <ListItemText primary={rsvp.name} secondary={rsvp.message} secondaryTypographyProps={{ style: { whiteSpace: 'pre-wrap' } }} />
                           <ListItemSecondaryAction>
                              <StatusChip label={getStatusLabel(rsvp.status)} status={rsvp.status} size="small" sx={{ mr: 1 }} />
                              <IconButton edge="end" size="small" onClick={() => handleEdit(rsvp)} sx={{ mr: 1 }}>
                                 <EditIcon />
                              </IconButton>
                              <IconButton edge="end" size="small" onClick={() => handleDelete(rsvp.id)}>
                                 <DeleteIcon />
                              </IconButton>
                           </ListItemSecondaryAction>
                        </ListItem>
                     </RSVPItem>
                  ))}
               </AnimatePresence>
            </RSVPList>

            <Dialog open={editDialog.open} onClose={() => setEditDialog({ open: false, data: null })}>
               <DialogTitle>RSVP 상태 수정</DialogTitle>
               <DialogContent>
                  <Box sx={{ pt: 2 }}>
                     <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>참석 상태</InputLabel>
                        <Select
                           value={editDialog.data?.status || ''}
                           onChange={(e) =>
                              setEditDialog((prev) => ({
                                 ...prev,
                                 data: { ...prev.data, status: e.target.value },
                              }))
                           }
                           label="참석 상태"
                        >
                           <MenuItem value="attending">참석</MenuItem>
                           <MenuItem value="not_attending">불참</MenuItem>
                           <MenuItem value="pending">미정</MenuItem>
                        </Select>
                     </FormControl>
                     <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="메시지"
                        value={editDialog.data?.message || ''}
                        onChange={(e) =>
                           setEditDialog((prev) => ({
                              ...prev,
                              data: { ...prev.data, message: e.target.value },
                           }))
                        }
                     />
                  </Box>
               </DialogContent>
               <DialogActions>
                  <Button onClick={() => setEditDialog({ open: false, data: null })}>취소</Button>
                  <Button onClick={() => handleEditSave(editDialog.data)} variant="contained">
                     저장
                  </Button>
               </DialogActions>
            </Dialog>
         </Collapse>

         <AnimatePresence>
            {control._formValues.rsvpEnabled && (control._formValues.attendance || control._formValues.rsvpDeadline) && (
               <PreviewBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                     RSVP 미리보기
                  </Typography>
                  {control._formValues.attendance && (
                     <Typography variant="body2" paragraph>
                        {control._formValues.attendance}
                     </Typography>
                  )}
                  {control._formValues.rsvpDeadline && (
                     <Typography variant="body2" color="textSecondary">
                        회신 마감일: {dayjs(control._formValues.rsvpDeadline).format('YYYY년 MM월 DD일')}
                     </Typography>
                  )}
               </PreviewBox>
            )}
         </AnimatePresence>
      </Box>
   )
}

export default RSVPSection
