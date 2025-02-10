import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaInstagram, FaFacebookF, FaYoutube } from 'react-icons/fa'
import { AppBar, Toolbar, IconButton, Box, useTheme, Drawer, List, ListItem, ListItemText } from '@mui/material'
import { styled } from '@mui/system'
import { motion, AnimatePresence } from 'framer-motion'
import MenuIcon from '@mui/icons-material/Menu'

const StyledAppBar = styled(AppBar)(({ theme }) => ({
   backgroundColor: theme.palette.background.paper,
   borderBottom: `1px solid ${theme.palette.divider}`,
   boxShadow: 'none',
}))

const SocialIcons = styled(Box)(({ theme }) => ({
   display: 'flex',
   gap: '1rem',
   color: theme.palette.text.secondary,
   [theme.breakpoints.down('md')]: {
      display: 'none',
   },
}))

const Logoimg = styled('img')(({ theme }) => ({
   height: '40px',
   cursor: 'pointer',
   [theme.breakpoints.down('md')]: {
      display: 'none',
   },
}))

const LogoContainer = styled(Box)(({ theme }) => ({
   flexGrow: 1,
   textAlign: 'center',
   [theme.breakpoints.down('md')]: {
      display: 'none',
   },
}))

const NavLinks = styled(Box)(({ theme }) => ({
   display: 'flex',
   gap: '2rem',
   color: theme.palette.text.secondary,
   '& a': {
      textDecoration: 'none',
      color: 'inherit',
      fontSize: '0.7rem',
      fontFamily: theme.typography.body1.fontFamily,
      '&:hover': {
         color: theme.palette.text.primary,
      },
   },
   [theme.breakpoints.down('md')]: {
      display: 'none',
   },
}))

const BottomNav = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   gap: '12rem',
   padding: '1rem 0',
   borderTop: `1px solid ${theme.palette.divider}`,
   borderBottom: `1px solid ${theme.palette.divider}`,
   backgroundColor: theme.palette.background.paper,
   position: 'relative',
   [theme.breakpoints.down('md')]: {
      display: 'none',
   },
}))

const NavItem = styled(Box)(({ theme }) => ({
   position: 'relative',
   cursor: 'pointer',
   '& > a': {
      textDecoration: 'none',
      color: theme.palette.text.secondary,
      fontSize: '1.1rem',
      fontWeight: 400,
      letterSpacing: '0.5em',
      fontFamily: theme.typography.body1.fontFamily,
      '&:hover': {
         color: theme.palette.text.primary,
      },
   },
}))

const DropdownMenu = styled(motion.div)(({ theme }) => ({
   position: 'absolute',
   top: 'calc(100% + 1px)',
   transform: 'translateX(-50%)',
   backgroundColor: theme.palette.background.paper,
   boxShadow: theme.shadows[1],
   padding: '1rem 0',
   display: 'flex',
   flexDirection: 'column',
   minWidth: '180px',
   zIndex: theme.zIndex.modal,
   '& a': {
      textDecoration: 'none',
      color: theme.palette.text.secondary,
      padding: '0.7rem 2rem',
      fontSize: '0.9rem',
      fontFamily: theme.typography.body1.fontFamily,
      whiteSpace: 'nowrap',
      '&:hover': {
         backgroundColor: theme.palette.action.hover,
         color: theme.palette.text.primary,
      },
   },
}))

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
   display: 'none',
   color: theme.palette.text.secondary,
   [theme.breakpoints.down('md')]: {
      display: 'block',
   },
}))

const StyledDrawer = styled(Drawer)(({ theme }) => ({
   '& .MuiDrawer-paper': {
      width: '280px',
      padding: '2rem 1rem',
      backgroundColor: theme.palette.background.paper,
   },
}))

const DrawerItem = styled(ListItem)(({ theme }) => ({
   padding: '0.7rem 1rem',
   '& .MuiListItemText-primary': {
      color: theme.palette.text.secondary,
      fontSize: '0.9rem',
      fontFamily: theme.typography.body1.fontFamily,
   },
   '&:hover': {
      backgroundColor: theme.palette.action.hover,
      '& .MuiListItemText-primary': {
         color: theme.palette.text.primary,
      },
   },
}))

