import React from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles'
import { motion, AnimatePresence } from 'framer-motion'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'

const LoadingContainer = styled(Box)(({ theme }) => ({
   position: 'relative',
   width: '100%',
   height: '100%',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   backgroundColor: 'rgba(255, 255, 255, 0.9)',
   borderRadius: theme.shape.borderRadius,
   overflow: 'hidden',
   padding: theme.spacing(3),
}))

const LoadingText = styled(Typography)(({ theme }) => ({
   marginTop: theme.spacing(3),
   color: theme.palette.text.secondary,
   fontWeight: 500,
   textAlign: 'center',
   fontSize: '1.1rem',
}))

const SubText = styled(Typography)(({ theme }) => ({
   marginTop: theme.spacing(1),
   color: theme.palette.text.secondary,
   opacity: 0.7,
   fontSize: '0.9rem',
   textAlign: 'center',
}))

const LoadingIcon = styled(motion.div)(({ theme }) => ({
   width: '80px',
   height: '80px',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   position: 'relative',
   marginBottom: theme.spacing(3),
}))

const SparkleIcon = styled(motion(AutoAwesomeIcon))(({ theme }) => ({
   color: theme.palette.primary.main,
   fontSize: '2rem',
   position: 'absolute',
}))

const ProgressWrapper = styled(Box)(({ theme }) => ({
   position: 'relative',
   width: '100%',
   maxWidth: '300px',
   marginTop: theme.spacing(4),
}))

const ProgressBar = styled(motion.div)(({ theme }) => ({
   height: '4px',
   backgroundColor: theme.palette.primary.main,
   borderRadius: theme.shape.borderRadius,
}))

const PreviewLoading = () => {
   const containerVariants = {
      initial: { opacity: 0 },
      animate: {
         opacity: 1,
         transition: {
            duration: 0.3,
            staggerChildren: 0.2,
         },
      },
      exit: {
         opacity: 0,
         transition: {
            duration: 0.3,
         },
      },
   }

   const iconVariants = {
      animate: {
         rotate: 360,
         transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
         },
      },
   }

   const sparkleVariants = {
      animate: {
         scale: [1, 1.2, 1],
         opacity: [0.5, 1, 0.5],
         transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
         },
      },
   }

   const progressVariants = {
      initial: { width: 0 },
      animate: {
         width: '100%',
         transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
         },
      },
   }

   const textVariants = {
      initial: { opacity: 0, y: 20 },
      animate: {
         opacity: 1,
         y: 0,
         transition: {
            duration: 0.5,
         },
      },
   }

   return (
      <AnimatePresence>
         <LoadingContainer component={motion.div} variants={containerVariants} initial="initial" animate="animate" exit="exit">
            <LoadingIcon variants={iconVariants} animate="animate">
               <CircularProgress size={60} thickness={4} />
               <SparkleIcon variants={sparkleVariants} animate="animate" />
            </LoadingIcon>

            <LoadingText component={motion.div} variants={textVariants}>
               로딩중 입니다.
            </LoadingText>
            <SubText component={motion.div} variants={textVariants}>
               잠시만 기다려주세요
            </SubText>

            <ProgressWrapper>
               <ProgressBar variants={progressVariants} initial="initial" animate="animate" />
            </ProgressWrapper>

            <Box sx={{ position: 'absolute', bottom: 0, width: '100%', height: '4px' }}>
               <motion.div
                  style={{
                     width: '100%',
                     height: '100%',
                     background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  }}
                  animate={{
                     x: ['100%', '-100%'],
                  }}
                  transition={{
                     duration: 1.5,
                     repeat: Infinity,
                     ease: 'linear',
                  }}
               />
            </Box>
         </LoadingContainer>
      </AnimatePresence>
   )
}

export default PreviewLoading
