import React from 'react'
import { Typography } from '@mui/material'
import { Section } from '../styles/PreviewStyles'
import { styled } from '@mui/material/styles'

const GreetingContainer = styled(Section)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   textAlign: 'center',
   padding: theme.spacing(4),
}))

const GreetingSection = ({ greeting, style, combinedStyle, textStyle }) => {
   return (
      <GreetingContainer style={style}>
         <Typography
            sx={{
               whiteSpace: 'pre-line',
               lineHeight: 1.8,
               color: textStyle.color,
               fontFamily: combinedStyle.fontFamily,
               fontSize: '0.9rem',
            }}
         >
            {greeting}
         </Typography>
      </GreetingContainer>
   )
}

export default GreetingSection
