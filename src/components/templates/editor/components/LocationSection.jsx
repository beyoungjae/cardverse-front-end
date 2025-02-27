import React, { useState, useCallback, useEffect } from 'react'
import { Box, Typography, Tooltip, FormControlLabel, Checkbox, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import DaumPostcode from 'react-daum-postcode'
import { SectionContainer, SectionTitle, TitleText, StyledTextField, HelpText, IconButtonWrapper, fadeInUp, easeTransition, COLORS } from '../styles/commonStyles'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import DirectionsIcon from '@mui/icons-material/Directions'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CelebrationIcon from '@mui/icons-material/Celebration'
import CakeIcon from '@mui/icons-material/Cake'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'

// 카카오 REST API를 통한 주소
const geocodeAddressKakao = async (address) => {
   try {
      const apiKey = process.env.REACT_APP_KAKAO_REST_KEY
      const response = await fetch(`https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`, {
         headers: {
            Authorization: `KakaoAK ${apiKey}`,
         },
      })
      const data = await response.json()
      if (data.documents && data.documents.length > 0) {
         const { y, x } = data.documents[0]
         return { lat: parseFloat(y), lng: parseFloat(x) }
      } else {
         throw new Error('검색 결과가 없습니다.')
      }
   } catch (error) {
      console.error(error)
      return null
   }
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
      id: 'newyear',
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
      id: 'gohyeyon',
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

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_JS_KEY}&autoload=false`

const LocationSection = () => {
   const [showHelp, setShowHelp] = useState(false)
   const { control, watch, setValue } = useFormContext()
   const [selectedType, setSelectedType] = useState('wedding')
   const [openAddressModal, setOpenAddressModal] = useState(false)

   // formData의 location 기본값
   const location = watch('location') || {
      name: '',
      address: '',
      detail: '',
      guide: '',
      showMap: true,
      coordinates: null,
      url: '',
   }
   const currentType = invitationTypes.find((type) => type.id === selectedType)

   const kakao = window.kakao

   // 주소가 변경되면 Kakao 지오코딩 API 호출하여 좌표 업데이트
   useEffect(() => {
      let cancel = false
      const updateCoordinates = async () => {
         if (!location.address) {
            setValue('location.coordinates', null, { shouldValidate: true })
            return
         }
         const coords = await geocodeAddressKakao(location.address)
         if (!cancel && coords) {
            setValue('location.coordinates', coords, { shouldValidate: true })
         }
      }
      updateCoordinates()
      return () => {
         cancel = true
      }
   }, [location.address, setValue])

   useEffect(() => {
      // 좌표와 showMap이 없으면 실행 안 함
      if (!location.coordinates || !location.showMap) return

      // 1) 지도 스크립트 로드 함수
      const loadKakaoMapScript = () => {
         return new Promise((resolve, reject) => {
            // 이미 로드된 경우 그냥 종료
            if (window.kakao && window.kakao.maps) {
               return resolve()
            }

            // 혹시 남아있는 스크립트가 있으면 제거
            const existingScript = document.querySelector('script[src*="dapi.kakao.com/v2/maps/sdk.js"]')
            if (existingScript) {
               existingScript.remove()
            }

            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = KAKAO_SDK_URL
            script.async = true
            script.defer = true

            script.onload = () => {
               if (window.kakao && window.kakao.maps) {
                  // SDK 내부 로드가 끝나면 resolve
                  window.kakao.maps.load(() => {
                     resolve()
                  })
               } else {
                  reject(new Error('Kakao Maps SDK not available after load'))
               }
            }

            script.onerror = (error) => {
               console.error('❌ Failed to load Kakao Maps SDK:', error)
               reject(error)
            }

            document.head.appendChild(script)
         })
      }

      // 2) 지도 초기화 함수
      const initMap = () => {
         const container = document.getElementById('kakao-map')
         if (!container) {
            throw new Error('지도 컨테이너를 찾을 수 없습니다.')
         }

         const options = {
            center: new window.kakao.maps.LatLng(location.coordinates.lat, location.coordinates.lng),
            level: 3,
         }
         const map = new window.kakao.maps.Map(container, options)
         const marker = new window.kakao.maps.Marker({
            position: options.center,
         })
         marker.setMap(map)

         // 지도 리사이즈 대응
         window.addEventListener('resize', () => {
            map.relayout()
         })

         // 초기 레이아웃 조정
         setTimeout(() => {
            map.relayout()
         }, 300)
      }

      // 3) 로드 + 초기화
      const initialize = async () => {
         try {
            await loadKakaoMapScript()
            initMap()
         } catch (error) {
            console.error('❌ 카카오맵 초기화 실패:', error)
         }
      }

      initialize()

      // 4) 컴포넌트 언마운트 시 청소
      return () => {
         const mapContainer = document.getElementById('kakao-map')
         if (mapContainer) {
            mapContainer.innerHTML = ''
         }
         window.removeEventListener('resize', () => {})
      }
   }, [location.coordinates, location.showMap])

   /*    
디버깅용 코드
useEffect(() => {
      console.log('카카오맵 상태 체크:', {
         kakaoExists: !!window.kakao,
         mapsExists: !!(window.kakao && window.kakao.maps),
         coordinates: location.coordinates,
         showMap: location.showMap,
         container: !!document.getElementById('kakao-map'),
         containerSize: document.getElementById('kakao-map')?.getBoundingClientRect(),
         apiKey: process.env.REACT_APP_KAKAO_JS_KEY?.substring(0, 5) + '...',
      })
   }, [location.coordinates, location.showMap])
*/

   const handleHelpToggle = useCallback(() => {
      setShowHelp((prev) => !prev)
   }, [])

   const handleReset = useCallback(() => {
      setValue('location', {
         name: '',
         address: '',
         detail: '',
         guide: '',
         showMap: true,
         coordinates: null,
         url: '',
      })
   }, [setValue])

   const handleTypeSelect = useCallback(
      (type) => {
         setSelectedType(type)
         setValue('location', {
            name: '',
            address: '',
            detail: '',
            guide: '',
            showMap: true,
            coordinates: null,
            url: '',
         })
      },
      [setValue]
   )

   // Daum Postcode 검색 완료 시 호출되는 함수
   const handleAddressComplete = (data) => {
      // data 객체에서 원하는 주소 정보 추출 (예: data.address)
      // 필요한 경우 data.buildingName 등도 활용할 수 있음
      setValue('location', {
         ...location,
         address: data.address, // 선택된 주소
         // coordinates는 useEffect에서 업데이트됨
      })
      setOpenAddressModal(false)
   }

   const openModal = () => setOpenAddressModal(true)
   const closeModal = () => setOpenAddressModal(false)

   return (
      <SectionContainer component={motion.div} variants={fadeInUp} initial="initial" animate="animate" exit="exit" transition={easeTransition}>
         <SectionTitle>
            <TitleText>
               <LocationOnIcon className="icon" />
               <Box className="title">장소</Box>
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
                  <strong>장소 정보 입력 도움말</strong>
                  <ul>
                     <li>초대장 유형에 맞는 장소 정보를 선택해주세요.</li>
                     <li>주소는 다음 우편번호 검색을 통해 선택되며, 직접 입력은 불가합니다.</li>
                     <li>주소를 선택하면 해당 위치의 지도 미리보기가 자동 업데이트됩니다.</li>
                  </ul>
               </HelpText>
            )}
         </AnimatePresence>

         {/* 기타 입력 필드 */}
         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Controller
               name="location.name"
               control={control}
               rules={{ required: '장소명을 입력해주세요' }}
               render={({ field, fieldState: { error } }) => <StyledTextField {...field} label="장소명" placeholder={currentType.placeholders.name} error={!!error} helperText={error?.message} fullWidth />}
            />
            {/* 읽기 전용 주소 표시 및 검색 버튼 */}
            <Controller
               name="location.address"
               control={control}
               defaultValue=""
               rules={{ required: '주소를 선택해주세요' }}
               render={({ field, fieldState: { error } }) => <StyledTextField {...field} label="주소" placeholder="주소 검색을 통해 선택하세요" error={!!error} helperText={error?.message} InputProps={{ readOnly: true }} onClick={openModal} sx={{ flexGrow: 1 }} />}
            />
            <Button
               variant="outlined"
               onClick={openModal}
               sx={{
                  borderColor: COLORS.accent.main,
                  color: COLORS.accent.main,
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  boxShadow: `0 2px 6px ${COLORS.accent.main}33`,
                  transition: 'all 0.2s ease-in-out',
                  whiteSpace: 'nowrap',
                  minWidth: 'fit-content',
                  '&:hover': {
                     borderColor: COLORS.accent.dark,
                     backgroundColor: `${COLORS.accent.main}10`,
                     boxShadow: `0 4px 12px ${COLORS.accent.main}50`,
                  },
               }}
            >
               주소 검색
            </Button>
            <Controller name="location.detail" control={control} render={({ field, fieldState: { error } }) => <StyledTextField {...field} label="상세 위치" placeholder={currentType.placeholders.detail} error={!!error} helperText={error?.message} fullWidth />} />
            <Controller name="location.guide" control={control} render={({ field, fieldState: { error } }) => <StyledTextField {...field} label="교통편 안내" placeholder={currentType.placeholders.guide} multiline rows={3} error={!!error} helperText={error?.message} fullWidth />} />
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

         {/* 지도 미리보기 */}
         {location.coordinates && location.showMap && (
            <Box
               sx={{
                  mt: 3,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: `1px solid ${COLORS.accent.main}15`,
                  height: '300px',
                  width: '100%',
                  position: 'relative',
                  visibility: 'visible',
               }}
            >
               <div
                  id="kakao-map"
                  style={{
                     width: '100%',
                     height: '100%',
                     position: 'absolute',
                     top: 0,
                     left: 0,
                     visibility: 'visible',
                  }}
               />
            </Box>
         )}

         {/* 미리보기 패널: formData에 포함된 location 정보 표시 */}
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
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                     {currentType.icon}
                     <Typography sx={{ color: COLORS.accent.main, fontWeight: 600, fontSize: '1.1rem' }}>{currentType.label}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                     {location.name && (
                        <Typography sx={{ color: COLORS.text.primary, fontSize: '1.2rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 1 }}>
                           <LocationOnIcon fontSize="small" sx={{ color: COLORS.accent.main }} />
                           {location.name}
                        </Typography>
                     )}
                     {location.address && <Typography sx={{ color: COLORS.text.secondary, fontSize: '1rem', pl: 3.5 }}>{location.address}</Typography>}
                     {location.detail && (
                        <Box sx={{ p: 2, borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.7)', border: `1px solid ${COLORS.accent.main}15` }}>
                           <Typography sx={{ color: COLORS.text.secondary, fontSize: '0.95rem', whiteSpace: 'pre-line' }}>{location.detail}</Typography>
                        </Box>
                     )}
                     {location.guide && (
                        <Box sx={{ p: 2, borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.7)', border: `1px solid ${COLORS.accent.main}15` }}>
                           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: COLORS.accent.main }}>
                              <DirectionsIcon fontSize="small" />
                              <Typography sx={{ fontWeight: 500, fontSize: '0.9rem' }}>교통편 안내</Typography>
                           </Box>
                           <Typography sx={{ color: COLORS.text.secondary, fontSize: '0.95rem', whiteSpace: 'pre-line' }}>{location.guide}</Typography>
                        </Box>
                     )}
                  </Box>
               </Box>
            </Box>
         )}

         {/* 주소 검색 모달 - Daum Postcode 컴포넌트 사용 */}
         <Dialog open={openAddressModal} onClose={closeModal} fullWidth maxWidth="sm">
            <DialogTitle>주소 검색</DialogTitle>
            <DialogContent dividers>
               <DaumPostcode onComplete={handleAddressComplete} style={{ width: '100%' }} />
            </DialogContent>
            <DialogActions>
               <Button onClick={closeModal}>취소</Button>
            </DialogActions>
         </Dialog>
      </SectionContainer>
   )
}

export default LocationSection
