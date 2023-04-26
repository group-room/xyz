"use client";

import React, { useState, useEffect } from "react";
import DateFilter from "@/components/memory/DateFilter";
import AztFilter from "@/components/memory/AztFilter";
import KakaoMap from "@/components/memory/KakaoMap";
import MemoryCreateBtn from "@/components/memory/MemoryCreateBtn";

export type AztTypes = {
  aztSeq?: number | null;
  name: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  chatSeq?: string;
};

function MemoryPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [aztList, setAztList] = useState<AztTypes[]>([
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

  // 전체보기 옵션
  const seeAllOption = [{ name: "전체 아지트 보기", aztSeq: null }];
  // 셀렉트박스 내 들어갈 초기값 설정
  const [currAzt, setCurrAzt] = useState<AztTypes[]>(seeAllOption);

  // 토글설정은 false 로 셀렉트 박스를 닫아놓기
  const [toggle, setToggle] = useState<boolean>(false);
  const handleTitleClick = () => setToggle((prev) => !prev);
  const handleItemClick = (currAztSeq: number | null) => {
    if (currAztSeq == null) {
      setCurrAzt(seeAllOption);
    } else {
      setCurrAzt(aztList.filter((azt) => azt.aztSeq === currAztSeq));
    }
    handleTitleClick();
  };
  const handleMarkerChange = (date: Date) => setSelectedDate(date);

  useEffect(() => {
    // TODO: 그룹 목록 불러오기
    // TODO: 추억 목록 불러오기
    // TODO: 선택 날짜 / currAzt / 현재 or 마커 위치 변경되면 추억 목록 다시 조회하기
  }, []);

  return (
    <section>
      <div className="flex flex-row justify-between gap-2 mb-3">
        <DateFilter
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          handleMarkerChange={handleMarkerChange}
        />
        <AztFilter
          aztList={aztList}
          currAzt={currAzt}
          toggle={toggle}
          handleTitleClick={handleTitleClick}
          handleItemClick={handleItemClick}
          seeAllOption={seeAllOption}
        />
      </div>
      <KakaoMap />
      <MemoryCreateBtn />
    </section>
  );
}

export default MemoryPage;
