"use client";

import Btn from "@/components/common/Btn";
import KakaoMap from "@/components/memory/KakaoMap";
import { AztTypes, Photo, PhotoMetadata, PositionTypes } from "@/types/memory";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PhotoUpload from "@/components/timecapsule/PhotoUpload";
import DropDown from "@/components/memory/DropDown";
import { createMemory } from "@/app/api/memory";

export default function TimeCapsuleCreatePage() {
  const router = useRouter();
  const [currAzt, setCurrAzt] = useState<AztTypes[]>([]);
  const [aztList, setAztList] = useState<AztTypes[]>([]);
  const [rangeOption, setRangeOption] = useState<string>("PUBLIC");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currLocation, setCurrLocation] = useState<PositionTypes>({
    lat: 0,
    lng: 0,
  }); // 현재 위치
  const [position, setPosition] = useState<PositionTypes>({ lat: 0, lng: 0 }); // 마커 찍는 위치
  const [address, setAddress] = useState<string>(""); // 현재 위치 or 마커 위치 주소로 변환
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [metadata, setMetadata] = useState<PhotoMetadata | null>(null);
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    // TODO: 그룹 목록 불러오기
    const res = [
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
    ];
    setAztList(res);
    setCurrAzt([res[0]]);
  }, []);

  const handleSubmitMemory = (e?: React.FormEvent): void => {
    e!.preventDefault();
    let photoFiles = [];
    for (const photo of photos) {
      photoFiles.push(photo.file);
    }

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

    createMemory(
      content,
      rangeOption,
      currAzt[0].aztSeq!,
      newDateString,
      +position.lat.toFixed(7),
      +position.lng.toFixed(7),
      address,
      photoFiles
    )
      .then((res) => {
        console.log(res.data.data.memorySeq);
        const memorySeq = res.data.data.memorySeq;
        router.push(`/memory/${memorySeq}`);
      })
      .catch((err) => console.log(err));
  };

  const handleDateChange = (date: Date) => setSelectedDate(date);

  return (
    <div>
      <h2 className="text-xl">타임캡슐 만들기</h2>
      <form
        action=""
        className="flex flex-col justify-center align-middle gap-y-5 mt-5"
        onSubmit={handleSubmitMemory}
      >
        <DropDown
          isAzt
          iconSrc="/icons/users.svg"
          aztList={aztList}
          currAzt={currAzt}
          setCurrAzt={setCurrAzt}
        />
        <DropDown
          iconSrc="/icons/lock-fill.svg"
          rangeOption={rangeOption}
          setRangeOption={setRangeOption}
        />

        <PhotoUpload
          selectedDate={selectedDate}
          photos={photos}
          setPhotos={setPhotos}
          metadata={metadata}
          setMetadata={setMetadata}
          setPosition={setPosition}
          handleDateChange={handleDateChange}
        />
        <KakaoMap
          currLocation={currLocation}
          setCurrLocation={setCurrLocation}
          position={position}
          setPosition={setPosition}
          address={address}
          setAddress={setAddress}
          isPhotoUpload
          height={50}
        />
        <textarea
          rows={5}
          className="border rounded border-black p-1 resize-none"
          placeholder="추억을 작성ぁĦ주パㅔ요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <Btn
          width="w-full"
          bgColor="yellow"
          text="등&nbsp;&nbsp;록"
          btnFunc={handleSubmitMemory}
        />
      </form>
    </div>
  );
}
