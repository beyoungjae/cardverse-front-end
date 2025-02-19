import React from 'react'
import { Box, Typography, Chip, Button } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import DirectionsIcon from '@mui/icons-material/Directions'
import MapIcon from '@mui/icons-material/Map'
import { Section } from '../styles/PreviewStyles'
import { COLORS } from '../../styles/commonStyles'

const LocationSection = ({ locationData, style, textStyle }) => {
   const { locationName, locationAddress, locationDetail, locationGuide, showMap, showNavigation, locationUrl } = locationData

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
                  <Typography sx={{ fontSize: '1.3rem', fontWeight: 600, color: style.color }}>{locationName}</Typography>
               </Box>

               <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Typography sx={{ color: textStyle.color, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 1 }}>{locationAddress}</Typography>

                  {locationDetail && (
                     <Box sx={{ p: 2, borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.7)', border: `1px solid ${COLORS.accent.main}15` }}>
                        <Typography sx={{ color: textStyle.color, fontSize: '0.95rem', whiteSpace: 'pre-line' }}>{locationDetail}</Typography>
                     </Box>
                  )}

                  {locationGuide && (
                     <Box sx={{ p: 2, borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.7)', border: `1px solid ${COLORS.accent.main}15` }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: style.color }}>
                           <DirectionsIcon fontSize="small" />
                           <Typography sx={{ fontWeight: 500, fontSize: '0.9rem' }}>교통편 안내</Typography>
                        </Box>
                        <Typography sx={{ color: textStyle.color, fontSize: '0.95rem', whiteSpace: 'pre-line' }}>{locationGuide}</Typography>
                     </Box>
                  )}

                  {showMap && (
                     <Button onClick={() => window.open(locationUrl, '_blank')} sx={{ color: style.color, borderRadius: '12px' }}>
                        <Box
                           sx={{
                              mt: 1,
                              p: 2,
                              border: `1px dashed ${style.color}50`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 1,
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              fontSize: '1.3rem',
                              '&:hover': {
                                 transform: 'translateY(-2px)',
                              },
                           }}
                        >
                           <MapIcon sx={{ color: style.color }} />
                           지도 보기
                        </Box>
                     </Button>
                  )}
               </Box>
            </Box>
         </Box>
      </Section>
   )
}

export default LocationSection
