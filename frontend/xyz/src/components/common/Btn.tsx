import React from "react";

type BtnProps = {
  bgColor: string;
  text: string;
  func: () => void;
};

/**
 *
 * @param bgColor 배경색
 * @param text 버튼 텍스트
 * @param func 클릭시 실행할 함수
 */

function Btn({ bgColor, text, func }: BtnProps) {
  const colors = {
    blue: "bg-blue",
    pink: "bg-pink",
    yellow: "bg-yellow",
  };

  return (
    <button
      type="button"
      onClick={func}
      className={`w-100 ${colors[bgColor]} rounded px-3 py-1 drop-shadow-md`}
      style={{ border: "1px solid black" }}
    >
      {text}
    </button>
  );
}

export default Btn;
