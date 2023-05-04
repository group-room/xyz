import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const stompClient = new Client({
  brokerURL: "wss://www.xyz-gen.com/api/chat-room",
  // webSocketFactory: () => new SockJS("https://www.xyz-gen.com/api/chat-room"),
  // reconnectDelay: 5000,
  // heartbeatIncoming: 4000,
  // heartbeatOutgoing: 4000,
  // connectHeaders: {
  //   token: localStorage.getItem("token"),
  // },
  debug: (str) => {
    console.log(str);
  },
  onConnect(frame) {
    // connect후 실행
    console.log("STOMP client connected:", frame);
    console.log("STOMP client connected:", frame.headers["message"]);
    subscribe();
  },
  onStompError(frame) {
    console.error("STOMP error:", frame);
    console.error("STOMP error:", frame.headers["message"]);
    console.error("STOMP error:", frame.body);
  },
});

// 메시지 받아오기
const subscribe = () => {
  stompClient.subscribe("/chat-room/send", (message) => {});
};

// const publish = (message) => {
//   if (!stompClient.connected) {
//     return;
//   }

//   stompClient.publish({
//     destination: "/pub/chat",
//     body: JSON.stringify({ roomSeq: ROOM_SEQ, message }),
//   });

//   setMessage("");
// };

// const sendMessage = (content: string) =>
//   stompClient.publish({
//     destination: "/chat-room/send",
//     body: content,
//     headers: { priority: "9" },
//   });
