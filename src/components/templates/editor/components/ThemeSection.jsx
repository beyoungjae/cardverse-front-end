import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { Box, Typography, Slider, IconButton, Grid, Chip, Tooltip, Collapse } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { styled } from '@mui/material/styles'
import { useFormContext } from 'react-hook-form'
import PaletteIcon from '@mui/icons-material/Palette'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import UndoIcon from '@mui/icons-material/Undo'
import RedoIcon from '@mui/icons-material/Redo'
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill'
import TextFormatIcon from '@mui/icons-material/TextFormat'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import { SectionContainer, SectionTitle, TitleText, HelpText, IconButtonWrapper, fadeInUp, easeTransition, COLORS } from '../styles/commonStyles'

const ColorPicker = styled(Box)(({ theme }) => ({
   width: '100%',
   padding: theme.spacing(2),
   backgroundColor: 'rgba(255, 255, 255, 0.8)',
   borderRadius: '12px',
   border: `1px solid ${COLORS.accent.main}15`,
   transition: 'all 0.3s ease',
   '&:hover': {
      backgroundColor: 'white',
      transform: 'translateY(-2px)',
      boxShadow: `0 4px 12px ${COLORS.accent.main}15`,
   },
}))

const ColorSwatch = styled(Box)(({ color, selected }) => ({
   width: '36px',
   height: '36px',
   borderRadius: '8px',
   backgroundColor: color,
   cursor: 'pointer',
   transition: 'all 0.3s ease',
   border: selected ? `2px solid ${COLORS.accent.main}` : '2px solid transparent',
   boxShadow: selected ? `0 0 0 2px white, 0 0 0 4px ${COLORS.accent.main}40` : 'none',
   '&:hover': {
      transform: 'scale(1.1)',
      boxShadow: `0 4px 12px ${color}40`,
   },
}))

const FontPreview = styled(Box)(({ theme, font }) => ({
   padding: theme.spacing(2),
   backgroundColor: 'rgba(255, 255, 255, 0.8)',
   borderRadius: '12px',
   border: `1px solid ${COLORS.accent.main}15`,
   cursor: 'pointer',
   transition: 'all 0.3s ease',
   fontFamily: font,
   textAlign: 'center',
   '&:hover': {
      backgroundColor: 'white',
      transform: 'translateY(-2px)',
      boxShadow: `0 4px 12px ${COLORS.accent.main}15`,
   },
}))

const PresetChip = styled(Chip)(({ theme, selected }) => ({
   backgroundColor: selected ? `${COLORS.accent.main}15` : 'rgba(255, 255, 255, 0.8)',
   color: selected ? COLORS.accent.main : COLORS.text.primary,
   border: `1px solid ${selected ? COLORS.accent.main : COLORS.accent.main}15`,
   '&:hover': {
      backgroundColor: selected ? `${COLORS.accent.main}25` : 'white',
   },
}))

const ThemePreview = styled(motion.div)(({ theme }) => ({
   marginTop: theme.spacing(3),
   padding: theme.spacing(3),
   backgroundColor: 'rgba(255, 255, 255, 0.9)',
   backdropFilter: 'blur(10px)',
   borderRadius: '12px',
   border: `1px dashed ${COLORS.accent.main}`,
   display: 'flex',
   flexDirection: 'column',
   gap: theme.spacing(2),
   transition: 'all 0.3s ease',
   '&:hover': {
      backgroundColor: '#FFFFFF',
      transform: 'translateY(-4px)',
      boxShadow: `0 12px 48px ${COLORS.accent.main}15`,
   },
}))

const colorPresets = [
   {
      name: '클래식',
      colors: {
         primary: '#2C2C2C',
         secondary: '#666666',
         background: '#FFFFFF',
      },
   },
   {
      name: '로맨틱',
      colors: {
         primary: '#FF6B6B',
         secondary: '#FFA8A8',
         background: '#FFF5F5',
      },
   },
   {
      name: '모던',
      colors: {
         primary: '#364FC7',
         secondary: '#748FFC',
         background: '#EDF2FF',
      },
   },
   {
      name: '내추럴',
      colors: {
         primary: '#2F9E44',
         secondary: '#8CE99A',
         background: '#EBFBEE',
      },
   },
]

const fontPresets = [
   { name: 'Noto Sans KR', value: 'Noto Sans KR, sans-serif', type: '고딕' },
   { name: 'Noto Serif KR', value: 'Noto Serif KR, serif', type: '명조' },
   { name: 'Pretendard', value: 'Pretendard, sans-serif', type: '고딕' },
   { name: '나눔명조', value: 'NanumMyeongjo, serif', type: '명조' },
]

const animationPresets = [
   { name: '페이드', value: 'fade', icon: '🌟' },
   { name: '슬라이드', value: 'slide', icon: '➡️' },
   { name: '줌', value: 'zoom', icon: '🔍' },
   { name: '바운스', value: 'bounce', icon: '💫' },
]

