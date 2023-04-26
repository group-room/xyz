"use client";

import Btn from "@/components/common/Btn";
import KakaoMap from "@/components/memory/KakaoMap";
import { PositionTypes } from "@/types/memory";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PhotoUpload from "@/components/memory/PhotoUpload";

function MemoryCreatePage() {
  const router = useRouter();
  const [currLocation, setCurrLocation] = useState<PositionTypes>({
    lat: 0,
    lng: 0,
  }); // 현재 위치
  const [position, setPosition] = useState<PositionTypes>({ lat: 0, lng: 0 }); // 마커 찍는 위치
  const [address, setAddress] = useState<string>(""); // 현재 위치 or 마커 위치 주소로 변환

  // TODO: 추억 생성 요청
  const createMemory = () => {};

  const handleSubmitMemory = (e: React.FormEvent): void => {
    console.log("생성");
    e.preventDefault();
    // createMemory.then((res) => {
    //   console.log(res.data.data.memorySeq);
    //   const memorySeq = res.data.data.memorySeq
    //   router.push(`/memory/${memorySeq}`);
    // }).catch(err => console.log(err));
  };

  return (
    <div>
      <h2 className="text-lg">추억 만들기</h2>
      <form
        action=""
        className="flex flex-col justify-center align-middle gap-y-5"
        onSubmit={handleSubmitMemory}
      >
        <PhotoUpload />
        <KakaoMap
          currLocation={currLocation}
          setCurrLocation={setCurrLocation}
          position={position}
          setPosition={setPosition}
          address={address}
          setAddress={setAddress}
        />
        <Btn bgColor="yellow" text="등 록" btnFunc={createMemory} />
      </form>
    </div>
  );
}

export default MemoryCreatePage;
