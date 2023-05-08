export interface AztTypes {
  aztSeq?: number | null;
  name: string;
  image?: string;
  updatedAt?: string;
  chatSeq?: string;
}

export interface AztMemberTypes {
  userSeq: number;
  nickname: string;
  identify: string;
  chatSeq: number;
  profileImage: string;
}

export interface AztInfoTypes extends AztTypes {
  createdAt: string;
  members: AztMemberTypes[];
}
