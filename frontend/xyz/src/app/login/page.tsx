"use client";

import { useAccessToken } from "@/hooks/queries/user";
import { useAppDispatch } from "@/hooks/redux";
import {
  updateAccessToken,
  updateLoginStatus,
  updateUserSeq,
} from "@/store/authSlice";
import { useRouter } from "next/navigation";
import React from "react";
import { axiosFileInstance, axiosInstance } from "../api/instance";

function LoginPage() {
  const { data: loginHeaders, isLoading } = useAccessToken();
  const dispatch = useAppDispatch();
  const router = useRouter();
  if (loginHeaders) {
    // console.log(loginHeaders);
    const accessToken = loginHeaders["authorization"];
    dispatch(updateLoginStatus(true));
    dispatch(updateAccessToken(accessToken));
    dispatch(updateUserSeq(+loginHeaders["sequence"]));
    router.push("/memory");
    axiosInstance.defaults.headers.common["Authorization"] = accessToken;
    axiosFileInstance.defaults.headers.common["Authorization"] = accessToken;
  }
  return <div>로그인중...!</div>;
}

export default LoginPage;
