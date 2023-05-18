"use client";

import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { convertAddressToCoordinate } from "@/app/api/kakao";
import { CoordinateTypes, positionTypes } from "@/types/capsule";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { StaticMap } from "react-kakao-maps-sdk";

type Props = {
  address: string;
  setAddress: Dispatch<SetStateAction<string>>;
  position: positionTypes;
  setPosition: (position: positionTypes) => void;
};

export default function SearchPostCode({
  address,
  setAddress,
  position,
  setPosition,
}: Props) {
  const scriptUrl =
    "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = async (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    setAddress(fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  async function getCoordinate() {
    if (address === "") {
      return;
    } else {
      return await convertAddressToCoordinate(address).then((res) => {
        console.log(position.lat, " -before- ", position.lng);
        setPosition({ lat: +res.y, lng: +res.x });
        console.log(position.lat, " -after- ", position.lng);
      });
    }
  }

  useEffect(() => {
    getCoordinate();
  }, [address]);

  return (
    <div className="flex flex-col justify-center items-center border border-black rounded-md p-2 gap-2">
      <button type="button" onClick={handleClick}>
        타임캡슐 저장 위치 찾기
      </button>
      {position.lat !== 0 && position.lng !== 0 && (
        <StaticMap // 지도를 표시할 Container
          // 지도의 중심좌표
          center={position}
          style={{
            // 지도의 크기
            width: "100%",
            height: "150px",
          }}
          marker={{ position }}
          level={3} // 지도의 확대 레벨
        />
      )}
    </div>
  );
}
