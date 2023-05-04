export const KEYS = {
  user: ["user"],
  memory: ["memory"],
  timecapsule: ["timecapsule"],
  azt: ["azt"],
  chat: ["chat"],
  myroom: ["myroom"],
  friend: ["friend"],
  notification: ["notification"],
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
    aztDetail: (aztSeq: number) => [...KEYS.azt, { aztSeq }],
  },
};
