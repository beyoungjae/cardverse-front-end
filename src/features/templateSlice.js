import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { templateApi } from '../api/templateApi'

export const fetchTemplates = createAsyncThunk('templates/fetchTemplates', async (category, { rejectWithValue }) => {
   try {
      const response = await templateApi.getTemplates(category)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
   }
})

export const fetchTemplateDetail = createAsyncThunk('templates/fetchTemplateDetail', async (templateId, { rejectWithValue }) => {
   try {
      const response = await templateApi.getTemplate(templateId)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data || { message: '템플릿을 불러오는 데 실패했습니다.' })
   }
})

const templateSlice = createSlice({
   name: 'templates',
   initialState: {
      list: [],
      data: [],
      detail: null,
      status: 'idle', // 'loading', 'succeeded', 'failed'
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchTemplates.pending, (state) => {
            state.status = 'loading'
         })
         .addCase(fetchTemplates.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.data = action.payload || []
         })
         .addCase(fetchTemplates.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload || '데이터를 불러오는 데 실패했습니다.'
         })
         .addCase(fetchTemplateDetail.pending, (state) => {
            state.status = 'loading'
         })
         .addCase(fetchTemplateDetail.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.detail = action.payload || null
         })
         .addCase(fetchTemplateDetail.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload || '데이터를 불러오는 데 실패했습니다.'
         })
   },
})

export default templateSlice.reducer
