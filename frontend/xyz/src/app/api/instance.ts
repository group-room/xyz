import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://xyz-gen.com/api",
  headers: {
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXF1ZW5jZSI6OSwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTY4MjY0MjY3NCwiZXhwIjoxNjg1MjM0Njc0fQ.ov4Db7Wx5ET0p76QzOQHU2NpdM0vqMa8LthvY6u_zGQ",
  }, // 나중에 토큰 넣어주기
  withCredentials: true,
});
