import { BgColors } from "@/constants/style";
import React from "react";

interface BtnProps {
  bgColor: string;
  text: string;
  btnFunc: () => void;
}

/**
 *
 * @param bgColor 배경색
 * @param text 버튼 텍스트
 * @param btnFunc 클릭시 실행할 함수
 */

function Btn({ bgColor, text, btnFunc }: BtnProps) {
  return (
    <button
      type="button"
      onClick={btnFunc}
      className={`w-100 ${BgColors[bgColor]} rounded px-3 py-1 drop-shadow-md border border-black`}
    >
      {text}
    </button>
  );
}

export default Btn;
