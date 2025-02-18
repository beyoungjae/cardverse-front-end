import React from 'react'
import { Typography } from '@mui/material'
import { Section } from '../styles/PreviewStyles'

const RSVPSection = ({ rsvpData, style }) => {
   const { rsvpTitle, rsvpDescription } = rsvpData

   return (
      <Section style={style}>
         <Typography sx={{ color: style.color, fontWeight: 500, mb: 1 }}>{rsvpTitle}</Typography>
         <Typography sx={{ color: 'rgba(0,0,0,0.6)', fontSize: '0.9rem' }}>{rsvpDescription}</Typography>
      </Section>
   )
}

export default RSVPSection
