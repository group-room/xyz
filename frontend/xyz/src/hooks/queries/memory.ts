import { MemoriesTypes, MemoryListParams, MemoryTypes } from "@/types/memory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../app/api/instance";
import { API, queryKeys } from "../../constants/queryKeys";

const MEMORY: string = `/${API.memory}`;

// 추억 피드 조회
export const useMemoryList = ({
  date,
  aztSeq,
  latitude,
  longitude,
}: MemoryListParams) => {
  return useQuery<MemoriesTypes[]>({
    queryKey: queryKeys.memory.memoryList(date, aztSeq, latitude, longitude),
    queryFn: async () =>
      axiosInstance
        .get(MEMORY, { params: { date, aztSeq, latitude, longitude } })
        .then((res) => res.data.data.memories),
  });
};

// 추억 상세 조회
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
