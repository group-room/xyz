'use client'

import React, {useState} from 'react';


type ButtonProps = {
  textL: string;
  textR: string;
};

export default function ToggleBtn({textL, textR} : ButtonProps) {
  const [isClick, setIsClick] = useState(false);

  return (
    <div className="flex border-2 border-black rounded-md h-10">
      <div className={`flex w-1/2 items-center justify-center border-r-2 border-black ${isClick ? "bg-yellow" : ""}` } onClick={() => setIsClick(true)}>{textL}</div>
      <div className={`flex w-1/2 items-center justify-center border-black ${!isClick ? "bg-yellow" : ""}` } onClick={() => setIsClick(false)}>{textR}</div>
    </div>
  );
}

