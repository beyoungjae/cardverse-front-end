import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Container, Typography, Button, Tabs, Tab, Checkbox, FormControlLabel, TextField, Select, MenuItem } from '@mui/material'
import { styled as muiStyled } from '@mui/material/styles'
import { SketchPicker } from 'react-color'
import { useForm, Controller } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import Lottie from 'lottie-react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import useTemplateStore from '../../store/templateStore'
import exampleAnimation from './exampleAnimation.json'

// ===== Styled Components =====
const EditorContainer = muiStyled(Container)({
   display: 'flex',
   gap: '2rem',
   padding: '2rem',
   minHeight: '100vh',
   justifyContent: 'space-between',
})

const PreviewSection = muiStyled(Box)(({ theme }) => ({
   flex: 1,
   backgroundColor: '#f5f5f5',
   borderRadius: '10px',
   padding: '2rem',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
   position: 'sticky',
   top: '150px',
   height: 'calc(100vh - 200px)',
   overflow: 'hidden',
}))

const MobilePreview = muiStyled(Box)(({ theme }) => ({
   width: '375px',
   height: '667px',
   backgroundColor: 'white',
   borderRadius: '20px',
   boxShadow: '0 0 50px rgba(0,0,0,0.1)',
   overflow: 'hidden',
   position: 'relative',
   transition: 'all 0.3s ease',
}))

const PreviewContent = muiStyled(Box)(({ theme, style }) => ({
   padding: '2rem',
   height: '100%',
   overflow: 'auto',
   backgroundColor: style?.backgroundColor || '#ffffff',
   fontFamily: style?.fontFamily || theme.typography.fontFamily,
   color: style?.primaryColor || theme.palette.text.primary,
   '& h1': {
      color: style?.primaryColor || theme.palette.text.primary,
      marginBottom: '1rem',
   },
   '& p': {
      color: style?.secondaryColor || theme.palette.text.secondary,
      marginBottom: '0.5rem',
   },
}))

const ControlSection = muiStyled(Box)({
   width: '350px',
   padding: '1.5rem',
   backgroundColor: 'white',
   borderRadius: '10px',
   boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
   display: 'flex',
   flexDirection: 'column',
   gap: '1rem',
   height: 'fit-content',
})

const InputGroup = muiStyled(Box)({
   '& label': {
      display: 'block',
      marginBottom: '0.5rem',
      fontSize: '0.9rem',
      fontWeight: 500,
   },
   '& input, & textarea': {
      width: '100%',
      padding: '0.6rem',
      borderRadius: '5px',
      border: '1px solid #ddd',
      marginBottom: '1rem',
   },
})

const ActionButton = muiStyled(Button)({
   width: '100%',
   padding: '0.8rem',
   marginTop: '1rem',
})

const BackButton = muiStyled(Box)({
   display: 'flex',
   alignItems: 'center',
   gap: '0.5rem',
   cursor: 'pointer',
   marginBottom: '1.5rem',
   '&:hover': {
      opacity: 0.7,
   },
})

// ===== Validation Schema =====
const schema = yup
   .object({
      title: yup.string().required('제목을 입력해주세요'),
      description: yup.string(),
      greeting: yup.string(),
      date: yup.string(),
      location: yup.string(),
      gallery: yup.mixed(),
      traffic: yup.string(),
      contact: yup.string(),
      account: yup.string(),
      attendance: yup.string(),
      closing: yup.string(),
   })
   .required()

// 요소 레이블 매핑 추가
const elementLabels = {
   title: '제목',
   description: '설명',
   greeting: '인사말',
   date: '날짜',
   location: '장소',
   gallery: '갤러리',
   traffic: '교통편',
   contact: '연락처',
   account: '계좌번호',
   attendance: '참석여부',
   closing: '마무리말',
   animation: '애니메이션',
}

