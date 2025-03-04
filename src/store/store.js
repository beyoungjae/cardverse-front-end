import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import sessionStorage from 'redux-persist/lib/storage/session' // 창 닫으면 초기화
import authReducer from '../features/authSlice'
import templateReducer from '../features/templateSlice'
import purchaseReducer from '../features/purchaseSlice'

const authPersistConfig = {
   key: 'auth',
   storage,
   whitelist: ['authData'],
}

const sessionPersistConfig = {
   key: 'session',
   storage: sessionStorage, //  SessionStorage 사용 (창 닫으면 초기화)
   whitelist: ['sessionActive'], // 창이 닫혔는지 여부 확인
}

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer)
const persistedSessionReducer = persistReducer(sessionPersistConfig, (state = { sessionActive: true }) => state)

const store = configureStore({
   reducer: {
      auth: persistedAuthReducer,
      templates: templateReducer,
      purchase: purchaseReducer,
      session: persistedSessionReducer, // 창 닫힘 감지용 추가
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false, // Redux-Persist 관련 오류 방지
      }),
})

export const persistor = persistStore(store)
export default store
