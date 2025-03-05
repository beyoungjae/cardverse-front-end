import React, { useState, useCallback } from 'react'
import { Box, Chip, Typography, IconButton, Tooltip, FormControlLabel, Checkbox } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CelebrationIcon from '@mui/icons-material/Celebration'
import CakeIcon from '@mui/icons-material/Cake'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import { SectionContainer, SectionTitle, TitleText, StyledTextField, HelpText, IconButtonWrapper, fadeInUp, easeTransition, COLORS } from '../styles/commonStyles'
import { width } from '@mui/system'

// 초대장 유형 정의
const invitationTypes = [
   {
      id: 'wedding',
      label: '청첩장',
      icon: <FavoriteIcon />,
      title: '마음 전하실 곳',
      description: '축하의 마음을 전달해주세요',
      accounts: [
         { label: '신랑측', placeholder: '신랑 계좌번호를 입력해주세요' },
         { label: '신부측', placeholder: '신부 계좌번호를 입력해주세요' },
      ],
   },
   {
      id: 'newyear',
      label: '연하장',
      icon: <CelebrationIcon />,
      title: '새해 선물 전하실 곳',
      description: '따뜻한 마음을 전달해주세요',
      accounts: [{ label: '보내는 분', placeholder: '계좌번호를 입력해주세요' }],
   },
   {
      id: 'gohyeyon',
      label: '고희연',
      icon: <CakeIcon />,
      title: '축하의 마음 전하실 곳',
      description: '감사의 마음을 전달해주세요',
      accounts: [{ label: '자녀대표', placeholder: '대표 계좌번호를 입력해주세요' }],
   },
   {
      id: 'invitation',
      label: '초빙장',
      icon: <EmojiEventsIcon />,
      title: '감사의 마음 전하실 곳',
      description: '소중한 마음을 전달해주세요',
      accounts: [{ label: '대표계좌', placeholder: '계좌번호를 입력해주세요' }],
   },
]

// 은행 목록
const banks = ['국민은행', '신한은행', '우리은행', '하나은행', '농협은행', '기업은행', '카카오뱅크', '토스뱅크', '새마을금고', '우체국']

// 계좌번호 포맷 함수 (숫자와 하이픈만 허용)
const formatAccountNumber = (value) => {
   // 숫자와 하이픈만 남기고 나머지는 제거
   return value.replace(/[^\d-]/g, '')
}

