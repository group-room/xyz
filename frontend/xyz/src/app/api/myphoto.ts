import { axiosFileInstance } from "./instance";

const MYPHOTO = "/my-room";

// 대문사진 생성
export const createMyPhoto = (formData: FormData) => {
  return axiosFileInstance.post(`${MYPHOTO}/photo`, formData);
};
