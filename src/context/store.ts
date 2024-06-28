import { configureStore } from "@reduxjs/toolkit";
import studentRegistrationReducer from '@/context/studentRegistrationSlice';
import staffRegistrationSlice from '@/context/staffRegistrationSlice'
import staffReducer from "@/context/staffSlice";
import studentReducer from "@/context/studentSlice";
const store = configureStore({
    reducer: {
        staffRegistration: staffRegistrationSlice,
        studentRegistration: studentRegistrationReducer,
        staff: staffReducer,
        student:studentReducer
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;