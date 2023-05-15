import { axiosInstance } from "@/app/api/instance";
import { API, queryKeys } from "@/constants/queryKeys";
import { ChattingRoomListTypes } from "@/types/chatting";
import { useQuery } from "@tanstack/react-query";

export const useChattingList = () => {
  return useQuery<ChattingRoomListTypes[]>({
    queryKey: queryKeys.chatting.chattingList(),
    queryFn: async () => {
      return axiosInstance
        .get(`${API.chatroom}/list`)
        .then((res) => res.data.data.chats);
    },
  });
};
