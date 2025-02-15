import React, { useState, useCallback } from 'react'
import { Box, Chip, Typography, IconButton, Tooltip, FormControlLabel, Checkbox, FormGroup, TextField } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CelebrationIcon from '@mui/icons-material/Celebration'
import CakeIcon from '@mui/icons-material/Cake'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import MessageIcon from '@mui/icons-material/Message'
import LocalDiningIcon from '@mui/icons-material/LocalDining'
import GroupIcon from '@mui/icons-material/Group'
import PhoneIcon from '@mui/icons-material/Phone'
import { SectionContainer, SectionTitle, TitleText, StyledTextField, HelpText, IconButtonWrapper, fadeInUp, easeTransition, COLORS } from '../styles/commonStyles'

const invitationTypes = [
   {
      id: 'wedding',
      label: '청첩장',
      icon: <FavoriteIcon />,
      title: '참석 여부를 알려주세요',
      description: '소중한 분들의 참석 여부를 확인하고 싶습니다',
      options: [
         { id: 'attendees', label: '참석 인원', icon: <GroupIcon />, required: true },
         { id: 'contact', label: '연락처', icon: <PhoneIcon />, required: true },
         { id: 'meal', label: '식사 선호도', icon: <LocalDiningIcon />, required: false },
         { id: 'message', label: '축하 메시지', icon: <MessageIcon />, required: false },
      ],
   },
   {
      id: 'newYear',
      label: '연하장',
      icon: <CelebrationIcon />,
      title: '새해 인사를 나눠요',
      description: '새해 덕담을 서로 나누어요',
      options: [
         { id: 'contact', label: '연락처', icon: <PhoneIcon />, required: true },
         { id: 'message', label: '새해 덕담', icon: <MessageIcon />, required: false },
      ],
   },
   {
      id: 'birthday',
      label: '고희연',
      icon: <CakeIcon />,
      title: '축하의 마음을 전해주세요',
      description: '귀한 발걸음을 해주실 분들을 확인하고 싶습니다',
      options: [
         { id: 'attendees', label: '참석 인원', icon: <GroupIcon />, required: true },
         { id: 'contact', label: '연락처', icon: <PhoneIcon />, required: true },
         { id: 'meal', label: '식사 선호도', icon: <LocalDiningIcon />, required: false },
         { id: 'message', label: '축하 메시지', icon: <MessageIcon />, required: false },
      ],
   },
   {
      id: 'invitation',
      label: '초빙장',
      icon: <EmojiEventsIcon />,
      title: '참석 여부를 알려주세요',
      description: '귀한 시간 내어주실 분들을 확인하고 싶습니다',
      options: [
         { id: 'attendees', label: '참석 인원', icon: <GroupIcon />, required: true },
         { id: 'contact', label: '연락처', icon: <PhoneIcon />, required: true },
         { id: 'message', label: '메시지', icon: <MessageIcon />, required: false },
      ],
   },
]

