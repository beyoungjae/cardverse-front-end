import React from 'react'
import { Box, TextField, Typography, InputAdornment } from '@mui/material'
import { Controller } from 'react-hook-form'
import { styled } from '@mui/material/styles'
import { motion, AnimatePresence } from 'framer-motion'
import TitleIcon from '@mui/icons-material/Title'

const SectionTitle = styled(Typography)(({ theme }) => ({
   fontSize: '1.1rem',
   fontWeight: 500,
   marginBottom: theme.spacing(2),
   color: theme.palette.text.primary,
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
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

const InputContainer = styled(motion.div)(({ theme }) => ({
   marginBottom: theme.spacing(2),
   [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1),
   },
}))

const CharacterCount = styled(Typography)(({ theme, isNearLimit }) => ({
   fontSize: '0.75rem',
   color: isNearLimit ? theme.palette.warning.main : theme.palette.text.secondary,
   textAlign: 'right',
   marginTop: theme.spacing(0.5),
}))

const TitleSection = ({ control }) => {
   const maxLength = 50
   const warningThreshold = 40

   return (
      <Box sx={{ mb: 4 }}>
         <SectionTitle>초대장 제목</SectionTitle>
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
                  value: maxLength,
                  message: `최대 ${maxLength}자까지 입력 가능합니다`,
               },
            }}
            render={({ field, fieldState: { error } }) => (
               <InputContainer initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  <StyledTextField
                     {...field}
                     fullWidth
                     variant="outlined"
                     placeholder="특별한 날을 위한 멋진 제목을 입력해주세요"
                     error={!!error}
                     InputProps={{
                        startAdornment: (
                           <InputAdornment position="start">
                              <TitleIcon color={error ? 'error' : 'action'} />
                           </InputAdornment>
                        ),
                        sx: {
                           fontSize: '1.1rem',
                           '&::placeholder': {
                              fontSize: '0.9rem',
                           },
                        },
                     }}
                  />
                  <AnimatePresence mode="wait">
                     {error ? (
                        <HelperText error initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                           {error.message}
                        </HelperText>
                     ) : (
                        <HelperText initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                           특별한 날을 위한 멋진 제목을 입력해주세요
                        </HelperText>
                     )}
                  </AnimatePresence>
                  <CharacterCount isNearLimit={field.value?.length >= warningThreshold}>
                     {field.value?.length || 0}/{maxLength}자
                  </CharacterCount>
               </InputContainer>
            )}
         />
      </Box>
   )
}

export default TitleSection
