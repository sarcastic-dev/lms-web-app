import { configureStore } from "@reduxjs/toolkit";
import studentRegistrationReducer from '@/context/studentRegistrationSlice';
import staffRegistrationSlice from '@/context/staffRegistrationSlice'
import staffReducer from "@/context/staffSlice";
import studentReducer from "@/context/studentSlice";
import userInfoSlice from "@/context/auth/signupSlice"
const store = configureStore({
    reducer: {
        staffRegistration: staffRegistrationSlice,
        studentRegistration: studentRegistrationReducer,
        staff: staffReducer,
        student:studentReducer,
        userInfo: userInfoSlice
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;