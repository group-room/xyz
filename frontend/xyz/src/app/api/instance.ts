import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://xyz-gen.com/api",
  headers: { Authorization: "token" }, // 나중에 토큰 넣어주기
  withCredentials: true,
});
