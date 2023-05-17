"use client";

import { useLogin } from "@/hooks/queries/user";
import { useAppDispatch } from "@/hooks/redux";
import {
  updateAccessToken,
  updateLoginStatus,
  updateUserInfo,
} from "@/store/authSlice";
import { useRouter } from "next/navigation";
import React from "react";
import {
  axiosChatInstance,
  axiosFileInstance,
  axiosInstance,
} from "../api/instance";
import { API } from "@/constants/queryKeys";
import LoadingLottie from "@/components/lottie/Loading";
import BrowserHeader from "@/components/common/BrowserHeader";

function LoginPage() {
  const { data: loginRes, isLoading } = useLogin();
  const dispatch = useAppDispatch();
  const router = useRouter();

  if (loginRes) {
    const loginHeaders = loginRes.headers;
    const accessToken = loginHeaders["authorization"];
    const userSeq = +loginHeaders["sequence"];
    const profileImage = loginHeaders["image"];

    const nickname = loginRes.data.nickname;

    dispatch(updateLoginStatus(true));
    dispatch(updateAccessToken(accessToken));
    dispatch(
      updateUserInfo({
        userSeq,
        nickname,
        profileImage,
      })
    );
    router.push(`/${API.memory}`);
    axiosInstance.defaults.headers.common["Authorization"] = accessToken;
    axiosFileInstance.defaults.headers.common["Authorization"] = accessToken;
    axiosChatInstance.defaults.headers.common["Authorization"] = accessToken;
  }
  return (
    <>
      <BrowserHeader />
      <div className="flex justify-center align-middle py-60">
        <LoadingLottie />
      </div>
    </>
  );
}

export default LoginPage;
