"use client";

import { sendChat } from "@/app/api/chatting";
import ChatBubble from "@/components/chatting/ChatBubble";
import ChatHeader from "@/components/chatting/ChatHeader";
import ChatInput from "@/components/chatting/ChatInput";
import LoadingLottie from "@/components/lottie/Loading";
import { queryKeys } from "@/constants/queryKeys";
import {
  useChattingDetail,
  useChattingHistory,
} from "@/hooks/queries/chatting";
import { useAppSelector } from "@/hooks/redux";
import useInput from "@/hooks/useInput";
import { ChatDataTypes } from "@/types/chatting";
import { SlugProps } from "@/types/common";
import { timerSwal } from "@/utils/swalUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

function ChattingRoomPage({ params: { slug } }: SlugProps) {
  const [chatInput, onChangeChatInput, resetInputValue] = useInput("");
  const [chatData, setChatData] = useState<ChatDataTypes[]>([]);
  const loggedInUserSeq = useAppSelector(
    (state) => state.auth.userInfo?.userSeq
  );
  const chatDataRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    if (chatDataRef.current) chatDataRef.current.scrollIntoView();
  };
  const router = useRouter();

  // 채팅방 정보 조회
  const { data: chatroomDetailData } = useChattingDetail(slug);

  // 채팅 기록 조회 - GET
  const chatroomSeq = slug.toString();
  const { data: chatHistory, isLoading } = useChattingHistory(chatroomSeq);

  // 채팅방에 속한 유저 아닐 시 채팅방 목록으로 이동
  useLayoutEffect(() => {
    if (
      chatroomDetailData &&
      chatroomDetailData.members.find(
        (member) => member.userSeq === loggedInUserSeq
      ) === undefined
    ) {
      router.push("/chatting");
    }
  }, []);

  // 스크롤 최하단으로 이동
  useEffect(() => {
    scrollToBottom();
  }, [chatData]);

  useEffect(() => {
    if (chatHistory) {
      setChatData(chatHistory);
    }
    scrollToBottom();
  }, [chatHistory]);

  // 채팅 실시간 조회 - SSE
  useEffect(() => {
    const eventSource = new EventSource(
      `https://xyz-gen.com/chat/stream-sse?room=${slug}`
    );

    eventSource.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(chatData.concat(message));
      const sortedChatData = chatData
        .concat(message)
        .sort((a, b) => a.id - b.id);
      setChatData(sortedChatData);
      scrollToBottom();
    };

    return () => {
      eventSource.close();
    };
  }, [chatData]);

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
      timerSwal("채팅을 입력해주세요");
      return;
    }
    useSendChatMutation.mutate();
  };

  if (!chatroomDetailData)
    return (
      <div className="flex justify-center align-middle py-60">
        <LoadingLottie />
      </div>
    );

  if (chatroomDetailData && chatData) {
    const { name, type, aztSeq, userSeq, members } = chatroomDetailData;

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
              members={members}
              isMine={chat.name === loggedInUserSeq?.toString()}
            />
          ))}
          <div ref={chatDataRef}></div>
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
