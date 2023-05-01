import { MemoriesTypes } from "@/types/memory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../instance";
import { queryKeys } from "../queryKeys";

const MEMORY = "/memory";

export const useMemoryList = (
  date: string,
  aztSeq?: number,
  latitude?: number,
  longitude?: number
) => {
  return useQuery<MemoriesTypes[]>({
    queryKey: queryKeys.memory.memoryList(date, aztSeq, latitude, longitude),
    queryFn: async () => {
      return axiosInstance.get(MEMORY).then((res) => res.data.data.memories);
    },
  });
};
