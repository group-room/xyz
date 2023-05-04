export type MessageType = {
  userSeq: number;
  nickname: string;
  profileImage: string;
  message: string;
  time: string;
};

export type ChatMemberType = {
  sequence: number;
  nickname: string;
  profileImage: string;
};

export type ChatDataType = {
  chatSeq: number;
  chatName: string;
  chatImage: string;
  members: ChatMemberType[];
  chatLog: MessageType[];
};
