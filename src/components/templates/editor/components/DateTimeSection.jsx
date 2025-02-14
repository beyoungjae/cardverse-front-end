import React from 'react'
import { Box, Typography, InputAdornment } from '@mui/material'
import { Controller } from 'react-hook-form'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { styled } from '@mui/material/styles'
import { motion, AnimatePresence } from 'framer-motion'
import EventIcon from '@mui/icons-material/Event'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'

// dayjs 설정
dayjs.locale('ko')

const SectionTitle = styled(Typography)(({ theme }) => ({
   fontSize: '1.1rem',
   fontWeight: 500,
   marginBottom: theme.spacing(2),
   color: theme.palette.text.primary,
}))

const StyledDateTimePicker = styled(DateTimePicker)(({ theme }) => ({
   width: '100%',
   '& .MuiOutlinedInput-root': {
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:hover fieldset': {
         borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
         borderColor: theme.palette.primary.main,
      },
   },
   [theme.breakpoints.down('sm')]: {
      '& .MuiInputBase-input': {
         fontSize: '0.9rem',
      },
   },
}))

const HelperText = styled(motion.div)(({ theme, error }) => ({
   fontSize: '0.75rem',
   color: error ? theme.palette.error.main : theme.palette.text.secondary,
   marginTop: theme.spacing(1),
   marginLeft: theme.spacing(1),
}))

const PreviewText = styled(motion.div)(({ theme }) => ({
   fontSize: '0.9rem',
   color: theme.palette.primary.main,
   marginTop: theme.spacing(2),
   padding: theme.spacing(2),
   backgroundColor: theme.palette.grey[50],
   borderRadius: theme.shape.borderRadius,
   border: `1px solid ${theme.palette.divider}`,
}))

const InputContainer = styled(motion.div)(({ theme }) => ({
   marginBottom: theme.spacing(2),
   [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1),
   },
}))

const DateTimeSection = ({ control }) => {
   const formatPreview = (date) => {
      if (!date) return null
      const d = dayjs(date)
      return {
         date: d.format('YYYY년 MM월 DD일'),
         day: d.format('dddd'),
         time: d.format('HH:mm'),
      }
   }

   return (
      <Box sx={{ mb: 4 }}>
         <SectionTitle>날짜 및 시간</SectionTitle>
         <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
               name="date"
               control={control}
               defaultValue={null}
               rules={{
                  required: '날짜와 시간을 선택해주세요',
                  validate: (value) => {
                     if (!value) return true
                     return dayjs(value).isAfter(dayjs()) || '현재 시간 이후로 선택해주세요'
                  },
               }}
               render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <InputContainer initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                     <StyledDateTimePicker
                        value={value ? dayjs(value) : null}
                        onChange={(newValue) => onChange(newValue)}
                        format="YYYY년 MM월 DD일 HH:mm"
                        ampm={false}
                        minDate={dayjs()}
                        slotProps={{
                           textField: {
                              fullWidth: true,
                              error: !!error,
                              placeholder: '날짜와 시간을 선택해주세요',
                              InputProps: {
                                 startAdornment: (
                                    <InputAdornment position="start">
                                       <EventIcon color={error ? 'error' : 'action'} />
                                    </InputAdornment>
                                 ),
                              },
                           },
                        }}
                     />
                     <AnimatePresence mode="wait">
                        {error ? (
                           <HelperText error initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} role="alert">
                              {error.message}
                           </HelperText>
                        ) : (
                           <HelperText initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                              특별한 날의 날짜와 시간을 선택해주세요
                           </HelperText>
                        )}
                     </AnimatePresence>

                     <AnimatePresence mode="wait">
                        {value && (
                           <PreviewText initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }}>
                              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                 <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                    {formatPreview(value).date}
                                 </Typography>
                                 <Typography variant="body2" color="textSecondary">
                                    {formatPreview(value).day}요일 {formatPreview(value).time}
                                 </Typography>
                              </Box>
                           </PreviewText>
                        )}
                     </AnimatePresence>
                  </InputContainer>
               )}
            />
         </LocalizationProvider>
      </Box>
   )
}

export default DateTimeSection
