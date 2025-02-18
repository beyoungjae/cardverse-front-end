import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'

export const PreviewContainer = styled(Box)(({ theme }) => ({
   width: '100%',
   height: '100vh',
   backgroundColor: '#FFFFFF',
   borderRadius: '16px',
   position: 'relative',
   overflow: 'hidden',
}))

export const PreviewContent = styled(motion.div)(({ theme, backgroundColor }) => ({
   width: '100%',
   height: '100%',
   overflowY: 'auto',
   WebkitOverflowScrolling: 'touch',
   padding: '24px',
   backgroundColor: backgroundColor || '#FFFFFF',
   position: 'relative',
   '&::-webkit-scrollbar': {
      display: 'none',
   },
}))

export const Section = styled(Box)(({ theme }) => ({
   marginBottom: theme.spacing(3),
   padding: theme.spacing(3),
   backgroundColor: 'rgba(255, 255, 255, 0.9)',
   backdropFilter: 'blur(10px)',
   transition: 'all 0.3s ease',
}))
