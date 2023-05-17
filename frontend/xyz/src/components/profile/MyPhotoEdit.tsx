"use client";

import { useAppSelector } from "@/hooks/redux";
import { useMyPhoto } from "@/hooks/queries/myphoto";
import { useRouter } from "next/navigation";
import Btn from "../common/Btn";

interface MyPhotoEditProps {
  userSeq: number;
}

function MyPhotoEdit({ userSeq }: MyPhotoEditProps) {
  const router = useRouter();
  const state = useAppSelector((state) => state);
  const { data: myPhotoList, isLoading: isMyPhotoLoading } =
    useMyPhoto(userSeq);

  const PushToMyPhotoCreate = () => {
    router.push(`profile/${userSeq}/myphoto/create`);
  };

  return (
    <div className=" w-full h-full ">
      <div className="flex flex-col gap-3 bg-yellow w-full h-full">
        <div className="flex items-center justify-center p-4">
          <img src={myPhotoList?.data} />
        </div>
        <div className="flex items-center justify-center w-full pb-6">
          <Btn btnFunc={PushToMyPhotoCreate} bgColor="pink" text="사진찍기" />
        </div>
      </div>
    </div>
  );
}

export default MyPhotoEdit;
