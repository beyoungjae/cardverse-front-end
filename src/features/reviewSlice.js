import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import reviewApi from '../api/reviewApi'

// 리뷰 목록 조회
export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (params, { rejectWithValue }) => {
    try {
      return await reviewApi.getReviews(params)
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

// 템플릿별 리뷰 조회
export const fetchTemplateReviews = createAsyncThunk(
  'reviews/fetchTemplateReviews',
  async (templateId, { rejectWithValue }) => {
    try {
      return await reviewApi.getTemplateReviews(templateId)
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

// 리뷰 작성
export const createReview = createAsyncThunk(
  'reviews/createReview',
  async (reviewData, { rejectWithValue }) => {
    try {
      return await reviewApi.createReview(reviewData)
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

// 리뷰 수정
export const updateReview = createAsyncThunk(
  'reviews/updateReview',
  async ({ reviewId, reviewData }, { rejectWithValue }) => {
    try {
      return await reviewApi.updateReview(reviewId, reviewData)
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

// 리뷰 삭제
export const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async (reviewId, { rejectWithValue }) => {
    try {
      return await reviewApi.deleteReview(reviewId)
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

// 사용자가 작성한 리뷰 조회
export const fetchUserReviews = createAsyncThunk(
  'reviews/fetchUserReviews',
  async (_, { rejectWithValue }) => {
    try {
      return await reviewApi.getUserReviews()
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    templateReviews: [],
    userReviews: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 리뷰 목록 조회
      .addCase(fetchReviews.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.reviews = action.payload
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      
      // 템플릿별 리뷰 조회
      .addCase(fetchTemplateReviews.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTemplateReviews.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.templateReviews = action.payload
      })
      .addCase(fetchTemplateReviews.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      
      // 리뷰 작성
      .addCase(createReview.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.status = 'succeeded'
        
        // 응답 데이터 정제
        const cleanedReview = { ...action.payload }
        
        // 객체 형태의 필드를 문자열로 변환
        Object.keys(cleanedReview).forEach(key => {
          if (typeof cleanedReview[key] === 'object' && cleanedReview[key] !== null) {
            if (key === 'user' || key === 'template') {
              // 중첩 객체는 그대로 유지
            } else {
              // 다른 객체는 문자열로 변환
              cleanedReview[key] = JSON.stringify(cleanedReview[key])
            }
          }
        })
        
        state.reviews.unshift(cleanedReview) // 새 리뷰를 배열 앞에 추가
      })
      .addCase(createReview.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      
      // 리뷰 수정
      .addCase(updateReview.fulfilled, (state, action) => {
        const index = state.reviews.findIndex(review => review.id === action.payload.id)
        if (index !== -1) {
          state.reviews[index] = action.payload
        }
      })
      
      // 리뷰 삭제
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(review => review.id !== action.meta.arg)
      })
      
      // 사용자가 작성한 리뷰 조회
      .addCase(fetchUserReviews.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUserReviews.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.userReviews = action.payload
      })
      .addCase(fetchUserReviews.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  }
})

export default reviewSlice.reducer