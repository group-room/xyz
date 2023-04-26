export type AztTypes = {
  aztSeq?: number | null;
  name: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  chatSeq?: string;
};

export type PositionTypes = {
  lat: number;
  lng: number;
};

export type MemoriesTypes = {
  memorySeq: number;
  memoryImage: string;
  accessibility: string;
  aztSeq: number;
  aztName: string;
  date: string;
  latitude: number;
  longitude: number;
  location: string;
};

export interface KakaoMapProps {
  height?: number;
  position: PositionTypes;
  setPosition: React.Dispatch<React.SetStateAction<PositionTypes>>;
  currLocation: PositionTypes;
  setCurrLocation: React.Dispatch<React.SetStateAction<PositionTypes>>;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  locations?: MemoriesTypes[];
}
