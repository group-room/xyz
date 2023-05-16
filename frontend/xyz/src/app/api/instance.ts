import axios from "axios";

export const SERVER_URL = "https://xyz-gen.com";
const BACKEND = "/backend/api";

export const axiosInstance = axios.create({
  baseURL: `${SERVER_URL}${BACKEND}`,
  withCredentials: true,
});

export const axiosFileInstance = axios.create({
  baseURL: `${SERVER_URL}${BACKEND}`,
  headers: {
    "Content-type": "multipart/form-data",
  },
  withCredentials: true,
});

export const axiosChatInstance = axios.create({
  baseURL: SERVER_URL, // 추후에 최종 배포 완료되면 axiosInstance로만 사용
  withCredentials: true,
});
