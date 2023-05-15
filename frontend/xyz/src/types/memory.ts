export type MemoryListParams = {
  date: string | null;
  aztSeq?: number;
  latitude?: number;
  longitude?: number;
};

// 추억 메인 피드
export interface MemoriesTypes {
  memorySeq: number;
  memoryImage: string;
  accessibility: string;
  aztSeq: number;
  aztName: string;
  date: string;
  latitude: number;
  longitude: number;
  location: string;
  likeCnt: number;
  isLiked: boolean;
  commentCnt: number;
  // userName: string;
}

// 추억 상세
export interface MemoryTypes extends MemoriesTypes {
  files: {
    filePath: string;
    fileType: string;
  }[];
  content: string;
  userNickname: string;
  userSeq: number;
  comments: MemoryCommentTypes[];
}

// 추억 댓글
export interface MemoryCommentTypes {
  commentSeq: number;
  userSeq: number;
  nickname: string;
  profileImage: string;
  content: string;
  createdAt: string;
}

export interface KakaoMapProps {
  height?: number;
  position: PositionTypes;
  setPosition: React.Dispatch<React.SetStateAction<PositionTypes>>;
  currLocation: PositionTypes;
  setCurrLocation: React.Dispatch<React.SetStateAction<PositionTypes>>;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  locations?: MemoriesTypes[];
  isPhotoUpload?: boolean;
  isPhotoEdit?: boolean;
}

export type PhotoMetadata = {
  location?: {
    latitude: number;
    longitude: number;
  };
  dateTaken: string;
};

export type PositionTypes = {
  lat: number;
  lng: number;
};
