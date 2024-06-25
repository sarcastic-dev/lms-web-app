import { configureStore } from "@reduxjs/toolkit";
import studentRegistrationReducer from '@/context/studentRegistrationSlice';
import staffRegistrationSlice from '@/context/staffRegistrationSlice'
import staffReducer from "./staffSlice";
const store = configureStore({
    reducer: {
        staffRegistration: staffRegistrationSlice,
        studentRegistration: studentRegistrationReducer,
        staff:staffReducer
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;