import { API } from "@/constants/queryKeys";
import { axiosInstance } from "./instance";

const CAPSULE:string = `/${API.capsule}`;

// 타임캡슐 등록
export const postFollow = () => {
  return axiosInstance.post(CAPSULE, {  });
};

// 타임캡슐 내용 추가
export const postContentCapsule = (tcSeq: number) => {
  return axiosInstance.post(`${CAPSULE}/${tcSeq}`);
};

// 타임캡슐 열기
export const postOpenCapsule = (tcSeq: number) => {
  return axiosInstance.post(`${CAPSULE}/open/${tcSeq}`);
};
