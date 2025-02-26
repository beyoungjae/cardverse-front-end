import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { kakaoLoginUser } from '../api/oauthApi'
import handleApiError from '../utils/errorHandler'

export const kakaoLoginUserThunk = createAsyncThunk('oauth/kakaoLoginUser', async (code, { rejectWithValue }) => {
   try {
      const response = await kakaoLoginUser(code)
      return response.data
   } catch (error) {
      return rejectWithValue(handleApiError(error, '카카오 로그인'))
   }
})

const oauthSlice = createSlice({
   name: 'oauth',
   initialState: {},
   reducers: {},
   extraReducers: (builder) => {},
})

export default oauthSlice.reducer
