import axios from "axios";

export const SERVER_URL = "https://xyz-gen.com/backend/api";

export const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    // "Content-type": "application/json",
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXF1ZW5jZSI6MSwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTY4MzAxNjQyMiwiZXhwIjoxNjgzNDQ4NDIyfQ.TOkxpVTIAvzw1ozn9DDjefmWHlTmZTvgDHfyQNqgi2w",
  }, // 나중에 토큰 넣어주기
  withCredentials: true,
});

export const axiosFileInstance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-type": "multipart/form-data",
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXF1ZW5jZSI6MSwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTY4MzAxNjQyMiwiZXhwIjoxNjgzNDQ4NDIyfQ.TOkxpVTIAvzw1ozn9DDjefmWHlTmZTvgDHfyQNqgi2w",
  }, // 나중에 토큰 넣어주기
  withCredentials: true,
});
