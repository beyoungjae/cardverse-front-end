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

const ErrorMessage = styled(motion.div)(({ theme }) => ({
   color: theme.palette.error.main,
   fontSize: '0.75rem',
   marginTop: theme.spacing(0.5),
}))

const TitleSection = ({ control }) => {
   const maxLength = 50
   const warningThreshold = 40

   return (
      <Box component={motion.div} layout sx={{ mb: 4 }}>
         <Typography variant="h6" gutterBottom>
            제목
         </Typography>
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
               <>
                  <TextField
                     {...field}
                     fullWidth
                     variant="outlined"
                     placeholder="초대장의 제목을 입력해주세요"
                     error={!!error}
                     component={motion.div}
                     whileTap={{ scale: 0.995 }}
                     whileFocus={{ scale: 1.005 }}
                     sx={{
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
                     }}
                  />
                  <AnimatePresence mode="wait">
                     {error && (
                        <ErrorMessage initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                           {error.message}
                        </ErrorMessage>
                     )}
                  </AnimatePresence>
                  <CharacterCount isNearLimit={field.value?.length >= warningThreshold}>
                     {field.value?.length || 0}/{maxLength}자
                  </CharacterCount>
               </>
            )}
         />
      </Box>
   )
}

export default TitleSection
