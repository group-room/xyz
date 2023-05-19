import { axiosFileInstance, axiosInstance } from "./instance";

const MEMORY = "/memory";

// 추억 생성
export const createMemory = (formData: FormData) => {
  return axiosFileInstance.post(MEMORY, formData);
};

// 추억 수정
export const editMemory = (memorySeq: number, formData: FormData) => {
  return axiosFileInstance.put(`${MEMORY}/${memorySeq}`, formData);
};

// 추억 삭제
export const deleteMemory = (memorySeq: number) => {
  return axiosInstance.delete(`${MEMORY}/${memorySeq}`);
};

// 추억 좋아요 등록
export const addMemoryLike = (memorySeq: number) => {
  return axiosInstance.post(`${MEMORY}/like/${memorySeq}`);
};

// 추억 좋아요 삭제
export const deleteMemoryLike = (memorySeq: number) => {
  return axiosInstance.delete(`${MEMORY}/like/${memorySeq}`);
};

// 추억 댓글 작성
export const createMemoryComment = (memorySeq: number, content: string) => {
  return axiosInstance.post(`${MEMORY}/comment/${memorySeq}`, { content });
};

// 추억 댓글 삭제
export const deleteMemoryComment = (commentSeq: number) => {
  return axiosInstance.delete(`${MEMORY}/comment/${commentSeq}`);
};
