"use client";

import { useAccessToken } from "@/hooks/queries/user";
import { useAppDispatch } from "@/hooks/redux";
import { updateAccessToken } from "@/store/authSlice";
import React from "react";

function LoginPage() {
  const { data: loginData, isLoading } = useAccessToken();
  // const dispatch = useAppDispatch();
  if (loginData) {
    // dispatch(updateAccessToken(loginData.accessToken));
  }
  return <div>LoginPage</div>;
}

export default LoginPage;
