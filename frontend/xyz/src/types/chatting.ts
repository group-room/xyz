import { UserTypes } from "./user";

export interface ChatBasicTypes {
  name: string;
  type: "azt" | "friend";
  aztSeq: number | null;
  userSeq: number | null; // aztSeq, userSeq 둘 중 하나는 null
}

export interface ChattingRoomListTypes extends ChatBasicTypes {
  sequence: number;
  image: string;
  count?: number; // azt일 경우만 count 넘겨줌
}

export interface ChattingRoomDetailTypes extends ChatBasicTypes {
  chatSeq: number;
  members: UserTypes[];
}

export interface ChatDataTypes {
  id: number;
  room: string;
  name: string; // useSeq
  text: string;
  time: string;
}
