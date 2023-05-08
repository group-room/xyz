import { axiosInstance } from "./instance";
import { API } from "@/constants/queryKeys";

export const createAzt = (data: any) => {
  return axiosInstance.post(`${API.azt}`, data);
};

export const withdrawAzt = (aztSeq: number) => {
  return axiosInstance.delete(`${API.azt}/member/${aztSeq}`);
};
