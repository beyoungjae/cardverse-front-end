import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { purchaseApi } from '../api/purchaseApi'

// 결제 처리 액션
export const processPurchaseTemplate = createAsyncThunk('purchase/processPurchase', async (purchaseData) => {
   const response = await purchaseApi.processPurchase(purchaseData)
   return response
})

const purchaseSlice = createSlice({
   name: 'purchase',
   initialState: {
      purchaseHistory: [],
      status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
      error: null,
      currentPurchase: null,
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
   },
})

export const { resetPurchaseStatus } = purchaseSlice.actions
export default purchaseSlice.reducer
