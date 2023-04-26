import React from "react";

type TextboxProps = {
  text?: string;
  icon?: string;
};

function Textbox({ text, icon }: TextboxProps) {
  // /**
  //  *
  //  * @param title 제목여부
  //  * @param titleBgColor 제목영역 색상
  //  * @param titleText 제목
  //  * @param children 내용 부분에 넣을 element
  //  */

  return (
    <div className=" border-2 border-black flex">
      <div className="px-2 w-8 border-black border-r-2">
        <img src={icon} alt="" />
      </div>
      <div className={`pl-2`}>{text}</div>
    </div>
  );
}

export default Textbox;
