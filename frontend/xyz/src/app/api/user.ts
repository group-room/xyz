import { axiosFileInstance, axiosInstance } from "./instance";

const USER = "/user";

// 프로필 수정
export const updateProfile = (formData: FormData) => {
  return axiosFileInstance.post(`${USER}/profile`, formData);
};

// 로그아웃
export const logOut = () => {
  return axiosInstance.delete(`${USER}/logout`);
};

// 탈퇴
export const withDraw = () => {
  return axiosInstance.delete(`${USER}`);
};

// 방명록 작성
export const createGuestbook = (userSeq: number, content: string) => {
  return axiosInstance.post(`${USER}/visitor`, { userSeq, content });
};

// 방명록 삭제
export const deleteGuestbook = (userSeq: number, visitorSeq: number) => {
  return axiosInstance.delete(`${USER}/visitor/${visitorSeq}`, {
    params: { userSeq },
  });
};
