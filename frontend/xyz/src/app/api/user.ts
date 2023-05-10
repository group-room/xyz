import { axiosFileInstance, axiosInstance } from "./instance";

const USER = "/user";

export const updateProfile = (formData: FormData) => {
  return axiosFileInstance.post(`${USER}/profile`, formData);
};
