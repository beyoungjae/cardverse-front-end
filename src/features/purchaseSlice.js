import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { purchaseApi } from '../api/purchaseApi'

// 결제 처리 액션
export const processPurchaseTemplate = createAsyncThunk('purchase/processPurchase', async (purchaseData) => {
   const response = await purchaseApi.processPurchase(purchaseData)
   return response
})

// 구매 내역 조회
export const fetchPurchaseHistory = createAsyncThunk('purchase/fetchHistory', async () => {
   const response = await purchaseApi.getPurchaseHistory()
   return response
})

// 특정 템플릿 구매 여부 확인
export const checkTemplatePurchased = createAsyncThunk('purchase/checkTemplatePurchased', async (templateId) => {
   const response = await purchaseApi.checkTemplatePurchased(templateId)
   return response
})

const purchaseSlice = createSlice({
   name: 'purchase',
   initialState: {
      purchaseHistory: [],
      status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
      error: null,
      currentPurchase: null,
      isPurchased: false, // 특정 템플릿 구매 여부
      checkingPurchase: false, // 구매 여부 확인 중
   },
   reducers: {
      resetPurchaseStatus: (state) => {
         state.status = 'idle'
         state.error = null
         state.currentPurchase = null
      },
   },
   extraReducers: (builder) => {
      builder
         // 결제 처리 액션
         .addCase(processPurchaseTemplate.pending, (state) => {
            state.status = 'loading'
         })
         .addCase(processPurchaseTemplate.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.currentPurchase = action.payload
            state.purchaseHistory.push(action.payload)
         })
         .addCase(processPurchaseTemplate.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
         })
         // 구매 내역 조회 액션
         .addCase(fetchPurchaseHistory.pending, (state) => {
            state.status = 'loading'
         })
         .addCase(fetchPurchaseHistory.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.purchaseHistory = action.payload
         })
         .addCase(fetchPurchaseHistory.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
         })
         // 특정 템플릿 구매 여부 확인
         .addCase(checkTemplatePurchased.pending, (state) => {
            state.checkingPurchase = true
            state.isPurchased = false
         })
         .addCase(checkTemplatePurchased.fulfilled, (state, action) => {
            state.checkingPurchase = false
            state.isPurchased = action.payload.purchased
         })
         .addCase(checkTemplatePurchased.rejected, (state) => {
            state.checkingPurchase = false
            state.isPurchased = false
         })
   },
})

export const { resetPurchaseStatus } = purchaseSlice.actions
export default purchaseSlice.reducer
