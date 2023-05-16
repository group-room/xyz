export const API = {
  user: "user",
  memory: "memory",
  capsule: "timecapsule",
  azt: "azt",
  chat: "chat",
  chatroom: "chat-room",
  myroom: "myroom",
  friend: "friend",
  notification: "notification",
};

export const KEYS = {
  user: [API.user],
  memory: [API.memory],
  capsule: [API.capsule],
  azt: [API.azt],
  chat: [API.chat],
  chatroom: [API.chatroom],
  myroom: [API.myroom],
  friend: [API.friend],
  notification: [API.notification],
};

export const queryKeys = {
  user: {
    userOnly: () => [...KEYS.user],
    userList: (userSeq?: number) => [...KEYS.user, { userSeq }],
    visitor: (userSeq?: number) => [...KEYS.user, "visitor"],
    myVisitorList: (userSeq?: number) => [...KEYS.user, "visitor", { userSeq }],
    // mymemoryList: (memory: string) => [...KEYS.user, { memory }],
  },

  memory: {
    memoryList: (
      date: string | null,
      aztSeq?: number,
      latitude?: number,
      longitude?: number
    ) => [...KEYS.memory, { date }, { aztSeq }, { latitude }, { longitude }],
    memoryDetail: (memorySeq: number) => [...KEYS.memory, { memorySeq }],
    myMemoryList: () => [...KEYS.memory, "mymemories"],
  },
  azt: {
    aztList: () => [...KEYS.azt],
    aztInfo: (aztSeq: number) => [...KEYS.azt, { aztSeq }],
    aztAvailableFriendList: (aztSeq: number) => [
      ...KEYS.azt,
      ...KEYS.friend,
      "all",
      { aztSeq },
    ],
  },
  capsule: {
    aztCapsuleList: (aztSeq: number) => [...KEYS.capsule, { aztSeq }],
    capsuleList: (tcSeq?: number) => [...KEYS.capsule, { tcSeq }],
    capsuleDetail: (tcSeq?: string) => [...KEYS.capsule, { tcSeq }],
    openCapsuleList: () => [...KEYS.capsule, "openlist"],
    myCapsuleList: () => [...KEYS.capsule, "mylist"],
  },
  friend: {
    friendList: (isBlock: boolean) => [...KEYS.friend, { isBlock }],
    searchList: (check: boolean, keyword: string) => [
      ...KEYS.friend,
      { check },
      { keyword },
    ],
  },
  notification: {
    notificationList: (type: string) => [...KEYS.notification, { type }],
    unReadNotification: () => [...KEYS.notification],
  },
  chatting: {
    chatroomList: () => [...KEYS.chatroom],
    chatroomDetail: (chatSeq: number) => [...KEYS.chatroom, { chatSeq }],
    chatHistory: (room: string) => [...KEYS.chat, "history", { room }],
  },
};
