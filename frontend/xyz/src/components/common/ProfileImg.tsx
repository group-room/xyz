"use client";
import Image from "next/image";

type ProfileImgProps = {
  imgSrc: string;
};

export default function ProfileImg({ imgSrc }: ProfileImgProps) {
  return (
    <div className="w-12">
      <img
        className="rounded-full overflow-hidden border border-pink p-1"
        src={imgSrc}
        alt="프로필 이미지"
        width={60}
        height={60}
      />
    </div>
  );
}
