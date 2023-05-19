"use client";

import { BgColors } from "@/constants/style";
import React from "react";

interface BtnProps {
  bgColor: string;
  text: string;
  btnFunc: () => void;
  width?: string;
  padding?: string;
  className?: string;
}

/**
 *
 * @param bgColor 배경색
 * @param text 버튼 텍스트
 * @param btnFunc 클릭시 실행할 함수
 * @param width 버튼 너비
 * @param padding 버튼 패딩
 * @param className 기타 클래스
 */

function Btn({ bgColor, text, btnFunc, width, padding, className }: BtnProps) {
  return (
    <button
      type="button"
      onClick={btnFunc}
      className={`${BgColors[bgColor]} ${width} ${padding} ${className} rounded px-3 py-1 drop-shadow-md border border-black`}
    >
      {text}
    </button>
  );
}

export default Btn;
