import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { Box, Typography, TextField, Button, Rating, CircularProgress, Alert, ClickAwayListener, Paper, Tooltip } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

// 커스텀 드롭다운 스타일
const DropdownContainer = styled(Box)(({ theme }) => ({
   position: 'relative',
   width: '100%',
}))

const DropdownLabel = styled(Typography)(({ theme }) => ({
   fontWeight: 600,
   marginBottom: '8px',
   color: theme.palette.text.primary,
}))

const DropdownButton = styled(Button)(({ theme }) => ({
   width: '100%',
   padding: '12px 16px',
   textAlign: 'left',
   justifyContent: 'space-between',
   borderRadius: theme.shape.borderRadius,
   color: theme.palette.text.primary,
   border: `1px solid ${theme.palette.divider}`,
   boxShadow: 'none',
   opacity: 0.7,
   '&:hover': {
      borderColor: theme.palette.primary.light,
   },
}))

const DropdownList = styled(Paper)(({ theme }) => ({
   position: 'absolute',
   top: 'calc(100% + 4px)',
   left: 0,
   right: 0,
   zIndex: 10,
   maxHeight: '300px',
   overflowY: 'auto',
   borderRadius: theme.shape.borderRadius,
   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
   border: `1px solid ${theme.palette.divider}`,
}))

const DropdownItem = styled(Box)(({ theme }) => ({
   padding: '12px 16px',
   cursor: 'pointer',
   color: theme.palette.primary.main,
   fontWeight: 600,
   transition: 'all 0.2s ease',
   '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.06)',
   },
}))

// 커스텀 드롭다운 컴포넌트
const CustomDropdown = ({ options = [], value, name, onChange, label, disabled = false }) => {
   const [isOpen, setIsOpen] = useState(false)
   //    const selectedOption = options.find((option) => option.value === value)

   const handleToggle = () => {
      if (!disabled) {
         setIsOpen((prev) => !prev)
      }
   }

   const handleSelect = (option) => {
      onChange({
         target: {
            name,
            value: option.key,
         },
      })
      setIsOpen(false)
   }

   return (
      <ClickAwayListener onClickAway={() => setIsOpen(false)}>
         <DropdownContainer>
            {label && <DropdownLabel>{label}</DropdownLabel>}
            <DropdownButton type="button" onClick={handleToggle} disabled={disabled}>
               {/* <span>문의를 선택해주세요</span> */}
               <span>{options.find((opt) => opt.key === value)?.label || '문의 유형을 선택하세요'}</span>

               {/* <span>{options.find((opt) => opt.value === value)?.label || '선택하세요'}</span> */}
               <KeyboardArrowDownIcon
                  sx={{
                     transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                     transition: 'transform 0.3s ease',
                     color: isOpen ? 'primary.main' : 'text.secondary',
                  }}
               />
            </DropdownButton>

            {isOpen && (
               <DropdownList>
                  {options.length === 0 ? (
                     <DropdownItem disabled>옵션이 없습니다</DropdownItem>
                  ) : (
                     options.map((option) => (
                        <DropdownItem key={option.key} onClick={() => handleSelect(option)}>
                           {option.label}
                        </DropdownItem>
                     ))
                  )}
               </DropdownList>
            )}
         </DropdownContainer>
      </ClickAwayListener>
   )

   return (
      <ClickAwayListener onClickAway={() => setIsOpen(false)}>
         <DropdownContainer>
            <DropdownLabel>{label}</DropdownLabel>
            <DropdownButton
               type="button"
               onClick={handleToggle}
               endIcon={
                  <KeyboardArrowDownIcon
                     sx={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                        color: isOpen ? 'primary.main' : 'text.secondary',
                     }}
                  />
               }>
               {/* {isLoading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                     <CircularProgress size={20} />
                     <span>로딩 중...</span>
                  </Box>
               ) : selectedOption ? (
                  <Typography
                     component="span"
                     sx={{
                        fontWeight: 500,
                        color: 'text.primary',
                        display: 'block',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                     }}>
                     {selectedOption.label}
                  </Typography>
               ) : (
                  <Typography
                     component="span"
                     sx={{
                        color: 'text.secondary',
                        fontStyle: 'italic',
                     }}>
                     템플릿을 선택해주세요
                  </Typography>
               )} */}
            </DropdownButton>

            {isOpen && (
               <DropdownList>
                  {/* {isLoading ? (
                     <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress size={24} />
                     </Box>
                  ) : options.length === 0 ? (
                     <Typography sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>구매한 템플릿이 없습니다. 먼저 템플릿을 구매해주세요.</Typography>
                  ) : (
                     <>
                        {options.map((option) => (
                           <DropdownItem key={option.value} onClick={() => handleSelect(option)}>
                              <Typography
                                 component="span"
                                 sx={{
                                    fontWeight: value === option.value ? 600 : 400,
                                    transition: 'all 0.2s ease',
                                 }}>
                                 {option.label}
                              </Typography>
                           </DropdownItem>
                        ))}
                     </>
                  )} */}
               </DropdownList>
            )}
         </DropdownContainer>
      </ClickAwayListener>
   )
}

export default CustomDropdown
