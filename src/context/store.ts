import { configureStore } from "@reduxjs/toolkit";
import studentRegistrationReducer from '@/context/studentRegistrationSlice';
const store = configureStore({
    reducer: {
        studentRegistration:studentRegistrationReducer
    }
})
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;