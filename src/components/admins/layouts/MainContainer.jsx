import React, { useState, useEffect } from 'react'
import { Form, Link, useNavigate, useParams } from 'react-router-dom'

import { Container } from '../layouts/boxCommon'
import { Title } from '../layouts/textCommon'
import ItemForm from './ItemForm'
import { CreateBtn, EditBtn, DeleteBtn } from '../../button'

import { Box, Typography, Select, MenuItem, FormControl, Accordion, AccordionSummary, AccordionDetails, IconButton } from '@mui/material'
import { styled } from '@mui/system'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const AccordionContainer = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   padding: '10px',
   border: '1px solid #cccccc',
   borderRadius: '4px',
   // backgroundColor: '#f8f8f4',
   overflowY: 'auto',
   position: 'relative',
   paddingTop: '70px',
   // height: '100%',
}))

const StyledAccordion = styled(Accordion, {
   shouldForwardProp: (prop) => prop !== '$isExpanded',
})(({ theme, $isExpanded }) => ({
   backgroundColor: '#ffffff',
   boxShadow: 'none',
   border: '1px solid #ddd',
   // padding: 0,
   flexGrow: $isExpanded ? 1 : 0, // 🔥 펼쳐진 경우에만 flex-grow 적용
   display: 'flex', // 🔥 flexbox 적용
   flexDirection: 'column', // 🔥 세로 정렬
   margin: '0 !important', // 🔥 펼칠 때도 margin이 적용되지 않도록
   // overflowY: 'auto',

   transition: 'flex-grow 0.25s ease-in-out', // 🔥 부드러운 애니메이션 효과 추가
   '&.Mui-expanded': {
      margin: '0 !important', // 🔥 기본적으로 생성되는 margin 제거
   },
}))

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
   backgroundColor: '#888888',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   paddingRight: '16px',

   '& .MuiAccordionSummary-content': {
      fontWeight: 600,
      display: 'flex',
      flexGrow: 1,
      overflow: 'hidden',
   },
   '&.Mui-expanded': {},
}))

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
   flexGrow: 1,
   minHeight: '100%',
   backgroundColor: 'yellow',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'flex-start',

   // maxHeight: '340px',
   // overflow: 'auto',
   display: 'flex',
   alignItems: 'center',
   // padding: '20px',
}))

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
   paddingTop: '70px',

   position: 'relative',
}))

const Toolbar = styled(Box)(({ theme }) => ({
   position: 'sticky',
   position: 'absolute',
   // zIndex: 9999,
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
}))

const StyledControl = styled(FormControl)(({ theme }) => ({
   minWidth: 180,
}))

const ButtonContainer = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   gap: '16px', // 🔥 수정 버튼과 삭제 버튼 간격 유지
   margin: '0 16px',
}))

const FixedButton = styled(Box)(({ theme }) => ({
   width: '32px', // 🔥 버튼 크기 고정
   height: '32px',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   borderRadius: '4px',
   color: '#fff', // 🔥 아이콘 컬러 (가독성)
}))

function MainContainer({ type, categories, children, itemData }) {
   const { id } = useParams()
   const [selectedCategory, setSelectedCategory] = useState(categories?.[0]?.value || '')
   const [expanded, setExpanded] = useState(null) // 현재 열린 아코디언 ID
   const [items, setItems] = useState(itemData) // 🔥 상태로 관리

   const navigate = useNavigate()
   const newPost = `/admin/${id}/new`

   const Type = type.charAt(0).toUpperCase() + type.slice(1) || 'List'

   useEffect(() => {
      if (categories?.length > 0) {
         setSelectedCategory(categories[0].value) // 첫 번째 카테고리로 초기화
      } else {
         setSelectedCategory('') // 카테고리가 없으면 빈 값 설정
      }
   }, [categories, id]) // id, tabId가 변경될 때도 초기화

   const componentMap = {
      GridContainer,
      ListContainer,
      AccordionContainer, // 추가됨
   }

   const RenderContainer = componentMap[`${Type}Container`] || Box

   const getCategoryLabel = (value) => {
      const category = categories.find((cat) => cat.value === value)
      return category ? category.label : value
   }

   const handleCategoryChange = (event) => {
      setSelectedCategory(event.target.value)
   }

   // 🔥 아코디언 클릭 시 하나만 열리고 기존 것은 닫힘
   const handleAccordionChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : null)
   }

   const handleEdit = (postId) => {
      navigate(`/admin/${id}/edit/${postId}`)
   }

   const handleDelete = (id) => {
      if (window.confirm('정말 삭제하시겠습니까?')) {
         console.log(`삭제할 ID: ${id}`)
         setItems(items.filter((item) => item.id !== id)) // 🔥 해당 ID를 제외한 리스트 업데이트
      }
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
                     }}>
                     {categories &&
                        categories.map((category) => (
                           <MenuItem key={category.value} value={category.value}>
                              {category.label}
                           </MenuItem>
                        ))}
                  </Select>
               </StyledControl>
            </Box>
            <Box sx={{ padding: '10px 15px 10px 10px' }}>
               <CreateBtn type="manage" />
            </Box>
            {/* <StyledLink to={newPost} sx={{ justifySelf: 'self-start' }}>
               <AddIcon sx={{ fontSize: '1.5rem', color: 'black' }} />
               <Typography>추가하기</Typography>
            </StyledLink> */}
         </Toolbar>
         {children}
         {/* {itemData && <ItemForm items={itemData} />} */}

         {/* 🔥 아코디언을 사용할 경우 */}
         {Type === 'Accordion' ? (
            // <AccordionContainer>
            <>
               {itemData?.map((item) => (
                  <StyledAccordion key={item.id} $isExpanded={expanded === item.id} expanded={expanded === item.id} onChange={handleAccordionChange(item.id)}>
                     <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>{item.title}</Box>

                        {/* 🔥 수정 및 삭제 버튼 영역 */}
                        <ButtonContainer>
                           <FixedButton onClick={() => handleEdit(item.id)} sx={{ backgroundColor: '#ffffff', color: 'black' }}>
                              <EditIcon fontSize="small" />
                           </FixedButton>

                           <FixedButton onClick={() => handleDelete(item.id)} sx={{ backgroundColor: '#ffffff', color: 'black' }}>
                              <DeleteIcon fontSize="small" />
                           </FixedButton>
                        </ButtonContainer>
                     </StyledAccordionSummary>
                     <StyledAccordionDetails>
                        <Typography>{item.content}</Typography>
                     </StyledAccordionDetails>
                  </StyledAccordion>
               ))}
            </>
         ) : (
            // </AccordionContainer>
            itemData && <ItemForm items={itemData} />
         )}
      </RenderContainer>
   )
}

export default MainContainer
