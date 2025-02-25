import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleKakaoCallback, handleKakaoLogin } from '../api/oauthApi'
import handleApiError from '../utils/errorHandler'

// 카카오 로그인 시작
export const initiateKakaoLogin = createAsyncThunk('oauth/initiateLogin', async (_, { rejectWithValue }) => {
   try {
      await handleKakaoLogin()
   } catch (error) {
      return rejectWithValue(handleApiError(error, '카카오 로그인 시작'))
   }
})

export const kakaoLoginThunk = createAsyncThunk('oauth/kakaoLogin', async (_, { dispatch, rejectWithValue }) => {
   try {
      const response = await handleKakaoCallback()
      return response.data
   } catch (error) {
      return rejectWithValue(handleApiError(error, '카카오 로그인'))
   }
})
