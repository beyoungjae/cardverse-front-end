import postApi from '../api/postApi'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const createPostThunk = createAsyncThunk('posts/createPost', async (formData, { rejectWithValue }) => {
   try {
      const response = await postApi.createPost(formData)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
   }
})

export const fetchPostsThunk = createAsyncThunk('posts/fetchPostsThunk', async ({ types, limit }, { rejectWithValue }) => {
   try {
      const queryParams = new URLSearchParams()

      if (Array.isArray(types)) {
         types.forEach((t) => queryParams.append('types', t))
      } else {
         queryParams.append('types', types)
      }

      queryParams.append('limit', limit)

      const response = await postApi.getPosts(queryParams)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
   }
})

const postSlice = createSlice({
   name: 'posts',
   initialState: {
      posts: [],
      post: null,
      error: null,
      loading: false,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(createPostThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createPostThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(createPostThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

      builder
         .addCase(fetchPostsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchPostsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.posts = action.payload.posts
         })
         .addCase(fetchPostsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default postSlice.reducer
