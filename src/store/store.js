import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import oauthReducer from '../features/oauthSlice'
import templateReducer from '../features/templateSlice'

const store = configureStore({
   reducer: {
      auth: authReducer,
      oauth: oauthReducer,
      templates: templateReducer,
   },
})

export default store
