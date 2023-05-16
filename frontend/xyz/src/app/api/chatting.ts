import { API } from "@/constants/queryKeys";
import { axiosChatInstance } from "./instance";

const CHAT = API.chat;

// 채팅 전송
export const sendChat = (room: string, name: string, text: string) => {
  return axiosChatInstance.post(`/${CHAT}/message`, { room, name, text });
};