// 드롭다운 애니메이션 효과
const dropdownVariants = {
   hidden: {
      opacity: 0,
      y: 10,
   },
   visible: {
      opacity: 1,
      y: 0,
      transition: {
         duration: 0.2,
      },
   },
   exit: {
      opacity: 0,
      y: 10,
      transition: {
         duration: 0.2,
      },
   },
}

const Navbar = () => {
   const [activeMenu, setActiveMenu] = useState(null)
   const [mobileOpen, setMobileOpen] = useState(false)
   // eslint-disable-next-line
   const theme = useTheme()

   const menuItems = {
      HOME: [
         { name: '메인', path: '/' },
         { name: '소개', path: '/about' },
         { name: '공지사항', path: '/notice' },
      ],
      TEMPLATE: [
         { name: '전체 템플릿', path: '/template' },
         { name: '인기 템플릿', path: '/template/popular' },
         { name: '신규 템플릿', path: '/template/new' },
      ],
      EVENT: [
         { name: '진행중인 이벤트', path: '/event' },
         { name: '종료된 이벤트', path: '/event/ended' },
         { name: '당첨자 발표', path: '/event/winners' },
      ],
      REVIEW: [{ name: '리뷰', path: '/review' }],
   }

   const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen)
   }

   const drawer = (
      <List>
         {Object.entries(menuItems).map(([menu, items]) => (
            <React.Fragment key={menu}>
               <DrawerItem component={Link} to={`/${menu.toLowerCase()}`}>
                  <ListItemText primary={menu} />
               </DrawerItem>
               {items.map((item) => (
                  <DrawerItem key={item.name} component={Link} to={item.path} sx={{ pl: 4 }}>
                     <ListItemText primary={item.name} />
                  </DrawerItem>
               ))}
            </React.Fragment>
         ))}
         <DrawerItem component={Link} to="/support">
            <ListItemText primary="고객센터" />
         </DrawerItem>
         <DrawerItem component={Link} to="/mypage">
            <ListItemText primary="마이페이지" />
         </DrawerItem>
         <DrawerItem component={Link} to="/signup">
            <ListItemText primary="회원가입" />
         </DrawerItem>
         <DrawerItem component={Link} to="/login">
            <ListItemText primary="로그인" />
         </DrawerItem>
      </List>
   )

   return (
      <>
         <StyledAppBar position="static">
            <Toolbar>
               <MobileMenuButton edge="start" onClick={handleDrawerToggle} aria-label="menu">
                  <MenuIcon />
               </MobileMenuButton>
               <SocialIcons>
                  <IconButton>
                     <FaInstagram />
                  </IconButton>
                  <IconButton>
                     <FaFacebookF />
                  </IconButton>
                  <IconButton>
                     <FaYoutube />
                  </IconButton>
               </SocialIcons>
               <LogoContainer>
                  <Logoimg component={Link} to="/" src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="로고" />
               </LogoContainer>
               <NavLinks>
                  <Link to="/support">고객센터</Link>
                  <Link to="/mypage">마이페이지</Link>
                  <Link to="/signup">회원가입</Link>
                  <Link to="/login">로그인</Link>
               </NavLinks>
            </Toolbar>
         </StyledAppBar>
         <BottomNav>
            {Object.keys(menuItems).map((menu) => (
               <NavItem key={menu} onMouseEnter={() => setActiveMenu(menu)} onMouseLeave={() => setActiveMenu(null)}>
                  <Link to={`/${menu.toLowerCase()}`}>{menu}</Link>
                  <AnimatePresence>
                     {activeMenu === menu && (
                        <DropdownMenu variants={dropdownVariants} initial="hidden" animate="visible" exit="exit">
                           {menuItems[menu].map((item) => (
                              <Link key={item.name} to={item.path}>
                                 {item.name}
                              </Link>
                           ))}
                        </DropdownMenu>
                     )}
                  </AnimatePresence>
               </NavItem>
            ))}
         </BottomNav>
         <StyledDrawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
               keepMounted: true,
            }}
         >
            {drawer}
         </StyledDrawer>
      </>
   )
}

export default Navbar
