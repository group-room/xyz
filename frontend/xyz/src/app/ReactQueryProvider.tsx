"use client"; // 나중에 devtool 끄면 꺼도될듯?

import { useAppSelector } from "@/hooks/redux";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren } from "react";
import { axiosFileInstance, axiosInstance } from "./api/instance";

function ReactQueryProvider({ children }: PropsWithChildren) {
  const queryClient = new QueryClient();
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  axiosInstance.defaults.headers.common["Authorization"] = accessToken;
  axiosFileInstance.defaults.headers.common["Authorization"] = accessToken;

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;
