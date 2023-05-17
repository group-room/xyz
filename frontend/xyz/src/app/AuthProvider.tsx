"use client";

import React, { PropsWithChildren } from "react";
import { useAppSelector } from "@/hooks/redux";
import { axiosFileInstance, axiosInstance } from "./api/instance";
import { usePathname, useRouter } from "next/navigation";

function AuthProvider({ children }: PropsWithChildren) {
  const state = useAppSelector((state) => state);
  const isLogin = state.auth.isLogin;
  const accessToken = state.auth.accessToken;
  axiosInstance.defaults.headers.common["Authorization"] = accessToken;
  axiosFileInstance.defaults.headers.common["Authorization"] = accessToken;

  const pathname = usePathname();
  const router = useRouter();
  if (pathname !== "/" && !pathname.includes("login")) {
    if (!isLogin || accessToken === "") router.push("/");
  }
  return <>{children}</>;
}

export default AuthProvider;
