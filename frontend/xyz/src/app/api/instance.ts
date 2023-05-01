import axios from "axios";

axios.defaults.withCredentials = true;

export const axiosInstance = axios.create({
  baseURL: "https://xyz-gen.com/backend/api",
  headers: {
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXF1ZW5jZSI6Nywicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTY4MjY3MTI4MiwiZXhwIjoxNjgzMTAzMjgyfQ.btXbyUWmoccssO8R7QyC3f_-M7omeu3Z7f9_GoNKAWU",
  }, // 나중에 토큰 넣어주기
  withCredentials: true,
});

axiosInstance.defaults.withCredentials = true;
