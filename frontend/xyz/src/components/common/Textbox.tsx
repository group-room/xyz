import React from "react";
import Image from "next/image";
import { BgColors, TextColors } from "@/constants/style";

type TextboxProps = {
  text?: string;
  icon: string;
  alt: string;
  maintext?: string | number;
  bgColor?: string;
  textColor?: string;
};

function Textbox({
  icon,
  alt,
  text,
  maintext,
  bgColor,
  textColor,
}: TextboxProps) {
  return (
    <div
      className={`border border-black flex h-8 mb-2 mt-2 ${
        bgColor ? BgColors[bgColor] : ""
      } ${textColor ? TextColors[textColor] : ""}`}
    >
      <div className="flex items-center justify-center mx-1 pr-1 border-black border-r h-full">
        <Image src={icon} alt={alt} width={16} height={16} />
        {text && <div className="ml-1">{text}</div>}
      </div>
      <div className={`flex items-center justify-center px-1 h-full`}>
        {maintext}
      </div>
    </div>
  );
}

export default Textbox;
