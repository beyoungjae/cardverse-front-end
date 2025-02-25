import React from 'react'
import { Box, Typography, Avatar } from '@mui/material'
import { styled } from '@mui/material/styles'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Section } from '../styles/PreviewStyles'

const ProfileContainer = styled(Section)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   gap: '50px',
   marginBottom: '32px',
   '& .profile-name': {
      fontSize: '1.1rem',
      fontWeight: 500,
   },
   '& .profile-info': {
      fontSize: '0.9rem',
      color: 'rgba(0,0,0,0.6)',
   },
   '& .heart-icon': {
      color: '#E57373',
      fontSize: '36px',
   },
}))

const ProfileRow = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   gap: '24px',
}))

const ProfileItem = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   gap: '16px',
}))

const ProfileSection = ({ profiles, style, combinedStyle, textStyle }) => {
   return (
      <ProfileContainer style={style}>
         {profiles.length === 2 ? (
            <ProfileRow>
               <ProfileItem>
                  <Avatar
                     src={profiles[0]?.image}
                     sx={{
                        width: '80px',
                        height: '80px',
                        bgcolor: `${combinedStyle.color}15`,
                     }}
                  />
               </ProfileItem>

               {profiles.length === 2 ? <FavoriteIcon className="heart-icon" /> : null}

               <ProfileItem>
                  <Avatar
                     src={profiles[1]?.image}
                     sx={{
                        width: '80px',
                        height: '80px',
                        bgcolor: `${combinedStyle.color}15`,
                     }}
                  />
               </ProfileItem>
            </ProfileRow>
         ) : (
            profiles.map((profile, index) => (
               <ProfileItem key={index}>
                  <Avatar
                     src={profile.image}
                     sx={{
                        width: '80px',
                        height: '80px',
                        bgcolor: `${combinedStyle.color}15`,
                     }}
                  />
               </ProfileItem>
            ))
         )}

         <Box sx={{ display: 'flex', gap: '32px' }}>
            {profiles.map((profile, index) => (
               <ProfileItem key={index}>
                  <Typography className="profile-name" style={{ color: 'black', fontFamily: combinedStyle.fontFamily }}>
                     {profile.name}
                  </Typography>
                  {profile.phone && (
                     <>
                        <Typography className="profile-info" style={{ color: textStyle.color, fontFamily: combinedStyle.fontFamily }}>
                           연락처
                        </Typography>
                        <Typography className="profile-info" style={{ fontFamily: combinedStyle.fontFamily }}>
                           {profile.phone}
                        </Typography>
                     </>
                  )}
                  {profile.age && (
                     <Typography className="profile-info" style={{ fontFamily: combinedStyle.fontFamily }}>
                        {profile.age}세
                     </Typography>
                  )}
                  {profile.parents_father && (
                     <>
                        <Typography className="profile-info" style={{ color: textStyle.color, fontFamily: combinedStyle.fontFamily }}>
                           부(父)
                        </Typography>
                        <Typography className="profile-info" style={{ fontFamily: combinedStyle.fontFamily }}>
                           {profile.parents_father}
                        </Typography>
                     </>
                  )}
                  {profile.parents_mother && (
                     <>
                        <Typography className="profile-info" style={{ color: textStyle.color, fontFamily: combinedStyle.fontFamily }}>
                           모(母)
                        </Typography>
                        <Typography className="profile-info" style={{ fontFamily: combinedStyle.fontFamily }}>
                           {profile.parents_mother}
                        </Typography>
                     </>
                  )}
                  {profile.message && (
                     <>
                        <Typography className="profile-info" style={{ color: textStyle.color, fontFamily: combinedStyle.fontFamily }}>
                           메시지
                        </Typography>
                        <Typography className="profile-info" style={{ fontFamily: combinedStyle.fontFamily }}>
                           {profile.message}
                        </Typography>
                     </>
                  )}
                  {profile.children && (
                     <>
                        <Typography className="profile-info" style={{ color: textStyle.color, fontFamily: combinedStyle.fontFamily }}>
                           자녀
                        </Typography>
                        <Typography className="profile-info" style={{ fontFamily: combinedStyle.fontFamily }}>
                           {profile.children}
                        </Typography>
                     </>
                  )}
                  {profile.title && (
                     <>
                        <Typography className="profile-info" style={{ color: textStyle.color, fontFamily: combinedStyle.fontFamily }}>
                           직함
                        </Typography>
                        <Typography className="profile-info" style={{ fontFamily: combinedStyle.fontFamily }}>
                           {profile.title}
                        </Typography>
                     </>
                  )}
                  {profile.contact && (
                     <>
                        <Typography className="profile-info" style={{ color: textStyle.color, fontFamily: combinedStyle.fontFamily }}>
                           연락처
                        </Typography>
                        <Typography className="profile-info" style={{ fontFamily: combinedStyle.fontFamily }}>
                           {profile.contact}
                        </Typography>
                     </>
                  )}
               </ProfileItem>
            ))}
         </Box>
      </ProfileContainer>
   )
}

export default ProfileSection
