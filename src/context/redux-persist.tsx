import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';
import staffReducer from './staffSlice'; // Import your slice reducers
import userInfoReducer from './auth/signupSlice';


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['staff', 'userInfo'], // only persist the staff slice
};

const rootReducer = combineReducers({
  staff: staffReducer,
  userInfo: userInfoReducer,
  // add other reducers here
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

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
