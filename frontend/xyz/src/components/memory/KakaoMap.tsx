"use client";

import React, { useEffect } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import pinIcon from "../../../public/icons/pin.svg";
import Image from "next/image";
import { convertAddress } from "@/app/api/kakao";
import { KakaoMapProps } from "@/types/memory";

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
    // 현재 위치 조회하기
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler); // 성공시 successHandler, 실패시 errorHandler 함수 실행
  }, []);

  // 마커 찍을 때마다 위치 가져와서 변환하기
  useEffect(() => {
    if (position.lat !== 0 && position.lng !== 0) {
      getConvertedAddress(position.lng.toString(), position.lat.toString());
    } else {
      handleFailConvertToAddress();
    }
  }, [position]);

  const successHandler = (response: any) => {
    // console.log(response); // coords: GeolocationCoordinates {latitude: 위도, longitude: 경도, …} timestamp: 1673446873903
    const { latitude, longitude } = response.coords;
    setCurrLocation({ lat: latitude, lng: longitude });
    if (isPhotoUpload) setPosition({ lat: latitude, lng: longitude }); // 추억 등록하는 거라면 현재 위치 없애고 사진 메타데이터 위치 or 수정해서 마커 찍은 위치로 이동하도록 하기
    getConvertedAddress(longitude.toString(), latitude.toString());
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
      <Map
        // 추억 등록하는 거라면 현재 위치 없애고 사진 메타데이터 위치 or 수정해서 마커 찍은 위치로 이동하도록 하기
        center={{
          lat:
            isPhotoUpload && position?.lat !== 0
              ? position?.lat
              : currLocation?.lat,
          lng:
            isPhotoUpload && position?.lng !== 0
              ? position?.lng
              : currLocation?.lng,
        }}
        style={{ width: "100%", height: `${height?.toString() || "220"}px` }}
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
          {position && <MapMarker position={position} />}
          <div
            style={{ padding: "1rem", backgroundColor: "#fff", color: "#000" }}
          >
            😉내위치!
          </div>
        </CustomOverlayMap>
        {locations?.map(({ memorySeq, memoryImage, latitude, longitude }) => (
          <MapMarker
            key={memorySeq}
            position={{ lat: latitude, lng: longitude }}
            image={{
              src: memoryImage,
              size: { width: 24, height: 35 },
            }}
          />
        ))}
      </Map>
    </div>
  );
}

export default KakaoMap;