const RSVPSection = () => {
   const [showHelp, setShowHelp] = useState(false)
   const [selectedType, setSelectedType] = useState('wedding')
   const { control, setValue, watch } = useFormContext()

   const currentType = invitationTypes.find((type) => type.id === selectedType)
   const rsvpTitle = watch('rsvpTitle')
   const rsvpDescription = watch('rsvpDescription')
   const rsvpOptions = watch('rsvpOptions') || []
   const rsvpButtonText = watch('rsvpButtonText')
   const useKakaoTalk = watch('useKakaoTalk')

   const handleHelpToggle = useCallback(() => {
      setShowHelp((prev) => !prev)
   }, [])

   const handleReset = useCallback(() => {
      setValue('rsvpTitle', '', { shouldValidate: true })
      setValue('rsvpDescription', '', { shouldValidate: true })
      setValue('rsvpOptions', [], { shouldValidate: true })
      setValue('rsvpButtonText', '', { shouldValidate: true })
      setValue('useKakaoTalk', false, { shouldValidate: true })
   }, [setValue])

   const handleTypeSelect = useCallback(
      (type) => {
         setSelectedType(type)
         const selectedType = invitationTypes.find((t) => t.id === type)
         setValue('rsvpTitle', selectedType.title, { shouldValidate: true })
         setValue('rsvpDescription', selectedType.description, { shouldValidate: true })
         setValue(
            'rsvpOptions',
            selectedType.options.filter((option) => option.required).map((option) => option.id),
            { shouldValidate: true }
         )
         setValue('rsvpButtonText', '참석 여부 알리기', { shouldValidate: true })
      },
      [setValue]
   )

   const handleOptionToggle = useCallback(
      (optionId) => {
         const currentOptions = watch('rsvpOptions') || []
         const option = currentType.options.find((opt) => opt.id === optionId)

         if (option.required) return // 필수 옵션은 토글 불가

         if (currentOptions.includes(optionId)) {
            setValue(
               'rsvpOptions',
               currentOptions.filter((id) => id !== optionId),
               { shouldValidate: true }
            )
         } else {
            setValue('rsvpOptions', [...currentOptions, optionId], { shouldValidate: true })
         }
      },
      [currentType, setValue, watch]
   )

   return (
      <SectionContainer component={motion.div} variants={fadeInUp} initial="initial" animate="animate" exit="exit" transition={easeTransition}>
         <SectionTitle>
            <TitleText>
               <HowToRegIcon className="icon" />
               <Box className="title">RSVP</Box>
            </TitleText>
            <IconButtonWrapper>
               <HelpOutlineIcon onClick={handleHelpToggle} />
               <RestartAltIcon onClick={handleReset} />
            </IconButtonWrapper>
         </SectionTitle>

         <AnimatePresence>
            {showHelp && (
               <HelpText>
                  <strong>RSVP 설정 도움말</strong>
                  <ul>
                     <li>초대장 유형에 맞는 RSVP 옵션을 선택해주세요.</li>
                     <li>필수 항목은 자동으로 선택되며 해제할 수 없습니다.</li>
                     <li>카카오톡 알림 기능을 활성화하면 실시간으로 답변을 받을 수 있습니다.</li>
                     <li>제목과 설명을 수정하여 개성있는 RSVP를 만들어보세요.</li>
                  </ul>
               </HelpText>
            )}
         </AnimatePresence>

         <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3, mt: 2 }}>
            {invitationTypes.map((type) => (
               <Tooltip key={type.id} title={`${type.label} RSVP 설정하기`}>
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
            <Controller name="rsvpTitle" control={control} defaultValue="" rules={{ required: 'RSVP 제목을 입력해주세요' }} render={({ field, fieldState: { error } }) => <StyledTextField {...field} label="RSVP 제목" placeholder={currentType.title} error={!!error} helperText={error?.message} />} />

            <Controller
               name="rsvpDescription"
               control={control}
               defaultValue=""
               rules={{ required: 'RSVP 설명을 입력해주세요' }}
               render={({ field, fieldState: { error } }) => <StyledTextField {...field} label="RSVP 설명" placeholder={currentType.description} error={!!error} helperText={error?.message} />}
            />

            <Box>
               <Typography variant="subtitle2" sx={{ mb: 1, color: COLORS.text.secondary }}>
                  RSVP 옵션 선택
               </Typography>
               <FormGroup>
                  {currentType.options.map((option) => (
                     <FormControlLabel
                        key={option.id}
                        control={
                           <Checkbox
                              checked={rsvpOptions.includes(option.id)}
                              onChange={() => handleOptionToggle(option.id)}
                              disabled={option.required}
                              sx={{
                                 color: COLORS.accent.main,
                                 '&.Mui-checked': {
                                    color: COLORS.accent.main,
                                 },
                              }}
                           />
                        }
                        label={
                           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {option.icon}
                              {option.label}
                              {option.required && (
                                 <Chip
                                    label="필수"
                                    size="small"
                                    sx={{
                                       backgroundColor: `${COLORS.accent.main}15`,
                                       color: COLORS.accent.main,
                                       height: '20px',
                                    }}
                                 />
                              )}
                           </Box>
                        }
                     />
                  ))}
               </FormGroup>
            </Box>

            <Controller
               name="rsvpButtonText"
               control={control}
               defaultValue=""
               rules={{ required: '버튼 텍스트를 입력해주세요' }}
               render={({ field, fieldState: { error } }) => <StyledTextField {...field} label="버튼 텍스트" placeholder="참석 여부 알리기" error={!!error} helperText={error?.message} />}
            />

            <Controller
               name="useKakaoTalk"
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
                     label="카카오톡으로 알림 받기"
                  />
               )}
            />
         </Box>

         {(rsvpTitle || rsvpDescription || rsvpOptions.length > 0) && (
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
               <Box sx={{ position: 'relative', zIndex: 1 }}>
                  {currentType.icon}
                  <Box sx={{ mt: 1, color: COLORS.accent.main, fontWeight: 500 }}>{currentType.label} RSVP</Box>
                  {rsvpTitle && <Box sx={{ mt: 2, color: COLORS.text.primary, fontSize: '1.2rem', fontWeight: 500 }}>{rsvpTitle}</Box>}
                  {rsvpDescription && <Box sx={{ mt: 1, color: COLORS.text.secondary }}>{rsvpDescription}</Box>}
                  {rsvpOptions.length > 0 && (
                     <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {rsvpOptions.map((optionId) => {
                           const option = currentType.options.find((opt) => opt.id === optionId)
                           return (
                              <Chip
                                 key={optionId}
                                 icon={option.icon}
                                 label={option.label}
                                 sx={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                    border: `1px solid ${COLORS.accent.main}15`,
                                 }}
                              />
                           )
                        })}
                     </Box>
                  )}
                  {rsvpButtonText && (
                     <Box
                        sx={{
                           mt: 2,
                           p: 1,
                           backgroundColor: COLORS.accent.main,
                           color: 'white',
                           borderRadius: '8px',
                           textAlign: 'center',
                           cursor: 'pointer',
                           transition: 'all 0.3s ease',
                           '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: `0 4px 12px ${COLORS.accent.main}25`,
                           },
                        }}
                     >
                        {rsvpButtonText}
                     </Box>
                  )}
                  {useKakaoTalk && (
                     <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, color: COLORS.text.secondary }}>
                        <img src="/kakao.png" alt="KakaoTalk" style={{ width: '20px', height: '20px' }} />
                        카카오톡으로 알림 받기
                     </Box>
                  )}
               </Box>
            </Box>
         )}
      </SectionContainer>
   )
}

export default RSVPSection
