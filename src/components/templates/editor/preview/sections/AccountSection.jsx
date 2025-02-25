import React from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import { Section } from '../styles/PreviewStyles'
import styled from '@emotion/styled'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

const AccountStyle = styled(Section)(({ theme }) => ({
   '& .account-item': {
      backgroundColor: 'rgba(255,255,255,0.8)',
      padding: '16px',
      borderRadius: '8px',
      marginBottom: '12px',
   },
   '& .account-label': {
      fontSize: '0.9rem',
      color: 'rgba(0,0,0,0.6)',
      marginBottom: '4px',
   },
   '& .account-number': {
      fontSize: '1rem',
      fontWeight: 500,
   },
   '& .account-holder': {
      fontSize: '0.9rem',
      color: 'rgba(0,0,0,0.6)',
      marginTop: '4px',
   },
}))

const AccountSection = ({ accounts, style, type, getAccountLabel, textStyle, combinedStyle }) => {
   const getTitle = () => {
      switch (type) {
         case 'wedding':
            return '마음 전하실 곳'
         case 'newYear':
            return '새해 선물 전하실 곳'
         case 'birthday':
            return '축하의 마음 전하실 곳'
         default:
            return '감사의 마음 전하실 곳'
      }
   }

   const handleCopyAccount = (account) => {
      navigator.clipboard.writeText(account.number)
      alert('계좌번호가 복사되었습니다.')
   }

   return (
      <AccountStyle style={style}>
         <Typography sx={{ textAlign: 'center', color: combinedStyle?.color || 'inherit', fontFamily: combinedStyle?.fontFamily || 'inherit', fontWeight: 'bold', mb: 2 }}>{getTitle()}</Typography>
         {accounts.map((account, index) => (
            <Box key={index} className="account-item">
               <Typography className="account-label" style={{ color: combinedStyle?.color || 'inherit', fontFamily: combinedStyle?.fontFamily || 'inherit' }}>
                  {getAccountLabel(index)}
               </Typography>

               <Typography className="account-number" style={{ color: textStyle.color, fontFamily: combinedStyle?.fontFamily || 'inherit' }}>
                  {account.bank} {account.number}
                  <IconButton
                     onClick={() => handleCopyAccount(account)}
                     sx={{
                        color: textStyle?.color || 'inherit',
                        '&:hover': {
                           backgroundColor: `${textStyle?.color}15`,
                        },
                        display: 'inline-block',
                        marginLeft: '10px',
                     }}
                  >
                     <ContentCopyIcon />
                  </IconButton>
               </Typography>
               <Typography className="account-holder" style={{ fontFamily: combinedStyle?.fontFamily || 'inherit' }}>
                  {account.holder}
               </Typography>
            </Box>
         ))}
      </AccountStyle>
   )
}

export default AccountSection
