"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import EXIF from "exif-js";
import { Photo, PhotoMetadata, PositionTypes } from "@/types/memory";

interface PhotoUploadProps {
  photos: Photo[];
  setPhotos: Dispatch<SetStateAction<Photo[]>>;
  metadata: PhotoMetadata | null;
  setMetadata: Dispatch<SetStateAction<PhotoMetadata | null>>;
  setPosition: Dispatch<SetStateAction<PositionTypes>>;
}

function PhotoUpload({
  photos,
  setPhotos,
  metadata,
  setMetadata,
  setPosition,
}: PhotoUploadProps) {
  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPosition({ lat: 0, lng: 0 });
    setMetadata(null);

    const fileList:any = event.target.files;
    if (fileList) {
      if (fileList.length > 10) {
        alert("사진은 최대 10장까지 업로드 가능합니다.");
        return;
      }

      // 사진 10장까지만 저장하기
      const selectedPhotos: Photo[] = [];
      for (let i = 0; i < Math.min(fileList.length, 10); i++) {
        const photo:File = fileList[i];
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
    <div>
      <div className="mb-3">
        <label
          htmlFor="input-file"
          className="bg-pink rounded px-3 py-2 drop-shadow-md border border-black mr-3"
        >
          {photos?.length > 0 ? "사진 다시 선택하기" : "사진 선택하기"}
        </label>
        <input
          type="file"
          id="input-file"
          accept="image/*"
          onChange={handlePhotoChange}
          multiple
          className="hidden"
        />
        {photos?.length > 0 && <span>사진 {photos.length}장</span>}
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
