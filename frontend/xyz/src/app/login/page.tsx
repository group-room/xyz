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

function LoginPage() {
  const { data: loginHeaders, isLoading } = useAccessToken();
  const dispatch = useAppDispatch();
  const router = useRouter();
  if (loginHeaders) {
    // console.log(loginHeaders);
    dispatch(updateLoginStatus(true));
    dispatch(updateAccessToken(loginHeaders["authorization"]));
    dispatch(updateUserSeq(loginHeaders["sequence"]));
    router.push("/memory");
  }
  return <div>로그인중...!</div>;
}

export default LoginPage;
