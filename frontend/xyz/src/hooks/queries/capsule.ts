import { axiosInstance } from "@/app/api/instance";
import { API, queryKeys } from "@/constants/queryKeys";
import { CapsuleAztTypes } from "@/types/capsule";
import { useQuery } from "@tanstack/react-query";

const CAPSULE = API.capsule;

export const useAztCapsuleList = (aztSeq: number) => {
  return useQuery<CapsuleAztTypes[]>({
    queryKey: queryKeys.capsule.aztCapsuleList(aztSeq),
    queryFn: async () => {
      return axiosInstance
        .get(CAPSULE, { params: { aztSeq } })
        .then((res) => res.data.data.timecapsules);
    },
  });
};
