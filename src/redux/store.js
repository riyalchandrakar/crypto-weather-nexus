import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import cryptoReducer from './features/cryptoSlice'
import weatherReducer from './features/weatherSlice'
import newsReducer from './features/newsSlice'
import favoritesReducer from './features/favoritesSlice'

const persistConfig = {
  key: 'favorites',
  storage,
  whitelist: ['favorites']
}

const persistedReducer = persistReducer(persistConfig, favoritesReducer)

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    weather: weatherReducer,
    news: newsReducer,
    favorites: persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export const persistor = persistStore(store)