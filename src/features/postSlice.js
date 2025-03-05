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
            state.post = action.payload
            state.posts = [...state.posts, action.payload]
         })
         .addCase(createPostThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default postSlice.reducer
