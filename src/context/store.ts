import { configureStore } from "@reduxjs/toolkit";
import studentRegistrationReducer from '@/context/studentRegistrationSlice';
import staffRegistrationSlice from '@/context/staffRegistrationSlice'

const store = configureStore({
    reducer: {
        studentRegistration: studentRegistrationReducer,
        staffRegistration:staffRegistrationSlice
    }
})
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;