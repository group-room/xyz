"use client";

import React, { useEffect, useState } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import pinIcon from "../../../public/icons/pin.svg";
import Image from "next/image";
import { convertAddress } from "@/app/api/kakao";

function KakaoMap() {
  const [currLocation, setCurrLocation] = useState({ lat: 0, lng: 0 }); // 현재 위치
  const [position, setPosition] = useState({ lat: 0, lng: 0 }); // 마커 찍는 위치
  const [address, setAddress] = useState<string>(""); // 현재 위치 or 마커 위치 주소로 변환
  const [locations, setLocations] = useState([
    {
      memorySeq: 0,
      memoryImage:
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
      accessibility: "PUBLIC",
      aztSeq: 0,
      aztName: "그룹명",
      date: "날짜",
      latitude: 33.450705,
      longitude: 126.570677,
      location: "카카오",
    },
    {
      memorySeq: 1,
      memoryImage:
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
      accessibility: "GROUP",
      aztSeq: 0,
      aztName: "그룹명",
      date: "날짜",
      latitude: 33.450936,
      longitude: 126.569477,
      location: "생태연못",
    },
    {
      memorySeq: 2,
      memoryImage:
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
      accessibility: "GROUP",
      aztSeq: 0,
      aztName: "그룹명",
      date: "날짜",
      latitude: 33.450936,
      longitude: 126.569477,
      location: "생태연못",
    },
    {
      memorySeq: 3,
      memoryImage:
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
      accessibility: "GROUP",
      aztSeq: 0,
      aztName: "그룹명",
      date: "날짜",
      latitude: 33.450879,
      longitude: 126.56994,
      location: "텃밭",
    },
    {
      memorySeq: 4,
      memoryImage:
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
      accessibility: "GROUP",
      aztSeq: 0,
      aztName: "그룹명",
      date: "날짜",
      latitude: 33.451393,
      longitude: 126.570738,
      location: "근린공원",
    },
  ]);

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

  useEffect(() => {
    // 현재 위치 조회하기
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler); // 성공시 successHandler, 실패시 errorHandler 함수 실행
    // TODO: 현재 or 마커 위치 기준 추억들 조회하기
  }, []);

  // 마커 찍을 때마다 위치 가져와서 변환하기
  useEffect(() => {
    if (position.lat !== 0 && position.lng !== 0) {
      getConvertedAddress(position.lng.toString(), position.lat.toString());
    }
  }, [position]);

  const successHandler = (response: any) => {
    // console.log(response); // coords: GeolocationCoordinates {latitude: 위도, longitude: 경도, …} timestamp: 1673446873903
    const { latitude, longitude } = response.coords;
    setCurrLocation({ lat: latitude, lng: longitude });
    getConvertedAddress(longitude.toString(), latitude.toString());
  };

  const errorHandler = (error: any) => {
    console.log(error);
    setAddress("현재 위치를 가져올 수 없습니다.");
  };

  return (
    <div>
      <div className="flex mb-3">
        <Image src={pinIcon} alt="핀 아이콘" width={15} className="mr-1" />
        <span>{address}</span>
      </div>
      <Map
        center={{
          lat: currLocation?.lat,
          lng: currLocation?.lng,
        }}
        style={{ width: "100%", height: "220px" }}
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
        {locations.map(({ memorySeq, memoryImage, latitude, longitude }) => (
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
