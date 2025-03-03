import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { signupUser, loginUser, logoutUser, checkAuthStatus } from '../api/authApi'
import { oauthLoginUser } from '../api/oauthApi'
import handleApiError from '../utils/errorHandler'

// rejectWithValue: 서버에서 보낸 에러 메세지

// 회원가입
export const signupUserThunk = createAsyncThunk('auth/signupUser', async (userData, { rejectWithValue }) => {
   try {
      const response = await signupUser(userData)
      return response.data.user
   } catch (error) {
      return rejectWithValue(handleApiError(error, '회원가입'))
   }
})

// 로그인
export const loginUserThunk = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
   try {
      console.log('credentials Check:', credentials)
      console.log('로그인 thunk 진행시작')
      const response = await loginUser(credentials)
      return response.data.user
   } catch (error) {
      return rejectWithValue(handleApiError(error, '로그인'))
   }
})

// oauth 로그인
export const oauthLoginUserThunk = createAsyncThunk('oauth/oauthLoginUser', async (credentials, { rejectWithValue }) => {
   try {
      const response = await oauthLoginUser(credentials)
      console.log(response.data)
      return response.data
   } catch (error) {
      return rejectWithValue(handleApiError(error, '카카오 로그인'))
   }
})

// 로그아웃
export const logoutUserThunk = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
   try {
      const response = await logoutUser()
      return response.data
   } catch (error) {
      return rejectWithValue(handleApiError(error, '로그아웃'))
   }
})

// 상태체크
export const checkAuthStatusThunk = createAsyncThunk('auth/checkAuthStatus', async (_, { rejectWithValue }) => {
   try {
      const response = await checkAuthStatus()
      console.log(response.data)
      return response.data
   } catch (error) {
      return rejectWithValue(handleApiError(error, '상태 확인'))
   }
})

const authSlice = createSlice({
   name: 'auth',
   initialState: {
      user: null,
      isAuthenticated: false, // ▶ true: 로그인 | ▶ false: 로그아웃
      loading: true,
      error: null,
      token: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      // 회원가입
      builder
         .addCase(signupUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(signupUserThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
         })
         .addCase(signupUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

      // 로그인
      builder
         .addCase(loginUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(loginUserThunk.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = true
            state.user = action.payload
            state.token = null
         })
         .addCase(loginUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

      // oauth로그인
      builder
         .addCase(oauthLoginUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(oauthLoginUserThunk.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = true
            state.user = action.payload
            state.token = action.payload.token
         })
         .addCase(oauthLoginUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

      //로그아웃
      builder
         .addCase(logoutUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(logoutUserThunk.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = false
            state.user = null // 로그아웃 => 유저 정보 초기화
            state.token = null
         })
         .addCase(logoutUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

      //로그인 상태 확인
      builder
         .addCase(checkAuthStatusThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(checkAuthStatusThunk.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = action.payload.isAuthenticated
            state.user = action.payload.user || null
            state.token = action.payload?.token
         })
         .addCase(checkAuthStatusThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.isAuthenticated = false
            state.user = null
         })
   },
})

export default authSlice.reducer
