import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaInstagram, FaFacebookF, FaYoutube } from 'react-icons/fa'
import { AppBar, Toolbar, IconButton, Box, Drawer, List, ListItem, ListItemText, Collapse } from '@mui/material'
import { styled } from '@mui/system'
import { motion, AnimatePresence } from 'framer-motion'
import MenuIcon from '@mui/icons-material/Menu'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const StyledAppBar = styled(AppBar)(({ theme }) => ({
   backgroundColor: theme.palette.background.paper,
   borderBottom: `1px solid ${theme.palette.divider}`,
   boxShadow: 'none',
   position: 'fixed',
   top: 0,
   left: 0,
   right: 0,
   zIndex: theme.zIndex.appBar,
}))

const SocialIcons = styled(Box)(({ theme }) => ({
   display: 'flex',
   gap: '1rem',
   color: theme.palette.text.secondary,
   [theme.breakpoints.down('md')]: {
      display: 'none',
   },
}))

const LogoContainer = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   flexGrow: 1,
   position: 'absolute',
   left: '50%',
   transform: 'translateX(-50%)',
   [theme.breakpoints.down('md')]: {
      flexGrow: 0,
      marginRight: 'auto',
   },
}))

const Logoimg = styled('img')(({ theme }) => ({
   margin: '0 auto',
   height: '40px',
   cursor: 'pointer',
   '&:hover': {
      transform: 'translateY(-2px)',
   },
   transition: 'transform 0.3s ease',
   '&:active': {
      transform: 'scale(0.9)',
   },
   [theme.breakpoints.down('md')]: {
      height: '30px',
   },
}))

const NavLinks = styled(Box)(({ theme }) => ({
   display: 'flex',
   gap: '2rem',
   color: theme.palette.text.secondary,
   marginLeft: 'auto',
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
   padding: '1.1rem 0',
   borderTop: `1px solid ${theme.palette.divider}`,
   borderBottom: `1px solid ${theme.palette.divider}`,
   backgroundColor: theme.palette.background.paper,
   position: 'fixed',
   top: '64px',
   left: 0,
   right: 0,
   zIndex: theme.zIndex.appBar - 1,
   [theme.breakpoints.down('lg')]: {
      gap: '8rem',
   },
   [theme.breakpoints.down('md')]: {
      gap: '4rem',
   },
   [theme.breakpoints.down('sm')]: {
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
      whiteSpace: 'nowrap',
      [theme.breakpoints.down('lg')]: {
         fontSize: '1rem',
         letterSpacing: '0.3em',
      },
      [theme.breakpoints.down('md')]: {
         fontSize: '0.9rem',
         letterSpacing: '0.2em',
      },
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
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   cursor: 'pointer',
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
   const [expandedMenus, setExpandedMenus] = useState({})

   const menuItems = {
      HOME: [
         { name: '메인', path: '/' },
         { name: '소개', path: '/about' },
      ],
      TEMPLATE: [{ name: '템플릿 모아보기', path: '/template' }],
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

   const handleMenuToggle = (menu) => {
      setExpandedMenus((prev) => ({
         ...prev,
         [menu]: !prev[menu],
      }))
   }

   const drawer = (
      <List>
         {Object.entries(menuItems).map(([menu, items]) => (
            <React.Fragment key={menu}>
               <DrawerItem
                  onClick={() => handleMenuToggle(menu)}
                  sx={{
                     backgroundColor: expandedMenus[menu] ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
                  }}
               >
                  <ListItemText
                     primary={menu}
                     sx={{
                        '& .MuiTypography-root': {
                           fontWeight: expandedMenus[menu] ? 600 : 400,
                        },
                     }}
                  />
                  {expandedMenus[menu] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
               </DrawerItem>
               <Collapse in={expandedMenus[menu]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                     {items.map((item) => (
                        <DrawerItem key={item.name} component={Link} to={item.path} sx={{ pl: 4 }} onClick={handleDrawerToggle}>
                           <ListItemText primary={item.name} />
                        </DrawerItem>
                     ))}
                  </List>
               </Collapse>
            </React.Fragment>
         ))}
         <DrawerItem component={Link} to="/support" onClick={handleDrawerToggle}>
            <ListItemText primary="고객센터" />
         </DrawerItem>
         <DrawerItem component={Link} to="/my" onClick={handleDrawerToggle}>
            <ListItemText primary="마이페이지" />
         </DrawerItem>
         <DrawerItem component={Link} to="/signup" onClick={handleDrawerToggle}>
            <ListItemText primary="회원가입" />
         </DrawerItem>
         <DrawerItem component={Link} to="/login" onClick={handleDrawerToggle}>
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
                  <Link to="/">
                     <Logoimg src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="로고" />
                  </Link>
               </LogoContainer>
               <NavLinks>
                  <Link to="/admin">관리자</Link>
                  <Link to="/support">고객센터</Link>
                  <Link to="/my">마이페이지</Link>
                  <Link to="/signup">회원가입</Link>
                  <Link to="/login">로그인</Link>
               </NavLinks>
            </Toolbar>
         </StyledAppBar>
         <BottomNav>
            {Object.keys(menuItems).map((menu) => (
               <NavItem key={menu} onMouseEnter={() => setActiveMenu(menu)} onMouseLeave={() => setActiveMenu(null)}>
                  <Link>{menu}</Link>
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
