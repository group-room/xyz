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

//userSeq 없을 때 처리를 어떻게 하는게 맞는지 모르겠음(get 주소가 저런식이 맞나..?)
//userSeq << 나의 것은 어디서 얻을 수 있는지?

export const useUserList = (userSeq?: number | string) => {
  return useQuery<UserProfileType>({
    queryKey: queryKeys.user.userList(),
    queryFn: async () => {
      return axiosInstance
        .get(`${USER}/profile?userSeq=${userSeq}`)
        .then((res) => res.data.data);
    },
  });
};

export const useVisitorList = (userSeq?: number | string) => {
  return useQuery<VisitorTypes[]>({
    queryKey: queryKeys.user.myVisitorList(),
    queryFn: async () => {
      return axiosInstance
        .get(`${USER}/visitor?userSeq=${userSeq}`)
        .then((res) => res.data.data);
    },
  });
};
