import React, { useState, useCallback, useMemo } from 'react'
import { Box, Chip, InputAdornment, CircularProgress, Typography, IconButton, Tooltip, FormControlLabel, Checkbox } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { styled } from '@mui/material/styles'
import { SectionContainer, SectionTitle, TitleText, StyledTextField, HelpText, IconButtonWrapper, fadeInUp, easeTransition, COLORS } from '../styles/commonStyles'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import SearchIcon from '@mui/icons-material/Search'
import MapIcon from '@mui/icons-material/Map'
import DirectionsIcon from '@mui/icons-material/Directions'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CelebrationIcon from '@mui/icons-material/Celebration'
import CakeIcon from '@mui/icons-material/Cake'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import SubwayIcon from '@mui/icons-material/DirectionsSubway'
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import { debounce } from 'lodash'

const SearchResults = styled(motion.div)(({ theme }) => ({
   position: 'absolute',
   top: '100%',
   left: 0,
   right: 0,
   backgroundColor: 'rgba(255, 255, 255, 0.95)',
   backdropFilter: 'blur(10px)',
   borderRadius: '12px',
   boxShadow: `0 8px 32px ${COLORS.accent.main}15`,
   zIndex: 1000,
   marginTop: theme.spacing(1),
   maxHeight: '300px',
   overflowY: 'auto',
   border: `1px solid ${COLORS.accent.main}15`,
   '&::-webkit-scrollbar': {
      width: '8px',
   },
   '&::-webkit-scrollbar-track': {
      background: 'transparent',
   },
   '&::-webkit-scrollbar-thumb': {
      background: COLORS.accent.main,
      borderRadius: '4px',
      '&:hover': {
         background: COLORS.accent.dark,
      },
   },
}))

const SearchResultItem = styled(motion.div)(({ theme }) => ({
   padding: theme.spacing(2),
   cursor: 'pointer',
   transition: 'all 0.3s ease',
   borderBottom: `1px solid ${COLORS.accent.main}15`,
   backgroundColor: 'rgba(255, 255, 255, 0.8)',
   '&:last-child': {
      borderBottom: 'none',
   },
   '&:hover': {
      backgroundColor: 'white',
      transform: 'translateX(8px)',
      boxShadow: `0 4px 12px ${COLORS.accent.main}15`,
   },
}))

const MapPreview = styled(motion.div)(({ theme }) => ({
   marginTop: theme.spacing(3),
   padding: theme.spacing(3),
   backgroundColor: 'rgba(255, 255, 255, 0.9)',
   backdropFilter: 'blur(10px)',
   borderRadius: '12px',
   cursor: 'pointer',
   border: `1px dashed ${COLORS.accent.main}`,
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   gap: theme.spacing(2),
   transition: 'all 0.3s ease',
   '&:hover': {
      backgroundColor: '#FFFFFF',
      transform: 'translateY(-4px)',
      boxShadow: `0 12px 48px ${COLORS.accent.main}15`,
   },
}))

const QuickLocationChips = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexWrap: 'wrap',
   gap: theme.spacing(1),
   marginTop: theme.spacing(2),
   marginBottom: theme.spacing(3),
}))

// 위치 검색 결과 캐싱
const locationCache = new Map()
const CACHE_EXPIRY = 1000 * 60 * 30 // 30분

const useLocationCache = () => {
   const getCachedResult = useCallback((query) => {
      const cached = locationCache.get(query)
      if (!cached) return null
      if (Date.now() - cached.timestamp > CACHE_EXPIRY) {
         locationCache.delete(query)
         return null
      }
      return cached.data
   }, [])

   const setCachedResult = useCallback((query, data) => {
      locationCache.set(query, {
         data,
         timestamp: Date.now(),
      })
   }, [])

   return { getCachedResult, setCachedResult }
}

