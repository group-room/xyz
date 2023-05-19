"use client";

import Image from "next/image";
import React, { useState } from "react";
import arrowDownIcon from "../../../public/icons/arrow-down.svg";
import { MEMORY_OPTIONS } from "@/constants/memoryOption";
import { AztTypes } from "@/types/azt";

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
  const aztListForDropDown = aztList?.filter(
    (azt) => azt.aztSeq !== currAzt![0].aztSeq
  );

  const handleToggle = () => {
    if (
      (isAzt && currAzt?.length === 0) ||
      (aztListForDropDown && aztListForDropDown?.length < 1)
    )
      return;
    setToggle((prev) => !prev);
  };

  const optionListForDropDown = Object.keys(MEMORY_OPTIONS).filter(
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
        <Image
          src={iconSrc}
          alt="people"
          width="0"
          height="0"
          className="w-[17px] h-auto"
        />
      </div>
      <div className="relative grow rounded border border-black cursor-pointer">
        <div
          className="flex w-full h-full truncate leading-8 text-center"
          onClick={handleToggle}
        >
          {isAzt ? (
            currAzt?.length ? (
              <div className="grow">
                {currAzt![0]?.name.length > 25
                  ? currAzt![0]?.name.slice(0, 25) + "..."
                  : currAzt![0]?.name}
              </div>
            ) : (
              <div className="grow">아지트를 먼저 생성해주세요</div>
            )
          ) : (
            <div className="grow">
              {MEMORY_OPTIONS[rangeOption as keyof typeof MEMORY_OPTIONS]}
            </div>
          )}
          {isAzt && currAzt && currAzt?.length < 1 ? null : (
            <div
              className={`flex-none ${
                isAzt ? "bg-yellow" : "bg-blue"
              } flex align-middle px-2 border-l border-black`}
            >
              <Image
                src={arrowDownIcon}
                alt="화살표"
                width="0"
                height="0"
                className="w-[17px] h-auto"
              />
            </div>
          )}
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
                      {MEMORY_OPTIONS[item as keyof typeof MEMORY_OPTIONS]}
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
