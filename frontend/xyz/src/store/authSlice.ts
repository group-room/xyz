import { UserTypes } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLogin: boolean;
  accessToken: string;
  userInfo: UserTypes | null;
}

const initialState: AuthState = {
  isLogin: false,
  accessToken: "",
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateLoginStatus: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    updateUserInfo: (state, action: PayloadAction<UserTypes | null>) => {
      state.userInfo = action.payload;
    },
  },
});

export const { updateLoginStatus, updateAccessToken, updateUserInfo } =
  authSlice.actions;
export default authSlice;
