export interface ChattingRoomListTypes {
  sequence: number;
  name: string;
  image: string;
  type: "azt" | "friend";
  count?: number; // azt일 경우만 count 넘겨줌
  aztSeq: number | null;
  userSeq: number | null; // aztSeq, userSeq 둘 중 하나는 null
}
