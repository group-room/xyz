import axios from "axios";

export const SERVER_URL = "https://xyz-gen.com/backend";

export const axiosInstance = axios.create({
  baseURL: `${SERVER_URL}/api`,
  headers: {
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXF1ZW5jZSI6MSwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTY4MzAwMzgzOCwiZXhwIjoxNjgzNDM1ODM4fQ.4NQOVV7N-vOlNylkQetVd8qKODjDRWfK8tNDN1Yl2I8",
  }, // 나중에 토큰 넣어주기
  withCredentials: true,
});

export const axiosFileInstance = axios.create({
  baseURL: `${SERVER_URL}/api`,
  headers: {
    "Content-type": "multipart/form-data",
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXF1ZW5jZSI6MSwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTY4MzAwMzgzOCwiZXhwIjoxNjgzNDM1ODM4fQ.4NQOVV7N-vOlNylkQetVd8qKODjDRWfK8tNDN1Yl2I8",
  }, // 나중에 토큰 넣어주기
  withCredentials: true,
});
