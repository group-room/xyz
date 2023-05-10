"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
import Image from "next/image";

// 한국어 설정
registerLocale("ko", ko);

export default function CapsulePhotoUpload() {
  const today: Date = new Date();
  const after7Days: Date = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  const [dateRange, setDateRange] = useState<[Date, Date]>([today, after7Days]);
  const [startDate, endDate] = dateRange;

  const onChange = (update: [Date, Date]) => {
    setDateRange(update);
  };
  return (
    <div className="border border-black rounded-md h-[35vh]">
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
      <div className="flex items-center justify-center h-full">
        <div className="text-center">ㅍr일을 첨부ぁĦ 주パㅔ요</div>
      </div>
    </div>
  );
}
