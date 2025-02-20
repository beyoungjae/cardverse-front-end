import React from 'react'
import { Typography } from '@mui/material'
import { Section } from '../styles/PreviewStyles'
import { styled } from '@mui/material/styles'

const TitleContainer = styled(Section)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
}))

const TitleSection = ({ title, style, combinedStyle }) => {
   return (
      <TitleContainer style={style}>
         <Typography
            variant="h5"
            sx={{
               color: combinedStyle.color,
               fontFamily: combinedStyle.fontFamily,
               fontSize: '1.1rem',
               fontWeight: 'bold',
               mb: 2,
            }}
         >
            {title}
         </Typography>
      </TitleContainer>
   )
}

export default TitleSection
