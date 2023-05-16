import React from "react";
import { ChatDataTypes } from "@/types/chatting";
import ProfileImg from "../common/ProfileImg";

interface ChatBubbleProps {
  chat: ChatDataTypes;
  nickname: string;
  profileImg: string;
  isMine: boolean;
}

function ChatBubble({ chat, nickname, profileImg, isMine }: ChatBubbleProps) {
  return (
    <div className="w-full mb-2">
      <div className={`chat ${isMine ? "chat-end" : "chat-start"}`}>
        <div className="chat-image avatar w-16">
          <ProfileImg imgSrc={profileImg} />
        </div>
        <div className="chat-header">
          {nickname}
          <time className="text-xs opacity-50"></time>
        </div>
        <div
          className={`chat-bubble ${
            isMine ? "bg-pink" : "bg-[#FBE2EB] text-gray-500"
          }`}
        >
          {chat.text}
        </div>
        <div className="chat-footer opacity-50">{chat.time.slice(11, 16)}</div>
      </div>
    </div>
  );
}

export default ChatBubble;
