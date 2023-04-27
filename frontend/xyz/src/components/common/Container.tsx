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
        // 💛 Build 시, TypeError 발생해서 default에 임의로 "yello" 넣음
          className={`${titleBgColor === undefined ? BgColors["yello"] : BgColors[titleBgColor]} px-2 py-1 rounded-t border-black border-b`}
        >
          {titleText}
        </div>
      )}
      <div className="p-2">{children}</div>
    </div>
  );
}

export default Container;
