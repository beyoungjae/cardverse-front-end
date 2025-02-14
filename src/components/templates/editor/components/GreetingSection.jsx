import React, { useRef, useEffect, useState } from 'react'
import { Box, TextField, Typography, InputAdornment } from '@mui/material'
import { Controller } from 'react-hook-form'
import { styled } from '@mui/material/styles'
import { motion, AnimatePresence } from 'framer-motion'
import MessageIcon from '@mui/icons-material/Message'
import { TextareaAutosize } from '@mui/base'

const SectionTitle = styled(Typography)(({ theme }) => ({
   fontSize: '1.1rem',
   fontWeight: 500,
   marginBottom: theme.spacing(2),
   color: theme.palette.text.primary,
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
   '& .MuiOutlinedInput-root': {
      transition: theme.transitions.create(['border-color', 'box-shadow', 'min-height']),
      '&:hover fieldset': {
         borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
         borderColor: theme.palette.primary.main,
      },
   },
   '& .MuiInputBase-multiline': {
      lineHeight: 1.8,
      padding: theme.spacing(2),
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
   transition: 'color 0.3s ease',
}))

const PlaceholderText = styled(Typography)(({ theme }) => ({
   color: theme.palette.text.secondary,
   fontSize: '0.9rem',
   marginBottom: theme.spacing(1),
   fontStyle: 'italic',
}))

const ErrorMessage = styled(motion.div)(({ theme }) => ({
   color: theme.palette.error.main,
   fontSize: '0.75rem',
   marginTop: theme.spacing(0.5),
}))

const GreetingSection = ({ control }) => {
   const textareaRef = useRef(null)
   const maxLength = 500
   const warningThreshold = 400

   const placeholderSuggestions = ['소중한 분들을 초대합니다.', '함께 나누고 싶은 특별한 순간입니다.', '여러분의 축하와 함께하고 싶습니다.']

   useEffect(() => {
      if (textareaRef.current) {
         textareaRef.current.style.height = 'auto'
         textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
      }
   }, [])

   return (
      <Box component={motion.div} layout sx={{ mb: 4 }}>
         <SectionTitle>인사말</SectionTitle>
         <AnimatePresence mode="wait">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
               <PlaceholderText>{placeholderSuggestions[Math.floor(Math.random() * placeholderSuggestions.length)]}</PlaceholderText>
            </motion.div>
         </AnimatePresence>

         <Controller
            name="greeting"
            control={control}
            defaultValue=""
            rules={{
               required: '인사말을 입력해주세요',
               minLength: {
                  value: 10,
                  message: '최소 10자 이상 입력해주세요',
               },
               maxLength: {
                  value: maxLength,
                  message: `최대 ${maxLength}자까지 입력 가능합니다`,
               },
            }}
            render={({ field, fieldState: { error } }) => (
               <>
                  <StyledTextField
                     {...field}
                     multiline
                     minRows={6}
                     maxRows={12}
                     fullWidth
                     variant="outlined"
                     placeholder="소중한 분들을 위한 따뜻한 인사말을 작성해주세요"
                     error={!!error}
                     InputProps={{
                        startAdornment: (
                           <InputAdornment position="start">
                              <MessageIcon color={error ? 'error' : 'action'} />
                           </InputAdornment>
                        ),
                        inputComponent: TextareaAutosize,
                        'aria-label': '인사말 입력',
                        'aria-describedby': 'greeting-helper-text',
                        'aria-invalid': !!error,
                     }}
                  />
                  <AnimatePresence mode="wait">
                     {error ? (
                        <ErrorMessage initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                           {error.message}
                        </ErrorMessage>
                     ) : (
                        <HelperText id="greeting-helper-text" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                           정성스러운 인사말로 마음을 전해보세요
                        </HelperText>
                     )}
                  </AnimatePresence>
                  <CharacterCount isNearLimit={field.value?.length >= warningThreshold} role="status" aria-live="polite">
                     {field.value?.length || 0}/{maxLength}자
                  </CharacterCount>
               </>
            )}
         />
      </Box>
   )
}

export default GreetingSection
