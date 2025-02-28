import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import templateReducer from '../features/templateSlice'
import purchaseReducer from '../features/purchaseSlice'

const store = configureStore({
   reducer: {
      auth: authReducer,
      templates: templateReducer,
      purchase: purchaseReducer,
   },
})

export default store