// 위치 검색 API 모의 구현
const searchLocations = async (query) => {
   return new Promise((resolve) => {
      setTimeout(() => {
         resolve([
            {
               id: 1,
               name: '그랜드 호텔',
               address: '서울시 강남구 테헤란로 123',
               coordinates: { lat: 37.5665, lng: 126.978 },
               type: '호텔',
            },
            {
               id: 2,
               name: '시그니처 웨딩홀',
               address: '서울시 서초구 반포대로 456',
               coordinates: { lat: 37.5028, lng: 127.0244 },
               type: '웨딩홀',
            },
            {
               id: 3,
               name: '더 파티움',
               address: '서울시 송파구 올림픽로 789',
               coordinates: { lat: 37.5139, lng: 127.0589 },
               type: '연회장',
            },
         ])
      }, 500)
   })
}

const quickLocations = [
   { label: '호텔', icon: '🏨' },
   { label: '웨딩홀', icon: '💒' },
   { label: '연회장', icon: '🎪' },
   { label: '레스토랑', icon: '🍽️' },
]

const invitationTypes = [
   {
      id: 'wedding',
      label: '청첩장',
      icon: <FavoriteIcon />,
      placeholders: {
         name: '더 채플앳청담',
         address: '서울특별시 강남구 청담동 123-45',
         detail: '6층 채플홀',
         guide: '지하철 7호선 청담역 13번 출구에서 도보 5분\n주차 가능',
      },
   },
   {
      id: 'newYear',
      label: '연하장',
      icon: <CelebrationIcon />,
      placeholders: {
         name: '그랜드볼룸',
         address: '서울특별시 중구 을지로 123-45',
         detail: '3층 연회장',
         guide: '지하철 2호선 을지로입구역 1번 출구에서 도보 3분\n발렛파킹 가능',
      },
   },
   {
      id: 'birthday',
      label: '고희연',
      icon: <CakeIcon />,
      placeholders: {
         name: '한옥리움',
         address: '서울특별시 종로구 삼청동 123-45',
         detail: '안채 연회장',
         guide: '지하철 3호선 안국역 2번 출구에서 도보 10분\n주차 가능',
      },
   },
   {
      id: 'invitation',
      label: '초빙장',
      icon: <EmojiEventsIcon />,
      placeholders: {
         name: '코엑스 컨퍼런스룸',
         address: '서울특별시 강남구 삼성동 123-45',
         detail: '4층 그랜드볼룸',
         guide: '지하철 2호선 삼성중앙역 5번 출구에서 도보 5분\n지하주차장 이용 가능',
      },
   },
]

