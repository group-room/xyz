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

// 대기중 타임캡슐 목록 조회
export const useWaitingCapsuleList = () => {
  return useQuery<CapsuleAztTypes[]>({
    queryKey: queryKeys.capsule.capsuleList(),
    queryFn: async () => {
      return axiosInstance
        .get(`${CAPSULE}/waiting`)
        .then((res) => res.data.data.timecapsules);
    },
  });
};

// 열림 타임캡슐 목록 조회
export const useOpenCapsuleList = () => {
  return useQuery<CapsuleAztTypes[]>({
    queryKey: queryKeys.capsule.capsuleList(),
    queryFn: async () => {
      return axiosInstance
        .get(`${CAPSULE}/opened`)
        .then((res) => res.data.data.timecapsules);
    },
  });
};

// 타임캡슐 랜덤 조회
export const useRamdomCapsule = () => {
  return useQuery<CapsuleAztTypes>({
    queryKey: queryKeys.capsule.capsuleList(),
    queryFn: async () => {
      return axiosInstance
        .get(`${CAPSULE}/random`)
        .then((res) => res.data.data);
    },
  });
};

// 타임캡슐 상세 조회 - return 타입 수정해야 됨
export const useDetailCapsule = (tcSeq: number) => {
  return useQuery<CapsuleAztTypes>({
    queryKey: queryKeys.capsule.capsuleList(tcSeq),
    queryFn: async () => {
      return axiosInstance
        .get(`${CAPSULE}/${tcSeq}`)
        .then((res) => res.data.data);
    },
  });
};

// 나의 활동 - 타임캡슐 목록
export const useMyCapsuleList = () => {
  return useQuery<CapsuleAztTypes[]>({
    queryKey: queryKeys.capsule.capsuleList(),
    queryFn: async () => {
      return axiosInstance
        .get(`${CAPSULE}/mytimecapsule`)
        .then((res) => res.data.data.timecapsules);
    },
  });
};