const AccountSection = () => {
   const [showHelp, setShowHelp] = useState(false)
   const [selectedType, setSelectedType] = useState('wedding')
   const { control, setValue, watch } = useFormContext()

   const currentType = invitationTypes.find((type) => type.id === selectedType)
   const accounts = watch('accounts') || []
   const showAccounts = watch('showAccounts')

   const handleHelpToggle = useCallback(() => {
      setShowHelp((prev) => !prev)
   }, [])

   const handleReset = useCallback(() => {
      setValue('accounts', [], { shouldValidate: true })
      setValue('showAccounts', false, { shouldValidate: true })
   }, [setValue])

   const handleTypeSelect = useCallback(
      (type) => {
         setSelectedType(type)
         setValue('type', type, { shouldValidate: true })
         setValue('accounts', [], { shouldValidate: true })
      },
      [setValue]
   )

   const handleCopyAccount = useCallback((account) => {
      navigator.clipboard.writeText(`${account.bank} ${account.number} ${account.holder}`)
   }, [])

   const getAccountLabel = (index) => {
      const labels = {
         wedding: ['신랑측', '신부측'],
         newyear: ['보내는 분'],
         gohyeyon: ['자녀대표'],
         invitation: ['대표계좌'],
      }[selectedType]
      return labels[index] || labels[0]
   }

   return (
      <SectionContainer component={motion.div} variants={fadeInUp} initial="initial" animate="animate" exit="exit" transition={easeTransition}>
         <SectionTitle>
            <TitleText>
               <AccountBalanceIcon className="icon" />
               <Box className="title">계좌번호</Box>
            </TitleText>
            <IconButtonWrapper>
               <HelpOutlineIcon onClick={handleHelpToggle} />
               <RestartAltIcon onClick={handleReset} />
            </IconButtonWrapper>
         </SectionTitle>

         <AnimatePresence>
            {showHelp && (
               <HelpText>
                  <strong>계좌번호 설정 도움말</strong>
                  <ul>
                     <li>초대장 유형에 맞는 계좌번호 정보를 입력해주세요.</li>
                     <li>은행명, 계좌번호, 예금주를 정확히 입력해주세요.</li>
                     <li>계좌번호는 숫자와 하이픈(-)만 입력 가능합니다.</li>
                     <li>복사 버튼을 통해 손쉽게 계좌정보를 복사할 수 있습니다.</li>
                  </ul>
               </HelpText>
            )}
         </AnimatePresence>

         <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3, mt: 2 }}>
            {invitationTypes.map((type) => (
               <Tooltip key={type.id} title={`${type.label} 계좌번호 설정하기`}>
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

         <Box>
            <Controller
               name="showAccounts"
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
                     label="계좌번호 정보 표시"
                  />
               )}
            />
         </Box>

         <AnimatePresence>
            {showAccounts && (
               <Box component={motion.div} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  {currentType.accounts.map((accountType, index) => (
                     <Box
                        key={index}
                        sx={{
                           mt: 2,
                           p: 3,
                           backgroundColor: 'rgba(255, 255, 255, 0.8)',
                           borderRadius: '12px',
                           border: `1px solid ${COLORS.accent.main}15`,
                        }}
                     >
                        <Typography variant="subtitle2" sx={{ mb: 2, color: COLORS.text.secondary }}>
                           {accountType.label}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                           <Controller
                              name={`accounts.${index}.bank`}
                              control={control}
                              defaultValue=""
                              rules={{ required: '은행을 선택해주세요' }}
                              render={({ field, fieldState: { error } }) => (
                                 <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                    {banks.map((bank) => (
                                       <Chip
                                          key={bank}
                                          label={bank}
                                          onClick={() => field.onChange(bank)}
                                          sx={{
                                             backgroundColor: field.value === bank ? `${COLORS.accent.main}15` : 'white',
                                             color: field.value === bank ? COLORS.accent.main : COLORS.text.primary,
                                             border: `1px solid ${field.value === bank ? COLORS.accent.main : COLORS.accent.main}15`,
                                          }}
                                       />
                                    ))}
                                    {error && <Typography sx={{ color: COLORS.error, fontSize: '0.75rem', width: '100%', mt: 1 }}>{error.message}</Typography>}
                                 </Box>
                              )}
                           />
                           <Controller
                              name={`accounts.${index}.number`}
                              control={control}
                              defaultValue=""
                              rules={{
                                 required: '계좌번호를 입력해주세요',
                                 pattern: {
                                    value: /^[0-9-]*$/,
                                    message: '숫자와 하이픈(-)만 입력 가능합니다',
                                 },
                              }}
                              render={({ field, fieldState: { error } }) => {
                                 const { value, onChange, ...rest } = field
                                 // 입력 시 자동 포맷 적용
                                 const handleNumberChange = (e) => {
                                    const formattedValue = formatAccountNumber(e.target.value)
                                    onChange(formattedValue)
                                 }
                                 return (
                                    <motion.div
                                       // 에러 발생 시 좌우 흔들림 애니메이션 적용
                                       animate={error ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                                       transition={{ duration: error ? 0.4 : 0 }}
                                    >
                                       <StyledTextField {...rest} value={value} onChange={handleNumberChange} placeholder={accountType.placeholder} error={!!error} helperText={error?.message} sx={{ width: '230px' }} />
                                    </motion.div>
                                 )
                              }}
                           />
                           <Controller
                              name={`accounts.${index}.holder`}
                              control={control}
                              defaultValue=""
                              rules={{ required: '예금주를 입력해주세요' }}
                              render={({ field, fieldState: { error } }) => <StyledTextField {...field} placeholder="예금주명을 입력해주세요" error={!!error} helperText={error?.message} sx={{ width: '230px' }} />}
                           />
                        </Box>
                     </Box>
                  ))}
               </Box>
            )}
         </AnimatePresence>

         {accounts.length > 0 && showAccounts && (
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
               }}
            >
               <Box sx={{ position: 'relative', zIndex: 1 }}>
                  {currentType.icon}
                  <Box sx={{ mt: 1, color: COLORS.accent.main, fontWeight: 500 }}>{currentType.title}</Box>
                  <Box sx={{ mt: 1, color: COLORS.text.secondary, fontSize: '0.9rem' }}>{currentType.description}</Box>
                  <Box sx={{ mt: 2 }}>
                     {accounts.map(
                        (account, index) =>
                           account.bank &&
                           account.number &&
                           account.holder && (
                              <Box
                                 key={index}
                                 sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    p: 2,
                                    mt: 1,
                                    backgroundColor: 'white',
                                    borderRadius: '8px',
                                    border: `1px solid ${COLORS.accent.main}15`,
                                 }}
                              >
                                 <Box>
                                    <Typography sx={{ color: COLORS.text.secondary, fontSize: '0.9rem' }}>{getAccountLabel(index)}</Typography>
                                    <Typography sx={{ color: COLORS.text.primary, mt: 0.5 }}>
                                       {account.bank} {account.number}
                                    </Typography>
                                    <Typography sx={{ color: COLORS.text.secondary, fontSize: '0.9rem', mt: 0.5 }}>{account.holder}</Typography>
                                 </Box>
                                 <IconButton
                                    onClick={() => handleCopyAccount(account)}
                                    sx={{
                                       color: COLORS.accent.main,
                                       '&:hover': {
                                          backgroundColor: `${COLORS.accent.main}15`,
                                       },
                                    }}
                                 >
                                    <ContentCopyIcon />
                                 </IconButton>
                              </Box>
                           )
                     )}
                  </Box>
               </Box>
            </Box>
         )}
      </SectionContainer>
   )
}

export default AccountSection
