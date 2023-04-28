"use client";

import Image from "next/image";
import React, { useState } from "react";
import arrowDownIcon from "../../../public/icons/arrow-down.svg";
import { AztTypes } from "@/types/memory";
import { options } from "@/constants/option";

interface DropDownProps {
  isAzt?: boolean;
  isCapsule?: boolean;
  iconSrc: string;
  aztList?: AztTypes[];
  currAzt?: AztTypes[];
  setCurrAzt?: React.Dispatch<React.SetStateAction<AztTypes[]>>;
  rangeOption?: string;
  setRangeOption?: React.Dispatch<React.SetStateAction<string>>;
}

function DropDown({
  isAzt,
  isCapsule,
  iconSrc,
  aztList,
  currAzt,
  setCurrAzt,
  rangeOption,
  setRangeOption,
}: DropDownProps) {
  const [toggle, setToggle] = useState<boolean>(false);
  const handleToggle = () => setToggle((prev) => !prev);
  const aztListForDropDown = aztList?.filter(
    (azt) => azt.aztSeq !== currAzt![0].aztSeq
  );

  const optionListForDropDown = Object.keys(options).filter(
    (opt) => opt !== rangeOption
  );

  const handleAzitClick = (selected: AztTypes[]) => {
    setCurrAzt!(selected);
    handleToggle();
  };

  const handleOptionClick = (selected: string) => {
    setRangeOption!(selected);
    handleToggle();
  };

  return (
    <div className="flex items-center w-full gap-3">
      <div className="flex-none">
        <img src={iconSrc} alt="화살표" width={20} />
      </div>
      <div className="relative grow rounded border border-black ">
        <div
          className="flex w-full h-full truncate leading-8 text-center"
          onClick={handleToggle}
        >
          {isAzt ? (
            <div className="grow">
              {currAzt![0]?.name.length > 25
                ? currAzt![0]?.name.slice(0, 25) + "..."
                : currAzt![0]?.name}
            </div>
          ) : (
            <div className="grow">
              {options[rangeOption as keyof typeof options]}
            </div>
          )}

          <div
            className={`flex-none ${
              isAzt ? "bg-yellow" : "bg-blue"
            } flex align-middle px-2 border-l border-black`}
          >
            <Image src={arrowDownIcon} alt="화살표" width={15} />
          </div>
        </div>
        {toggle && (
          <div className="absolute top-10 left-0 border border-black w-full bg-white z-10 divide-y divide-slate-700">
            {isAzt
              ? aztListForDropDown?.map((item, idx) => {
                  return (
                    <div
                      key={idx}
                      onClick={() => handleAzitClick([item])}
                      className="truncate text-center px-2 py-2"
                    >
                      {item.name}
                    </div>
                  );
                })
              : optionListForDropDown?.map((item, idx) => {
                  return (
                    <div
                      key={idx}
                      onClick={() => handleOptionClick(item)}
                      className="truncate text-center px-2 py-2"
                    >
                      {options[item as keyof typeof options]}
                    </div>
                  );
                })}
          </div>
        )}
      </div>
    </div>
  );
}

export default DropDown;
