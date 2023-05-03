import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/app/api/instance";
import { queryKeys } from "@/constants/queryKeys";
import { UserProfileType } from "@/types/user";

export const useUserList = () => {
  return useQuery<UserProfileType>({
    queryKey: queryKeys.user.userList(),
    queryFn: async () => {
      return axiosInstance.get(`user/profile`).then((res) => res.data.data);
    },
  });
};
