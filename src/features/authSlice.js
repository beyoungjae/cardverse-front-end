import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { signupUser, loginUser, logoutUser, checkAuthStatus, updateUserProfile } from '../api/authApi'
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
      
      // credentials에서 forceLogin 옵션 추출
      const { email, password, forceLogin } = credentials;
      
      const response = await loginUser({ email, password }, forceLogin)
      return response.data.user
   } catch (error) {
      return rejectWithValue(handleApiError(error, '로그인'))
   }
})

export const logoutUserThunk = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue, dispatch }) => {
   try {
      const response = await logoutUser()
      
      // 로그아웃 성공 시 OAuth 상태도 초기화
      if (response.data.success) {
         // oauthSlice의 clearOAuthState 액션이 있다면 디스패치
         try {
            const { clearOAuthState } = require('./oauthSlice');
            dispatch(clearOAuthState());
         } catch (e) {
            // oauthSlice가 로드되지 않았거나 clearOAuthState가 없는 경우 무시
         }
         
         // 로컬 스토리지에서 loginType 제거
         localStorage.removeItem('loginType');
      }
      
      return response.data
   } catch (error) {
      return rejectWithValue(handleApiError(error, '로그아웃'))
   }
})

export const checkAuthStatusThunk = createAsyncThunk('auth/checkAuthStatus', async (_, { rejectWithValue }) => {
   try {
      const response = await checkAuthStatus()
      
      // 인증 상태가 확인되면 로컬 스토리지에 loginType 저장
      if (response.data.isAuthenticated) {
         localStorage.setItem('loginType', 'local')
      }
      
      return response.data
   } catch (error) {
      // 네트워크 오류가 발생한 경우, 로컬 스토리지에 저장된 사용자 정보를 확인
      if (!error.response && localStorage.getItem('loginType') === 'local') {
         console.log('Network error, checking local storage for user data')
         // 네트워크 오류지만 로컬 스토리지에 로그인 타입이 있으면 재시도 로직 추가
         return {
            isAuthenticated: false,
            error: 'network_error',
            message: '네트워크 연결을 확인해주세요.'
         }
      }
      
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
            
            // 로그인 성공 시 로컬 스토리지에 loginType 저장
            localStorage.setItem('loginType', 'local')
         })
         .addCase(loginUserThunk.rejected, (state, action) => {
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
            
            // 로그아웃 시 로컬 스토리지에서 loginType 제거
            localStorage.removeItem('loginType')
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
               return;
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
               return;
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
