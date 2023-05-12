import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const authReducer = createSlice({
  name: "main",
  initialState: {
    isLogin: false,
    accessToken: "",
    routeHistory: "",
  },
  reducers: {
    updateLoginStatus: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    updateRouteHistory: (state, action: PayloadAction<string>) => {
      state.routeHistory = action.payload;
    },
  },
});

export const { updateLoginStatus, updateAccessToken, updateRouteHistory } =
  authReducer.actions;
export default authReducer;
