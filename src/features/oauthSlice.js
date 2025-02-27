import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { kakaoLoginUser } from '../api/oauthApi'
import handleApiError from '../utils/errorHandler'

export const kakaoLoginUserThunk = createAsyncThunk('oauth/kakaoLoginUser', async (code, { rejectWithValue }) => {
   try {
      const response = await kakaoLoginUser(code)
      console.log(response.data)
      return response.data
   } catch (error) {
      return rejectWithValue(handleApiError(error, '카카오 로그인'))
   }
})

const oauthSlice = createSlice({
   name: 'oauth',
   initialState: {
      user: null,
      token: {}, // 여기에 엑세스토큰과 토큰익스피리스엣이있음
      loginHistory: [],
      isAuthenticated: false, // ▶ true: 로그인 | ▶ false: 로그아웃
      loading: true,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(kakaoLoginUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(kakaoLoginUserThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload.user
            state.token = action.payload.token
            state.loginHistory = action.payload.loginHistory
            state.isAuthenticated = true
         })
         .addCase(kakaoLoginUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default oauthSlice.reducer
