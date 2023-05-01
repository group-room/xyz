"use client";

import React, { useState, useEffect } from "react";
import DateFilter from "@/components/memory/DateFilter";
import AztFilter from "@/components/memory/AztFilter";
import KakaoMap from "@/components/memory/KakaoMap";
import MemoryCreateBtn from "@/components/memory/MemoryCreateBtn";
import { AztTypes, MemoriesTypes, PositionTypes } from "@/types/memory";
import MemoryItem from "@/components/memory/MemoryItem";
import { useMemoryList } from "../api/queries/memory";

function MemoryPage() {
  // 달력에서 선택된 날짜
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
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

  // 날짜 형식변환
  const dateObj = new Date(selectedDate);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();
  const newDateString = `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day}T${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  const {
    data: memoryList,
    isLoading,
    error,
  } = useMemoryList(
    newDateString,
    currAzt[0].aztSeq!,
    +position.lat.toFixed(7),
    +position.lng.toFixed(7)
  );

  if (!isLoading) {
    console.log(memoryList);
  }

  useEffect(() => {
    // TODO: 그룹 목록 불러오기
    setAztList([
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

    // TODO: 추억 목록 불러오기

    // getMemories(
    //   newDateString,
    //   currAzt[0].aztSeq!,
    //   +position.lat.toFixed(7),
    //   +position.lng.toFixed(7)
    // )
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setMemories([
    //       {
    //         memorySeq: 0,
    //         memoryImage: "/images/photos/img2.jpg",
    //         accessibility: "PUBLIC",
    //         aztSeq: 0,
    //         aztName: "그룹명",
    //         date: "2023-04-28",
    //         latitude: 37.513,
    //         longitude: 127.02929,
    //         location: "서울시 강남구 논현동 127-2",
    //         likeCnt: 36,
    //         isLiked: true,
    //         commentCnt: 21,
    //       },
    //       {
    //         memorySeq: 1,
    //         memoryImage: "/images/photos/img2.jpg",
    //         accessibility: "GROUP",
    //         aztSeq: 0,
    //         aztName: "그룹명",
    //         date: "2023-04-28",
    //         latitude: 37.514,
    //         longitude: 127.0293,
    //         location: "서울시 강남구 논현동 127-2",
    //         likeCnt: 36,
    //         isLiked: false,
    //         commentCnt: 21,
    //       },
    //       {
    //         memorySeq: 2,
    //         memoryImage: "/images/photos/img2.jpg",
    //         accessibility: "GROUP",
    //         aztSeq: 0,
    //         aztName: "그룹명",
    //         date: "2023-04-28",
    //         latitude: 37.515,
    //         longitude: 127.02931,
    //         location: "서울시 강남구 논현동 127-2",
    //         likeCnt: 36,
    //         isLiked: true,
    //         commentCnt: 21,
    //       },
    //       {
    //         memorySeq: 3,
    //         memoryImage: "/images/photos/img2.jpg",
    //         accessibility: "GROUP",
    //         aztSeq: 0,
    //         aztName: "그룹명",
    //         date: "2023-04-28",
    //         latitude: 37.516,
    //         longitude: 127.02932,
    //         location: "서울시 강남구 논현동 127-2",
    //         likeCnt: 36,
    //         isLiked: false,
    //         commentCnt: 21,
    //       },
    //       {
    //         memorySeq: 4,
    //         memoryImage: "/images/photos/img2.jpg",
    //         accessibility: "GROUP",
    //         aztSeq: 0,
    //         aztName: "그룹명",
    //         date: "2023-04-28",
    //         latitude: 37.517,
    //         longitude: 127.02933,
    //         location: "서울시 강남구 논현동 127-2",
    //         likeCnt: 36,
    //         isLiked: false,
    //         commentCnt: 21,
    //       },
    //     ]);
    //   });
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
      {isLoading ? (
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