const LocationSection = () => {
   const [showHelp, setShowHelp] = useState(false)
   const [showQuickLocations, setShowQuickLocations] = useState(false)
   const [searchState, setSearchState] = useState({
      query: '',
      results: [],
      isLoading: false,
      error: null,
   })
   const [selectedLocation, setSelectedLocation] = useState(null)
   const { getCachedResult, setCachedResult } = useLocationCache()
   const { control, setValue, watch } = useFormContext()
   const [selectedType, setSelectedType] = useState('wedding')

   const currentType = invitationTypes.find((type) => type.id === selectedType)
   const locationName = watch('locationName')
   const locationAddress = watch('locationAddress')
   const locationDetail = watch('locationDetail')
   const locationGuide = watch('locationGuide')
   const showMap = watch('showMap')
   const showNavigation = watch('showNavigation')

   const field = {
      name: 'location',
      control: control,
      defaultValue: '',
      rules: {
         required: '장소를 입력해주세요',
      },
   }

   const handleSearch = useMemo(
      () =>
         debounce(async (query) => {
            if (!query || query.length < 2) {
               setSearchState((prev) => ({ ...prev, results: [], isLoading: false }))
               return
            }

            const cached = getCachedResult(query)
            if (cached) {
               setSearchState((prev) => ({
                  ...prev,
                  results: cached,
                  isLoading: false,
               }))
               return
            }

            setSearchState((prev) => ({ ...prev, isLoading: true }))
            try {
               const results = await searchLocations(query)
               setCachedResult(query, results)
               setSearchState((prev) => ({
                  ...prev,
                  results,
                  isLoading: false,
                  error: null,
               }))
            } catch (error) {
               setSearchState((prev) => ({
                  ...prev,
                  results: [],
                  isLoading: false,
                  error: error.message,
               }))
            }
         }, 300),
      [getCachedResult, setCachedResult]
   )

   const handleLocationSelect = useCallback(
      (location) => {
         setSelectedLocation(location)
         control.setValue('location', location.name, { shouldValidate: true })
         control.setValue('address', location.address, { shouldValidate: true })
         setSearchState((prev) => ({ ...prev, results: [] }))
      },
      [control]
   )

   const handleQuickLocationSelect = useCallback(
      (type) => {
         handleSearch(type)
         setSelectedType(type)
         setShowQuickLocations(false)
      },
      [handleSearch]
   )

   const handleMapPreview = useCallback((location) => {
      if (!location?.coordinates) return
      const { lat, lng } = location.coordinates
      window.open(`https://maps.google.com/maps?q=${lat},${lng}`)
   }, [])

   const handleHelpToggle = useCallback(() => {
      setShowHelp((prev) => !prev)
   }, [])

   const handleReset = useCallback(() => {
      setValue('locationName', '', { shouldValidate: true })
      setValue('locationAddress', '', { shouldValidate: true })
      setValue('locationDetail', '', { shouldValidate: true })
      setValue('locationGuide', '', { shouldValidate: true })
      setValue('showMap', true)
      setValue('showNavigation', true)
   }, [setValue])

   const handleTypeSelect = useCallback(
      (type) => {
         setSelectedType(type)
         const placeholders = invitationTypes.find((t) => t.id === type).placeholders
         setValue('locationName', '', { shouldValidate: true })
         setValue('locationAddress', '', { shouldValidate: true })
         setValue('locationDetail', '', { shouldValidate: true })
         setValue('locationGuide', '', { shouldValidate: true })
      },
      [setValue]
   )

   const handleUsePlaceholder = useCallback(() => {
      const placeholders = currentType.placeholders
      setValue('locationName', placeholders.name, { shouldValidate: true })
      setValue('locationAddress', placeholders.address, { shouldValidate: true })
      setValue('locationDetail', placeholders.detail, { shouldValidate: true })
      setValue('locationGuide', placeholders.guide, { shouldValidate: true })
   }, [currentType, setValue])

   return (
      <SectionContainer component={motion.div} variants={fadeInUp} initial="initial" animate="animate" exit="exit" transition={easeTransition}>
         <SectionTitle>
            <TitleText>
               <LocationOnIcon className="icon" />
               <Box className="title">장소</Box>
            </TitleText>
            <IconButtonWrapper>
               <SearchIcon onClick={() => setShowQuickLocations((prev) => !prev)} />
               <HelpOutlineIcon onClick={handleHelpToggle} />
               <RestartAltIcon onClick={handleReset} />
            </IconButtonWrapper>
         </SectionTitle>

         <AnimatePresence>
            {showHelp && (
               <HelpText>
                  <strong>장소 정보 입력 도움말</strong>
                  <ul>
                     <li>초대장 유형에 맞는 장소 정보를 입력해주세요.</li>
                     <li>예시 버튼을 클릭하여 샘플 정보를 사용할 수 있습니다.</li>
                     <li>지도와 내비게이션 버튼을 선택적으로 표시할 수 있습니다.</li>
                     <li>교통편 안내는 상세하게 작성해주시면 좋습니다.</li>
                  </ul>
               </HelpText>
            )}
         </AnimatePresence>

         <AnimatePresence>
            {showQuickLocations && (
               <QuickLocationChips component={motion.div} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  {invitationTypes.map((location, index) => (
                     <Chip
                        key={index}
                        label={`${location.icon} ${location.label}`}
                        onClick={() => handleQuickLocationSelect(location.id)}
                        sx={{
                           bgcolor: 'rgba(255, 255, 255, 0.8)',
                           border: `1px solid ${COLORS.accent.main}15`,
                           color: COLORS.text.primary,
                           '&:hover': {
                              bgcolor: 'white',
                              boxShadow: `0 4px 12px ${COLORS.accent.main}15`,
                           },
                        }}
                     />
                  ))}
               </QuickLocationChips>
            )}
         </AnimatePresence>

         <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3, mt: 2 }}>
            {invitationTypes.map((type) => (
               <Tooltip key={type.id} title={`${type.label} 장소 입력하기`}>
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
            <Controller
               name="locationName"
               control={control}
               defaultValue=""
               rules={{ required: '장소명을 입력해주세요' }}
               render={({ field, fieldState: { error } }) => <StyledTextField {...field} label="장소명" placeholder={currentType.placeholders.name} error={!!error} helperText={error?.message} />}
            />

            <Controller
               name="locationAddress"
               control={control}
               defaultValue=""
               rules={{ required: '주소를 입력해주세요' }}
               render={({ field, fieldState: { error } }) => <StyledTextField {...field} label="주소" placeholder={currentType.placeholders.address} error={!!error} helperText={error?.message} />}
            />

            <Controller name="locationDetail" control={control} defaultValue="" render={({ field, fieldState: { error } }) => <StyledTextField {...field} label="상세 위치" placeholder={currentType.placeholders.detail} error={!!error} helperText={error?.message} />} />

            <Controller name="locationGuide" control={control} defaultValue="" render={({ field, fieldState: { error } }) => <StyledTextField {...field} label="교통편 안내" placeholder={currentType.placeholders.guide} multiline rows={3} error={!!error} helperText={error?.message} />} />

            <Box sx={{ display: 'flex', gap: 2 }}>
               <Controller
                  name="showMap"
                  control={control}
                  defaultValue={true}
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
                        label="지도 표시"
                     />
                  )}
               />

               <Controller
                  name="showNavigation"
                  control={control}
                  defaultValue={true}
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
                        label="내비게이션 버튼 표시"
                     />
                  )}
               />
            </Box>
         </Box>

         {(locationName || locationAddress || locationDetail || locationGuide) && (
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
                  <Box sx={{ mt: 1, color: COLORS.accent.main, fontWeight: 500 }}>{currentType.label}</Box>
                  {locationName && <Box sx={{ mt: 2, color: COLORS.text.primary, fontSize: '1.2rem', fontWeight: 500 }}>{locationName}</Box>}
                  {locationAddress && <Box sx={{ mt: 1, color: COLORS.text.primary }}>{locationAddress}</Box>}
                  {locationDetail && <Box sx={{ mt: 1, color: COLORS.text.secondary }}>{locationDetail}</Box>}
                  {locationGuide && (
                     <Box sx={{ mt: 2, color: COLORS.text.secondary, whiteSpace: 'pre-line' }}>
                        <Box sx={{ mb: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
                           <SubwayIcon fontSize="small" />
                           <DirectionsBusIcon fontSize="small" />
                           <DirectionsCarIcon fontSize="small" />
                        </Box>
                        {locationGuide}
                     </Box>
                  )}
                  {showMap && <Box sx={{ mt: 2, p: 2, bgcolor: 'rgba(255, 255, 255, 0.5)', borderRadius: '8px', textAlign: 'center' }}>지도가 표시됩니다</Box>}
                  {showNavigation && (
                     <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <Chip icon={<DirectionsIcon />} label="카카오맵" />
                        <Chip icon={<DirectionsIcon />} label="네이버맵" />
                        <Chip icon={<DirectionsIcon />} label="티맵" />
                     </Box>
                  )}
               </Box>
            </Box>
         )}
      </SectionContainer>
   )
}

export default LocationSection
