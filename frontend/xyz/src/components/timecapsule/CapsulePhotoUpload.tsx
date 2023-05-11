"use client";

import React, { useState, Dispatch, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
import Image from "next/image";

// 한국어 설정
registerLocale("ko", ko);

type Props = {
  openStart: Date;
  setOpenStart: Dispatch<SetStateAction<Date>>;
  openEnd: Date;
  setOpenEnd: Dispatch<SetStateAction<Date>>;
  updateEnd: Date;
  setUpdateEnd: Dispatch<SetStateAction<Date>>;
};

export default function CapsulePhotoUpload({
  openStart,
  setOpenStart,
  openEnd,
  setOpenEnd,
  updateEnd,
  setUpdateEnd,
}: Props) {
  const [dateRange, setDateRange] = useState<[Date, Date]>([
    openStart,
    openEnd,
  ]);
  const [startDate, endDate] = dateRange;

  const onChange = (update: [Date, Date]) => {
    setDateRange(update);
    setOpenStart(dateRange[0]);
    setOpenEnd(dateRange[1]);
  };
  return (
    <div className="border border-black rounded-md h-[30vh]">
      <div className="flex items-center justify-center h-9 border-b border-black">
        <DatePicker
          className="flex text-center w-full text-lg"
          locale="ko"
          dateFormat="yy.MM.dd"
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={onChange}
          isClearable={true}
        />
        <div className="flex items-center justify-center bg-pink px-2 border-l border-black h-full">
          <Image
            src="/icons/save.svg"
            alt="icon"
            width="0"
            height="0"
            className="w-full h-9 py-1 px-2 border-r border-black"
          />
          <Image
            src="/icons/close.svg"
            alt="icon"
            width="0"
            height="0"
            className="w-full h-9 p-2"
          />
        </div>
      </div>
      <div className="flex justify-center items-center border-b border-black h-9">
        <div className="flex justify-center items-center w-2/5 border-r border-black h-9">
          수정 마감 일
        </div>
        <DatePicker
          className="flex text-center w-full text-lg"
          locale="ko"
          dateFormat="yy.MM.dd"
          selected={updateEnd}
          onChange={(date: Date) => setUpdateEnd(date)}
          isClearable={true}
        />
      </div>
      <div className="flex items-center justify-center h-[20vh]">
      ㅍr일을 첨부ぁĦ 주パㅔ요
      </div>
    </div>
  );
}
