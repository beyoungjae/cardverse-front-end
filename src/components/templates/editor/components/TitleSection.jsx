import React, { useState, useCallback } from 'react'
import { Box, Chip, IconButton, Tooltip } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import TitleIcon from '@mui/icons-material/Title'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import CelebrationIcon from '@mui/icons-material/Celebration'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CakeIcon from '@mui/icons-material/Cake'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import { SectionContainer, SectionTitle, TitleText, StyledTextField, HelpText, IconButtonWrapper, CharacterCount, fadeInUp, easeTransition, COLORS } from '../styles/commonStyles'

const invitationTypes = [
   { id: 'wedding', label: '청첩장', icon: <FavoriteIcon />, placeholders: ['우리의 특별한 순간에 초대합니다', '두 사람이 하나가 되는 날', '사랑으로 물들어가는 계절에', '새로운 시작을 함께 해주세요'] },
   { id: 'newYear', label: '연하장', icon: <CelebrationIcon />, placeholders: ['희망찬 새해를 맞이하며', '함께 나누는 새해의 기쁨', '새로운 시작, 새로운 희망', '따뜻한 마음을 전합니다'] },
   { id: 'birthday', label: '고희연', icon: <CakeIcon />, placeholders: ['인생의 아름다운 순간을 함께', '축복과 감사의 자리에 초대합니다', '70년의 세월을 감사하며', '귀한 발걸음을 청합니다'] },
   { id: 'invitation', label: '초빙장', icon: <EmojiEventsIcon />, placeholders: ['귀하를 모시고자 합니다', '특별한 자리에 초대합니다', '함께하는 영광을 나누고자 합니다', '소중한 시간을 함께 하고자 합니다'] },
]

const TitleSection = () => {
   const [showHelp, setShowHelp] = useState(false)
   const [currentPlaceholder, setCurrentPlaceholder] = useState(0)
   const [selectedType, setSelectedType] = useState('wedding')
   const { control, setValue, watch } = useFormContext()

   const currentType = invitationTypes.find((type) => type.id === selectedType)
   const title = watch('title')

   // 플레이스홀더 자동 변경
   React.useEffect(() => {
      const interval = setInterval(() => {
         setCurrentPlaceholder((prev) => (prev + 1) % currentType.placeholders.length)
      }, 3000)
      return () => clearInterval(interval)
   }, [currentType])

   const handleHelpToggle = useCallback(() => {
      setShowHelp((prev) => !prev)
   }, [])

   const handleReset = useCallback(() => {
      setValue('title', '', { shouldValidate: true })
   }, [setValue])

   const handleTypeSelect = useCallback(
      (type) => {
         setSelectedType(type)
         setValue('title', '', { shouldValidate: true })
      },
      [setValue]
   )

   return (
      <SectionContainer component={motion.div} variants={fadeInUp} initial="initial" animate="animate" exit="exit" transition={easeTransition}>
         <SectionTitle>
            <TitleText>
               <TitleIcon className="icon" />
               <Box className="title">제목</Box>
            </TitleText>
            <IconButtonWrapper>
               <AutoFixHighIcon onClick={() => setValue('title', currentType.placeholders[currentPlaceholder], { shouldValidate: true })} />
               <HelpOutlineIcon onClick={handleHelpToggle} />
               <RestartAltIcon onClick={handleReset} />
            </IconButtonWrapper>
         </SectionTitle>

         <AnimatePresence>
            {showHelp && (
               <HelpText>
                  <strong>제목 작성 도움말</strong>
                  <ul>
                     <li>초대장 유형을 선택하여 맞춤형 제목을 작성해보세요.</li>
                     <li>특수문자는 사용할 수 없으며, 2-20자 사이로 입력해주세요.</li>
                     <li>자동완성 버튼을 눌러 예시 제목을 사용할 수 있습니다.</li>
                     <li>선택한 유형에 맞는 감성적인 제목을 추천드립니다.</li>
                  </ul>
               </HelpText>
            )}
         </AnimatePresence>

         <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3, mt: 2 }}>
            {invitationTypes.map((type) => (
               <Tooltip key={type.id} title={`${type.label} 제목 작성하기`}>
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

         <Box sx={{ position: 'relative' }}>
            <Controller
               name="title"
               control={control}
               defaultValue=""
               rules={{
                  required: '제목을 입력해주세요',
                  minLength: {
                     value: 2,
                     message: '최소 2자 이상 입력해주세요',
                  },
                  maxLength: {
                     value: 20,
                     message: '최대 20자까지 입력 가능합니다',
                  },
               }}
               render={({ field, fieldState: { error } }) => (
                  <Box>
                     <StyledTextField
                        {...field}
                        fullWidth
                        placeholder={currentType.placeholders[currentPlaceholder]}
                        error={!!error}
                        helperText={error?.message}
                        style={{
                           borderColor: error ? COLORS.error : COLORS.border,
                        }}
                     />
                     <CharacterCount isNearLimit={field.value?.length >= 20}>{field.value?.length || 0}/20</CharacterCount>
                  </Box>
               )}
            />
         </Box>

         {title && (
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
                  textAlign: 'center',
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
                  <Box sx={{ mt: 1, color: COLORS.accent.main, fontWeight: 500 }}>{currentType.label}</Box>
                  <Box sx={{ mt: 1, color: COLORS.text.primary, fontSize: '1.2rem' }}>{title}</Box>
               </Box>
            </Box>
         )}
      </SectionContainer>
   )
}

export default TitleSection
