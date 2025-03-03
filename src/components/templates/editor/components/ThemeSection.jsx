import React, { useState, useCallback, useEffect } from 'react'
import { Box, Typography, Grid, Chip } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { styled } from '@mui/material/styles'
import { useFormContext } from 'react-hook-form'
import PaletteIcon from '@mui/icons-material/Palette'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
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
      id: 'classic',
      name: '클래식',
      colors: {
         primary: '#2C2C2C',
         secondary: '#666666',
         background: '#FFFFFF',
      },
      font: 'Malgun Gothic',
   },
   {
      id: 'romantic',
      name: '로맨틱',
      colors: {
         primary: '#FF6B6B',
         secondary: '#FFA8A8',
         background: '#FFF5F5',
      },
      font: 'Noto Serif KR',
   },
   {
      id: 'modern',
      name: '모던',
      colors: {
         primary: '#364FC7',
         secondary: '#748FFC',
         background: '#EDF2FF',
      },
      font: 'Pretendard',
   },
   {
      id: 'natural',
      name: '내추럴',
      colors: {
         primary: '#2F9E44',
         secondary: '#8CE99A',
         background: '#EBFBEE',
      },
      font: 'Noto Sans KR',
   },
]

const fontPresets = [
   { name: 'Noto Sans KR', value: 'Noto Sans KR, sans-serif', type: '고딕' },
   { name: 'Noto Serif KR', value: 'Noto Serif KR, serif', type: '명조' },
   { name: 'Pretendard', value: 'Pretendard, sans-serif', type: '고딕' },
   { name: '나눔명조', value: 'NanumMyeongjo, serif', type: '명조' },
]

