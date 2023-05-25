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
import { useInView } from "react-intersection-observer";

function ChattingRoomPage({ params: { slug } }: SlugProps) {
  const [chatInput, onChangeChatInput, resetInputValue] = useInput("");
  const [chatData, setChatData] = useState<ChatDataTypes[]>([]); // 채팅 메시지 데이터
  const loggedInUserSeq = useAppSelector(
    (state) => state.auth.userInfo?.userSeq
  );
  const chatDataRef = useRef() as React.MutableRefObject<HTMLDivElement>; // 바닥으로 스크롤 위한 Ref
  const isSecondRendered = useRef(false); //  두번째 렌더링 여부
  const scrollToBottom = () => {
    if (chatDataRef.current) chatDataRef.current.scrollIntoView();
  };
  const router = useRouter();

  const [chatTopRef, inView] = useInView(); // 무한 스크롤 위한 Ref'
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // 채팅방 정보 조회
  const { data: chatroomDetailData } = useChattingDetail(slug);

  // 채팅 기록 조회 - GET
  const chatroomSeq = slug.toString();
  const {
    data: chatHistoryData,
    fetchPreviousPage,
    hasPreviousPage,
    isFetchingPreviousPage,
  } = useChattingHistory(chatroomSeq);

  useEffect(() => {
    // 채팅방에 속한 유저 아닐 시 채팅방 목록으로 이동
    if (
      chatroomDetailData &&
      chatroomDetailData.members.find(
        (member) => member.userSeq === loggedInUserSeq
      ) === undefined
    ) {
      router.push("/chatting");
    }

    if (!isSecondRendered.current) {
      isSecondRendered.current = true;
    }
  }, []);

  useEffect(() => {
    // 스크롤 바닥으로 내리기 (두번째 렌더링때)
    if (isSecondRendered.current && chatData && chatContainerRef.current) {
      console.log(chatData);
      scrollToBottom();
      console.log(isSecondRendered.current);
      isSecondRendered.current = false;
    }
  }, [chatData]);

  useEffect(() => {
    // 채팅 기록 조회 후 채팅 데이터에 추가
    if (chatHistoryData && isSecondRendered.current) {
      setChatData((prev) => [...chatHistoryData.pages[0].result, ...prev]);
    }
  }, [isSecondRendered.current, chatHistoryData]);

  useEffect(() => {
    // 최상단 스크롤했을 때 이전 채팅 기록 조회 (무한스크롤)
    if (inView && hasPreviousPage && !isSecondRendered.current) {
      console.log("상단 스크롤");
      fetchPreviousPage();
      if (chatHistoryData) {
        const currChatData: ChatDataTypes[] = [];
        chatHistoryData.pages[0].result.forEach((chat) => {
          if (
            chatData.find((chatData) => chatData.id === chat.id) === undefined
          ) {
            currChatData.push(chat);
          }
        });

        setChatData((prev) => [...currChatData, ...prev]);
      }
      console.log(chatHistoryData);
    }
  }, [chatHistoryData, inView, hasPreviousPage, fetchPreviousPage]);

  // 채팅 실시간 조회 - SSE
  useEffect(() => {
    const eventSource = new EventSource(
      `https://xyz-gen.com/chat/stream-sse?room=${slug}`
    );

    eventSource.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const sortedChatData = chatData
        .concat(message)
        .sort((a, b) => a.id - b.id);
      setChatData(sortedChatData);
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
      scrollToBottom();
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
      <div className="w-full" ref={chatContainerRef}>
        <ChatHeader
          name={name}
          type={type}
          userSeq={userSeq}
          aztSeq={aztSeq}
          count={members.length}
        />
        <div className="pt-14">
          <div ref={chatTopRef} />
          {chatData?.map((chat, idx) => (
            <ChatBubble
              key={idx}
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
