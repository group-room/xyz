"use client";

import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
import Image from "next/image";
import { confirmSwal } from "@/utils/swalUtils";

// 한국어 설정
registerLocale("ko", ko);

type Props = {
  isAdd: boolean;
  openStart?: Date;
  setOpenStart?: Dispatch<SetStateAction<Date>>;
  openEnd?: Date;
  setOpenEnd?: Dispatch<SetStateAction<Date>>;
  updateEnd?: Date;
  setUpdateEnd?: Dispatch<SetStateAction<Date>>;
  photos: File[];
  setPhotos: Dispatch<SetStateAction<File[]>>;
  photoPreviewList: string[];
  setPhotoPreviewList: Dispatch<SetStateAction<string[]>>;
  isPhotoChanged?: boolean;
  setIsPhotoChanged?: Dispatch<SetStateAction<boolean>>;
};

export default function CapsulePhotoUpload({
  isAdd,
  photos,
  setPhotos,
  photoPreviewList,
  setPhotoPreviewList,
  setIsPhotoChanged,
}: Props) {
  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedExtensions = ["jpg", "jpeg", "png"]; // 허용할 확장자 목록
      const fileExtension = file.name.split(".").pop()?.toLowerCase();

      if (fileExtension && !allowedExtensions.includes(fileExtension)) {
        confirmSwal("지원되지 않는 확장자입니다.");
        event.target.value = ""; // 선택한 파일 초기화
        return;
      }
    }

    // 사진을 편집했다면, 사진 변경 여부를 true로 설정
    if (photos && setIsPhotoChanged) {
      setIsPhotoChanged(true);
    }

    const fileList: any = event.target.files;
    if (fileList) {
      if (fileList.length > 10) {
        alert("사진은 최대 10장까지 업로드 가능합니다.");
        return;
      }

      // 사진 10장까지만 저장하기
      const selectedPhotos: File[] = [];
      const selectedPhotoPreviewList: string[] = [];
      for (let i = 0; i < Math.min(fileList.length, 10); i++) {
        const photo: File = fileList[i];
        selectedPhotos.push(photo);
        selectedPhotoPreviewList.push(URL.createObjectURL(photo));
      }
      setPhotos(selectedPhotos);
      setPhotoPreviewList(selectedPhotoPreviewList);
    }
  };

  useEffect(() => {
    if (photos) {
      const selectedPhotoPreviewList: string[] = [];
      for (const photo of photos) {
        selectedPhotoPreviewList.push(URL.createObjectURL(photo));
      }
      setPhotoPreviewList(selectedPhotoPreviewList);
    }
  }, [photos]);

  return (
    <div className="border border-black rounded-md bg-pink">
      {/* 사진 첨부 영역 */}
      <div className="w-full ">
        <div className="flex items-center justify-center  ">
          <label
            htmlFor="input-file"
            className="w-full py-1 text-center cursor-pointer"
          >
            {photos?.length > 0
              ? "ヘㅏ진 ㉰시 선택㉭ドブl"
              : "バr진을 첨부ぁĦ 주パㅔ요"}
          </label>
          <input
            type="file"
            id="input-file"
            accept="image/gif, image/jpeg, image/png"
            onChange={handlePhotoChange}
            multiple
            className="hidden"
          />
        </div>
        <div className="flex flex-wrap items-center justify-center">
          {/* 첨부 사진 보여주는 영역 */}
          {photoPreviewList.length > 0 &&
            photoPreviewList?.map((url) => (
              <img
                key={url}
                src={url}
                alt="Preview"
                className="object-scale-down h-20 w-30 p-1"
              />
            ))}
        </div>
      </div>
    </div>
  );
}
