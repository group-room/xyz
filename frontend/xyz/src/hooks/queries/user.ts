import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/app/api/instance";
import { queryKeys } from "@/constants/queryKeys";
import { UserProfileType, VisitorTypes } from "@/types/user";

const USER = "/user";
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

export const useVisitorList = (userSeq?: number) => {
  return useQuery<VisitorTypes[]>({
    queryKey: queryKeys.visitor.visitorList(),
    queryFn: async () => {
      return axiosInstance
        .get(`${USER}/visitor?userSeq=${userSeq}`)
        .then((res) => res.data.data);
    },
  });
};
