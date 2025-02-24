import React, { useState, useCallback } from 'react'
import { Box, Chip, Typography, IconButton, Tooltip, FormControlLabel, Checkbox, TextField, Avatar } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import PersonIcon from '@mui/icons-material/Person'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CelebrationIcon from '@mui/icons-material/Celebration'
import CakeIcon from '@mui/icons-material/Cake'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import { SectionContainer, SectionTitle, TitleText, StyledTextField, HelpText, IconButtonWrapper, fadeInUp, easeTransition, COLORS } from '../styles/commonStyles'
import useImageUpload from '../hooks/useImageUpload'

const invitationTypes = [
   {
      id: 'wedding',
      label: '청첩장',
      icon: <FavoriteIcon />,
      title: '예비 신랑 신부',
      description: '결혼을 앞둔 두 사람의 정보를 입력해주세요',
      profiles: [
         {
            label: '신랑',
            fields: [
               { name: 'name', label: '이름', placeholder: '신랑 이름을 입력해주세요' },
               { name: 'phone', label: '연락처', placeholder: '신랑 연락처를 입력해주세요' },
               { name: 'parents_father', label: '아버지', placeholder: '신랑 아버지 성함을 입력해주세요' },
               { name: 'parents_mother', label: '어머니', placeholder: '신랑 어머니 성함을 입력해주세요' },
            ],
         },
         {
            label: '신부',
            fields: [
               { name: 'name', label: '이름', placeholder: '신부 이름을 입력해주세요' },
               { name: 'phone', label: '연락처', placeholder: '신부 연락처를 입력해주세요' },
               { name: 'parents_father', label: '아버지', placeholder: '신부 아버지 성함을 입력해주세요' },
               { name: 'parents_mother', label: '어머니', placeholder: '신부 어머니 성함을 입력해주세요' },
            ],
         },
      ],
   },
   {
      id: 'newYear',
      label: '연하장',
      icon: <CelebrationIcon />,
      title: '보내는 분',
      description: '새해 인사를 전하는 분의 정보를 입력해주세요',
      profiles: [
         {
            label: '보내는 분',
            fields: [
               { name: 'name', label: '이름', placeholder: '이름을 입력해주세요' },
               { name: 'phone', label: '연락처', placeholder: '연락처를 입력해주세요' },
               { name: 'message', label: '새해 인사', placeholder: '새해 인사 메시지를 입력해주세요' },
            ],
         },
      ],
   },
   {
      id: 'birthday',
      label: '고희연',
      icon: <CakeIcon />,
      title: '주인공',
      description: '고희를 맞이하시는 분의 정보를 입력해주세요',
      profiles: [
         {
            label: '주인공',
            fields: [
               { name: 'name', label: '이름', placeholder: '이름을 입력해주세요' },
               { name: 'age', label: '연세', placeholder: '연세를 입력해주세요' },
               { name: 'children', label: '자녀', placeholder: '자녀분들의 이름을 입력해주세요' },
            ],
         },
      ],
   },
   {
      id: 'invitation',
      label: '초빙장',
      icon: <EmojiEventsIcon />,
      title: '초대하는 분',
      description: '초대하시는 분의 정보를 입력해주세요',
      profiles: [
         {
            label: '초대자',
            fields: [
               { name: 'name', label: '이름/단체명', placeholder: '이름 또는 단체명을 입력해주세요' },
               { name: 'title', label: '직함', placeholder: '직함을 입력해주세요' },
               { name: 'contact', label: '연락처', placeholder: '연락처를 입력해주세요' },
            ],
         },
      ],
   },
]

const formatPhoneNumber = (value) => {
   const numbers = value.replace(/[^\d]/g, '') // 숫자만 남김

   if (numbers.startsWith('02')) {
      // 서울 지역번호 (02)
      if (numbers.length <= 2) return numbers
      if (numbers.length <= 5) return `${numbers.slice(0, 2)}-${numbers.slice(2)}`
      return `${numbers.slice(0, 2)}-${numbers.slice(2, 5)}-${numbers.slice(5, 9)}`
   } else if (/^0[3-9][0-9]/.test(numbers)) {
      // 03X~09X 지역번호 (부산 051, 대구 053 등)
      if (numbers.length <= 3) return numbers
      if (numbers.length <= 6) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`
   } else if (numbers.startsWith('010')) {
      // 휴대폰 번호 (010)
      if (numbers.length <= 3) return numbers
      if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`
   } else {
      // 기타 번호
      return numbers
   }
}

