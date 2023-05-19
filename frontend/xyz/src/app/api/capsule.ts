import { API } from "@/constants/queryKeys";
import { axiosFileInstance, axiosInstance } from "./instance";

const CAPSULE:string = `/${API.capsule}`;

// 타임캡슐 등록
export const postCapsule = (formData: FormData) => {
  return axiosFileInstance.post(CAPSULE, formData);
};

// 타임캡슐 내용 추가
export const postContentCapsule = (slug: number, formData: FormData) => {
  return axiosInstance.post(`${CAPSULE}/${slug}`, formData);
};

// 타임캡슐 열기
export const postOpenCapsule = (tcSeq: number, latitude:number, longitude:number) => {
  return axiosInstance.post(`${CAPSULE}/open/${tcSeq}`, {latitude, longitude});
};
