"use client";

import Btn from "@/components/common/Btn";
import KakaoMap from "@/components/memory/KakaoMap";
import { AztTypes, Photo, PhotoMetadata, PositionTypes } from "@/types/memory";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PhotoUpload from "@/components/memory/PhotoUpload";
import DropDown from "@/components/memory/DropDown";

function MemoryCreatePage() {
  const router = useRouter();
  const [currAzt, setCurrAzt] = useState<AztTypes[]>([]);
  const [aztList, setAztList] = useState<AztTypes[]>([]);
  const [rangeOption, setRangeOption] = useState<string>("전체 공개");

  const [currLocation, setCurrLocation] = useState<PositionTypes>({
    lat: 0,
    lng: 0,
  }); // 현재 위치
  const [position, setPosition] = useState<PositionTypes>({ lat: 0, lng: 0 }); // 마커 찍는 위치
  const [address, setAddress] = useState<string>(""); // 현재 위치 or 마커 위치 주소로 변환
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [metadata, setMetadata] = useState<PhotoMetadata | null>(null);

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
    console.log("생성");
    e!.preventDefault();
    // TODO: 추억 생성 요청
    // createMemory.then((res) => {
    //   console.log(res.data.data.memorySeq);
    //   const memorySeq = res.data.data.memorySeq
    //   router.push(`/memory/${memorySeq}`);
    // }).catch(err => console.log(err));
  };

  return (
    <div>
      <h2 className="text-xl">추억 만들기</h2>
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
          iconSrc="/icons/lockFill.svg"
          rangeOption={rangeOption}
          setRangeOption={setRangeOption}
        />
        <PhotoUpload
          photos={photos}
          setPhotos={setPhotos}
          metadata={metadata}
          setMetadata={setMetadata}
          setPosition={setPosition}
        />
        <KakaoMap
          currLocation={currLocation}
          setCurrLocation={setCurrLocation}
          position={position}
          setPosition={setPosition}
          address={address}
          setAddress={setAddress}
          isPhotoUpload
          height={200}
        />
        <Btn
          width="w-full"
          bgColor="yellow"
          text="등 록"
          btnFunc={handleSubmitMemory}
        />
      </form>
    </div>
  );
}

export default MemoryCreatePage;
