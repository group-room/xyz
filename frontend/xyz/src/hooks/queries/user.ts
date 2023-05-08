import { axiosInstance } from "@/app/api/instance";
import { API, queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";

const user = API.user;

export const useAccessToken = () => {
  return useQuery({
    queryKey: queryKeys.user.user,
    queryFn: async () => {
      return axiosInstance.get(`/${user}/access-token`).then((res) => {
        // console.log(res.data);
        // console.log(res.headers);
        let userData = {};
        if (res.data === "SUCCESS") {
          userData = {
            accessToken: res.headers["Authorization"],
            userSeq: res.headers["Sequence"],
          };
        }
        return userData;
      });
    },
  });
};
