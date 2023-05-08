import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    accessToken: "",
  },
  reducers: {
    updateLoginStatus: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

export const { updateLoginStatus, updateAccessToken } = authSlice.actions;
export default authSlice;
