import React, { useState, useCallback, useMemo } from 'react'
import { Box, Chip, Typography, Tooltip, FormControlLabel, Checkbox } from '@mui/material'
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
import { debounce } from 'lodash'

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
   const { getCachedResult, setCachedResult } = useLocationCache()
   const { control, watch } = useFormContext()
   const [selectedType, setSelectedType] = useState('wedding')

   const currentType = invitationTypes.find((type) => type.id === selectedType)

   // location 객체를 통째로 watch
   const location = watch('location')

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
      control._reset({
         location: {
            name: '',
            address: '',
            detail: '',
            guide: '',
            showMap: true,
            coordinates: null,
         },
      })
   }, [control])

   const handleTypeSelect = useCallback(
      (type) => {
         setSelectedType(type)
         const placeholders = invitationTypes.find((t) => t.id === type).placeholders
         control._reset({
            location: {
               name: '',
               address: '',
               detail: '',
               guide: '',
               showMap: true,
               coordinates: null,
            },
         })
      },
      [control]
   )

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
                     <li>지도 버튼을 선택적으로 표시할 수 있습니다.</li>
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
            <Controller name="location.name" control={control} rules={{ required: '장소명을 입력해주세요' }} render={({ field, fieldState: { error } }) => <StyledTextField {...field} label="장소명" placeholder={currentType.placeholders.name} error={!!error} helperText={error?.message} />} />

            <Controller name="location.address" control={control} rules={{ required: '주소를 입력해주세요' }} render={({ field, fieldState: { error } }) => <StyledTextField {...field} label="주소" placeholder={currentType.placeholders.address} error={!!error} helperText={error?.message} />} />

            <Controller name="location.detail" control={control} render={({ field, fieldState: { error } }) => <StyledTextField {...field} label="상세 위치" placeholder={currentType.placeholders.detail} error={!!error} helperText={error?.message} />} />

            <Controller name="location.guide" control={control} render={({ field, fieldState: { error } }) => <StyledTextField {...field} label="교통편 안내" placeholder={currentType.placeholders.guide} multiline rows={3} error={!!error} helperText={error?.message} />} />

            <Controller
               name="location.showMap"
               control={control}
               defaultValue={true}
               render={({ field: { value, onChange } }) => (
                  <FormControlLabel
                     control={
                        <Checkbox
                           checked={value ?? true}
                           onChange={(e) => onChange(e.target.checked)}
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
         </Box>

         {(location.name || location.address || location.detail || location.guide) && (
            <Box
               component={motion.div}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               sx={{
                  mt: 3,
                  p: 3,
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '16px',
                  border: `1px solid ${COLORS.accent.main}25`,
                  boxShadow: `0 8px 32px ${COLORS.accent.main}15`,
                  position: 'relative',
                  overflow: 'hidden',
               }}
            >
               <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Box
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        mb: 2,
                     }}
                  >
                     {currentType.icon}
                     <Typography
                        sx={{
                           color: COLORS.accent.main,
                           fontWeight: 600,
                           fontSize: '1.1rem',
                        }}
                     >
                        {currentType.label}
                     </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                     {location.name && (
                        <Typography
                           sx={{
                              color: COLORS.text.primary,
                              fontSize: '1.2rem',
                              fontWeight: 500,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                           }}
                        >
                           <LocationOnIcon fontSize="small" sx={{ color: COLORS.accent.main }} />
                           {location.name}
                        </Typography>
                     )}

                     {location.address && (
                        <Typography
                           sx={{
                              color: COLORS.text.secondary,
                              fontSize: '1rem',
                              pl: 3.5,
                           }}
                        >
                           {location.address}
                        </Typography>
                     )}

                     {location.detail && (
                        <Box
                           sx={{
                              p: 2,
                              borderRadius: '8px',
                              backgroundColor: 'rgba(255, 255, 255, 0.7)',
                              border: `1px solid ${COLORS.accent.main}15`,
                           }}
                        >
                           <Typography
                              sx={{
                                 color: COLORS.text.secondary,
                                 fontSize: '0.95rem',
                                 whiteSpace: 'pre-line',
                              }}
                           >
                              {location.detail}
                           </Typography>
                        </Box>
                     )}

                     {location.guide && (
                        <Box
                           sx={{
                              p: 2,
                              borderRadius: '8px',
                              backgroundColor: 'rgba(255, 255, 255, 0.7)',
                              border: `1px solid ${COLORS.accent.main}15`,
                           }}
                        >
                           <Box
                              sx={{
                                 display: 'flex',
                                 alignItems: 'center',
                                 gap: 1,
                                 mb: 1,
                                 color: COLORS.accent.main,
                              }}
                           >
                              <DirectionsIcon fontSize="small" />
                              <Typography
                                 sx={{
                                    fontWeight: 500,
                                    fontSize: '0.9rem',
                                 }}
                              >
                                 교통편 안내
                              </Typography>
                           </Box>
                           <Typography
                              sx={{
                                 color: COLORS.text.secondary,
                                 fontSize: '0.95rem',
                                 whiteSpace: 'pre-line',
                              }}
                           >
                              {location.guide}
                           </Typography>
                        </Box>
                     )}
                  </Box>

                  <Box
                     sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 2,
                        mt: 3,
                     }}
                  >
                     {location.showMap && (
                        <Box
                           sx={{
                              p: 2,
                              borderRadius: '8px',
                              backgroundColor: 'rgba(255, 255, 255, 0.7)',
                              border: `1px solid ${COLORS.accent.main}15`,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              color: COLORS.accent.main,
                           }}
                        >
                           <MapIcon fontSize="small" />
                           <Typography sx={{ fontSize: '0.9rem', fontWeight: 500 }}>지도 표시</Typography>
                        </Box>
                     )}
                  </Box>
               </Box>
            </Box>
         )}
      </SectionContainer>
   )
}

export default LocationSection
