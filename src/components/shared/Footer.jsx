import React from 'react'
import { styled } from '@mui/material/styles'
import { Box, Container, Typography, Link, Divider } from '@mui/material'

const FooterWrapper = styled(Box)(({ theme }) => ({
   backgroundColor: theme.palette.background.paper,
   paddingTop: '60px',
   paddingBottom: '60px',
   borderTop: `1px solid ${theme.palette.divider}`,
}))

const FooterContainer = styled(Container)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   gap: '24px',
}))

const Copyright = styled(Typography)(({ theme }) => ({
   color: theme.palette.text.primary,
   fontWeight: 500,
   fontSize: '0.95rem',
}))

const LinkGroup = styled(Box)(({ theme }) => ({
   display: 'flex',
   gap: '16px',
   alignItems: 'center',
   '& > a': {
      color: theme.palette.text.secondary,
      textDecoration: 'none',
      fontSize: '0.9rem',
      transition: 'color 0.2s ease',
      '&:hover': {
         color: theme.palette.primary.main,
      },
   },
}))

const StyledDivider = styled(Typography)(({ theme }) => ({
   color: theme.palette.text.disabled,
   margin: '0 8px',
}))

const ContactInfo = styled(Typography)(({ theme }) => ({
   color: theme.palette.text.secondary,
   fontSize: '0.9rem',
   textAlign: 'center',
}))

const TagLine = styled(Typography)(({ theme }) => ({
   color: theme.palette.primary.main,
   fontSize: '1.1rem',
   fontWeight: 500,
   textAlign: 'center',
   marginTop: '8px',
   letterSpacing: '0.5px',
}))

const Footer = () => {
   return (
      <FooterWrapper>
         <FooterContainer maxWidth="lg">
            <Copyright>© 2025 CardVerse. All rights reserved.</Copyright>

            <LinkGroup>
               <Link href="/terms">이용약관</Link>
               <StyledDivider>|</StyledDivider>
               <Link href="/privacy">개인정보처리방침</Link>
            </LinkGroup>

            <ContactInfo>문의: contact@example.com</ContactInfo>

            <Divider sx={{ width: '100%', maxWidth: '200px', my: 2 }} />

            <TagLine>쉽고 감각적인 초대장 제작, 지금 시작해보세요!</TagLine>
         </FooterContainer>
      </FooterWrapper>
   )
}

export default Footer
