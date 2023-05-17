import { axiosChatInstance, axiosInstance } from "@/app/api/instance";
import { API, queryKeys } from "@/constants/queryKeys";
import {
  ChatDataTypes,
  ChattingRoomDetailTypes,
  ChattingRoomListTypes,
} from "@/types/chatting";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

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
export const useChattingListRecentMessage = (userSeq: string) => {
  return useQuery<ChatDataTypes[]>({
    queryKey: queryKeys.chatting.chatroomListRecentMessage(),
    queryFn: async () => {
      return axiosChatInstance
        .get(`${API.chat}/recent-chat`, { params: { name: userSeq } })
        .then((res) => res.data);
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
// export const useChattingHistory = (room: string, id: number | null) => {
//   return useQuery<ChatDataTypes[]>({
//     queryKey: queryKeys.chatting.chatHistory(room),
//     queryFn: async () => {
//       const params = id ? { room, id } : { room };
//       return axiosChatInstance
//         .get(`${API.chat}/history`, { params: params })
//         .then((res) => res.data);
//     },
//   });
// };

// 채팅방 채팅 기록 조회 (react query 무한 스크롤)
export const useChattingHistory = (room: string, id: number | null) => {
  return useInfiniteQuery<{
    result: ChatDataTypes[];
    prevId: number | null;
    isLast: boolean;
  }>({
    queryKey: queryKeys.chatting.chatHistory(room),
    queryFn: async () => {
      const params = id ? { room, id } : { room };
      const res = await axiosChatInstance.get(`${API.chat}/history`, {
        params: params,
      });
      return {
        result: res.data,
        prevId: res.data[0].id,
        isLast: res.data.length === 0,
      };
    },
    getPreviousPageParam: (firstPage) => {
      firstPage.prevId;
    }, //getPreviousPageParam 함수가 undefined가 아닌 다른 값을 반환하면 hasPreviousPage는 true
    // getNextPAgeParam 는 추가적으로 데이터를 fetch 하는 경우에, 두 번째 인수였던 콜백 함수가 반환한 값을 가져와서 사용할 수 있습니다. 따라서 위의 예제에서는 nextPage 를 객체에 담아서 반환했으므로, lastPage.nextPage 로 사용할 수 있습니다.
  });
};
