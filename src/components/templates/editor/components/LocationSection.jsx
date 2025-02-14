import React, { useState, useEffect } from 'react'
import { Box, TextField, Typography, InputAdornment, IconButton, Autocomplete, Collapse, CircularProgress } from '@mui/material'
import { Controller } from 'react-hook-form'
import { styled } from '@mui/material/styles'
import { motion, AnimatePresence } from 'framer-motion'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import DirectionsIcon from '@mui/icons-material/Directions'
import SearchIcon from '@mui/icons-material/Search'
import PlaceIcon from '@mui/icons-material/Place'
import { debounce } from 'lodash'

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

const PreviewBox = styled(motion.div)(({ theme }) => ({
   marginTop: theme.spacing(2),
   padding: theme.spacing(2),
   backgroundColor: theme.palette.grey[50],
   borderRadius: theme.shape.borderRadius,
   border: `1px solid ${theme.palette.divider}`,
}))

const InputContainer = styled(motion.div)(({ theme }) => ({
   marginBottom: theme.spacing(3),
   [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
   },
}))

const ErrorMessage = styled(motion.div)(({ theme }) => ({
   color: theme.palette.error.main,
   fontSize: '0.75rem',
   marginTop: theme.spacing(0.5),
}))

// 가상의 장소 검색 API 모킹
const mockPlacesAPI = async (query) => {
   await new Promise((resolve) => setTimeout(resolve, 500))
   const mockPlaces = [
      { id: 1, name: '그랜드 하얏트 서울', address: '서울특별시 용산구 소월로 322' },
      { id: 2, name: '롯데호텔 서울', address: '서울특별시 중구 을지로 30' },
      { id: 3, name: '웨스틴 조선 서울', address: '서울특별시 중구 소공로 106' },
      { id: 4, name: '반얀트리 클럽 앤 스파 서울', address: '서울특별시 중구 장충동2가 산 5-5' },
      { id: 5, name: '파크 하얏트 서울', address: '서울특별시 강남구 테헤란로 606' },
   ]
   return mockPlaces.filter((place) => place.name.toLowerCase().includes(query.toLowerCase()) || place.address.toLowerCase().includes(query.toLowerCase()))
}

const LocationSection = ({ control }) => {
   const [options, setOptions] = useState([])
   const [loading, setLoading] = useState(false)
   const [inputValue, setInputValue] = useState('')

   const searchPlaces = debounce(async (query) => {
      if (!query) {
         setOptions([])
         return
      }
      setLoading(true)
      try {
         const results = await mockPlacesAPI(query)
         setOptions(results)
      } catch (error) {
         console.error('장소 검색 중 오류 발생:', error)
         setOptions([])
      } finally {
         setLoading(false)
      }
   }, 300)

   useEffect(() => {
      searchPlaces(inputValue)
   }, [inputValue])

   return (
      <Box component={motion.div} layout sx={{ mb: 4 }}>
         <SectionTitle>장소</SectionTitle>

         <Controller
            name="location"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
               <InputContainer initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  <Autocomplete
                     value={value}
                     onChange={(event, newValue) => {
                        onChange(newValue ? `${newValue.name} (${newValue.address})` : '')
                     }}
                     inputValue={inputValue}
                     onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue)
                     }}
                     options={options}
                     getOptionLabel={(option) => (typeof option === 'string' ? option : `${option.name} (${option.address})`)}
                     loading={loading}
                     renderInput={(params) => (
                        <StyledTextField
                           {...params}
                           fullWidth
                           placeholder="장소를 검색해주세요"
                           error={!!error}
                           InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                 <>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                 </>
                              ),
                           }}
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
                     )}
                  />
                  <AnimatePresence mode="wait">
                     {error && (
                        <ErrorMessage initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                           {error.message}
                        </ErrorMessage>
                     )}
                  </AnimatePresence>
               </InputContainer>
            )}
         />

         <Controller
            name="traffic"
            control={control}
            defaultValue=""
            rules={{
               required: '오시는 길을 입력해주세요',
               minLength: {
                  value: 10,
                  message: '최소 10자 이상 입력해주세요',
               },
            }}
            render={({ field, fieldState: { error } }) => (
               <InputContainer initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
                     오시는 길
                  </Typography>
                  <StyledTextField
                     {...field}
                     fullWidth
                     multiline
                     rows={4}
                     variant="outlined"
                     placeholder="대중교통, 자가용 등 상세한 오시는 길을 안내해주세요"
                     error={!!error}
                     InputProps={{
                        startAdornment: (
                           <InputAdornment position="start">
                              <DirectionsIcon color={error ? 'error' : 'action'} />
                           </InputAdornment>
                        ),
                     }}
                  />
                  <AnimatePresence mode="wait">
                     {error ? (
                        <HelperText error initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} role="alert">
                           {error.message}
                        </HelperText>
                     ) : (
                        <HelperText initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                           자세한 교통편을 안내해주세요
                        </HelperText>
                     )}
                  </AnimatePresence>
               </InputContainer>
            )}
         />

         <AnimatePresence>
            {(control._formValues.location || control._formValues.traffic) && (
               <PreviewBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                     {control._formValues.location && (
                        <Box>
                           <Typography variant="subtitle2" color="primary" gutterBottom>
                              장소
                           </Typography>
                           <Typography variant="body2">{control._formValues.location}</Typography>
                        </Box>
                     )}
                     {control._formValues.traffic && (
                        <Box>
                           <Typography variant="subtitle2" color="primary" gutterBottom>
                              오시는 길
                           </Typography>
                           <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                              {control._formValues.traffic}
                           </Typography>
                        </Box>
                     )}
                  </Box>
               </PreviewBox>
            )}
         </AnimatePresence>
      </Box>
   )
}

export default LocationSection
