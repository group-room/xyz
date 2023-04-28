"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import EXIF from "exif-js";
import { Photo, PhotoMetadata, PositionTypes } from "@/types/memory";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import Image from "next/image";

interface PhotoUploadProps {
  selectedDate: Date;
  photos: Photo[];
  setPhotos: Dispatch<SetStateAction<Photo[]>>;
  metadata: PhotoMetadata | null;
  setMetadata: Dispatch<SetStateAction<PhotoMetadata | null>>;
  setPosition: Dispatch<SetStateAction<PositionTypes>>;
  handleDateChange: (date: Date) => void;
}

function PhotoUpload({
  selectedDate,
  photos,
  setPhotos,
  metadata,
  setMetadata,
  setPosition,
  handleDateChange,
}: PhotoUploadProps) {
  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPosition({ lat: 0, lng: 0 });
    setMetadata(null);

    const fileList: any = event.target.files;
    if (fileList) {
      if (fileList.length > 10) {
        alert("사진은 최대 10장까지 업로드 가능합니다.");
        return;
      }

      // 사진 10장까지만 저장하기
      const selectedPhotos: Photo[] = [];
      for (let i = 0; i < Math.min(fileList.length, 10); i++) {
        const photo: File = fileList[i];
        selectedPhotos.push({
          file: photo,
          preview: URL.createObjectURL(photo),
        });
      }
      setPhotos(selectedPhotos);

      // 사진 메타데이터에서 위치정보 가져오기 (처음 찾아진걸로 저장)
      for (const photo of fileList) {
        EXIF.getData(photo, function (this: any) {
          const lat = EXIF.getTag(this, "GPSLatitude");
          const latRef = EXIF.getTag(this, "GPSLatitudeRef");
          const long = EXIF.getTag(this, "GPSLongitude");
          const longRef = EXIF.getTag(this, "GPSLongitudeRef");
          const dateTaken = EXIF.getTag(this, "DateTimeOriginal");
          if (lat && latRef && long && longRef && dateTaken) {
            const latitude =
              (lat[0] + lat[1] / 60 + lat[2] / 3600) *
              (latRef === "N" ? 1 : -1);
            const longitude =
              (long[0] + long[1] / 60 + long[2] / 3600) *
              (longRef === "E" ? 1 : -1);
            setMetadata({ location: { latitude, longitude }, dateTaken });
            setPosition({ lat: latitude, lng: longitude });
            return;
          }
        });
      }
    }
  };

  return (
    <div className="w-full">
      {/* 날짜 선택 영역 */}
      <div className="flex items-center gap-3 mb-4">
        <div>
          <img src="/icons/calendar.svg" alt="달력 아이콘" width={19} />
        </div>
        <div className="grow">
          <DatePicker
            locale={ko}
            dateFormat="yyyy년 MM월 dd일"
            selected={selectedDate}
            popperClassName="z-10" // 지도에 겹쳐지는 것 방지
            onChange={handleDateChange}
            className="flex align-middle py-1 rounded border border-black cursor-pointer w-full text-center"
          />
        </div>
      </div>
      {/* 사진 첨부 영역 */}
      <div className="w-full flex items-center gap-2 mb-3">
        <div>
          <Image
            src="/icons/add-camera.svg"
            alt="달력 아이콘"
            width={25}
            height={20}
          />
        </div>
        <label
          htmlFor="input-file"
          className="w-full bg-pink py-1 rounded border border-black text-center cursor-pointer"
        >
          {photos?.length > 0
            ? "ヘㅏ진 ㉰시 선택㉭ドブl"
            : "バr진을 첨부ぁĦ 주パㅔ요"}
        </label>
        <input
          type="file"
          id="input-file"
          accept="image/*"
          onChange={handlePhotoChange}
          multiple
          className="hidden"
        />
      </div>
      <div>
        {photos?.map((photo) => (
          <img key={photo?.preview} src={photo?.preview} alt="Preview" />
        ))}
      </div>
      {/* {metadata && (
        <div>
          {metadata.location && (
            <p>
              Location: ({metadata.location.latitude},{" "}
              {metadata.location.longitude})
            </p>
          )}
        </div>
      )} */}
    </div>
  );
}

export default PhotoUpload;
