import { styled } from '@mui/material/styles'
import { Box, Typography, TextField } from '@mui/material'
import { motion } from 'framer-motion'

// 디자인 시스템
export const COLORS = {
   primary: {
      main: '#F2E5E1',
      light: '#FFF5F2',
      dark: '#E5D5D0',
   },
   secondary: {
      main: '#EEE8E0',
      light: '#F8F4F0',
      dark: '#E0D8CC',
   },
   accent: {
      main: '#C0A583',
      light: '#D4BFA5',
      dark: '#A68B61',
   },
   text: {
      primary: '#2C2C2C',
      secondary: '#666666',
      hint: '#999999',
   },
   background: {
      default: '#FFFFFF',
      paper: '#FAFAFA',
      gradient: 'linear-gradient(135deg, #F2E5E1 0%, #EEE8E0 100%)',
   },
   error: '#FF6B6B',
   success: '#51CF66',
   warning: '#FFD43B',
}

// 애니메이션 variants
export const containerVariants = {
   hidden: { opacity: 0, y: 20 },
   visible: {
      opacity: 1,
      y: 0,
      transition: {
         duration: 0.5,
         ease: [0.43, 0.13, 0.23, 0.96],
      },
   },
   exit: {
      opacity: 0,
      y: -20,
      transition: {
         duration: 0.3,
         ease: [0.43, 0.13, 0.23, 0.96],
      },
   },
}

// 기본 섹션 컨테이너
export const SectionContainer = styled(Box)(({ theme }) => ({
   width: '100%',
   minHeight: 'fit-content',
   maxHeight: '100%',
   display: 'flex',
   flexDirection: 'column',
   gap: theme.spacing(2),
   position: 'relative',
   overflow: 'hidden',
   backgroundColor: 'rgba(255, 255, 255, 0.8)',
   backdropFilter: 'blur(10px)',
   borderRadius: '16px',
   border: `1px solid ${COLORS.accent.main}15`,
   padding: theme.spacing(3),
   transition: 'all 0.3s ease',
   '&:hover': {
      backgroundColor: 'white',
      transform: 'translateY(-2px)',
      boxShadow: `0 8px 24px ${COLORS.accent.main}15`,
   },
}))

export const SectionContent = styled(Box)(({ theme }) => ({
   flex: 1,
   overflow: 'auto',
   padding: theme.spacing(1),
   '&::-webkit-scrollbar': {
      width: '6px',
   },
   '&::-webkit-scrollbar-track': {
      background: 'transparent',
   },
   '&::-webkit-scrollbar-thumb': {
      background: COLORS.accent.main,
      borderRadius: '3px',
      '&:hover': {
         background: COLORS.accent.dark,
      },
   },
}))

// 섹션 제목 컨테이너
export const SectionTitle = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginBottom: theme.spacing(2),
}))

// 섹션 제목 텍스트
export const TitleText = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   gap: theme.spacing(1),
   '& .icon': {
      color: COLORS.accent.main,
      fontSize: '1.5rem',
   },
   '& .title': {
      fontSize: '1.1rem',
      fontWeight: 500,
      color: COLORS.text.primary,
   },
}))

// 아이콘 버튼 래퍼
export const IconButtonWrapper = styled(Box)(({ theme }) => ({
   display: 'flex',
   gap: theme.spacing(1),
   alignItems: 'center',
   '& .MuiIconButton-root': {
      color: COLORS.accent.main,
      transition: 'all 0.3s ease',
      padding: theme.spacing(1),
      '&:hover': {
         backgroundColor: `${COLORS.accent.main}15`,
         transform: 'translateY(-2px)',
      },
   },
}))

// 입력 필드
export const StyledTextField = styled(TextField)(({ theme }) => ({
   '& .MuiOutlinedInput-root': {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(4px)',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      '&:hover': {
         backgroundColor: 'rgba(255, 255, 255, 0.95)',
         '& .MuiOutlinedInput-notchedOutline': {
            borderColor: COLORS.accent.main,
         },
      },
      '&.Mui-focused': {
         backgroundColor: '#FFFFFF',
         transform: 'translateY(-1px)',
         boxShadow: `0 4px 12px ${COLORS.accent.main}15`,
         '& .MuiOutlinedInput-notchedOutline': {
            borderColor: COLORS.accent.main,
            borderWidth: '1px',
         },
      },
   },
   '& .MuiInputLabel-root.Mui-focused': {
      color: COLORS.accent.main,
   },
}))

