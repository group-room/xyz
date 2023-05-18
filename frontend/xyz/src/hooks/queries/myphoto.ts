import { useQuery } from "@tanstack/react-query";
import { API, queryKeys } from "@/constants/queryKeys";
import { axiosInstance } from "@/app/api/instance";
import { MyPhotoTypes, MyPhotoFilterTypes } from "@/types/user";

const MYPHOTO = API.myroom;

//대문 사진 조회
export const useMyPhoto = (userSeq: number) => {
  return useQuery<MyPhotoTypes>({
    queryKey: queryKeys.myroom.myroomList(),
    queryFn: async () => {
      return axiosInstance
        .get(`${MYPHOTO}/photo`, { params: { userSeq } })
        .then((res) => res.data);
    },
  });
};

//대문 사진 필터 조회
export const useMyPhotoFilter = (userSeq: number) => {
  return useQuery<MyPhotoFilterTypes>({
    queryKey: queryKeys.myroom.myroomFilter(),
    queryFn: async () => {
      return axiosInstance
        .get(`${MYPHOTO}/background`, { params: { userSeq } })
        .then((res) => res.data);
    },
  });
};
