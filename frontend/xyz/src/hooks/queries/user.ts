import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/app/api/instance";
import { queryKeys } from "@/constants/queryKeys";
import { UserProfileType, VisitorTypes } from "@/types/user";

export const useUserList = () => {
  return useQuery<UserProfileType>({
    queryKey: queryKeys.user.userList(),
    queryFn: async () => {
      return axiosInstance.get(`user/profile`).then((res) => res.data.data);
    },
  });
};

export const useVisitorList = (userSeq?: number) => {
  return useQuery<VisitorTypes[]>({
    queryKey: queryKeys.user.visitorList(),
    queryFn: async () => {
      return axiosInstance.get(`user/visitor`).then((res) => res.data.data);
    },
  });
};
