import React, { useState } from 'react'
import Layout from '../layouts/Layout'
import { Title } from '../layouts/textCommon'

import { Box, TextField, IconButton, Typography, Checkbox, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import SaveIcon from '@mui/icons-material/Save'
import DeleteIcon from '@mui/icons-material/Delete'
import { styled } from '@mui/system'

const CouponContainer = styled(Box)(({ theme }) => ({
   padding: '20px 100px',
}))

const CouponHeader = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   textAlign: 'center',
   backgroundColor: '#fcf8f0',
   borderBottom: '1px solid #c5c5c5',
   padding: '10px 0',
}))

const HeaderText = styled(Typography)(({}) => ({
   fontWeight: 'bold',
   width: '10%',

   '&.label': {
      width: '20%',
   },
}))

const Divider = styled(Box)(({ theme }) => ({
   width: '2px',
   position: 'relative',
   height: '15px',

   '&::after': {
      content: '""',
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translateX(-50%) translateY(-50%)',
      borderRight: '1px solid #aaaaaa',
      height: '100%',
   },
}))

const CouponRow = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   textAlign: 'center',
   backgroundColor: '#fcfcfc',
   borderBottom: '1px solid #e2e2e2',
   padding: '10px 0',
   transition: 'background-color 0.2s',

   '&:hover': {
      backgroundColor: '#f8f8f8',
   },
}))

const CouponText = styled(Typography)(({}) => ({
   width: '10%',
   fontSize: '0.9rem',

   '&.label': {
      width: '20%',
      textAlign: 'left',
      paddingLeft: '10px',
   },
}))

const StyledTextField = styled(TextField)({
   backgroundColor: '#ffffff',

   '& .MuiOutlinedInput-root': {
      height: '32px',
      fontSize: '0.9rem',
   },
   '&.label': {
      width: '20%',
   },
   '&.normal': {
      width: '10%',
   },
})

