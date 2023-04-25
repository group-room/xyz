"use client";

import React, { useEffect, useState } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";

function KakaoMap() {
  const [currLocation, setCurrLocation] = useState({ lat: 0, lng: 0 });
  const [locations, setLocations] = useState([
    {
      albumSeq: 0,
      albumImage:
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
      albumSeq: 1,
      albumImage:
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
      albumSeq: 2,
      albumImage:
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
      albumSeq: 3,
      albumImage:
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
      albumSeq: 4,
      albumImage:
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

  useEffect(() => {
    // TODO: 현재 위치 기준 추억들 조회하기
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler); // 성공시 successHandler, 실패시 errorHandler 함수 실행
  }, []);

  const successHandler = (response: any) => {
    // console.log(response); // coords: GeolocationCoordinates {latitude: 위도, longitude: 경도, …} timestamp: 1673446873903
    const { latitude, longitude } = response.coords;
    setCurrLocation({ lat: latitude, lng: longitude });
  };

  const errorHandler = (error: any) => {
    console.log(error);
  };

  return (
    <>
      <Map
        center={{
          lat: currLocation?.lat,
          lng: currLocation?.lng,
        }}
        style={{ width: "100%", height: "220px" }}
        level={3}
      >
        <CustomOverlayMap
          position={{ lat: currLocation?.lat, lng: currLocation?.lng }}
        >
          <div
            style={{ padding: "1rem", backgroundColor: "#fff", color: "#000" }}
          >
            😉내위치!
          </div>
        </CustomOverlayMap>
        {locations.map(({ albumSeq, albumImage, latitude, longitude }) => (
          <MapMarker
            key={albumSeq}
            position={{ lat: latitude, lng: longitude }}
            image={{
              src: albumImage,
              size: { width: 24, height: 35 },
            }}
          />
        ))}
      </Map>
    </>
  );
}

export default KakaoMap;
