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
};
