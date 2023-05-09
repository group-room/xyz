import store from "@/store/store";
import axios from "axios";

export const SERVER_URL = "https://xyz-gen.com/backend/api";
const state = store.getState();

export const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXF1ZW5jZSI6MSwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTY4MzUwNjk1OSwiZXhwIjoxNjgzNjc5NzU5fQ.VT4DoLqgq3Nt6Ep8S2Rz60uiSSI2p1ShYqFD3LYw-4w",
  }, // 나중에 토큰 넣어주기
  withCredentials: true,
});

export const axiosFileInstance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-type": "multipart/form-data",
    Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXF1ZW5jZSI6MSwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTY4MzUwNjk1OSwiZXhwIjoxNjgzNjc5NzU5fQ.VT4DoLqgq3Nt6Ep8S2Rz60uiSSI2p1ShYqFD3LYw-4w",
  }, // 나중에 토큰 넣어주기
  withCredentials: true,
});