// 텍스트 영역
export const StyledTextArea = styled('textarea')(({ theme }) => ({
   width: '100%',
   minHeight: '150px',
   padding: theme.spacing(2),
   border: `1px solid ${COLORS.accent.main}30`,
   borderRadius: '8px',
   fontSize: '1rem',
   lineHeight: 1.6,
   resize: 'vertical',
   fontFamily: 'Noto Serif KR, serif',
   backgroundColor: 'rgba(255, 255, 255, 0.8)',
   backdropFilter: 'blur(4px)',
   transition: 'all 0.3s ease',
   '&:focus': {
      outline: 'none',
      borderColor: COLORS.accent.main,
      backgroundColor: '#FFFFFF',
      transform: 'translateY(-1px)',
      boxShadow: `0 4px 12px ${COLORS.accent.main}15`,
   },
   '&::placeholder': {
      color: COLORS.text.hint,
      fontFamily: 'Pretendard, sans-serif',
   },
}))

// 도움말 텍스트
export const HelpText = styled(motion.div)(({ theme }) => ({
   fontSize: '0.875rem',
   color: COLORS.text.secondary,
   padding: theme.spacing(2.5),
   backgroundColor: COLORS.secondary.light,
   borderRadius: '8px',
   marginTop: theme.spacing(2),
   border: `1px solid ${COLORS.accent.main}15`,
   fontFamily: 'Pretendard, sans-serif',
   lineHeight: 1.6,
   '& strong': {
      color: COLORS.accent.main,
      fontWeight: 600,
   },
}))

// 문자 수 카운터
export const CharacterCount = styled(Typography)(({ theme, isNearLimit }) => ({
   textAlign: 'right',
   color: isNearLimit ? COLORS.warning : COLORS.text.hint,
   fontSize: '0.75rem',
   marginTop: theme.spacing(1),
   fontFamily: 'Pretendard, sans-serif',
   transition: 'color 0.3s ease',
}))

// 미리보기 프레임
export const PreviewFrame = styled(motion.div)(({ theme }) => ({
   width: '375px',
   height: '667px',
   position: 'relative',
   borderRadius: '44px',
   backgroundColor: COLORS.background.default,
   boxShadow: '0 24px 48px rgba(0, 0, 0, 0.12)',
   overflow: 'hidden',
   transform: 'perspective(1000px) rotateY(-5deg)',
   transformStyle: 'preserve-3d',
   transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
   border: '12px solid #2C2C2C',
   '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '150px',
      height: '24px',
      backgroundColor: '#2C2C2C',
      borderBottomLeftRadius: '12px',
      borderBottomRightRadius: '12px',
   },
   '&:hover': {
      transform: 'perspective(1000px) rotateY(0deg)',
      boxShadow: '0 32px 64px rgba(0, 0, 0, 0.15)',
   },
}))

// 애니메이션 variants
export const fadeInUp = {
   initial: { opacity: 0, y: 20 },
   animate: {
      opacity: 1,
      y: 0,
      transition: {
         duration: 0.5,
         ease: [0.43, 0.13, 0.23, 0.96],
      },
   },
   exit: {
      opacity: 0,
      y: -20,
      transition: {
         duration: 0.3,
         ease: [0.43, 0.13, 0.23, 0.96],
      },
   },
}

export const fadeIn = {
   initial: { opacity: 0 },
   animate: {
      opacity: 1,
      transition: {
         duration: 0.4,
         ease: 'easeOut',
      },
   },
   exit: {
      opacity: 0,
      transition: {
         duration: 0.2,
         ease: 'easeIn',
      },
   },
}

// 트랜지션
export const springTransition = {
   type: 'spring',
   stiffness: 300,
   damping: 30,
   mass: 1,
}

export const easeTransition = {
   duration: 0.3,
   ease: [0.43, 0.13, 0.23, 0.96],
}

export const fadeInVariants = {
   hidden: { opacity: 0, y: 20 },
   visible: {
      opacity: 1,
      y: 0,
      transition: {
         duration: 0.5,
         ease: 'easeOut',
      },
   },
}
