import { axiosFileInstance, axiosInstance } from "./instance";
import { API } from "@/constants/queryKeys";

// 아지트 생성
export const createAzt = (data: any) => {
  return axiosFileInstance.post(`${API.azt}`, data);
};

// 아지트 수정
export const editAzt = (data: any) => {
  return axiosFileInstance.put(`${API.azt}`, data);
};

// 아지트 상세에서 바로 친구 초대
export const inviteFriendDirectly = (data: any) => {
  return axiosInstance.post(`${API.azt}/member`, data);
};

// 아지트 탈퇴
export const withdrawAzt = (aztSeq: number) => {
  return axiosInstance.delete(`${API.azt}/member/${aztSeq}`);
};
