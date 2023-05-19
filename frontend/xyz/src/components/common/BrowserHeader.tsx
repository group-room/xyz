import Image from "next/image";
import React from "react";
import Rectangle from "../../../public/icons/rectangle.svg";
import Close from "../../../public/icons/close.svg";

function BrowserHeader() {
  return (
    <div className="flex flex-row-reverse py-3 gap-2 pr-2 rounded-t-md fixed top-0 left-0 border border-black bg-blue w-full ">
      <div>
        <Image src={Close} alt="닫기" width={20} height={20} />
      </div>
      <div>
        <Image src={Rectangle} alt="최대화" width={20} height={20} />
      </div>
      <div className=" border-b-2 border-black w-5 "></div>
    </div>
  );
}

export default BrowserHeader;
