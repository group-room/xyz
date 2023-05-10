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
    <div className="flex rounded h-10">
      <div
        className={`flex w-1/2 items-center justify-center rounded rounded-b-none  ${
          isClick
            ? "border border-b-0 border-black"
            : "bg-neutral-100 border-b border-black"
        }`}
        onClick={() => {
          setIsClick(true);
          handleChange(true);
        }}
      >
        {imgL ? (
          <div className="mr-2">
            <Image
              src={imgL}
              alt="이미지"
              width="0"
              height="0"
              className="w-full h-auto"
            />
          </div>
        ) : (
          ""
        )}
        {textL}
      </div>
      <div
        className={`flex w-1/2 items-center justify-center rounded rounded-b-none ${
          !isClick
            ? "border border-b-0 border-black"
            : "bg-neutral-100 border-b border-black"
        }`}
        onClick={() => {
          setIsClick(false);
          handleChange(false);
        }}
      >
        {imgR ? (
          <div className="mr-2">
            <Image src={imgR} alt="이미지" 
              width="0"
              height="0"
              className="w-full h-auto" />
          </div>
        ) : (
          ""
        )}
        {textR}
      </div>
    </div>
  );
}
