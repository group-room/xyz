import { axiosInstance } from "@/app/api/instance";
import { API, queryKeys } from "@/constants/queryKeys";
import { FriendListTypes } from "@/types/friend";
import { useQuery } from "@tanstack/react-query";

const FRIEND:string = API.friend;

export const useFriendList = (isBlock: boolean) => {
  return useQuery<FriendListTypes[]>({
    queryKey: queryKeys.friend.friendList(isBlock),
    queryFn: async () => {
      if(isBlock) { // 차단한 친구 목록 불러오기
        console.log("차단한 친구 목록 불러오기")
        return axiosInstance
        .get(`${FRIEND}/block`)
        .then((res) => res.data.data.users);
      } else { // 친구 목록 불러오기
        console.log("친구 목록 불러오기")
        return axiosInstance
        .get(`${FRIEND}/all`)
        .then((res) => res.data.data.friends);
      }
    },
  });
};

// 전체 사용자 중 검색
export const useAllSearch = (check: boolean, keyword: string) => {
  return useQuery<FriendListTypes[]>({
    queryKey: queryKeys.friend.searchList(check, keyword),
    queryFn: async () => {
      // true : 닉네임 검색, false : 고유 코드 검색
      if (check) {
        let nickname = keyword;
        return axiosInstance
          .get(`/${FRIEND}/user`, { params: { nickname } })
          .then((res) => res.data.data.users);
      } else {
        return axiosInstance
          .get(`/${FRIEND}/user/${keyword}`)
          .then((res) => res.data.data.users);
      }
    },
  });
};

// 친구 목록 중 검색
export const useFriendSearch = (check: boolean, keyword: string) => {
  return useQuery<FriendListTypes[]>({
    queryKey: queryKeys.friend.searchList(check, keyword),
    queryFn: async () => {
      // true : 닉네임 검색, false : 고유 코드 검색
      if (check) {
        let nickname = keyword;
        return axiosInstance
          .get(`/${FRIEND}`, { params: { nickname } })
          .then((res) => res.data.data.users);
      } else {
        return axiosInstance
          .get(`/${FRIEND}/${keyword}`)
          .then((res) => res.data.data.users);
      }
    },
  });
};
