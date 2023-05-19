"use client";

import React from "react";
import arrowDownIcon from "../../../public/icons/arrow-down.svg";
import Image from "next/image";
import { AztTypes } from "@/types/azt";

interface AztFilterProps {
  aztList: AztTypes[];
  currAzt: AztTypes[];
  toggle: boolean;
  handleToggle: () => void;
  handleItemClick: (currAztSeq: number | null) => void;
  seeAllOption: AztTypes[];
}

function AztFilter({
  aztList,
  currAzt,
  toggle,
  handleToggle,
  handleItemClick,
  seeAllOption,
}: AztFilterProps) {
  const aztListForDropdown =
    currAzt[0].aztSeq === null
      ? aztList
      : seeAllOption
          .concat(aztList)
          .filter((azt) => azt.aztSeq !== currAzt[0]?.aztSeq);

  return (
    <div className="relative basis-8/12 border border-black shadow-md cursor-pointer">
      <div
        className="flex w-full h-full truncate leading-8 text-center"
        onClick={handleToggle}
      >
        <div className="grow">
          {currAzt.length === 1
            ? currAzt[0].name.length > 12
              ? currAzt[0].name.slice(0, 12) + "..."
              : currAzt[0].name
            : "전체 아지트 보기"}
        </div>
        <div className="flex justify-center items-center border-l border-black">
          <Image
            src={arrowDownIcon}
            alt="화살표"
            width="0"
            height="0"
            className={`w-[50%] h-auto`}
          />
        </div>
      </div>
      {toggle && aztListForDropdown && aztListForDropdown.length > 0 && (
        <div className="absolute top-10 left-0 border border-black w-full bg-white z-10 divide-y divide-slate-700 shadow-md">
          {/* <DropDown /> */}
          {aztListForDropdown?.map((item, idx) => {
            return (
              <div
                key={idx}
                onClick={() => handleItemClick(item?.aztSeq!)}
                className="truncate text-center px-2 py-2"
              >
                {item.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AztFilter;
