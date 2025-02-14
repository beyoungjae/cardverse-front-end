import React, { useState } from 'react'
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, Button, Grid, Collapse, IconButton, Tooltip, Tabs, Tab, Paper } from '@mui/material'
import { styled } from '@mui/material/styles'
import { SketchPicker } from 'react-color'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import VisibilityIcon from '@mui/icons-material/Visibility'
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill'
import TextFormatIcon from '@mui/icons-material/TextFormat'
import PaletteIcon from '@mui/icons-material/Palette'
import { motion, AnimatePresence } from 'framer-motion'

const SectionTitle = styled(Typography)(({ theme }) => ({
   fontSize: '1.1rem',
   fontWeight: 500,
   marginBottom: theme.spacing(2),
   color: theme.palette.text.primary,
}))

const ColorPickerContainer = styled(Box)(({ theme }) => ({
   position: 'relative',
   marginBottom: theme.spacing(3),
}))

const ColorPreview = styled(Button)(({ color, theme }) => ({
   width: '100%',
   height: '40px',
   backgroundColor: color,
   border: `1px solid ${theme.palette.divider}`,
   borderRadius: theme.shape.borderRadius,
   transition: 'all 0.3s ease',
   '&:hover': {
      backgroundColor: color,
      opacity: 0.9,
      transform: 'scale(1.02)',
   },
}))

const StyledFormControl = styled(FormControl)(({ theme }) => ({
   marginBottom: theme.spacing(3),
   '& .MuiOutlinedInput-root': {
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:hover fieldset': {
         borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
         borderColor: theme.palette.primary.main,
      },
   },
}))

const PreviewBox = styled(Box)(({ theme }) => ({
   padding: theme.spacing(2),
   borderRadius: theme.shape.borderRadius,
   border: `1px solid ${theme.palette.divider}`,
   marginTop: theme.spacing(2),
}))

const TabPanel = styled(Box)(({ theme }) => ({
   padding: theme.spacing(2),
}))

const StyledTabs = styled(Tabs)(({ theme }) => ({
   marginBottom: theme.spacing(2),
   borderBottom: `1px solid ${theme.palette.divider}`,
   '& .MuiTab-root': {
      minWidth: 'auto',
      padding: theme.spacing(1, 2),
   },
}))

const AnimationPreview = styled(motion.div)(({ theme }) => ({
   padding: theme.spacing(2),
   borderRadius: theme.shape.borderRadius,
   border: `1px solid ${theme.palette.divider}`,
   textAlign: 'center',
   cursor: 'pointer',
}))

const fonts = ['Malgun Gothic', 'Nanum Gothic', 'Noto Sans KR', 'Nanum Myeongjo', 'Gowun Dodum', 'Pretendard', 'MaruBuri']

const animations = [
   { id: 'fade', name: '페이드', preview: { opacity: [0, 1] } },
   { id: 'slide', name: '슬라이드', preview: { x: [-50, 0], opacity: [0, 1] } },
   { id: 'scale', name: '스케일', preview: { scale: [0.8, 1], opacity: [0, 1] } },
]

