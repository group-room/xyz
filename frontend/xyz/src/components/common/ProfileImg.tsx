"use client";
import Image from "next/image";

type ProfileImgProps = {
  imgSrc: string;
  isAzt?: boolean;
};

export default function ProfileImg({ imgSrc, isAzt }: ProfileImgProps) {
  return (
    <div className="flex justify-center">
      <img
        className={`w-14 h-14 object-cover rounded-full border ${
          isAzt ? "border-blue" : "border-pink"
        } p-1`}
        src={imgSrc}
        alt="프로필 이미지"
      />
    </div>
  );
}
