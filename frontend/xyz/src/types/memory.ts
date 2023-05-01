export type AztTypes = {
  aztSeq?: number | null;
  name: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  chatSeq?: string;
};

export type MemoryListParams = {
  date: string;
  aztSeq?: number;
  latitude?: number;
  longitude?: number;
};

export type PositionTypes = {
  lat: number;
  lng: number;
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
}

export interface Photo {
  file: File;
  preview: string;
}

export type PhotoMetadata = {
  location?: {
    latitude: number;
    longitude: number;
  };
  dateTaken: string;
};
