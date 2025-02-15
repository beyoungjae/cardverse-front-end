import React, { useState, useCallback } from 'react'
import { Box, Chip, Typography, IconButton, Tooltip, FormControlLabel, Checkbox } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { DateTimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import EventIcon from '@mui/icons-material/Event'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CelebrationIcon from '@mui/icons-material/Celebration'
import CakeIcon from '@mui/icons-material/Cake'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { SectionContainer, SectionTitle, TitleText, HelpText, IconButtonWrapper, fadeInUp, easeTransition, COLORS } from '../styles/commonStyles'
import { styled } from '@mui/material/styles'

// dayjs 한글 설정
dayjs.locale('ko')

const invitationTypes = [
   { id: 'wedding', label: '청첩장', icon: <FavoriteIcon />, format: '(신랑), (신부)의 결혼식이 (D-Day)일 남았습니다.' },
   { id: 'newYear', label: '연하장', icon: <CelebrationIcon />, format: '새해 첫날까지 (D-Day)일 남았습니다.' },
   { id: 'birthday', label: '고희연', icon: <CakeIcon />, format: '(이름)님의 칠순잔치가 (D-Day)일 남았습니다.' },
   { id: 'invitation', label: '초빙장', icon: <EmojiEventsIcon />, format: '특별한 행사가 (D-Day)일 남았습니다.' },
]

const StyledDateTimePicker = styled(DateTimePicker)(({ theme }) => ({
   width: '100%',
   '& .MuiOutlinedInput-root': {
      transition: 'all 0.3s ease',
      height: '56px',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(4px)',
      borderRadius: '8px',
      border: `1px solid ${COLORS.accent.main}15`,
      '&:hover': {
         backgroundColor: 'rgba(255, 255, 255, 0.95)',
         transform: 'translateY(-2px)',
         boxShadow: `0 4px 12px ${COLORS.accent.main}15`,
      },
      '&.Mui-focused': {
         backgroundColor: '#FFFFFF',
         transform: 'translateY(-2px)',
         boxShadow: `0 6px 16px ${COLORS.accent.main}25`,
         '& .MuiOutlinedInput-notchedOutline': {
            borderColor: COLORS.accent.main,
            borderWidth: '1px',
         },
      },
      '& input': {
         fontSize: '1rem',
         fontFamily: 'Pretendard, sans-serif',
         color: COLORS.text.primary,
      },
   },
   '& .MuiInputAdornment-root .MuiSvgIcon-root': {
      color: COLORS.accent.main,
   },
}))

const DateTimeSection = () => {
   const [showHelp, setShowHelp] = useState(false)
   const [selectedType, setSelectedType] = useState('wedding')
   const { control, setValue, watch } = useFormContext()

   const currentType = invitationTypes.find((type) => type.id === selectedType)
   const dateTime = watch('dateTime')
   const showCountdown = watch('showCountdown')

   const handleHelpToggle = useCallback(() => {
      setShowHelp((prev) => !prev)
   }, [])

   const handleReset = useCallback(() => {
      setValue('dateTime', null, { shouldValidate: true })
      setValue('showCountdown', false, { shouldValidate: true })
   }, [setValue])

   const handleTypeSelect = useCallback((type) => {
      setSelectedType(type)
   }, [])

   const getDDay = useCallback((date) => {
      if (!date) return null
      const today = dayjs()
      const targetDate = dayjs(date)
      const diff = targetDate.diff(today, 'day')
      return diff
   }, [])

   const formatDateTime = useCallback((date) => {
      if (!date) return ''
      return dayjs(date).format('YYYY년 MM월 DD일 dddd A hh:mm')
   }, [])

   return (
      <SectionContainer component={motion.div} variants={fadeInUp} initial="initial" animate="animate" exit="exit" transition={easeTransition}>
         <SectionTitle>
            <TitleText>
               <EventIcon className="icon" />
               <Box className="title">날짜/시간</Box>
            </TitleText>
            <IconButtonWrapper>
               <HelpOutlineIcon onClick={handleHelpToggle} />
               <RestartAltIcon onClick={handleReset} />
            </IconButtonWrapper>
         </SectionTitle>

         <AnimatePresence>
            {showHelp && (
               <HelpText>
                  <strong>날짜/시간 설정 도움말</strong>
                  <ul>
                     <li>초대장 유형에 맞는 날짜와 시간을 선택해주세요.</li>
                     <li>D-Day 카운트다운을 표시할 수 있습니다.</li>
                     <li>날짜 선택 시 요일이 자동으로 표시됩니다.</li>
                     <li>시간은 24시간 형식으로 선택 가능합니다.</li>
                  </ul>
               </HelpText>
            )}
         </AnimatePresence>

         <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3, mt: 2 }}>
            {invitationTypes.map((type) => (
               <Tooltip key={type.id} title={`${type.label} 날짜 설정하기`}>
                  <Chip
                     icon={type.icon}
                     label={type.label}
                     onClick={() => handleTypeSelect(type.id)}
                     sx={{
                        backgroundColor: selectedType === type.id ? `${COLORS.accent.main}15` : 'rgba(255, 255, 255, 0.8)',
                        color: selectedType === type.id ? COLORS.accent.main : COLORS.text.primary,
                        border: `1px solid ${selectedType === type.id ? COLORS.accent.main : COLORS.accent.main}15`,
                        '&:hover': {
                           backgroundColor: selectedType === type.id ? `${COLORS.accent.main}25` : 'white',
                           transform: 'translateY(-2px)',
                           boxShadow: `0 4px 12px ${COLORS.accent.main}15`,
                        },
                        transition: 'all 0.3s ease',
                     }}
                  />
               </Tooltip>
            ))}
         </Box>

         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
               <Typography variant="subtitle2" sx={{ mb: 1, color: COLORS.text.secondary, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarMonthIcon fontSize="small" />
                  날짜 및 시간 선택
               </Typography>
               <Controller
                  name="dateTime"
                  control={control}
                  defaultValue={null}
                  rules={{ required: '날짜와 시간을 선택해주세요' }}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                     <StyledDateTimePicker
                        value={value}
                        onChange={onChange}
                        format="YYYY년 MM월 DD일 dddd A hh:mm"
                        ampm
                        slotProps={{
                           textField: {
                              error: !!error,
                              helperText: error?.message,
                           },
                        }}
                     />
                  )}
               />
            </Box>

            <Box>
               <Controller
                  name="showCountdown"
                  control={control}
                  defaultValue={false}
                  render={({ field: { value, onChange } }) => (
                     <FormControlLabel
                        control={
                           <Checkbox
                              checked={value}
                              onChange={onChange}
                              sx={{
                                 color: COLORS.accent.main,
                                 '&.Mui-checked': {
                                    color: COLORS.accent.main,
                                 },
                              }}
                           />
                        }
                        label="D-Day 카운트다운 표시"
                     />
                  )}
               />
            </Box>
         </Box>

         {dateTime && (
            <Box
               component={motion.div}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               sx={{
                  mt: 3,
                  p: 3,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '12px',
                  border: `1px dashed ${COLORS.accent.main}`,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                     content: '""',
                     position: 'absolute',
                     top: 0,
                     left: 0,
                     right: 0,
                     bottom: 0,
                     background: `linear-gradient(45deg, ${COLORS.accent.main}15 25%, transparent 25%, transparent 50%, ${COLORS.accent.main}15 50%, ${COLORS.accent.main}15 75%, transparent 75%, transparent)`,
                     backgroundSize: '20px 20px',
                     opacity: 0.5,
                  },
               }}
            >
               <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                  {currentType.icon}
                  <Box sx={{ mt: 1, color: COLORS.accent.main, fontWeight: 500 }}>{currentType.label}</Box>
                  <Box sx={{ mt: 2, color: COLORS.text.primary, fontSize: '1.1rem' }}>{formatDateTime(dateTime)}</Box>
                  {showCountdown && getDDay(dateTime) !== null && <Box sx={{ mt: 2, color: COLORS.accent.main, fontWeight: 500 }}>{currentType.format.replace('(D-Day)', `D-${Math.max(0, getDDay(dateTime))}`)}</Box>}
               </Box>
            </Box>
         )}
      </SectionContainer>
   )
}

export default DateTimeSection
