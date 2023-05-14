import store from "@/store/store";
import axios from "axios";

export const SERVER_URL = "https://xyz-gen.com/backend/api";
const state = store.getState();

export const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});

export const axiosFileInstance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-type": "multipart/form-data",
  },
  withCredentials: true,
});
