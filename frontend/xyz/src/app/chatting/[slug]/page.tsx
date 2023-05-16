"use client";

import { sendChat } from "@/app/api/chatting";
import ChatBubble from "@/components/chatting/ChatBubble";
import ChatHeader from "@/components/chatting/ChatHeader";
import ChatInput from "@/components/chatting/ChatInput";
import { queryKeys } from "@/constants/queryKeys";
import {
  useChattingDetail,
  useChattingHistory,
} from "@/hooks/queries/chatting";
import { useAppSelector } from "@/hooks/redux";
import useInput from "@/hooks/useInput";
import { ChatDataTypes } from "@/types/chatting";
import { SlugProps } from "@/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

function ChattingRoomPage({ params: { slug } }: SlugProps) {
  const [chatInput, onChangeChatInput, resetInputValue] = useInput("");
  const [chatData, setChatData] = useState<ChatDataTypes[]>([]);
  const loggedInUserSeq = useAppSelector(
    (state) => state.auth.userInfo?.userSeq
  );

  // 채팅방 정보 조회
  const { data: chatroomDetailData } = useChattingDetail(slug);

  // 채팅 기록 조회 - GET
  const chatroomSeq = slug.toString();
  const { data: chatHistory, isLoading } = useChattingHistory(chatroomSeq);
  if (chatHistory) console.log(chatHistory);

  useEffect(() => {
    if (chatHistory) {
      setChatData(chatHistory);
    }
  }, [chatHistory]);

  // 채팅 실시간 조회 - SSE
  useEffect(() => {
    const eventSource = new EventSource(
      `https://xyz-gen.com/chat/stream-sse?room=${slug}`
    );

    eventSource.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(chatData.concat(message));
      setChatData((prev) => [...prev, message]);
      console.log(chatData);
    };

    return () => {
      eventSource.close();
    };
  }, [chatData, chatHistory]);

  // 채팅 전송
  const queryClient = useQueryClient();
  const useSendChatMutation = useMutation({
    mutationFn: () =>
      sendChat(chatroomSeq, loggedInUserSeq!.toString(), chatInput),
    onSuccess: () => {
      queryClient.invalidateQueries(
        queryKeys.chatting.chatHistory(chatroomSeq)
      );
      resetInputValue();
    },
  });

  const handleSumbitChat = () => {
    if (chatInput.length < 1) {
      alert("채팅을 입력해주세요");
      return;
    }
    useSendChatMutation.mutate();
  };

  if (!chatroomDetailData) return <div>로딩중...</div>;

  if (chatroomDetailData && chatData) {
    const { name, type, aztSeq, userSeq, members } = chatroomDetailData;
    console.log(members);
    return (
      <div className="w-full">
        <ChatHeader
          name={name}
          type={type}
          userSeq={userSeq}
          aztSeq={aztSeq}
          count={members.length}
        />
        <div className="pt-14">
          {chatData.map((chat) => (
            <ChatBubble
              key={chat.id}
              chat={chat}
              nickname={
                members.find(
                  (member) => member.userSeq.toString() === chat.name
                )!.nickname
              }
              profileImg={
                members.find(
                  (member) => member.userSeq.toString() === chat.name
                )!.profileImage
              }
            />
          ))}
        </div>
        <ChatInput
          chatInput={chatInput}
          onChangeChatInput={onChangeChatInput}
          handleSumbitChat={handleSumbitChat}
        />
      </div>
    );
  }
}

export default ChattingRoomPage;
