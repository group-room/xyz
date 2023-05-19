"use client";

import MyPhotoCreate from "@/components/profile/MyPhotoCreate";
import React from "react";
import CameraImg from "../../../../../../public/icons/add-camera.svg";
import Image from "next/image";

function MyPhotoCreatepage() {
  return (
    <div>
      <div className="flex gap-3 item-center justify-center text-xl border p-3 border-black bg-blue rounded mt-20">
        {/* <Image
          src={CameraImg}
          alt="xyz 로고"
          width="0"
          height="0"
          className="w-10 h-6"
        /> */}
        대문 사진 꾸미기
      </div>
      <MyPhotoCreate />
    </div>
  );
}

export default MyPhotoCreatepage;
