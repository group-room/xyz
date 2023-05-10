import { convertAddressToCoordinate } from "@/app/api/kakao";
import { CoordinateTypes } from "@/types/capsule";
import React from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";

export default function SearchPostCode() {
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

    console.log(data);
    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'

    const addressInfo: CoordinateTypes = await convertAddressToCoordinate(
      fullAddress
    );
    // addressInfo.x = longitude, addressInfo.y = latitude
    console.log(addressInfo);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <button type="button" onClick={handleClick}>
      타임캡슐 저장 위치 검색
    </button>
  );
}
