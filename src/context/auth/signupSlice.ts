import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface UserData {
  email: string;
  phone: string;
}
interface AuthData {
  formData: {
    userData: Partial<UserData>;
    userId: string;
  };
}
const initialState: AuthData = {
  formData: {
    userData: {
      phone: "",
      email: "",
    },
    userId: "",
  },
};

const userInfo = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfoData: (state, action: PayloadAction<UserData>) => {
      state.formData.userData = action.payload;
    },
    setUserId(state, action: PayloadAction<string>) {
      state.formData.userId = action.payload;
    },
  },
});

export const { setUserInfoData, setUserId } = userInfo.actions;

export default userInfo.reducer;
