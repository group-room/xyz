import { axiosInstance } from "@/app/api/instance";
import { API, queryKeys } from "@/constants/queryKeys";
import { AztInfoTypes, AztTypes } from "@/types/azt";
import { useQuery } from "@tanstack/react-query";

const AZT: string = `/${API.azt}`;

export const useAztList = () => {
  return useQuery<AztTypes[]>({
    queryKey: queryKeys.azt.aztList(),
    queryFn: async () => {
      return axiosInstance.get(`${AZT}/all`).then((res) => res.data.data.azts);
    },
  });
};

export const useAztInfo = (aztSeq: number) => {
  return useQuery<AztInfoTypes>({
    queryKey: queryKeys.azt.aztInfo(aztSeq),
    queryFn: async () => {
      return axiosInstance.get(`${AZT}/${aztSeq}`).then((res) => res.data.data);
    },
  });
};
