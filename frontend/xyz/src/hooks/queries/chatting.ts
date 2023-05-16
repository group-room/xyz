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

// 채팅방 목록에 보여줄 최근 메시지 조회
export const useChattingListRecentMessage = () => {
  return useQuery<ChatDataTypes[]>({
    queryKey: queryKeys.chatting.chatroomListRecentMessage(),
    queryFn: async () => {
      return axiosChatInstance
        .get(`${API.chatroom}/recent-chat`)
        .then((res) => res.data.data);
    },
  });
};

// 채팅방 상세 정보 조회
export const useChattingDetail = (chatSeq: number) => {
  return useQuery<ChattingRoomDetailTypes>({
    queryKey: queryKeys.chatting.chatroomDetail(chatSeq),
    queryFn: async () => {
      return axiosInstance
        .get(`${API.chat}`, { params: { chatSeq } })
        .then((res) => res.data.data);
    },
  });
};

// 채팅방 채팅 기록 조회
export const useChattingHistory = (name: string) => {
  return useQuery<ChatDataTypes[]>({
    queryKey: queryKeys.chatting.chatHistory(name),
    queryFn: async () => {
      return axiosChatInstance
        .get(`${API.chat}/history`, { params: { name } })
        .then((res) => res.data);
    },
  });
};
