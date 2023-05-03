import { MemoriesTypes, MemoryTypes } from "@/types/memory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../app/api/instance";
import { queryKeys } from "../../constants/queryKeys";

const MEMORY = "/memory";

export const useMemoryList = (
  date: string,
  aztSeq?: number,
  latitude?: number,
  longitude?: number
) => {
  return useQuery<MemoriesTypes[]>({
    queryKey: queryKeys.memory.memoryList(date, aztSeq, latitude, longitude),
    queryFn: async () =>
      axiosInstance
        .get(MEMORY, { params: { date, aztSeq, latitude, longitude } })
        .then((res) => res.data.data.memories),
  });
};

export const useMemoryDetail = (memorySeq: number) => {
  return useQuery<MemoryTypes>({
    queryKey: queryKeys.memory.memoryDetail(memorySeq),
    queryFn: async () => {
      return axiosInstance
        .get(`${MEMORY}/${memorySeq}`)
        .then((res) => res.data.data);
    },
  });
};
