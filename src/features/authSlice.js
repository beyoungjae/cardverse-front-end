import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { signupUser, loginUser, logoutUser, checkAuthStatus, updateUserProfile } from '../api/authApi'
import { oauthLoginUser } from '../api/oauthApi'
import handleApiError from '../utils/errorHandler'
import { saveUserData } from '../utils/storages'
// import { persistor } from '../store/store'

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
      return response.data
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
export const logoutUserThunk = createAsyncThunk('auth/logoutUser', async (removeUser, { rejectWithValue }) => {
   try {
      const response = await logoutUser(removeUser)
      return response.data
   } catch (error) {
      return rejectWithValue(handleApiError(error, '로그아웃'))
   }
})

// 상태체크
export const checkAuthStatusThunk = createAsyncThunk('auth/checkAuthStatus', async (userData, { rejectWithValue }) => {
   try {
      const response = await checkAuthStatus(userData)
      console.log(response.data)
      return response.data
   } catch (error) {
      return rejectWithValue(handleApiError(error, '상태 확인'))
   }
})

// 프로필 업데이트
export const updateProfileThunk = createAsyncThunk('auth/updateProfile', async (userData, { rejectWithValue }) => {
   try {
      const response = await updateUserProfile(userData)
      return response.data.user
   } catch (error) {
      return rejectWithValue(handleApiError(error, '프로필 업데이트'))
   }
})

const authSlice = createSlice({
   name: 'auth',
   initialState: {
      user: null,
      isAuthenticated: false, // ▶ true: 로그인 | ▶ false: 로그아웃
      loading: true,
      error: null,
      loginHistory: [],
      authData: {},
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
            state.user = action.payload.user
            state.authData = action.payload.authData
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
            state.user = action.payload.user
            state.authData = action.payload.authData
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

            localStorage.removeItem('persist:auth') // ✅ 특정 유저의 Redux-Persist 데이터 삭제
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

            // 네트워크 오류로 인한 특수 케이스 처리
            if (action.payload.error === 'network_error') {
               // 네트워크 오류 시 현재 상태 유지
               console.log('Network error detected, maintaining current auth state')
               return
            }

            state.isAuthenticated = action.payload.isAuthenticated
            state.user = action.payload.user || null

            // 인증 상태가 확인되면 로컬 스토리지에 loginType 저장
            if (action.payload.isAuthenticated) {
               localStorage.setItem('loginType', 'local')
            }
         })
         .addCase(checkAuthStatusThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload

            // 네트워크 오류인 경우 현재 상태 유지
            if (action.payload && action.payload.error === 'network_error') {
               console.log('Network error in rejected case, maintaining current auth state')
               return
            }

            state.isAuthenticated = false
            state.user = null

            // 인증 실패 시 로컬 스토리지에서 loginType 제거
            localStorage.removeItem('loginType')
         })

      // 프로필 업데이트
      builder
         .addCase(updateProfileThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updateProfileThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
         })
         .addCase(updateProfileThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default authSlice.reducer
