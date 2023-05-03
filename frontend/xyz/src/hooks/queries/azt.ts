import { axiosInstance } from "@/app/api/instance";
import { queryKeys } from "@/constants/queryKeys";
import { AztTypes } from "@/types/azt";
import { useQuery } from "@tanstack/react-query";

const AZT = "azt";

export const useAztList = () => {
  return useQuery<AztTypes[]>({
    queryKey: queryKeys.azt.aztList(),
    queryFn: async () => {
      return axiosInstance.get(`${AZT}/all`).then((res) => res.data.data.azts);
    },
  });
};
