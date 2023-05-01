import { BgColors } from "@/constants/style";
import Image from "next/image";
import React from "react";
import ImageScroll from "./ImageScroll";

type ContainerProps = {
  title?: boolean;
  titleBgColor?: string;
  titleText?: string;
  titleImgSrc?: string;
  titleImgAlt?: string;
  children: React.ReactNode;
};

/**
 *
 * @param title 제목여부
 * @param titleBgColor 제목영역 색상
 * @param titleText 제목
 * @param titleImgSrc 제목 부분에 넣을 아이콘
 * @param titleImgAlt 제목 부분에 넣을 아이콘 alt값 (아이콘 넣을거면 필수!)
 * @param children 내용 부분에 넣을 element
 */

function Container({
  title,
  titleBgColor,
  titleText,
  titleImgSrc,
  titleImgAlt,
  children,
}: ContainerProps) {
  return (
    <div className="border rounded border-black">
      {title && (
        <div
          // 💛 Build 시, TypeError 발생해서 default에 임의로 "yellow" 넣음
          className={`${
            titleBgColor === undefined
              ? BgColors["yellow"]
              : BgColors[titleBgColor]
          } ${
            titleImgAlt ? "flex gap-x-1" : ""
          } px-2 py-1 rounded-t border-black border-b`}
        >
          {titleImgSrc && titleImgAlt && (
            <Image src={titleImgSrc} alt={titleImgAlt} width={15} height={12} />
          )}
          {titleText}
        </div>
      )}
      <div className="p-2">{children}</div>
    </div>
  );
}

export default Container;