const ProfileSection = ({ currentType: propType, onTypeChange }) => {
   const [showHelp, setShowHelp] = useState(false)
   const { control, setValue, watch } = useFormContext()
   const { uploadImage, deleteUploadedImage } = useImageUpload()

   const currentType = invitationTypes.find((type) => type.id === propType)
   const profiles = watch('profiles') || []
   const showProfiles = watch('showProfiles')

   const handleHelpToggle = useCallback(() => {
      setShowHelp((prev) => !prev)
   }, [])

   const handleReset = useCallback(() => {
      setValue('profiles', [], { shouldValidate: true })
      setValue('showProfiles', false, { shouldValidate: true })
      onTypeChange('wedding')
   }, [setValue, onTypeChange])

   const handleTypeSelect = useCallback(
      (type) => {
         setValue('profiles', [], { shouldValidate: true })
         onTypeChange(type)
      },
      [setValue, onTypeChange]
   )

   const handleImageUpload = async (event, profileIndex) => {
      const file = event.target.files[0]
      if (!file) return

      const uploadedImage = await uploadImage(file, 'profile')
      if (uploadedImage) {
         const updatedProfiles = [...profiles]
         updatedProfiles[profileIndex] = {
            ...updatedProfiles[profileIndex],
            image: uploadedImage.url,
            imageId: uploadedImage.id,
         }
         setValue('profiles', updatedProfiles, { shouldValidate: true })
      }
   }

   const isPhoneField = (name) => name === 'phone' || name === 'contact'
   const isAgeField = (name) => name === 'age'

   return (
      <SectionContainer component={motion.div} variants={fadeInUp} initial="initial" animate="animate" exit="exit" transition={easeTransition}>
         <SectionTitle>
            <TitleText>
               <PersonIcon className="icon" />
               <Box className="title">기본 정보</Box>
            </TitleText>
            <IconButtonWrapper>
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
                  <strong>기본 정보 설정 도움말</strong>
                  <ul>
                     <li>초대장 유형에 맞는 기본 정보를 입력해주세요.</li>
                     <li>프로필 이미지는 선택사항이며, 정사각형 이미지를 권장합니다.</li>
                     <li>모든 필드를 정확하게 입력해주세요.</li>
                     <li>입력한 정보는 초대장에 표시됩니다.</li>
                  </ul>
               </HelpText>
            )}
         </AnimatePresence>

         <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3, mt: 2 }}>
            {invitationTypes.map((type) => (
               <Tooltip key={type.id} title={`${type.label} 기본 정보 설정하기`}>
                  <Chip
                     icon={type.icon}
                     label={type.label}
                     onClick={() => handleTypeSelect(type.id)}
                     sx={{
                        backgroundColor: propType === type.id ? `${COLORS.accent.main}15` : 'rgba(255, 255, 255, 0.8)',
                        color: propType === type.id ? COLORS.accent.main : COLORS.text.primary,
                        border: `1px solid ${propType === type.id ? COLORS.accent.main : COLORS.accent.main}15`,
                        '&:hover': {
                           backgroundColor: propType === type.id ? `${COLORS.accent.main}25` : 'white',
                           transform: 'translateY(-2px)',
                           boxShadow: `0 4px 12px ${COLORS.accent.main}15`,
                        },
                        transition: 'all 0.3s ease',
                     }}
                  />
               </Tooltip>
            ))}
         </Box>

         <Box>
            <Controller
               name="showProfiles"
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
                     label="기본 정보 표시"
                  />
               )}
            />
         </Box>

         <AnimatePresence>
            {showProfiles && (
               <Box component={motion.div} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  {currentType.profiles.map((profile, profileIndex) => (
                     <Box
                        key={profileIndex}
                        sx={{
                           mt: 2,
                           p: 3,
                           backgroundColor: 'rgba(255, 255, 255, 0.8)',
                           borderRadius: '12px',
                           border: `1px solid ${COLORS.accent.main}15`,
                        }}
                     >
                        <Typography variant="subtitle2" sx={{ mb: 2, color: COLORS.text.secondary }}>
                           {profile.label}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                           <Box sx={{ position: 'relative', mr: 2 }}>
                              <Avatar
                                 src={profiles[profileIndex]?.image}
                                 sx={{
                                    width: 80,
                                    height: 80,
                                    backgroundColor: `${COLORS.accent.main}15`,
                                    color: COLORS.accent.main,
                                 }}
                              >
                                 <PersonIcon />
                              </Avatar>
                              <input accept="image/*" type="file" id={`profile-image-${profileIndex}`} style={{ display: 'none' }} onChange={(e) => handleImageUpload(e, profileIndex)} />
                              <label htmlFor={`profile-image-${profileIndex}`}>
                                 <IconButton
                                    component="span"
                                    sx={{
                                       position: 'absolute',
                                       bottom: -8,
                                       right: -8,
                                       backgroundColor: 'white',
                                       boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                       '&:hover': {
                                          backgroundColor: 'white',
                                       },
                                    }}
                                 >
                                    <AddPhotoAlternateIcon sx={{ fontSize: 20, color: COLORS.accent.main }} />
                                 </IconButton>
                              </label>
                           </Box>
                           <Box sx={{ flex: 1 }}>
                              <Typography variant="caption" sx={{ color: COLORS.text.secondary }}>
                                 프로필 이미지 업로드 (선택사항)
                              </Typography>
                           </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                           {profile.fields.map((field, fieldIndex) => (
                              <Controller
                                 key={fieldIndex}
                                 name={`profiles.${profileIndex}.${field.name}`}
                                 control={control}
                                 defaultValue=""
                                 rules={{
                                    required: `${field.label}을(를) 입력해주세요`,
                                    ...(isPhoneField(field.name) && {
                                       pattern: {
                                          value: /^\d{3}-\d{3,4}-\d{4}$/,
                                          message: '올바른 전화번호 형식이 아닙니다',
                                       },
                                    }),
                                    ...(isAgeField(field.name) && {
                                       pattern: {
                                          value: /^\d{2}$/,
                                          message: '2자리 숫자를 입력해주세요',
                                       },
                                    }),
                                 }}
                                 render={({ field: { value, onChange }, fieldState: { error } }) => (
                                    <StyledTextField
                                       label={field.label}
                                       placeholder={field.placeholder}
                                       value={value}
                                       onChange={(e) => {
                                          if (isPhoneField(field.name)) {
                                             const formatted = formatPhoneNumber(e.target.value)
                                             if (formatted.length <= 13) {
                                                onChange(formatted)
                                             }
                                          } else {
                                             onChange(e.target.value)
                                          }
                                       }}
                                       error={!!error}
                                       helperText={error?.message}
                                       inputProps={{
                                          inputMode: isPhoneField(field.name) ? 'numeric' : 'text',
                                       }}
                                    />
                                 )}
                              />
                           ))}
                        </Box>
                     </Box>
                  ))}
               </Box>
            )}
         </AnimatePresence>

         {profiles.length > 0 && showProfiles && (
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
                  <Box sx={{ mt: 1, color: COLORS.accent.main, fontWeight: 500 }}>{currentType.title}</Box>
                  <Box sx={{ mt: 1, color: COLORS.text.secondary, fontSize: '0.9rem' }}>{currentType.description}</Box>
                  <Box sx={{ mt: 2 }}>
                     {profiles.map((profile, index) => (
                        <Box
                           key={index}
                           sx={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              p: 2,
                              mt: 1,
                              backgroundColor: 'white',
                              borderRadius: '8px',
                              border: `1px solid ${COLORS.accent.main}15`,
                           }}
                        >
                           <Avatar
                              src={profile.image}
                              sx={{
                                 width: 60,
                                 height: 60,
                                 mr: 2,
                                 backgroundColor: `${COLORS.accent.main}15`,
                                 color: COLORS.accent.main,
                              }}
                           >
                              <PersonIcon />
                           </Avatar>
                           <Box>
                              <Typography sx={{ color: COLORS.text.secondary, fontSize: '0.9rem' }}>{currentType.profiles[index].label}</Typography>
                              {currentType.profiles[index].fields.map((field, fieldIndex) => (
                                 <Typography key={fieldIndex} sx={{ color: COLORS.text.primary, mt: 0.5 }}>
                                    {field.label}: {profile[field.name]}
                                 </Typography>
                              ))}
                           </Box>
                        </Box>
                     ))}
                  </Box>
               </Box>
            </Box>
         )}
      </SectionContainer>
   )
}

export default ProfileSection