const ThemeSection = ({ control, onThemeChange, theme, handleThemeChange, resetTheme, undo, redo, canUndo, canRedo, templateId }) => {
   const [activeTab, setActiveTab] = useState('colors')
   const [selectedPreset, setSelectedPreset] = useState('classic')
   const [customColors, setCustomColors] = useState({
      primary: theme?.primaryColor || '#000000',
      secondary: theme?.secondaryColor || '#666666',
      background: theme?.backgroundColor || '#ffffff',
   })
   const [selectedFont, setSelectedFont] = useState(theme?.fontFamily || 'Malgun Gothic')

   // 테마 설정을 로컬 스토리지에 저장
   const saveThemeToStorage = (settings) => {

      // 템플릿별 테마 설정 저장
      if (templateId) {
         const templateSpecificKey = `template_theme_${templateId}`
         localStorage.setItem(templateSpecificKey, JSON.stringify(settings))
      }
      
      // 글로벌 테마 설정도 함께 저장
      localStorage.setItem('template_theme_draft', JSON.stringify(settings))
   }

   // 컴포넌트 마운트 시 테마 설정 불러오기
   useEffect(() => {
      if (theme) {
         setCustomColors({
            primary: theme.primaryColor || '#000000',
            secondary: theme.secondaryColor || '#666666',
            background: theme.backgroundColor || '#ffffff',
         })
         setSelectedFont(theme.fontFamily || 'Malgun Gothic')
      }
   }, [theme, templateId]) // templateId 의존성 추가

   // 프리셋 선택 핸들러
   const handlePresetSelect = (preset) => {
      // 상태 업데이트
      setSelectedPreset(preset.id)
      
      // 새 색상 값과 폰트 설정
      const newColors = {
         primary: preset.colors.primary,
         secondary: preset.colors.secondary,
         background: preset.colors.background
      };
      
      // 상태 업데이트
      setCustomColors(newColors)
      setSelectedFont(preset.font)
      
      // 테마 설정 객체 생성
      const themeSettings = {
         primaryColor: preset.colors.primary,
         secondaryColor: preset.colors.secondary,
         backgroundColor: preset.colors.background,
         fontFamily: preset.font,
         animation: 'fade',
      }
      
      // 부모 컴포넌트에 테마 변경 알림
      if (onThemeChange) {
         Object.entries(themeSettings).forEach(([key, value]) => {
            onThemeChange(key, value)
         })
      }
      
      // 테마 설정 저장
      saveThemeToStorage(themeSettings)
   }

   // 색상 변경 핸들러
   const handleColorChange = (type, color) => {
      // 함수형 업데이트로 최신 상태 보장 (로컬 상태만 업데이트)
      setCustomColors(prev => {
         const newColors = {
            ...prev,
            [type]: color
         };
         return newColors;
      });
   }
   
   // 폰트 변경 핸들러
   const handleFontChange = (font) => {
      // 상태 업데이트
      setSelectedFont(font.value);
   }
   
   // customColors가 변경될 때마다 부모 컴포넌트에 알림
   useEffect(() => {
      // 초기 렌더링 시에는 실행하지 않음
      if (!theme) return;
      
      // 현재 테마와 로컬 상태가 다를 때만 업데이트
      const hasColorChanged = 
         customColors.primary !== theme.primaryColor ||
         customColors.secondary !== theme.secondaryColor ||
         customColors.background !== theme.backgroundColor;
      
      if (!hasColorChanged) return;
      
      // 테마 설정 객체 생성
      const themeSettings = {
         primaryColor: customColors.primary,
         secondaryColor: customColors.secondary,
         backgroundColor: customColors.background,
         fontFamily: selectedFont,
         animation: 'fade',
      };
      
      // 템플릿별 테마 설정 저장
      if (templateId) {
         const templateSpecificKey = `template_theme_${templateId}`;
         localStorage.setItem(templateSpecificKey, JSON.stringify(themeSettings));
         console.log(`템플릿별 테마 설정 저장 (${templateId}):`, themeSettings);
      }
      
      // 글로벌 테마 설정도 함께 저장
      localStorage.setItem('template_theme_draft', JSON.stringify(themeSettings));
      
      // 색상 매핑
      const colorMapping = {
         primary: 'primaryColor',
         secondary: 'secondaryColor',
         background: 'backgroundColor',
      };
      
      // 변경된 색상만 부모에게 알림
      if (customColors.primary !== theme.primaryColor) {
         onThemeChange(colorMapping.primary, customColors.primary);
      }
      if (customColors.secondary !== theme.secondaryColor) {
         onThemeChange(colorMapping.secondary, customColors.secondary);
      }
      if (customColors.background !== theme.backgroundColor) {
         onThemeChange(colorMapping.background, customColors.background);
      }
      
   }, [customColors, templateId, onThemeChange, theme, selectedFont]);
   
   // selectedFont가 변경될 때마다 부모 컴포넌트에 알림
   useEffect(() => {
      // 초기 렌더링 시에는 실행하지 않음
      if (!theme) return;
      
      // 현재 테마와 로컬 상태가 다를 때만 업데이트
      if (selectedFont === theme.fontFamily) return;
      
      // 부모 컴포넌트에 테마 변경 알림
      onThemeChange('fontFamily', selectedFont);
      
   }, [selectedFont, onThemeChange, theme]);
   
   return (
      <SectionContainer component={motion.div} variants={fadeInUp} initial="initial" animate="animate" exit="exit" transition={easeTransition}>
         <SectionTitle>
            <TitleText>
               <PaletteIcon className="icon" />
               <Box className="title">테마 설정</Box>
            </TitleText>
            <IconButtonWrapper>
               <HelpOutlineIcon onClick={() => setActiveTab((prev) => (prev === 'help' ? 'colors' : 'help'))} />
            </IconButtonWrapper>
         </SectionTitle>

         <AnimatePresence>
            {activeTab === 'help' && (
               <HelpText>
                  <strong>테마 설정 도움말</strong>
                  <ul>
                     <li>초대장의 전체적인 분위기를 결정하는 색상과 폰트를 설정할 수 있습니다.</li>
                     <li>미리 준비된 프리셋을 선택하여 빠르게 테마를 적용할 수 있습니다.</li>
                     <li>실행취소/다시실행으로 테마 변경 이력을 관리할 수 있습니다.</li>
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
                  <PresetChip key={preset.id} label={preset.name} onClick={() => handlePresetSelect(preset)} selected={selectedPreset === preset.id} />
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
                           <ColorSwatch key={color} color={color} selected={customColors.primary === color} onClick={() => handleColorChange('primary', color)} />
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
                           <ColorSwatch key={color} color={color} selected={customColors.secondary === color} onClick={() => handleColorChange('secondary', color)} />
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
                           <ColorSwatch key={color} color={color} selected={customColors.background === color} onClick={() => handleColorChange('background', color)} />
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
                        onClick={() => handleFontChange(font)}
                        sx={{
                           border: selectedFont === font.value ? `2px solid ${COLORS.accent.main}` : undefined,
                        }}
                     >
                        <Typography variant="subtitle2" sx={{ mb: 1, color: COLORS.text.secondary }}>
                           {font.name}
                        </Typography>
                        <Typography sx={{ fontSize: '1.1rem' }} style={{ fontFamily: font.value }}>
                           안녕하세요, 반갑습니다
                        </Typography>
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

            <ThemePreview>
               <Typography variant="h6" sx={{ color: customColors.primary, fontFamily: selectedFont }}>
                  테마 미리보기
               </Typography>
               <Box
                  sx={{
                     p: 3,
                     backgroundColor: customColors.background,
                     borderRadius: '8px',
                     border: `1px solid ${customColors.secondary}40`,
                  }}
               >
                  <Typography sx={{ color: customColors.primary, fontFamily: selectedFont, mb: 1 }}>제목 텍스트 스타일</Typography>
                  <Typography sx={{ color: customColors.secondary, fontFamily: selectedFont, fontSize: '0.9rem' }}>본문 텍스트 스타일입니다. 선택하신 폰트와 색상으로 표시됩니다.</Typography>
               </Box>
            </ThemePreview>
         </Box>
      </SectionContainer>
   )
}

export default ThemeSection
