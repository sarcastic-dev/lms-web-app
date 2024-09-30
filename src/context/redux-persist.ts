import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; 
import { persistReducer, persistStore } from 'redux-persist';
import staffReducer from './staffSlice'; 
import userInfoReducer from './auth/signupSlice';
import { PersistPartial } from 'redux-persist/es/persistReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['staff', 'userInfo'], 
};

const rootReducer = combineReducers({
  staff: staffReducer,
  userInfo: userInfoReducer,

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer> & PersistPartial;
export type AppDispatch = typeof store.dispatch;

export default store;