function Coupon() {
   const [editingId, setEditingId] = useState(null)
   const [coupons, setCoupons] = useState([])

   // 새 쿠폰 추가
   const handleAddCoupon = () => {
      const newCoupon = {
         id: Date.now(),
         name: '',
         amount: '',
         discountType: '',
         validityDays: '',
         minPurchase: '',
         checked: true,
         isNew: true,
         isEditing: true,
      }
      setCoupons([...coupons, newCoupon])
      setEditingId(newCoupon.id)
   }
   // 쿠폰 수정
   const handleChange = (id, field, value) => {
      setCoupons(coupons.map((coupon) => (coupon.id === id ? { ...coupon, [field]: value } : coupon)))
   }

   // 쿠폰 저장
   const handleSave = (id) => {
      setCoupons(
         coupons.map((coupon) => {
            if (coupon.id === id) {
               return { ...coupon, isEditing: false, isNew: false }
            }
            return coupon
         }),
      )
      setEditingId(null)
   }

   // 쿠폰 삭제
   const handleDeleteCoupon = (id) => {
      const couponToDelete = coupons.find((coupon) => coupon.id === id)

      if (couponToDelete?.isNew) {
         // 새 쿠폰은 즉시 삭제
         setCoupons(coupons.filter((coupon) => coupon.id !== id))
         setEditingId(null)
         return
      }

      // 기존 쿠폰은 확인 후 삭제
      const confirmDelete = window.confirm('선택한 쿠폰을 삭제하시겠습니까?')
      if (confirmDelete) {
         try {
            setCoupons(coupons.filter((coupon) => coupon.id !== id))
            if (editingId === id) setEditingId(null)
         } catch (error) {
            alert('쿠폰 삭제 중 오류가 발생했습니다.')
            console.error('Delete coupon error:', error)
         }
      }
   }

   // 선택된 쿠폰 일괄 삭제
   const handleDeleteSelected = () => {
      const selectedCoupons = coupons.filter((coupon) => coupon.checked)

      if (selectedCoupons.length === 0) {
         alert('삭제할 쿠폰을 선택해주세요.')
         return
      }

      const confirmDelete = window.confirm(`선택한 ${selectedCoupons.length}개의 쿠폰을 삭제하시겠습니까?`)

      if (confirmDelete) {
         try {
            setCoupons(coupons.filter((coupon) => !coupon.checked))

            // 편집 중이던 쿠폰이 삭제되면 편집 상태 초기화
            if (selectedCoupons.some((coupon) => coupon.id === editingId)) {
               setEditingId(null)
            }
         } catch (error) {
            alert('쿠폰 일괄 삭제 중 오류가 발생했습니다.')
            console.error('Bulk delete error:', error)
         }
      }
   }

   // 전체 선택/해제
   const handleSelectAll = (event) => {
      const checked = event.target.checked
      setCoupons(
         coupons.map((coupon) => ({
            ...coupon,
            checked,
         })),
      )
   }

   return (
      <Layout>
         <CouponContainer>
            {/* 쿠폰 리스트 */}

            <Title>쿠폰</Title>
            <CouponHeader>
               <Checkbox checked={coupons.length > 0 && coupons.every((coupon) => coupon.checked)} indeterminate={coupons.some((coupon) => coupon.checked) && !coupons.every((coupon) => coupon.checked)} onChange={handleSelectAll} />

               <HeaderText className="label">쿠폰명</HeaderText>
               <Divider />

               <HeaderText className="discount">할인유형</HeaderText>
               <Divider />

               <HeaderText className="discount">할인금액</HeaderText>
               <Divider />

               <HeaderText className="validityDays">유효기간</HeaderText>
               <Divider />

               <HeaderText className="minPurchase">최소 금액</HeaderText>
               <Divider />

               <HeaderText className="createdAt">생성일</HeaderText>
               {/* <Divider /> */}
               <Box sx={{ display: 'flex', justifyContent: 'center', gap: '16px', padding: '0 8px' }}>
                  <IconButton sx={{ borderRadius: '4px', padding: '4px 16px', backgroundColor: '#ffffff', border: '1px solid #e2e2e2' }} onClick={handleAddCoupon}>
                     <AddIcon />
                  </IconButton>
                  <IconButton sx={{ borderRadius: '4px', padding: '4px 16px', backgroundColor: '#ffffff', border: '1px solid #e2e2e2' }} onClick={handleDeleteSelected}>
                     <DeleteIcon />
                  </IconButton>
               </Box>
            </CouponHeader>

            {coupons.map((coupon) => (
               <CouponRow key={coupon.id}>
                  <Checkbox checked={coupon.checked} onChange={(e) => handleChange(coupon.id, 'checked', e.target.checked)} disabled />

                  {editingId === coupon.id ? (
                     <>
                        <StyledTextField className="label" size="small" placeholder="쿠폰명" value={coupon.name} onChange={(e) => handleChange(coupon.id, 'name', e.target.value)} />
                        <Divider />

                        <StyledTextField className="normal" size="small" placeholder="할인유형" value={coupon.discountType || ''} onChange={(e) => handleChange(coupon.id, 'discountType', e.target.value)} />
                        <Divider />

                        <StyledTextField className="normal" size="small" placeholder="할인금액" value={coupon.amount} onChange={(e) => handleChange(coupon.id, 'amount', e.target.value)} />
                        <Divider />

                        <StyledTextField className="normal" size="small" placeholder="유효기간" type="number" value={coupon.validityDays || ''} onChange={(e) => handleChange(coupon.id, 'validityDays', e.target.value)} />
                        <Divider />

                        <StyledTextField className="normal" size="small" placeholder="최소금액" type="number" value={coupon.minPurchase || ''} onChange={(e) => handleChange(coupon.id, 'minPurchase', e.target.value)} />
                        <Divider />

                        <CouponText>{new Date().toLocaleDateString()}</CouponText>

                        <Box sx={{ display: 'flex', gap: '16px', padding: '0 8px' }}>
                           <IconButton
                              onClick={() => handleSave(coupon.id)}
                              sx={{
                                 borderRadius: '4px',
                                 padding: '4px 16px',
                                 backgroundColor: '#ffffff',
                                 border: '1px solid #e2e2e2',
                                 '&:hover': {
                                    backgroundColor: '#f5f5f5',
                                 },
                              }}>
                              <SaveIcon />
                           </IconButton>
                           <IconButton sx={{ borderRadius: '4px', padding: '4px 16px', backgroundColor: '#ffffff', border: '1px solid #e2e2e2' }} onClick={handleDeleteSelected}>
                              <DeleteIcon />
                           </IconButton>
                        </Box>
                     </>
                  ) : (
                     <>
                        <CouponText className="label">{coupon.name}</CouponText>
                        <Divider />
                        <CouponText>{coupon.discountType}</CouponText>
                        <Divider />
                        <CouponText>{coupon.amount}</CouponText>
                        <Divider />
                        <CouponText>{coupon.validityDays}일</CouponText>
                        <Divider />
                        <CouponText>{coupon.minPurchase?.toLocaleString()}원</CouponText>
                        <Divider />
                        <CouponText>{new Date(coupon.id).toLocaleDateString()}</CouponText>

                        <Box sx={{ display: 'flex', gap: '16px', padding: '0 8px' }}>
                           <IconButton
                              onClick={() => setEditingId(coupon.id)}
                              sx={{
                                 borderRadius: '4px',
                                 padding: '4px 16px',
                                 backgroundColor: '#ffffff',
                                 border: '1px solid #e2e2e2',
                                 '&:hover': {
                                    backgroundColor: '#f5f5f5',
                                 },
                              }}>
                              <EditIcon />
                           </IconButton>
                           <IconButton
                              onClick={() => handleDeleteCoupon(coupon.id)}
                              sx={{
                                 borderRadius: '4px',
                                 padding: '4px 16px',
                                 backgroundColor: '#ffffff',
                                 border: '1px solid #e2e2e2',
                                 '&:hover': {
                                    backgroundColor: '#f5f5f5',
                                 },
                              }}>
                              <DeleteIcon />
                           </IconButton>
                        </Box>
                     </>
                  )}
               </CouponRow>
            ))}
         </CouponContainer>
      </Layout>
   )
}

export default Coupon
