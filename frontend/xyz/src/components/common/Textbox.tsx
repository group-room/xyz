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
  firstClass?: string;
  secondClass?: string;
  textClass?: string;
  maintextClass?: string;
  children?: React.ReactNode;
};

function Textbox({
  icon,
  alt,
  text,
  maintext,
  bgColor,
  textColor,
  firstClass,
  secondClass,
  textClass,
  maintextClass,
  children,
}: TextboxProps) {
  return (
    <div
      className={` ${
        firstClass ? firstClass : " border border-black flex my-2 h-8"
      } ${
        bgColor ? (bgColor !== "retro" ? BgColors[bgColor] : "bg-retro") : ""
      } ${textColor ? TextColors[textColor] : ""} `}
    >
      <div
        className={` ${
          secondClass
            ? secondClass
            : "flex items-center justify-center mx-1 pr-1 border-black border-r h-full"
        } `}
      >
        <Image src={icon} alt={alt} width={16} height={16} />
        {text && (
          <div className={` ${textClass ? textClass : "ml-1"} `}>{text}</div>
        )}
      </div>
      <div
        className={` ${
          maintextClass
            ? maintextClass
            : "flex items-center justify-center px-1 h-auto"
        } `}
      >
        {maintext}
      </div>
      {children}
    </div>
  );
}

export default Textbox;
