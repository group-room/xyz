import { axiosFileInstance, axiosInstance } from "./instance";

const MEMORY = "/memory";

export const createMemory = (formData: FormData) => {
  return axiosFileInstance.post(MEMORY, formData);
};

export const addMemoryLike = (memorySeq: number) => {
  return axiosInstance.post(`${MEMORY}/like/${memorySeq}`);
};

export const deleteMemoryLike = (memorySeq: number) => {
  return axiosInstance.delete(`${MEMORY}/like/${memorySeq}`);
};

export const createMemoryComment = (memorySeq: number, content: string) => {
  return axiosInstance.post(`${MEMORY}/comment/${memorySeq}`, { content });
};

export const deleteMemoryComment = (commentSeq: number) => {
  return axiosInstance.delete(`${MEMORY}/comment/${commentSeq}`);
};
