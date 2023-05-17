"use client";

import { useAppSelector } from "@/hooks/redux";
import { useMyPhoto } from "@/hooks/queries/myphoto";

interface MyPhotoEditProps {
  userSeq: number;
}

function MyPhotoEdit({ userSeq }: MyPhotoEditProps) {
  const state = useAppSelector((state) => state);
  const { data: myPhotoList, isLoading: isMyPhotoLoading } =
    useMyPhoto(userSeq);
  return (
    <div>
      <img src={myPhotoList?.data} />
    </div>
  );
}

export default MyPhotoEdit;
