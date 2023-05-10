"use client";

import React, { useState, useEffect } from "react";
import DateFilter from "@/components/memory/DateFilter";
import AztFilter from "@/components/memory/AztFilter";
import KakaoMap from "@/components/memory/KakaoMap";
import MemoryCreateBtn from "@/components/memory/MemoryCreateBtn";
import { MemoriesTypes, PositionTypes } from "@/types/memory";
import MemoryItem from "@/components/memory/MemoryItem";
import { useMemoryList } from "../../hooks/queries/memory";
import { convertDate } from "@/utils/dateUtils";
import { useAztList } from "@/hooks/queries/azt";
import { AztTypes } from "@/types/azt";

function MemoryPage() {
  // 달력에서 선택된 날짜
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // 아지트 목록
  const [aztList, setAztList] = useState<AztTypes[]>([]);
  // 아지트 필터 토글 설정
  const [toggle, setToggle] = useState<boolean>(false);
  // 아지트 전체보기 옵션
  const seeAllOption = [{ name: "전체 아지트 보기", aztSeq: null }];
  // 아지트 셀렉트박스 내 들어갈 초기값 설정
  const [currAzt, setCurrAzt] = useState<AztTypes[]>(seeAllOption);
  // 현재 위치
  const [currLocation, setCurrLocation] = useState<PositionTypes>({
    lat: 0,
    lng: 0,
  });
  // 마커 찍는 위치
  const [position, setPosition] = useState<PositionTypes>({ lat: 0, lng: 0 });
  // 현재 위치 or 마커 위치 주소로 변환한 것
  const [address, setAddress] = useState<string>("");
  // 조회된 추억 목록
  const [memories, setMemories] = useState<MemoriesTypes[]>([]);

  const handleToggle = () => setToggle((prev) => !prev);
  const handleItemClick = (currAztSeq: number | null) => {
    // 전체 아지트 보기가 디폴트
    if (currAztSeq == null) {
      setCurrAzt(seeAllOption);
    } else {
      setCurrAzt(aztList.filter((azt) => azt.aztSeq === currAztSeq));
    }
    handleToggle();
  };
  const handleDateChange = (date: Date) => setSelectedDate(date);

  const {
    data: memoryList,
    isLoading: isMemoryLoading,
    error,
  } = useMemoryList({
    date: convertDate(selectedDate),
    aztSeq: currAzt[0].aztSeq!,
    latitude: +position.lat.toFixed(7),
    longitude: +position.lng.toFixed(7),
  });

  const { data: aztData, isLoading: isAztLoading } = useAztList();

  useEffect(() => {
    if (!isAztLoading && aztData) {
      setAztList(aztData);
    }
  }, [selectedDate, currAzt, position]); // 선택 날짜 / currAzt / 현재 or 마커 위치 변경되면 추억 목록 다시 조회

  return (
    <section>
      <div className="flex flex-row justify-between gap-2 mb-3">
        <DateFilter
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          handleDateChange={handleDateChange}
        />
        <AztFilter
          aztList={aztList}
          currAzt={currAzt}
          toggle={toggle}
          handleToggle={handleToggle}
          handleItemClick={handleItemClick}
          seeAllOption={seeAllOption}
        />
      </div>
      <KakaoMap
        position={position}
        setPosition={setPosition}
        currLocation={currLocation}
        setCurrLocation={setCurrLocation}
        address={address}
        setAddress={setAddress}
        locations={memories}
      />
      <MemoryCreateBtn />
      {isMemoryLoading ? (
        "로딩중..."
      ) : (
        <div className="flex flex-col mt-4 gap-y-4">
          {memoryList?.map((memory, idx) => {
            return <MemoryItem memory={memory} key={idx} />;
          })}
        </div>
      )}
    </section>
  );
}

export default MemoryPage;
