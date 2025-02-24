import React, { useState } from 'react'
import { Form, Link, useNavigate, useParams } from 'react-router-dom'

import { Container } from '../layouts/boxCommon'
import { Title } from '../layouts/textCommon'
import { StyledButton } from '../layouts/btnCommon'

import { Box, Typography, Select, MenuItem, FormControl, Pagination } from '@mui/material'
import { styled } from '@mui/system'

import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'

const GridContainer = styled(Box)(({ theme }) => ({
   display: 'grid',
   gridTemplateColumns: 'repeat(2, 1fr)', // 2열
   gridTemplateRows: 'repeat(3, 1fr)', // 3행
   gap: '16px',
   padding: '10px',
   border: '1px solid #cccccc',
   borderRadius: '4px',
   backgroundColor: '#f8f8f4',
}))

const ListContainer = styled(Box)(({ theme }) => ({
   padding: '10px',
   border: '1px solid #cccccc',
   borderRadius: '4px',
   backgroundColor: '#ffffff',
   height: '100%',
   display: 'flex',
   flexDirection: 'column',
   gap: '1.7%',
   justifyContent: 'center',

   position: 'relative',
}))

const Toolbar = styled(Box)(({ theme }) => ({
   position: 'absolute',
   top: '10px',
   left: 0,
   padding: '0 10px',
   display: 'flex',
   justifyContent: 'space-between',
   width: '100%',
   alignItems: 'center',
}))

const StyledLink = styled(Link)(({ theme }) => ({
   color: 'black',
   display: 'flex',
   alignItems: 'center',
   textDecoration: 'none',
   gap: '8px',
   padding: '10px 15px 10px 10px',
   borderRadius: '4px',
   border: '1px solid #e5e5e5',

   '&:hover': {
      backgroundColor: '#eeeeee',
   },

   // position: 'absolute',
   // top: '10px',
   // right: '10px',
}))

const StyledControl = styled(FormControl)(({ theme }) => ({
   // position: 'absolute',
   // top: '10px',
   // Left: '10px',
   minWidth: 180,
   // height: 'auto',
}))

function MainContainer({ type, categories, children }) {
   const { id } = useParams()
   const [selectedCategory, setSelectedCategory] = useState(categories?.[0]?.value || '')

   const newPost = `/admin/${id}/new`

   const Type = type.charAt(0).toUpperCase() + type.slice(1)

   const componentMap = {
      GridContainer,
      ListContainer,
   }

   const RenderContainer = componentMap[`${Type}Container`] || Box // 기본값은 Box

   const handleCategoryChange = (event) => {
      setSelectedCategory(event.target.value)
   }

   return (
      <RenderContainer>
         <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
               <Typography>카테고리: </Typography>
               <StyledControl>
                  <Select
                     value={selectedCategory}
                     onChange={handleCategoryChange}
                     sx={{
                        textAlign: 'center',
                        width: '80%',
                        backgroundColor: '#fff',
                        '& .MuiSelect-select': {
                           padding: '8px 14px',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                           borderColor: '#666',
                        },
                     }}></Select>
               </StyledControl>
            </Box>
            <StyledLink to={newPost} sx={{ justifySelf: 'self-start' }}>
               <AddIcon sx={{ fontSize: '1.5rem', color: 'black' }} />
               <Typography>새 등록</Typography>
            </StyledLink>
         </Toolbar>

         {children}
      </RenderContainer>
   )
}

export default MainContainer
