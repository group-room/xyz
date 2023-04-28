import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://xyz-gen.com/api",
  headers: {
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXF1ZW5jZSI6MTEsInJvbGUiOiJST0xFX1VTRVIiLCJpYXQiOjE2ODI2NjI5MDQsImV4cCI6MTY4NTI1NDkwNH0.sTv8nEh6qqS324gg211lqCPDHeRzqoG9-HQ2PMXwggc",
  }, // 나중에 토큰 넣어주기
  withCredentials: true,
});
