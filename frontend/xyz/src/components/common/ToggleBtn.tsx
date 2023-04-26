"use client";

import React, { useState } from "react";
import Image from "next/image";

type ButtonProps = {
  textL: string;
  textR: string;
  imgL?: string;
  imgR?: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

export default function ToggleBtn({
  textL,
  textR,
  imgL,
  imgR,
  value,
  onChange,
}: ButtonProps) {
  const [isClick, setIsClick] = useState(true);

  const handleChange = (v: boolean) => {
    onChange(v);
  };

  return (
    <div className="flex border-2 border-black rounded-md h-10">
      <div
        className={`flex w-1/2 items-center justify-center border-r-2 border-black ${
          isClick ? "bg-yellow" : ""
        }`}
        onClick={() => {
          setIsClick(true);
          handleChange(true);
        }}
      >
        {imgL ? (
          <div className="mr-2">
            <Image src={imgL} alt="이미지" width={20} height={20} />
          </div>
        ) : (
          ""
        )}
        {textL}
      </div>
      <div
        className={`flex w-1/2 items-center justify-center border-black ${
          !isClick ? "bg-yellow" : ""
        }`}
        onClick={() => {
          setIsClick(false);
          handleChange(false);
        }}
      >
        {imgR ? (
          <div className="mr-2">
            <Image src={imgR} alt="이미지" width={20} height={20} />
          </div>
        ) : (
          ""
        )}
        {textR}
      </div>
    </div>
  );
}
