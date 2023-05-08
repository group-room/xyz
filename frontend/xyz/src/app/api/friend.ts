import { axiosInstance } from "./instance";

const FRIEND = "/friend";

// 친구 요청
export const postFollow = (userSeq: number) => {
  console.log("postFollow api userSeq : ", userSeq);
  return axiosInstance.post(FRIEND, { userSeq });
};

// 친구 요청 취소
export const putCancelFollow = (userSeq: number) => {
  return axiosInstance.put(`/${FRIEND}/cancel`, userSeq);
};

// 친구 요청 수락
export const putAcceptFollow = (userSeq: number) => {
  return axiosInstance.put(FRIEND, userSeq);
};

// 친구 끊기
export const deleteFollow = (userSeq: number) => {
  return axiosInstance.put(`${FRIEND}/${userSeq}`);
};

// 사용자 차단
export const postBlock = (userSeq: number) => {
  return axiosInstance.put(`${FRIEND}/block`, userSeq);
};

// 사용자 차단 해제
export const deleteBlock = (userSeq: number) => {
  return axiosInstance.put(`${FRIEND}/block/${userSeq}`);
};
