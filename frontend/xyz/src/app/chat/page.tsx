"use client";
import React, { useEffect, useRef, useState } from "react";
import Chat from "@/components/chat/Chat";
import ChatInput from "@/components/chat/ChatInput";
import { stompClient } from "@/utils/stomp";
const ROOM_SEQ = 1;

function ChatPage() {
  // const [messages, setMessages] = useState([]);
  // const [user, setUser] = useState(null);
  // const client = useRef({});
  // const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  const publish = (message: string) => {
    if (!stompClient.connected) {
      return;
    }

    stompClient.publish({
      destination: "/send",
      // body: JSON.stringify({ roomSeq: ROOM_SEQ, message }),
      body: JSON.stringify({ message }),
    });

    setMessage("");
  };

  // const onMessageReceived = (msg) => {
  //   console.log("New Message Received!!", msg);
  //   setMessages(messages.concat(msg));
  // };

  // const handleLoginSubmit = (name) => {
  //   setUser({ name: name, color: randomColor() });
  // };

  // const handleMessageSubmit = (msg) => {
  //   chatApi
  //     .sendMessage(user.name, msg)
  //     .then((res) => {
  //       console.log("sent", res);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  // const randomColor = () => {
  //   return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
  // };

  return (
    // <>
    //   <div className="chat-container">
    //     <Chat chatLog={messages} currUser={user} />
    //     <ChatInput handleOnSubmit={handleMessageSubmit} />
    //   </div>
    // </>

    <div>
      {/* {chatMessages && chatMessages.length > 0 && (
        <ul>
          {chatMessages.map((_chatMessage, index) => (
            <li key={index}>{_chatMessage.message}</li>
          ))}
        </ul>
      )} */}
      <div>
        <input
          type={"text"}
          placeholder={"message"}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          // onKeyPress={(e) => e.which === 13 && publish(message)}
        />
        <button onClick={() => publish(message)}>send</button>
      </div>
    </div>
  );
}

export default ChatPage;
