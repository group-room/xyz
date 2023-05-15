import { axiosChatInstance, axiosInstance } from "@/app/api/instance";
import { API, queryKeys } from "@/constants/queryKeys";
import {
  ChatDataTypes,
  ChattingRoomDetailTypes,
  ChattingRoomListTypes,
} from "@/types/chatting";
import { useQuery } from "@tanstack/react-query";

// 채팅방 목록 조회
export const useChattingList = () => {
  return useQuery<ChattingRoomListTypes[]>({
    queryKey: queryKeys.chatting.chatroomList(),
    queryFn: async () => {
      return axiosInstance
        .get(`${API.chatroom}/list`)
        .then((res) => res.data.data.chats);
    },
  });
};

// 채팅방 상세 정보 조회
export const useChattingDetail = (chatSeq: number) => {
  return useQuery<ChattingRoomDetailTypes>({
    queryKey: queryKeys.chatting.chatroomDetail(chatSeq),
    queryFn: async () => {
      return axiosInstance
        .get(`${API.chatroom}`, { params: { chatSeq } })
        .then((res) => res.data.data);
    },
  });
};

// 채팅방 채팅 기록 조회
export const useChattingHistory = (slug: string) => {
  return useQuery<ChatDataTypes[]>({
    queryKey: queryKeys.chatting.chatHistory(slug),
    queryFn: async () => {
      return axiosChatInstance
        .get(`${API.chat}/history`, { params: { room: slug } })
        .then((res) => res.data);
    },
  });
};
