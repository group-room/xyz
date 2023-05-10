export type CapsuleAztTypes = {
  aztImage?: string;
  tcSeq: number;
  aztSeq?: number;
  aztName: string;
  openStatus?: string;
  openStart?: Date;
  openEnd?: Date;
  updatedAt?: string;
  location?: string;
  requiredCnt?: number;
  openCnt?: number | null;
};

export type CoordinateTypes = {
  address_name: string;
  b_code: string;
  h_code: string;
  main_address_no: string;
  mountain_yn: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_h_name: string;
  region_3depth_name: string;
  sub_address_no: string | null;
  x: string;
  y: string;
};