const ThemeSection = () => {
   const [showHelp, setShowHelp] = useState(false)
   const [selectedPreset, setSelectedPreset] = useState(null)
   const [selectedType, setSelectedType] = useState('wedding')
   const { setValue, watch } = useFormContext()

   const theme = {
      primaryColor: watch('primaryColor'),
      secondaryColor: watch('secondaryColor'),
      backgroundColor: watch('backgroundColor'),
      fontFamily: watch('fontFamily'),
      animation: watch('animation'),
      type: watch('type'),
   }

   const handleTypeSelect = useCallback(
      (type) => {
         setSelectedType(type)
         setValue('type', type, { shouldValidate: true })
         const defaultTheme = {
            wedding: {
               primaryColor: '#FF69B4',
               secondaryColor: '#FFA8A8',
               backgroundColor: '#FFF5F5',
               fontFamily: 'Noto Serif KR, serif',
               animation: 'fade',
            },
            newYear: {
               primaryColor: '#FFD700',
               secondaryColor: '#FFD8A8',
               backgroundColor: '#FFFAF0',
               fontFamily: 'Pretendard, sans-serif',
               animation: 'slide',
            },
            birthday: {
               primaryColor: '#9370DB',
               secondaryColor: '#E6E6FA',
               backgroundColor: '#F0E6FF',
               fontFamily: 'Noto Sans KR, sans-serif',
               animation: 'zoom',
            },
            invitation: {
               primaryColor: '#4169E1',
               secondaryColor: '#B0E0E6',
               backgroundColor: '#F0F8FF',
               fontFamily: 'Pretendard, sans-serif',
               animation: 'bounce',
            },
         }[type]

         Object.entries(defaultTheme).forEach(([key, value]) => {
            setValue(key, value, { shouldValidate: true })
         })
         setSelectedPreset(null)
      },
      [setValue]
   )

   // 초기 테마 설정 동기화
   useEffect(() => {
      if (theme.type && theme.type !== selectedType) {
         handleTypeSelect(theme.type)
      }
   }, [theme.type, selectedType, handleTypeSelect])

   const handleThemeChange = useCallback(
      (type, value) => {
         setValue(type, value, { shouldValidate: true })
      },
      [setValue]
   )

   const handlePresetSelect = useCallback(
      (preset) => {
         setSelectedPreset(preset.name)
         Object.entries(preset.colors).forEach(([key, value]) => {
            setValue(key, value, { shouldValidate: true })
         })
      },
      [setValue]
   )

   const handleFontSelect = useCallback(
      (font) => {
         setValue('fontFamily', font.value, { shouldValidate: true })
      },
      [setValue]
   )

   const handleAnimationSelect = useCallback(
      (animation) => {
         setValue('animation', animation.value, { shouldValidate: true })
      },
      [setValue]
   )

   const resetTheme = useCallback(() => {
      setValue('primaryColor', '#2C2C2C', { shouldValidate: true })
      setValue('secondaryColor', '#666666', { shouldValidate: true })
      setValue('backgroundColor', '#FFFFFF', { shouldValidate: true })
      setValue('fontFamily', 'Noto Sans KR, sans-serif', { shouldValidate: true })
      setValue('animation', 'fade', { shouldValidate: true })
      setSelectedPreset(null)
   }, [setValue])

   return (
      <SectionContainer component={motion.div} variants={fadeInUp} initial="initial" animate="animate" exit="exit" transition={easeTransition}>
         <SectionTitle>
            <TitleText>
               <PaletteIcon className="icon" />
               <Box className="title">테마 설정</Box>
            </TitleText>
            <IconButtonWrapper>
               <HelpOutlineIcon onClick={() => setShowHelp((prev) => !prev)} />
               <RestartAltIcon onClick={resetTheme} />
            </IconButtonWrapper>
         </SectionTitle>

         <AnimatePresence>
            {showHelp && (
               <HelpText>
                  <strong>테마 설정 도움말</strong>
                  <ul>
                     <li>초대장의 전체적인 분위기를 결정하는 색상과 폰트를 설정할 수 있습니다.</li>
                     <li>미리 준비된 프리셋을 선택하여 빠르게 테마를 적용할 수 있습니다.</li>
                     <li>실행취소/다시실행으로 테마 변경 이력을 관리할 수 있습니다.</li>
                     <li>애니메이션 효과를 선택하여 초대장에 생동감을 더할 수 있습니다.</li>
                  </ul>
               </HelpText>
            )}
         </AnimatePresence>

         <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, color: COLORS.text.primary, fontWeight: 500 }}>
               <AutoFixHighIcon sx={{ mr: 1, verticalAlign: 'middle', color: COLORS.accent.main }} />
               프리셋
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 4 }}>
               {colorPresets.map((preset) => (
                  <PresetChip key={preset.name} label={preset.name} onClick={() => handlePresetSelect(preset)} selected={selectedPreset === preset.name} />
               ))}
            </Box>

            <Typography variant="subtitle1" sx={{ mb: 2, color: COLORS.text.primary, fontWeight: 500 }}>
               <FormatColorFillIcon sx={{ mr: 1, verticalAlign: 'middle', color: COLORS.accent.main }} />
               색상
            </Typography>
            <Grid container spacing={2} sx={{ mb: 4 }}>
               <Grid item xs={12} md={4}>
                  <ColorPicker>
                     <Typography variant="subtitle2" sx={{ mb: 1, color: COLORS.text.secondary }}>
                        주요 색상
                     </Typography>
                     <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {['#2C2C2C', '#364FC7', '#2F9E44', '#F03E3E', '#F76707'].map((color) => (
                           <ColorSwatch key={color} color={color} selected={theme.primaryColor === color} onClick={() => handleThemeChange('primaryColor', color)} />
                        ))}
                     </Box>
                  </ColorPicker>
               </Grid>
               <Grid item xs={12} md={4}>
                  <ColorPicker>
                     <Typography variant="subtitle2" sx={{ mb: 1, color: COLORS.text.secondary }}>
                        보조 색상
                     </Typography>
                     <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {['#666666', '#748FFC', '#8CE99A', '#FFA8A8', '#FFD8A8'].map((color) => (
                           <ColorSwatch key={color} color={color} selected={theme.secondaryColor === color} onClick={() => handleThemeChange('secondaryColor', color)} />
                        ))}
                     </Box>
                  </ColorPicker>
               </Grid>
               <Grid item xs={12} md={4}>
                  <ColorPicker>
                     <Typography variant="subtitle2" sx={{ mb: 1, color: COLORS.text.secondary }}>
                        배경 색상
                     </Typography>
                     <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {['#FFFFFF', '#EDF2FF', '#EBFBEE', '#FFF5F5', '#FFF9DB'].map((color) => (
                           <ColorSwatch key={color} color={color} selected={theme.backgroundColor === color} onClick={() => handleThemeChange('backgroundColor', color)} />
                        ))}
                     </Box>
                  </ColorPicker>
               </Grid>
            </Grid>

            <Typography variant="subtitle1" sx={{ mb: 2, color: COLORS.text.primary, fontWeight: 500 }}>
               <TextFormatIcon sx={{ mr: 1, verticalAlign: 'middle', color: COLORS.accent.main }} />
               폰트
            </Typography>
            <Grid container spacing={2} sx={{ mb: 4 }}>
               {fontPresets.map((font) => (
                  <Grid item xs={12} sm={6} key={font.name}>
                     <FontPreview
                        font={font.value}
                        onClick={() => handleFontSelect(font)}
                        sx={{
                           border: theme.fontFamily === font.value ? `2px solid ${COLORS.accent.main}` : undefined,
                        }}
                     >
                        <Typography variant="subtitle2" sx={{ mb: 1, color: COLORS.text.secondary }}>
                           {font.name}
                        </Typography>
                        <Typography sx={{ fontSize: '1.1rem' }}>안녕하세요, 반갑습니다</Typography>
                        <Chip
                           label={font.type}
                           size="small"
                           sx={{
                              mt: 1,
                              backgroundColor: `${COLORS.accent.main}15`,
                              color: COLORS.accent.main,
                           }}
                        />
                     </FontPreview>
                  </Grid>
               ))}
            </Grid>

            <Typography variant="subtitle1" sx={{ mb: 2, color: COLORS.text.primary, fontWeight: 500 }}>
               <AutoFixHighIcon sx={{ mr: 1, verticalAlign: 'middle', color: COLORS.accent.main }} />
               애니메이션
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
               {animationPresets.map((animation) => (
                  <PresetChip key={animation.name} icon={animation.icon} label={animation.name} onClick={() => handleAnimationSelect(animation)} selected={theme.animation === animation.value} />
               ))}
            </Box>

            <ThemePreview>
               <Typography variant="h6" sx={{ color: theme.primaryColor, fontFamily: theme.fontFamily }}>
                  테마 미리보기
               </Typography>
               <Box
                  sx={{
                     p: 3,
                     backgroundColor: theme.backgroundColor,
                     borderRadius: '8px',
                     border: `1px solid ${theme.secondaryColor}40`,
                  }}
               >
                  <Typography sx={{ color: theme.primaryColor, fontFamily: theme.fontFamily, mb: 1 }}>제목 텍스트 스타일</Typography>
                  <Typography sx={{ color: theme.secondaryColor, fontFamily: theme.fontFamily, fontSize: '0.9rem' }}>본문 텍스트 스타일입니다. 선택하신 폰트와 색상으로 표시됩니다.</Typography>
               </Box>
            </ThemePreview>
         </Box>
      </SectionContainer>
   )
}

export default ThemeSection
