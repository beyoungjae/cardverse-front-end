import React, { useState, useCallback } from 'react'
import { Box, Chip, Typography, Tooltip } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import MessageIcon from '@mui/icons-material/Message'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CelebrationIcon from '@mui/icons-material/Celebration'
import CakeIcon from '@mui/icons-material/Cake'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import { SectionContainer, SectionTitle, TitleText, StyledTextArea, HelpText, IconButtonWrapper, CharacterCount, fadeInUp, easeTransition, COLORS } from '../styles/commonStyles'

const greetingTemplates = {
   wedding: [
      {
         title: '따뜻한 감사',
         content: '소중한 분들을 초대합니다.\n\n저희 두 사람이 사랑으로 하나 되어\n새로운 출발을 시작하려 합니다.\n\n바쁘시더라도 부디 오셔서\n저희의 기쁜 시작을 함께 축복해 주시면\n감사하겠습니다.',
      },
      {
         title: '설렘 가득',
         content: '서로 다른 두 사람이 만나\n이제 한 길을 걸으려 합니다.\n\n새로운 시작의 자리에\n소중한 분들을 모시고 싶습니다.\n\n함께해 주시면 감사하겠습니다.',
      },
      {
         title: '영원한 약속',
         content: '평생을 함께하고 싶은 사람을 만났습니다.\n\n서로 아끼고 사랑하며\n이제 한 가정을 이루려 합니다.\n\n저희의 첫걸음에 축복을 더해주시면\n더없는 기쁨으로 간직하겠습니다.',
      },
      {
         title: '축복의 시작',
         content: '행복한 결혼 생활의 첫걸음을\n함께 축복해주시면 감사하겠습니다.\n\n사랑으로 맺어진 저희가\n오랜 인연을 이어갈 수 있도록\n많은 응원 부탁드립니다.',
      },
      {
         title: '행복의 순간',
         content: '서로가 서로에게\n가장 소중한 사람이 되었기에\n함께하길 약속했습니다.\n\n저희의 행복한 순간을\n함께 나누어주시면 좋겠습니다.',
      },
   ],
   newYear: [
      {
         title: '새해 인사',
         content: '한 해의 끝자락에서\n지난 시간을 되돌아보며\n새로운 희망을 그려봅니다.\n\n다가오는 새해에도\n늘 건강하시고 행복하시길 바라며\n따뜻한 마음을 전합니다.',
      },
      {
         title: '감사의 마음',
         content: '지난 한 해 동안\n베풀어주신 은혜에 감사드리며\n다가오는 새해에도\n더욱 건강하시고\n뜻하시는 모든 일이 이루어지길\n진심으로 기원합니다.',
      },
      {
         title: '희망찬 새해',
         content: '새로운 시작과 함께\n더 큰 꿈과 소망이 이뤄지길 바랍니다.\n\n한 해 동안 보내주신 격려에\n진심으로 감사드리며\n앞으로도 많은 관심 부탁드립니다.',
      },
   ],
   birthday: [
      {
         title: '감사와 축하',
         content: '칠순을 맞이하여\n그동안 베풀어주신 은혜에 감사드리며\n앞으로도 건강하고 행복한 날들이\n가득하시기를 기원합니다.\n\n오셔서 축하해 주시면\n더없는 기쁨이 되겠습니다.',
      },
      {
         title: '인생의 지혜',
         content: '70년의 세월 동안\n한결같은 마음으로 가족을 사랑하시고\n이웃을 배려하며 살아오신\n부모님의 귀한 생신을 맞이하여\n축하와 감사의 자리를 마련했습니다.',
      },
      {
         title: '인생의 축복',
         content: '인생의 새로운 장을 열며\n과거의 기억과 앞으로의 희망을\n함께 나누고 싶습니다.\n\n소중한 분들께서 함께해 주시면\n이보다 더 큰 축복은 없을 것 같습니다.',
      },
   ],
   invitation: [
      {
         title: '정중한 초대',
         content: '귀하를 모시고자 합니다.\n\n뜻깊은 자리에 함께하시어\n자리를 빛내주시면\n더없는 영광이겠습니다.\n\n바쁘시더라도 꼭 참석하시어\n자리를 빛내주시기 바랍니다.',
      },
      {
         title: '특별한 초대',
         content: '소중한 분을 모시고자 합니다.\n\n귀한 시간 내어주시어\n함께 해주신다면\n더없는 기쁨이 되겠습니다.\n\n부디 참석하시어\n자리를 빛내주시기 바랍니다.',
      },
      {
         title: '뜻깊은 만남',
         content: '이번 자리는 저희에게\n매우 소중하고 특별한 의미가 있습니다.\n\n함께 자리해 주신다면\n감사의 마음을 오래도록 간직하겠습니다.',
      },
   ],
}

const invitationTypes = [
   { id: 'wedding', label: '청첩장', icon: <FavoriteIcon /> },
   { id: 'newYear', label: '연하장', icon: <CelebrationIcon /> },
   { id: 'birthday', label: '고희연', icon: <CakeIcon /> },
   { id: 'invitation', label: '초빙장', icon: <EmojiEventsIcon /> },
]

