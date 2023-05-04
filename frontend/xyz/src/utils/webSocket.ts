import SockJS from "sockjs-client";

export const socket = new SockJS("http://xyz-gen.com/chat");

socket.onopen = () => {
  console.log("WebSocket connection established.");
};

socket.onclose = () => {
  console.log("WebSocket connection closed.");
};

socket.onerror = (error) => {
  console.error("WebSocket error:", error);
};
