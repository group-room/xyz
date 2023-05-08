import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLogin: boolean;
  accessToken: string;
  userSeq: number | null;
}

const initialState: AuthState = {
  isLogin: false,
  accessToken: "",
  userSeq: null,
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
    updateUserSeq: (state, action: PayloadAction<number | null>) => {
      state.userSeq = action.payload;
    },
  },
});

export const { updateLoginStatus, updateAccessToken, updateUserSeq } =
  authSlice.actions;
export default authSlice;