const ThemeSection = ({ theme, onThemeChange }) => {
   const [openColorPicker, setOpenColorPicker] = useState(null)
   const [showPreview, setShowPreview] = useState(false)
   const [currentTab, setCurrentTab] = useState(0)

   const handleColorChange = (colorType) => (color) => {
      onThemeChange(colorType, color.hex)
   }

   const handleResetTheme = () => {
      onThemeChange('backgroundColor', '#ffffff')
      onThemeChange('primaryColor', '#000000')
      onThemeChange('secondaryColor', '#666666')
      onThemeChange('fontFamily', 'Malgun Gothic')
      onThemeChange('animation', null)
   }

   const handleTabChange = (event, newValue) => {
      setCurrentTab(newValue)
   }

   const sampleText = '안녕하세요\nTemplate Editor입니다.'

   return (
      <Box sx={{ mb: 4 }}>
         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <SectionTitle>테마 설정</SectionTitle>
            <Box>
               <Tooltip title="미리보기">
                  <IconButton onClick={() => setShowPreview(!showPreview)} size="small">
                     <VisibilityIcon />
                  </IconButton>
               </Tooltip>
               <Tooltip title="초기화">
                  <IconButton onClick={handleResetTheme} size="small">
                     <RestartAltIcon />
                  </IconButton>
               </Tooltip>
            </Box>
         </Box>

         <StyledTabs value={currentTab} onChange={handleTabChange} aria-label="theme options">
            <Tab icon={<TextFormatIcon />} label="글꼴" />
            <Tab icon={<FormatColorFillIcon />} label="색상" />
            <Tab icon={<PaletteIcon />} label="애니메이션" />
         </StyledTabs>

         <TabPanel hidden={currentTab !== 0}>
            <StyledFormControl fullWidth>
               <InputLabel>폰트</InputLabel>
               <Select value={theme.fontFamily} onChange={(e) => onThemeChange('fontFamily', e.target.value)} label="폰트">
                  {fonts.map((font) => (
                     <MenuItem key={font} value={font} style={{ fontFamily: font }}>
                        {font}
                     </MenuItem>
                  ))}
               </Select>
            </StyledFormControl>
         </TabPanel>

         <TabPanel hidden={currentTab !== 1}>
            <Grid container spacing={2}>
               <Grid item xs={12} md={4}>
                  <ColorPickerContainer>
                     <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        배경색
                     </Typography>
                     <ColorPreview color={theme.backgroundColor} onClick={() => setOpenColorPicker('backgroundColor')} />
                     <Collapse in={openColorPicker === 'backgroundColor'}>
                        <Box sx={{ position: 'absolute', zIndex: 2, mt: 1 }}>
                           <SketchPicker color={theme.backgroundColor} onChange={handleColorChange('backgroundColor')} />
                        </Box>
                     </Collapse>
                  </ColorPickerContainer>
               </Grid>

               <Grid item xs={12} md={4}>
                  <ColorPickerContainer>
                     <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        주요 색상
                     </Typography>
                     <ColorPreview color={theme.primaryColor} onClick={() => setOpenColorPicker('primaryColor')} />
                     <Collapse in={openColorPicker === 'primaryColor'}>
                        <Box sx={{ position: 'absolute', zIndex: 2, mt: 1 }}>
                           <SketchPicker color={theme.primaryColor} onChange={handleColorChange('primaryColor')} />
                        </Box>
                     </Collapse>
                  </ColorPickerContainer>
               </Grid>

               <Grid item xs={12} md={4}>
                  <ColorPickerContainer>
                     <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        보조 색상
                     </Typography>
                     <ColorPreview color={theme.secondaryColor} onClick={() => setOpenColorPicker('secondaryColor')} />
                     <Collapse in={openColorPicker === 'secondaryColor'}>
                        <Box sx={{ position: 'absolute', zIndex: 2, mt: 1 }}>
                           <SketchPicker color={theme.secondaryColor} onChange={handleColorChange('secondaryColor')} />
                        </Box>
                     </Collapse>
                  </ColorPickerContainer>
               </Grid>
            </Grid>
         </TabPanel>

         <TabPanel hidden={currentTab !== 2}>
            <Grid container spacing={2}>
               {animations.map((anim) => (
                  <Grid item xs={12} sm={4} key={anim.id}>
                     <Tooltip title={`${anim.name} 효과 적용`}>
                        <AnimationPreview
                           onClick={() => onThemeChange('animation', anim.id)}
                           whileHover={{ scale: 1.02 }}
                           animate={theme.animation === anim.id ? anim.preview : {}}
                           transition={{ duration: 0.5, repeat: theme.animation === anim.id ? Infinity : 0 }}
                           style={{
                              border: theme.animation === anim.id ? `2px solid ${theme.primaryColor}` : undefined,
                           }}
                        >
                           <Typography variant="subtitle2">{anim.name}</Typography>
                        </AnimationPreview>
                     </Tooltip>
                  </Grid>
               ))}
            </Grid>
         </TabPanel>

         <AnimatePresence>
            {showPreview && (
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
                  <PreviewBox style={{ backgroundColor: theme.backgroundColor }}>
                     <Typography
                        variant="h6"
                        style={{
                           color: theme.primaryColor,
                           fontFamily: theme.fontFamily,
                           marginBottom: '1rem',
                        }}
                     >
                        제목 미리보기
                     </Typography>
                     <Typography
                        style={{
                           color: theme.secondaryColor,
                           fontFamily: theme.fontFamily,
                           whiteSpace: 'pre-line',
                        }}
                     >
                        {sampleText}
                     </Typography>
                  </PreviewBox>
               </motion.div>
            )}
         </AnimatePresence>
      </Box>
   )
}

export default ThemeSection
