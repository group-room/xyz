export const API = {
  user: "user",
  memory: "memory",
  capsule: "timecapsule",
  azt: "azt",
  chat: "chat",
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
  },
  azt: {
    aztList: () => [...KEYS.azt],
    aztInfo: (aztSeq: number) => [...KEYS.azt, { aztSeq }],
  },
  capsule: {
    aztCapsuleList: (aztSeq: number) => [...KEYS.capsule, { aztSeq }],
  },
  friend: {
    friendList: () => [...KEYS.friend],
    searchList:(check:boolean, keyword: string) => [...KEYS.friend, {check}, {keyword}],
  },
};
