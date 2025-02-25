import React, { useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import DirectionsIcon from '@mui/icons-material/Directions'
import { Section } from '../styles/PreviewStyles'
import { COLORS } from '../../styles/commonStyles'

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_JS_KEY}&autoload=false`

const LocationSection = ({ formData, style, textStyle, isDrawer }) => {
   const { name, address, detail, guide, showMap, coordinates } = formData.location || {}

   // 드로어와 일반 미리보기를 구분하는 고유 ID 생성
   const mapId = `preview-kakao-map-${isDrawer ? 'drawer' : 'main'}`

   useEffect(() => {
      if (!coordinates || !showMap) return

      const loadKakaoMapScript = () => {
         return new Promise((resolve, reject) => {
            if (window.kakao && window.kakao.maps) {
               return resolve()
            }

            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = KAKAO_SDK_URL
            script.async = true
            script.defer = true

            script.onload = () => {
               if (window.kakao && window.kakao.maps) {
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

      const initMap = () => {
         const container = document.getElementById(mapId)
         if (!container) {
            console.error(`지도 컨테이너를 찾을 수 없습니다: ${mapId}`)
            return
         }

         const options = {
            center: new window.kakao.maps.LatLng(coordinates.lat, coordinates.lng),
            level: 3,
         }
         const map = new window.kakao.maps.Map(container, options)
         const marker = new window.kakao.maps.Marker({
            position: options.center,
         })
         marker.setMap(map)

         // 지도 리사이즈 이벤트 핸들러
         const handleResize = () => map.relayout()
         window.addEventListener('resize', handleResize)

         // 초기 렌더링 후 지도 재조정
         setTimeout(handleResize, 300)

         // cleanup 함수 반환
         return () => {
            window.removeEventListener('resize', handleResize)
         }
      }

      let resizeCleanup = null

      const initialize = async () => {
         try {
            await loadKakaoMapScript()
            resizeCleanup = initMap()
         } catch (error) {
            console.error('❌ 카카오맵 초기화 실패:', error)
         }
      }

      initialize()

      // cleanup 함수
      return () => {
         if (resizeCleanup) {
            resizeCleanup()
         }
         const mapContainer = document.getElementById(mapId)
         if (mapContainer) {
            mapContainer.innerHTML = ''
         }
      }
   }, [coordinates, showMap, mapId])

   if (!name && !address) return null

   return (
      <Section style={style}>
         <Typography sx={{ textAlign: 'center', color: style.color, fontWeight: 'bold', mb: 2 }}>오시는 길</Typography>
         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box
               sx={{
                  p: 3,
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  boxShadow: `0 8px 32px ${COLORS.accent.main}15`,
                  border: `1px solid ${COLORS.accent.main}15`,
               }}
            >
               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <LocationOnIcon sx={{ color: style.color }} />
                  <Typography sx={{ fontSize: '1.3rem', fontWeight: 600, color: style.color }}>{name}</Typography>
               </Box>

               <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Typography sx={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 1, color: textStyle.color }}>{address}</Typography>

                  {detail && (
                     <Box sx={{ p: 2, borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.7)', border: `1px solid ${COLORS.accent.main}15` }}>
                        <Typography sx={{ color: textStyle.color, fontSize: '0.95rem', whiteSpace: 'pre-line' }}>{detail}</Typography>
                     </Box>
                  )}

                  {guide && (
                     <Box sx={{ p: 2, borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.7)', border: `1px solid ${COLORS.accent.main}15` }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: style.color }}>
                           <DirectionsIcon fontSize="small" />
                           <Typography sx={{ fontWeight: 500, fontSize: '0.9rem' }}>교통편 안내</Typography>
                        </Box>
                        <Typography sx={{ color: textStyle.color, fontSize: '0.95rem', whiteSpace: 'pre-line' }}>{guide}</Typography>
                     </Box>
                  )}

                  {coordinates && showMap && (
                     <Box
                        sx={{
                           mt: 2,
                           borderRadius: '8px',
                           overflow: 'hidden',
                           border: `1px solid ${COLORS.accent.main}15`,
                           height: '200px',
                           width: '100%',
                           position: 'relative',
                        }}
                     >
                        <div
                           id={mapId}
                           style={{
                              width: '100%',
                              height: '100%',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                           }}
                        />
                     </Box>
                  )}
               </Box>
            </Box>
         </Box>
      </Section>
   )
}

export default LocationSection
