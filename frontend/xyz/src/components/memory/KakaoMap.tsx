"use client";

import React, { useCallback, useEffect } from "react";
import {
  CustomOverlayMap,
  Map,
  MapInfoWindow,
  MapMarker,
} from "react-kakao-maps-sdk";
import pinIcon from "../../../public/icons/pin.svg";
import Image from "next/image";
import { convertAddress } from "@/app/api/kakao";
import { KakaoMapProps } from "@/types/memory";

/** 추억앨범 피드, 추억사진 업로드, 편집, 상세보기 페이지에서 사용하는 지도 컴포넌트 */
function KakaoMap({
  height,
  position,
  setPosition,
  currLocation,
  setCurrLocation,
  address,
  setAddress,
  locations,
  isPhotoUpload,
  isPhotoEdit,
}: KakaoMapProps) {
  // 위도, 경도를 주소로 변환하는 함수
  const getConvertedAddress = (x: string, y: string) => {
    convertAddress(x, y)
      .then((res) => {
        // console.log(res);
        const convertedAddress = res.data.documents[0].address.address_name;
        setAddress(convertedAddress);
      })
      .catch((err) => console.log(err));
  };

  const handleFailConvertToAddress = () => {
    if (isPhotoUpload) {
      setAddress("추억을 저장할 위치를 선택해주세요.");
    } else {
      setAddress("현재 위치를 가져올 수 없습니다.");
    }
  };

  useEffect(() => {
    // 현재 위치 조회하기 (사진 편집 처음 진입시에는 기존 위치)
    // console.log("현재 위치 조회하기");
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler); // 성공시 successHandler, 실패시 errorHandler 함수 실행
  }, []);

  useEffect(() => {
    // 마커 찍을 때마다 위치 가져와서 변환하기
    // console.log("포지션 변경");
    if (position.lat !== 0 && position.lng !== 0) {
      getConvertedAddress(position.lng.toString(), position.lat.toString());
    } else {
      handleFailConvertToAddress();
    }
  }, [position, locations]);

  const successHandler = (response: any) => {
    // console.log(response); // coords: GeolocationCoordinates {latitude: 위도, longitude: 경도, …} timestamp: 1673446873903

    const { latitude, longitude } = response.coords; // 현재 위치 정보
    setCurrLocation({ lat: latitude, lng: longitude });

    // 추억 처음 등록하는 거라면 현재 위치 대신 사진 메타데이터 위치 or 마커 찍은 위치로 이동하도록 하기
    if (!isPhotoEdit) {
      setPosition({ lat: latitude, lng: longitude });
      getConvertedAddress(longitude.toString(), latitude.toString());
    }
  };

  const errorHandler = (error: any) => {
    console.log(error);
    handleFailConvertToAddress();
  };

  return (
    <div>
      <div className="flex mb-3">
        <Image src={pinIcon} alt="핀 아이콘" width={15} className="mr-1" />
        <span>{address}</span>
      </div>
      <Map // 지도를 표시할 Container
        // 추억 등록하는 거라면 현재 위치 없애고 사진 메타데이터 위치 or 수정해서 마커 찍은 위치로 이동하도록 하기
        center={{
          // 지도의 중심좌표
          lat:
            isPhotoUpload && position?.lat !== 0
              ? position?.lat
              : currLocation?.lat,
          lng:
            isPhotoUpload && position?.lng !== 0
              ? position?.lng
              : currLocation?.lng,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: `${height?.toString() || "220"}px`,
          zIndex: 0,
        }}
        level={3}
        onClick={(_t, mouseEvent) =>
          setPosition({
            lat: mouseEvent.latLng.getLat(),
            lng: mouseEvent.latLng.getLng(),
          })
        }
      >
        <CustomOverlayMap
          position={{ lat: currLocation?.lat, lng: currLocation?.lng }}
        >
          {position && <MapMarker position={position} zIndex={10} />}
          {/* <div className="p-2 bg-white/80 text-black">⭐내위치!</div> */}
        </CustomOverlayMap>
        {locations?.map(({ memorySeq, memoryImage, latitude, longitude }) => (
          <>
            {/* <MapInfoWindow // 인포윈도우를 생성하고 지도에 표시
              position={{
                // 인포윈도우가 표시될 위치
                lat: latitude,
                lng: longitude,
              }}
              removable={true} // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시
            >
              <div style={{ padding: "5px", color: "#000" }}>
                <img src={memoryImage} alt="" width={90} height={60} />
              </div>
            </MapInfoWindow> */}
            <MapMarker
              key={memorySeq}
              position={{ lat: latitude, lng: longitude }}
              clickable={true}
              image={{
                src: memoryImage,
                size: { width: 90, height: 60 },
                // options: {
                //   offset: {
                //     x: 27,
                //     y: 69,
                //   }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                // },
              }}
            />
          </>
        ))}
      </Map>
    </div>
  );
}

export default KakaoMap;
