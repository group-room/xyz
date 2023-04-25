'use client'

import { BgColors } from "@/constants/style";
import React from "react";

type BtnProps = {
  width: stirng;
  bgColor: string;
  text: string;
  btnFunc: () => void;
};

/**
 *
 * @param width 버튼 너비
 * @param bgColor 배경색
 * @param text 버튼 텍스트
 * @param btnFunc 클릭시 실행할 함수
 */

function Btn({ width, bgColor, text, btnFunc }: BtnProps) {
  return (
    <button
      type="button"
      onClick={btnFunc}
      className={`${width} ${BgColors[bgColor]} rounded px-3 py-1 drop-shadow-md border border-black`}
    >
      {text}
    </button>
  );
}

export default Btn;