const GreetingSection = () => {
   const [showHelp, setShowHelp] = useState(false)
   const [showTemplates, setShowTemplates] = useState(false)
   const [selectedType, setSelectedType] = useState('wedding')
   const { control, setValue, watch } = useFormContext()

   const greeting = watch('greeting')
   const currentType = invitationTypes.find((type) => type.id === selectedType)
   const currentTemplates = greetingTemplates[selectedType]

   const handleHelpToggle = useCallback(() => {
      setShowHelp((prev) => !prev)
   }, [])

   const handleTemplatesToggle = useCallback(() => {
      setShowTemplates((prev) => !prev)
   }, [])

   const handleTemplateSelect = useCallback(
      (template) => {
         setValue('greeting', template.content, { shouldValidate: true })
         setShowTemplates(false)
      },
      [setValue]
   )

   const handleReset = useCallback(() => {
      setValue('greeting', '', { shouldValidate: true })
   }, [setValue])

   const handleTypeSelect = useCallback(
      (type) => {
         setSelectedType(type)
         setValue('greeting', '', { shouldValidate: true })
      },
      [setValue]
   )

   return (
      <SectionContainer component={motion.div} variants={fadeInUp} initial="initial" animate="animate" exit="exit" transition={easeTransition}>
         <SectionTitle>
            <TitleText>
               <MessageIcon className="icon" />
               <Box className="title">인사말</Box>
            </TitleText>
            <IconButtonWrapper>
               <Tooltip title="기본 템플릿 보기">
                  <AutoFixHighIcon onClick={handleTemplatesToggle} />
               </Tooltip>
               <Tooltip title="도움말 보기">
                  <HelpOutlineIcon onClick={handleHelpToggle} />
               </Tooltip>
               <Tooltip title="초기화">
                  <RestartAltIcon onClick={handleReset} />
               </Tooltip>
            </IconButtonWrapper>
         </SectionTitle>

         <AnimatePresence>
            {showHelp && (
               <HelpText>
                  <strong>인사말 작성 도움말</strong>
                  <ul>
                     <li>초대장 유형에 맞는 인사말을 작성해보세요.</li>
                     <li>정성스럽게 작성된 인사말은 초대장의 품격을 높여줍니다.</li>
                     <li>기본 템플릿을 활용하여 쉽게 작성하실 수 있습니다.</li>
                     <li>최대 500자까지 입력 가능합니다.</li>
                  </ul>
               </HelpText>
            )}
         </AnimatePresence>

         <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3, mt: 2 }}>
            {invitationTypes.map((type) => (
               <Tooltip key={type.id} title={`${type.label} 인사말 작성하기`}>
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

         <AnimatePresence>
            {showTemplates && (
               <Box component={motion.div} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} sx={{ mt: 2, mb: 3 }}>
                  {currentTemplates.map((template, index) => (
                     <Box
                        key={index}
                        onClick={() => handleTemplateSelect(template)}
                        sx={{
                           position: 'relative',
                           p: 3,
                           mb: 2,
                           bgcolor: 'rgba(255, 255, 255, 0.8)',
                           borderRadius: 2,
                           cursor: 'pointer',
                           transition: 'all 0.3s ease',
                           border: `1px solid ${COLORS.accent.main}15`,
                           '&:hover': {
                              transform: 'translateY(-2px)',
                              bgcolor: 'white',
                              boxShadow: `0 4px 12px ${COLORS.accent.main}15`,
                           },
                        }}
                     >
                        <Typography variant="subtitle1" sx={{ mb: 1, color: COLORS.accent.main, fontWeight: 500 }}>
                           {template.title}
                        </Typography>
                        <FormatQuoteIcon
                           sx={{
                              position: 'absolute',
                              top: 8,
                              right: 8,
                              color: COLORS.accent.main,
                              opacity: 0.2,
                              fontSize: '1.5rem',
                           }}
                        />
                        <Box sx={{ whiteSpace: 'pre-line', color: COLORS.text.primary }}>{template.content}</Box>
                     </Box>
                  ))}
               </Box>
            )}
         </AnimatePresence>

         {/* 인사말 입력 부분 */}
         <Controller
            name="greeting"
            control={control}
            defaultValue=""
            rules={{
               required: '인사말을 입력해주세요',
               maxLength: {
                  value: 500,
                  message: '최대 500자까지 입력 가능합니다',
               },
            }}
            render={({ field, fieldState: { error } }) => {
               // 500자 초과 입력을 막기 위한 onChange 핸들러
               const handleChange = (e) => {
                  const text = e.target.value
                  // 500자 초과 시 잘라냄
                  if (text.length <= 500) {
                     field.onChange(text)
                  } else {
                     field.onChange(text.slice(0, 500))
                  }
               }

               return (
                  <Box>
                     <StyledTextArea
                        {...field}
                        multiline
                        rows={8}
                        placeholder="정성스러운 마음을 담아 인사말을 작성해주세요."
                        error={!!error}
                        helperText={error?.message}
                        // 긴 단어도 자동으로 줄바꿈되도록 스타일 지정
                        sx={{
                           whiteSpace: 'pre-wrap',
                           wordWrap: 'break-word',
                           overflowWrap: 'break-word',
                        }}
                        onChange={handleChange}
                     />
                     <CharacterCount>{field.value?.length || 0}/500</CharacterCount>
                  </Box>
               )
            }}
         />

         {/* 미리보기 영역 */}
         {greeting && (
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
                  <Box sx={{ mt: 1, color: COLORS.accent.main, fontWeight: 500 }}>{currentType.label} 미리보기</Box>
                  <Box
                     sx={{
                        mt: 2,
                        color: COLORS.text.primary,
                        // 긴 단어도 화면을 벗어나지 않도록 처리
                        whiteSpace: 'pre-wrap',
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        textAlign: 'center',
                        lineHeight: 1.8,
                     }}
                  >
                     {greeting}
                  </Box>
               </Box>
            </Box>
         )}
      </SectionContainer>
   )
}

export default GreetingSection
