import { UserProfileType, VisitorTypes } from "@/types/user";
import { axiosInstance } from "@/app/api/instance";
import { API, queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";

const USER = API.user;

export const useLogin = () => {
  return useQuery({
    queryKey: queryKeys.user.userOnly(),
    queryFn: async () => {
      return axiosInstance.get(`/${USER}/access-token`).then((res) => {
        // console.log(res.data);
        // console.log(res.headers);
        return res; // header에 있는 accessToken, userSeq, profileImg 주소 및 body에 있는 nickname 조회해서 쓰기
      });
    },
  });
};

export const useUserList = (userSeq: number) => {
  return useQuery<UserProfileType>({
    queryKey: queryKeys.user.userList(),
    queryFn: async () => {
      return axiosInstance
        .get(`${USER}/profile`, { params: { userSeq } })
        .then((res) => res.data.data);
    },
  });
};

export const useVisitorList = (userSeq: number | string | undefined) => {
  return useQuery<VisitorTypes[]>({
    queryKey: queryKeys.user.myVisitorList(),
    queryFn: async () => {
      return axiosInstance
        .get(`${USER}/visitor`, { params: { userSeq } })
        .then((res) => res.data.data);
    },
  });
};
