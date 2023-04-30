import React from "react";
import Image from "next/image";

type TextboxProps = {
  text?: string;
  icon: string;
  alt: string;
  maintext?: string;
};

function Textbox({ icon, alt, text, maintext }: TextboxProps) {
  return (
    <div className=" border-2 border-black flex h-8 mb-2 mr-1 ml-1 mt-2">
      <div className="flex items-center justify-center mx-1 pr-1 border-black border-r-2 h-full">
        <Image src={icon} alt={alt} width={20} height={20} />
        <div className="ml-1">{text}</div>
      </div>
      <div className={`flex items-center justify-center text-lg`}>
        {maintext}
      </div>
    </div>
  );
}

export default Textbox;
