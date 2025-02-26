import React, { useState, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { styled } from '@mui/system'
import { Box, List, ListItem, ListItemText, Collapse } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const drawerWidth = 280

const LogoImgLink = styled('img')(({ theme }) => ({
   width: '240px',
   position: 'absolute',
   left: '20px',
   top: '10px',
   padding: '5px',
   borderBottom: '1px solid #f5f5f5',

   [theme.breakpoints.down('md')]: {
      // height: '70px',
   },
   [theme.breakpoints.down('sm')]: {
      // height: '50px',
   },
}))

const StyledDrawer = styled('div')(({ theme }) => ({
   width: drawerWidth,
   backgroundColor: theme.palette.background.paper,
   borderRight: `1px solid ${theme.palette.divider}`,
   position: 'fixed',
   height: '100vh',
   overflowY: 'auto',
   padding: '7rem 1rem 2rem 1rem',
}))

const DrawerItem = styled(ListItem, {
   shouldForwardProp: (prop) => !['$isActive', '$isExpanded'].includes(prop),
})(({ theme, $isActive, $isExpanded }) => ({
   padding: '0.7rem 1rem',
   cursor: 'pointer',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   backgroundColor: $isExpanded ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
   '& .MuiListItemText-primary': {
      color: $isActive ? theme.palette.primary.main : theme.palette.text.secondary,
      fontSize: '0.9rem',
      fontWeight: $isExpanded || $isActive ? 600 : 400,
   },
   '&:hover': {
      backgroundColor: theme.palette.action.hover,
   },
}))

const SubMenuItem = styled(ListItem, {
   shouldForwardProp: (prop) => prop !== '$isActive',
})(({ theme, $isActive }) => ({
   padding: '0.7rem 2rem',
   cursor: 'pointer',
   backgroundColor: 'transparent',
   '& .MuiListItemText-primary': {
      color: $isActive ? theme.palette.primary.main : theme.palette.text.secondary,
      fontSize: '0.85rem',
   },
   '&:hover': {
      backgroundColor: theme.palette.action.hover,
   },
}))

function AdminNavbar() {
   const location = useLocation()
   const [expandedMenus, setExpandedMenus] = useState({})

   const menuItems = {
      분석: [
         { name: '개요', path: '/admin/analytics/tab-overview' },
         { name: '템플릿', path: '/admin/analytics/tab-template' },
         { name: '유저', path: '/admin/analytics/tab-user' },
         { name: '버그 및 오류', path: '/admin/analytics/tab-error' },
      ],
      운영: [
         { name: '공지', path: '/admin/manage/tab-notice' },
         { name: '문의', path: '/admin/manage/tab-qna' },
         { name: '자주묻는질문', path: '/admin/manage/tab-faq' },
         { name: '리뷰', path: '/admin/manage/tab-review' },
      ],
      프로모션: [
         { name: '이벤트', path: '/admin/promotion/tab-event' },
         { name: '쿠폰', path: '/admin/promotion/tab-coupon' },
      ],
      템플릿: [
         { name: '판매중', path: '/admin/template/tab-active' },
         { name: '판매중지', path: '/admin/template/tab-inactive' },
      ],
   }

   const handleMenuToggle = useCallback((menu) => {
      setExpandedMenus((prev) => ({
         ...prev,
         [menu]: !prev[menu],
      }))
   }, [])

   const isPathActive = useCallback((path) => location.pathname === path, [location])

   const isCategoryActive = useCallback(
      (items) => {
         return items.some((item) => isPathActive(item.path))
      },
      [isPathActive],
   )

   return (
      <Box sx={{ display: 'flex', border: '1px solid black' }}>
         <StyledDrawer sx={{}}>
            <Link to="/admin">
               <LogoImgLink src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="로고" />
            </Link>
            <List>
               {Object.entries(menuItems).map(([category, items]) => (
                  <React.Fragment key={category}>
                     <DrawerItem $isExpanded={expandedMenus[category]} $isActive={isCategoryActive(items)} onClick={() => handleMenuToggle(category)}>
                        <ListItemText primary={category} />
                        {expandedMenus[category] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                     </DrawerItem>
                     <Collapse in={expandedMenus[category]} timeout="auto" unmountOnExit>
                        <List component="div">
                           {items.map((item) => (
                              <SubMenuItem key={item.name} component={Link} to={item.path} $isActive={isPathActive(item.path)}>
                                 <ListItemText primary={item.name} />
                              </SubMenuItem>
                           ))}
                        </List>
                     </Collapse>
                  </React.Fragment>
               ))}
            </List>
         </StyledDrawer>
      </Box>
   )
}

export default AdminNavbar
