import React from 'react'
import { Box, Typography, Avatar } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Section } from '../styles/PreviewStyles'

const ProfileContainer = styled(Section)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   gap: '32px',
   marginBottom: '32px',
   '& .profile-item': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
   },
   '& .profile-avatar': {
      width: '80px',
      height: '80px',
      marginBottom: '8px',
   },
   '& .profile-name': {
      fontSize: '1.1rem',
      fontWeight: 500,
   },
   '& .profile-info': {
      fontSize: '0.9rem',
      color: 'rgba(0,0,0,0.6)',
   },
}))

const ProfileSection = ({ profiles, style, combinedStyle, textStyle }) => {
   return (
      <ProfileContainer style={style}>
         {profiles.map((profile, index) => (
            <Box key={index} className="profile-item">
               <Avatar
                  src={profile.image}
                  className="profile-avatar"
                  sx={{
                     bgcolor: `${combinedStyle.color}15`,
                  }}
               />
               <Typography className="profile-name" style={{ color: combinedStyle.color }}>
                  {profile.name}
               </Typography>
               {(profile.phone || profile.contact) && (
                  <>
                     <Typography className="profile-info" style={{ color: textStyle.color }}>
                        연락처
                     </Typography>
                     <Typography className="profile-info">{profile.phone}</Typography>
                     <Typography className="profile-info">{profile.contact}</Typography>
                  </>
               )}
               {profile.age && <Typography className="profile-info">{profile.age}세</Typography>}
               {profile.parents_father && (
                  <>
                     <Typography className="profile-info" style={{ color: textStyle.color }}>
                        부(父)
                     </Typography>
                     <Typography className="profile-info">{profile.parents_father}</Typography>
                  </>
               )}
               {profile.parents_mother && (
                  <>
                     <Typography className="profile-info" style={{ color: textStyle.color }}>
                        모(母)
                     </Typography>
                     <Typography className="profile-info">{profile.parents_mother}</Typography>
                  </>
               )}
               {profile.message && (
                  <>
                     <Typography className="profile-info" style={{ color: textStyle.color }}>
                        메시지
                     </Typography>
                     <Typography className="profile-info">{profile.message}</Typography>
                  </>
               )}
               {profile.children && (
                  <>
                     <Typography className="profile-info" style={{ color: textStyle.color }}>
                        자녀
                     </Typography>
                     <Typography className="profile-info">{profile.children}</Typography>
                  </>
               )}
               {profile.title && (
                  <>
                     <Typography className="profile-info" style={{ color: textStyle.color }}>
                        직함
                     </Typography>
                     <Typography className="profile-info">{profile.title}</Typography>
                  </>
               )}
            </Box>
         ))}
      </ProfileContainer>
   )
}

export default ProfileSection