// ===== Main Component =====
const TemplateEditor = () => {
   const navigate = useNavigate()
   const { template, updateTemplate, updateStyle, saveTemplate } = useTemplateStore()

   // react-hook-form 설정
   const { control, handleSubmit, watch } = useForm({
      resolver: yupResolver(schema),
      defaultValues: template,
   })

   // 탭 상태
   const [activeTab, setActiveTab] = useState(0)
   const handleTabChange = (event, newValue) => {
      setActiveTab(newValue)
   }

   // 요소 체크박스 상태
   const [enabledElements, setEnabledElements] = useState({
      title: true,
      description: true,
      greeting: true,
      date: true,
      location: true,
      gallery: false,
      traffic: false,
      contact: false,
      account: false,
      attendance: false,
      closing: false,
      animation: false,
   })

   // 폼 값 실시간 감시
   const formValues = watch()

   // 임시저장
   useEffect(() => {
      const saveTimer = setInterval(() => {
         updateTemplate(formValues)
      }, 5000)

      return () => clearInterval(saveTimer)
   }, [formValues, updateTemplate])

   // 뒤로가기
   const handleBack = () => {
      navigate(-1)
   }

   // 저장
   const onSubmit = (data) => {
      const templateData = {
         ...data,
         enabledElements,
         style: template.style,
      }
      console.log('저장된 데이터:', templateData)
      saveTemplate()
      // API 연동 시 여기에 저장 로직 추가
   }

   return (
      <Container maxWidth="xl">
         <BackButton onClick={handleBack}>
            <ArrowBackIosNewIcon sx={{ fontSize: '0.8rem' }} />
            <Typography>Read Template</Typography>
         </BackButton>

         <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
            CREATE TEMPLATE
         </Typography>

         <EditorContainer>
            {/* ===== 미리보기 섹션 ===== */}
            <PreviewSection>
               <MobilePreview>
                  <PreviewContent style={template.style}>
                     <AnimatePresence>
                        {enabledElements.animation && (
                           <motion.div key="animation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                              <Lottie animationData={exampleAnimation} />
                           </motion.div>
                        )}
                     </AnimatePresence>

                     <motion.div layout>
                        {enabledElements.title && formValues.title && (
                           <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                              {formValues.title}
                           </motion.h1>
                        )}
                        {enabledElements.description && formValues.description && (
                           <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                              {formValues.description}
                           </motion.p>
                        )}
                        {enabledElements.greeting && formValues.greeting && (
                           <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                              {formValues.greeting}
                           </motion.p>
                        )}
                        {enabledElements.date && formValues.date && (
                           <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                              일시: {formValues.date}
                           </motion.p>
                        )}
                        {enabledElements.location && formValues.location && (
                           <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                              장소: {formValues.location}
                           </motion.p>
                        )}
                        {enabledElements.traffic && formValues.traffic && (
                           <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
                              교통편: {formValues.traffic}
                           </motion.p>
                        )}
                        {enabledElements.contact && formValues.contact && (
                           <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
                              연락처: {formValues.contact}
                           </motion.p>
                        )}
                        {enabledElements.account && formValues.account && (
                           <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }}>
                              계좌번호: {formValues.account}
                           </motion.p>
                        )}
                        {enabledElements.attendance && formValues.attendance && (
                           <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }}>
                              참석 여부: {formValues.attendance}
                           </motion.p>
                        )}
                        {enabledElements.closing && formValues.closing && (
                           <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.9 }}>
                              {formValues.closing}
                           </motion.p>
                        )}
                     </motion.div>
                  </PreviewContent>
               </MobilePreview>
            </PreviewSection>

            {/* ===== 컨트롤 섹션 ===== */}
            <ControlSection>
               <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
                  <Tab label="요소 선택" />
                  <Tab label="스타일" />
                  <Tab label="내용 입력" />
               </Tabs>

               {/* 요소 선택 탭 */}
               {activeTab === 0 && (
                  <Box sx={{ mt: 2 }}>
                     <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                        표시할 요소 선택
                     </Typography>
                     {Object.entries(enabledElements).map(([key, value]) => (
                        <FormControlLabel
                           key={`element-${key}`}
                           control={
                              <Checkbox
                                 checked={value}
                                 onChange={(e) =>
                                    setEnabledElements((prev) => ({
                                       ...prev,
                                       [key]: e.target.checked,
                                    }))
                                 }
                              />
                           }
                           label={elementLabels[key] || key}
                        />
                     ))}
                  </Box>
               )}

               {/* 스타일 탭 */}
               {activeTab === 1 && (
                  <Box sx={{ mt: 2 }}>
                     <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                        스타일 설정
                     </Typography>
                     <InputGroup>
                        <label>배경색</label>
                        <SketchPicker color={template.style.backgroundColor} onChange={(color) => updateStyle({ backgroundColor: color.hex })} />
                     </InputGroup>
                     <InputGroup>
                        <label>폰트</label>
                        <Select value={template.style.fontFamily} onChange={(e) => updateStyle({ fontFamily: e.target.value })} fullWidth>
                           <MenuItem value="Malgun Gothic">맑은 고딕</MenuItem>
                           <MenuItem value="Playfair Display">Playfair Display</MenuItem>
                           <MenuItem value="Times New Roman">Times New Roman</MenuItem>
                        </Select>
                     </InputGroup>
                  </Box>
               )}

               {/* 내용 입력 탭 */}
               {activeTab === 2 && (
                  <Box sx={{ mt: 2 }}>
                     <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                        내용 입력
                     </Typography>
                     <InputGroup>
                        <label>제목</label>
                        <Controller name="title" control={control} render={({ field }) => <TextField {...field} fullWidth placeholder="제목을 입력하세요" />} />
                     </InputGroup>
                     <InputGroup>
                        <label>설명</label>
                        <Controller name="description" control={control} render={({ field }) => <TextField {...field} fullWidth multiline rows={3} placeholder="설명을 입력하세요" />} />
                     </InputGroup>
                     <InputGroup>
                        <label>인사말</label>
                        <Controller name="greeting" control={control} render={({ field }) => <TextField {...field} fullWidth multiline rows={2} placeholder="인사말을 입력하세요" />} />
                     </InputGroup>
                     <InputGroup>
                        <label>날짜</label>
                        <Controller name="date" control={control} render={({ field }) => <TextField {...field} fullWidth type="datetime-local" />} />
                     </InputGroup>
                     <InputGroup>
                        <label>장소</label>
                        <Controller name="location" control={control} render={({ field }) => <TextField {...field} fullWidth placeholder="장소를 입력하세요" />} />
                     </InputGroup>
                     <InputGroup>
                        <label>교통편</label>
                        <Controller name="traffic" control={control} render={({ field }) => <TextField {...field} fullWidth multiline rows={2} placeholder="교통편 정보를 입력하세요" />} />
                     </InputGroup>
                     <InputGroup>
                        <label>연락처</label>
                        <Controller name="contact" control={control} render={({ field }) => <TextField {...field} fullWidth placeholder="전화번호 / 이메일 등" />} />
                     </InputGroup>
                     <InputGroup>
                        <label>계좌번호</label>
                        <Controller name="account" control={control} render={({ field }) => <TextField {...field} fullWidth placeholder="계좌번호를 입력하세요" />} />
                     </InputGroup>
                     <InputGroup>
                        <label>참석여부</label>
                        <Controller name="attendance" control={control} render={({ field }) => <TextField {...field} fullWidth placeholder="참석여부를 입력하세요" />} />
                     </InputGroup>
                     <InputGroup>
                        <label>마무리말</label>
                        <Controller name="closing" control={control} render={({ field }) => <TextField {...field} fullWidth multiline rows={2} placeholder="마무리 인사를 입력하세요" />} />
                     </InputGroup>
                  </Box>
               )}

               {/* 액션 버튼 */}
               <ActionButton variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
                  저장하기
               </ActionButton>
               <ActionButton variant="outlined">임시저장</ActionButton>
            </ControlSection>
         </EditorContainer>
      </Container>
   )
}

export default TemplateEditor
