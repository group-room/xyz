import { BgColors } from "@/constants/style";
import React from "react";

type ContainerProps = {
  title?: boolean;
  titleBgColor?: string;
  titleText?: string;
  children: React.ReactNode;
};

/**
 *
 * @param title 제목여부
 * @param titleBgColor 제목영역 색상
 * @param titleText 제목
 * @param children 내용 부분에 넣을 element
 */

function Container({
  title,
  titleBgColor,
  titleText,
  children,
}: ContainerProps) {
  return (
    <div className="border rounded border-black">
      {title && (
        <div
          className={`${BgColors[titleBgColor]} px-2 py-1 rounded-t border-black border-b`}
        >
          {titleText}
        </div>
      )}
      <div className="p-2">{children}</div>
    </div>
  );
}

export default Container;
