import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import templateReducer from '../features/templateSlice'

const store = configureStore({
   reducer: {
      auth: authReducer,
      templates: templateReducer,
   },
})

export default store
