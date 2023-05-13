import { axiosFileInstance, axiosInstance } from "./instance";

const USER = "/user";

export const updateProfile = (formData: FormData) => {
  return axiosFileInstance.post(`${USER}/profile`, formData);
};

export const logOut = () => {
  return axiosInstance.delete(`${USER}/logout`);
};

export const withDraw = () => {
  return axiosInstance.delete(`${USER}`);
};
