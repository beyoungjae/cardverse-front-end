import React, { useCallback, useEffect, useRef } from 'react'
import { Box, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { styled } from '@mui/material/styles'
import { DateTimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import customParseFormat from 'dayjs/plugin/customParseFormat'

// dayjs 플러그인 설정
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat)
dayjs.locale('ko')

const SectionTitle = styled(Typography)(({ theme }) => ({
   fontSize: '1.1rem',
   fontWeight: 500,
   marginBottom: theme.spacing(2),
   color: theme.palette.text.primary,
}))

const DatePreview = styled(motion.div)(({ theme }) => ({
   marginTop: theme.spacing(2),
   padding: theme.spacing(2),
   backgroundColor: theme.palette.background.paper,
   borderRadius: theme.shape.borderRadius,
   boxShadow: theme.shadows[1],
   '& > *': {
      marginBottom: theme.spacing(1),
      '&:last-child': {
         marginBottom: 0,
      },
   },
}))

const ErrorMessage = styled(motion.div)(({ theme }) => ({
   color: theme.palette.error.main,
   fontSize: '0.75rem',
   marginTop: theme.spacing(0.5),
}))

const StyledDateTimePicker = styled(DateTimePicker)(({ theme }) => ({
   width: '100%',
   '& .MuiOutlinedInput-root': {
      transition: 'all 0.3s ease',
      '&:hover': {
         transform: 'translateY(-2px)',
         boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      },
      '&.Mui-focused': {
         transform: 'translateY(-2px)',
         boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
      },
   },
}))

const DateTimeSection = ({ control }) => {
   const containerRef = useRef(null)

   // ResizeObserver 설정
   useEffect(() => {
      const container = containerRef.current
      if (!container) return

      let rafId
      const resizeObserver = new ResizeObserver((entries) => {
         // RAF를 사용하여 리사이즈 처리를 다음 프레임으로 지연
         rafId = requestAnimationFrame(() => {
            for (const entry of entries) {
               if (entry.target === container) {
                  // 필요한 경우 여기에 추가 로직
               }
            }
         })
      })

      resizeObserver.observe(container)

      return () => {
         if (rafId) {
            cancelAnimationFrame(rafId)
         }
         resizeObserver.disconnect()
      }
   }, [])

   const handleDateChange = useCallback(
      (onChange) => (newValue) => {
         onChange(newValue ? newValue.toDate() : null)
      },
      []
   )

   const validateDate = useCallback((value) => {
      if (!value) return true
      const date = dayjs(value)
      return date.isValid() && date.isAfter(dayjs()) ? true : '현재 시간 이후로 선택해주세요'
   }, [])

   return (
      <Box component={motion.div} layout sx={{ mb: 4 }} ref={containerRef}>
         <SectionTitle>날짜/시간</SectionTitle>
         <Controller
            name="date"
            control={control}
            defaultValue={null}
            rules={{
               required: '날짜와 시간을 선택해주세요',
               validate: validateDate,
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
               <Box sx={{ position: 'relative' }}>
                  <StyledDateTimePicker
                     value={value ? dayjs(value) : null}
                     onChange={handleDateChange(onChange)}
                     format="YYYY년 MM월 DD일 HH:mm"
                     ampm={false}
                     slotProps={{
                        textField: {
                           fullWidth: true,
                           error: !!error,
                           helperText: error?.message,
                           placeholder: 'YYYY년 MM월 DD일 HH:mm',
                        },
                        actionBar: {
                           actions: ['clear', 'cancel', 'accept'],
                        },
                        popper: {
                           sx: {
                              zIndex: 1300,
                           },
                        },
                     }}
                     localeText={{
                        clearButtonLabel: '초기화',
                        cancelButtonLabel: '취소',
                        okButtonLabel: '확인',
                        todayButtonLabel: '오늘',
                     }}
                     timezone="Asia/Seoul"
                  />
                  <AnimatePresence mode="wait">
                     {error && (
                        <ErrorMessage initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} layout>
                           {error.message}
                        </ErrorMessage>
                     )}
                  </AnimatePresence>
                  <AnimatePresence mode="wait">
                     {value && (
                        <DatePreview initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }} layout>
                           <Typography variant="body1">{dayjs(value).format('YYYY년 MM월 DD일')}</Typography>
                           <Typography variant="body2" color="textSecondary">
                              {dayjs(value).format('dddd')}
                           </Typography>
                           <Typography variant="body2" color="textSecondary">
                              {dayjs(value).format('A HH:mm')}
                           </Typography>
                        </DatePreview>
                     )}
                  </AnimatePresence>
               </Box>
            )}
         />
      </Box>
   )
}

export default DateTimeSection
