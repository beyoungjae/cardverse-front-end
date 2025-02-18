import React from 'react'
import { Box, Typography } from '@mui/material'
import { Section } from '../styles/PreviewStyles'
import styled from '@emotion/styled'

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

const AccountSection = ({ accounts, style, type, getAccountLabel, textStyle }) => {
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

   return (
      <AccountStyle style={style}>
         <Typography sx={{ textAlign: 'center', color: style.color, fontWeight: 'bold', mb: 2 }}>{getTitle()}</Typography>
         {accounts.map((account, index) => (
            <Box key={index} className="account-item">
               <Typography className="account-label" style={{ color: style.color }}>
                  {getAccountLabel(index)}
               </Typography>
               <Typography className="account-number" style={{ color: textStyle.color }}>
                  {account.bank} {account.number}
               </Typography>
               <Typography className="account-holder">{account.holder}</Typography>
            </Box>
         ))}
      </AccountStyle>
   )
}

export default AccountSection
