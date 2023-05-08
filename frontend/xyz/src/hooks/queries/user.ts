import { axiosInstance } from "@/app/api/instance";
import { API, queryKeys } from "@/constants/queryKeys";
import { UserLoginTypes } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

const USER = API.user;

export const useAccessToken = () => {
  return useQuery({
    queryKey: queryKeys.user.userOnly(),
    queryFn: async () => {
      return axiosInstance.get(`/${USER}/access-token`).then((res) => {
        // console.log(res.data);
        // console.log(res.headers);
        return res.headers; // header에 있는 accessToken, userSeq 조회해서 쓰기
      });
    },
  });
};
