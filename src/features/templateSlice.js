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

export const updateTemplate = createAsyncThunk('templates/updateTemplate', async ({ templateId, templateData }, { dispatch, rejectWithValue }) => {
   try {
      await templateApi.updateTemplate(templateId, templateData)
      // 업데이트 후, 최신 데이터를 다시 불러옴
      return dispatch(fetchTemplateDetail(templateId)).unwrap()
   } catch (error) {
      return rejectWithValue(error.response?.data || { message: '템플릿을 수정하는 데 실패했습니다.' })
   }
})

export const deleteTemplate = createAsyncThunk('templates/deleteTemplate', async (templateId, { rejectWithValue }) => {
   try {
      const response = await templateApi.deleteTemplate(templateId)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data || { message: '템플릿을 삭제하는 데 실패했습니다.' })
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
   reducers: {
      // 템플릿 상태 초기화 리듀서
      resetTemplateState: (state) => {
         state.detail = null
         state.status = 'idle'
         state.error = null
      },
   },
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
         .addCase(updateTemplate.pending, (state) => {
            state.status = 'loading'
         })
         .addCase(updateTemplate.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.detail = action.payload
         })
         .addCase(updateTemplate.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload || '템플릿을 수정하는 데 실패했습니다.'
         })
         .addCase(deleteTemplate.pending, (state) => {
            state.status = 'loading'
         })
         .addCase(deleteTemplate.fulfilled, (state, action) => {
            state.status = 'succeeded'
         })
         .addCase(deleteTemplate.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload || '템플릿을 삭제하는 데 실패했습니다.'
         })
   },
})

export const { resetTemplateState } = templateSlice.actions
export default templateSlice.reducer
