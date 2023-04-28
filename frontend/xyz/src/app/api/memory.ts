import { axiosInstance } from "./instance";

const MEMORY = "/memory";

export const getMemories = async (
  date: string,
  aztSeq?: number,
  latitude?: number,
  longitude?: number
) => {
  const res = await axiosInstance.get(MEMORY, {
    params: {
      date,
      aztSeq,
      latitude,
      longitude,
    },
  });
  return res.data;
};

export const createMemory = async (
  content: string,
  accessibility: string,
  aztSeq: number,
  date: string,
  latitude: number,
  longitude: number,
  location: string,
  images: File[]
) => {
  const formData = new FormData();
  formData.append(
    "addMemoryRequest",
    JSON.stringify({
      content: content,
      accessibility: accessibility,
      aztSeq: aztSeq,
      date: date,
      latitude: latitude,
      longitude: longitude,
      location: location,
    })
  );
  images.forEach((image) => formData.append("images", image));
  const res = await axiosInstance.post(MEMORY, formData, {
    headers: { "Content-Type": "multipart/form-data", charset: "utf-8" },
  });
  return res.data;
};
