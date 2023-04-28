import { axiosInstance } from "./instance";

const MEMORY = "/memory";

export const getMemories = async (
  date: Date | null,
  groupSeq?: number,
  latitude?: number,
  longitude?: number
) => {
  const res = await axiosInstance.get(MEMORY, {
    params: {
      date,
      groupSeq,
      latitude,
      longitude,
    },
  });
  return res.data;
};
