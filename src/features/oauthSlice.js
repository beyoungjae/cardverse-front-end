import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { kakaoLoginUser, checkOAuthStatus } from '../api/oauthApi'
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

export const checkOAuthStatusThunk = createAsyncThunk('oauth/checkOAuthStatus', async (_, { rejectWithValue }) => {
   try {
      const response = await checkOAuthStatus()
      return response.data
   } catch (error) {
      return rejectWithValue(handleApiError(error, '엑세스 토큰 재발급'))
   }
})

const oauthSlice = createSlice({
   name: 'oauth',
   initialState: {
      kakaoUser: null,
      token: {}, // 여기에 엑세스토큰과 토큰익스피리스엣이있음
      loginHistory: [],
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
            state.kakaoUser = action.payload.user
            state.token = action.payload.token
         })
         .addCase(kakaoLoginUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

      // 로그인 상태 확인
      builder
         .addCase(checkOAuthStatusThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(checkOAuthStatusThunk.fulfilled, (state, action) => {
            state.loading = false
            state.kakaoUser = action.payload.user || null
            state.token = action.payload.token
         })
         .addCase(checkOAuthStatusThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.kakaoUser = null
         })
   },
})

export default oauthSlice.reducer
