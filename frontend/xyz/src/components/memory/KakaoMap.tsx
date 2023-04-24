"use client";

import Script from "next/script";
import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

function KakaoMap() {
  return (
    <>
      지도/...
      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: "100%", height: "200px" }}
      >
        <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
          <div style={{ color: "#000" }}>Hello World!</div>
        </MapMarker>
      </Map>
    </>
  );
}

export default KakaoMap;
