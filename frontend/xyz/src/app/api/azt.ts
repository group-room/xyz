import { axiosFileInstance, axiosInstance } from "./instance";
import { API } from "@/constants/queryKeys";

export const createAzt = (data: any) => {
  return axiosFileInstance.post(`${API.azt}`, data);
};

export const editAzt = (data: any) => {
  return axiosFileInstance.put(`${API.azt}`, data);
};

export const withdrawAzt = (aztSeq: number) => {
  return axiosInstance.delete(`${API.azt}/member/${aztSeq}`);
};
