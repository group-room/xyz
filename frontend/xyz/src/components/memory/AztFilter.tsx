"use client";

import React, { useState, useEffect } from "react";
import arrowDownIcon from "../../../public/icons/arrow-down.svg";
import Image from "next/image";

type Azt = {
  aztSeq?: number;
  image?: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  chatSeq?: string;
};

function AztFilter() {
  const [aztList, setAztList] = useState<Azt[]>([
    {
      aztSeq: 0,
      image: "대표사진 경로",
      name: "그룹 이름1",
      createdAt: "생성시간",
      updatedAt: "수정시간",
      chatSeq: "채팅방시퀀스",
    },
    {
      aztSeq: 1,
      image: "대표사진 경로",
      name: "그룹 이름2",
      createdAt: "생성시간",
      updatedAt: "수정시간",
      chatSeq: "채팅방시퀀스",
    },
    {
      aztSeq: 2,
      image: "대표사진 경로",
      name: "그룹 이름33333333333333333333333333333333333333333333333333333333333333333333",
      createdAt: "생성시간",
      updatedAt: "수정시간",
      chatSeq: "채팅방시퀀스",
    },
  ]);

  // 셀렉트박스 내 들어갈 초기값 설정
  const [currAzt, setCurrAzt] = useState<Azt[]>([{ name: "전체 아지트 보기" }]);

  // 토글설정은 false 로 셀렉트 박스를 닫아놓자
  const [toggle, setToggle] = useState<boolean>(false);
  const handleTitleClick = () => setToggle((prev) => !prev);

  const handleItemClick = (currAztName: string) => {
    if (currAztName === "전체 아지트 보기") {
      setCurrAzt([{ name: "전체 아지트 보기" }]);
    } else {
      setCurrAzt(aztList.filter((azt) => azt.name === currAztName));
    }
    handleTitleClick();
  };

  useEffect(() => {
    // TODO: 그룹 목록 불러오기
    // TODO: currAzt 변경되면 조회 요청하기
  }, []);

  const DropDown = () => {
    if (currAzt[0].name === "전체 아지트 보기") {
      return (
        <>
          {aztList.map((item, idx) => {
            return (
              <div
                key={idx}
                onClick={() => handleItemClick(item.name)}
                className="truncate text-center px-2 py-2"
              >
                {item.name}
              </div>
            );
          })}
        </>
      );
    } else {
      return (
        <>
          {[{ name: "전체 아지트 보기" }]
            .concat(aztList)
            .filter((azt) => azt.aztSeq !== currAzt[0]?.aztSeq)
            .map((item, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => handleItemClick(item.name)}
                  className="truncate text-center px-2 py-2"
                >
                  {item.name}
                </div>
              );
            })}
        </>
      );
    }
  };

  return (
    <div className="relative basis-8/12 border border-black shadow-md">
      <div
        className="flex w-full h-full truncate leading-8 text-center"
        onClick={handleTitleClick}
      >
        <div className="grow">
          {currAzt.length === 1
            ? currAzt[0].name.length > 30
              ? currAzt[0].name.slice(0, 30) + "..."
              : currAzt[0].name
            : "전체 아지트 보기"}
        </div>
        <div className="flex align-middle px-2 border-l border-black">
          <Image src={arrowDownIcon} alt="화살표" width={15} />
        </div>
      </div>
      {toggle && (
        <div className="absolute top-10 left-0 border border-black w-full bg-white z-10 divide-y divide-slate-700 shadow-md">
          <DropDown />
        </div>
      )}
    </div>
  );
}

export default AztFilter;
