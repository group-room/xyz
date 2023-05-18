"use client";
import React, { useEffect, Dispatch, SetStateAction } from "react";
import { convertAddressToCoordinate } from "@/app/api/kakao";
import { positionTypes } from "@/types/capsule";
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

    console.log(fullAddress);
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
        const newPosition = { lat: +res.y, lng: +res.x };
        setPosition(newPosition);
      });
    }
  }

  useEffect(() => {
    getCoordinate();
  }, [address]);

  return (
    <div className="flex flex-col border border-black rounded-md p-3">
      <button
        type="button"
        onClick={handleClick}
        className={position.lat !== 0 && position.lng !== 0 ? "mb-2" : ""}
      >
        타임캡슐 저장 위치 찾기
      </button>
      {position.lat !== 0 && position.lng !== 0 && (
        <StaticMap
          center={position}
          style={{
            width: "100%",
            height: "150px",
          }}
          marker={{ position }}
          level={3}
          key={`${position.lat}-${position.lng}`} // position 값이 변경될 때마다 key 값을 업데이트
        />
      )}
    </div>
  );
}
