import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // ✅ localStorage 사용
import authReducer from '../features/authSlice'
import templateReducer from '../features/templateSlice'
import purchaseReducer from '../features/purchaseSlice'

const authPersistConfig = {
   key: 'auth',
   storage,
   whitelist: ['authData'], //
}

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer)

const rootReducer = combineReducers({
   auth: persistedAuthReducer, // ✅ persist 적용
   templates: templateReducer,
   purchase: purchaseReducer,
})

// // ✅ Redux Store 생성 (serializableCheck 비활성화)
// const store = configureStore({
//    reducer: rootReducer,
//    middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//          serializableCheck: false, // ✅ Redux-Persist 관련 오류 방지
//       }),
// })

const store = configureStore({
   reducer: {
      auth: persistedAuthReducer,
      templates: templateReducer,
      purchase: purchaseReducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false, // ✅ Redux-Persist 관련 오류 방지
      }),
})

export const persistor = persistStore(store)
export default store
