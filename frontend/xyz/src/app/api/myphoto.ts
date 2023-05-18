import { axiosFileInstance, axiosInstance } from "./instance";

const MYPHOTO = "/my-room";

// 대문사진 생성
export const createMyPhoto = (formData: FormData) => {
  return axiosFileInstance.post(`${MYPHOTO}/photo`, formData);
};

// 대문사진 삭제
export const deleteMyPhoto = () => {
  return axiosInstance.delete(`${MYPHOTO}/photo`);
};

// 대문사진 필터 적용
export const createMyPhotoFilter = (background: number) => {
  return axiosInstance.post(`${MYPHOTO}/background`, { background });
};
