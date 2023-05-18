"use client";

import React, { useState } from "react";
import { useAppSelector } from "@/hooks/redux";
import { useMyPhoto } from "@/hooks/queries/myphoto";
import { useRouter } from "next/navigation";
import { queryKeys } from "@/constants/queryKeys";
import Btn from "../common/Btn";
import Img1 from "../../../public/images/background/bg (1).png";
import Img2 from "../../../public/images/background/bg (2).png";
import Img3 from "../../../public/images/background/bg (3).png";
import Img4 from "../../../public/images/background/bg (4).png";
import Img5 from "../../../public/images/background/bg (5).png";
import Img6 from "../../../public/images/background/bg (6).png";
import Img7 from "../../../public/images/background/bg (7).png";
import Img8 from "../../../public/images/background/bg (8).png";
import Img9 from "../../../public/images/background/bg (9).png";
import Img10 from "../../../public/images/background/bg (10).png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMyPhotoFilter } from "@/app/api/myphoto";
import Image from "next/image";
import LogoImg from "../../../public/images/logo.svg";

interface MyPhotoEditProps {
  userSeq: number;
}

function MyPhotoEdit({ userSeq }: MyPhotoEditProps) {
  const images = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9, Img10];
  const router = useRouter();
  const state = useAppSelector((state) => state);
  const queryClient = useQueryClient();
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedImageNumber, setSelectedImageNumber] = useState<number>(20);

  const handleClick = (image: string, imageNumber: number) => {
    setSelectedImage(image);
    setSelectedImageNumber(imageNumber);
  };

  const { data: myPhotoList, isLoading: isMyPhotoLoading } =
    useMyPhoto(userSeq);

  const useCreateMyPhotoMutation = useMutation({
    mutationFn: () => createMyPhotoFilter(selectedImageNumber + 1),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.myroom.myroomFilter());
      alert("배경사진 변경 완료");
      router.push(`profile`);
    },
  });

  const PushToMyProfile = () => {
    useCreateMyPhotoMutation.mutate();
  };

  return (
    <div>
      <div className="flex justify-center object-cover relative pt-8">
        <img src={selectedImage} className="h-[238px] items-center" />
        <div className="absolute pt-2 max-w-[72%]">
          <img src={myPhotoList?.data} />
        </div>
        <div className="fixed top-[44%]">
          <Image
            src={LogoImg}
            alt="xyz 로고"
            width="0"
            height="0"
            className="w-[80px] h-[24px]"
          />
        </div>
      </div>

      <div className="flex justify-center p-7">
        <Btn
          btnFunc={PushToMyProfile}
          bgColor="pink"
          text="꾸미기 끝!"
          className="text-lg py-2 px-4"
        />
      </div>

      <div className="flex flex-wrap">
        {images.map((image, index) => (
          <div
            key={index}
            className={`w-1/5 p-2 cursor-pointer ${
              selectedImage === image.src ? "w-1/2" : ""
            }`}
            onClick={() => handleClick(image.src, index)}
          >
            <img
              src={image.src}
              alt="Image"
              className={`w-full rounded-lg ${
                selectedImage === image.src ? "border-4 border-blue-500" : ""
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPhotoEdit;
