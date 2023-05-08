import { axiosInstance } from "./instance";
import { API } from "@/constants/queryKeys";

export const withdrawAzt = (aztSeq: number) => {
  return axiosInstance.delete(`${API.azt}/member/${aztSeq}`);
};
