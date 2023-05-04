import { ChatMemberType, MessageType } from "@/types/chat";
import React from "react";

interface ChatPropTypes {
  chatLog: MessageType[];
  currUser: ChatMemberType;
}

function Chat({ chatLog, currUser }: ChatPropTypes) {
  const formattingTimestamp = (time: string) => {
    const date = new Date(time);
    let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    let min =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return `${hour}:${min}`;
  };

  return (
    <div className="chat-middle">
      {chatLog.map((msg, idx) => (
        <li
          key={idx}
          className={`chat-bubble ${
            msg.nickname === currUser.nickname ? "send" : "receive"
          }`}
        >
          <span>{msg.nickname}</span>
          <p>{msg.message}</p>
          <span>{formattingTimestamp(msg.time)}</span>
        </li>
      ))}
    </div>
  );
}

export default Chat;
