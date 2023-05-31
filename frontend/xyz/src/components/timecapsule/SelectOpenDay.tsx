"use client";

import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
import calendarIconImg from "../../../public/icons/calendar.svg";
import Image from "next/image";
import { confirmSwal, confirmSwalWarning } from "@/utils/swalUtils";

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

export default function SelectOpenDay({
  openStart,
  setOpenStart,
  openEnd,
  setOpenEnd,
  updateEnd,
  setUpdateEnd,
}: Props) {
  const dateToString = (date: Date) => {
    const year = new Date(date).getFullYear();
    let month = new Date(date).getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
    const day = new Date(date).getDate();
    const formattedDate = `${year}.${month}.${day}`;
    return formattedDate;
  };

  const today = new Date();

  const onChangeOpenStartDate = (date: Date) => {
    const formattedToday = dateToString(today);
    let openStartDay = dateToString(date);
    if (openStartDay < formattedToday) {
      console.log("openStartDay", openStartDay);
      console.log("formattedToday", formattedToday);
      confirmSwalWarning("오픈 시작일은 오늘 이후로 선택해주세요");
      setOpenStart(today);
    } else {
      setOpenStart && setOpenStart(date!);
      const after7Days: Date = new Date(
        date.getTime() + 7 * 24 * 60 * 60 * 1000
      );
      setOpenEnd(after7Days);
    }
  };

  const onChangeOpenEndDate = (date: Date) => {
    let openStartDay = dateToString(openStart);
    let openEndDay = dateToString(date);

    if (openStartDay > openEndDay) {
      confirmSwalWarning("오픈 마감일은 오픈 시작일 이후로 선택해주세요");
      const after7Days: Date = new Date(
        openStart.getTime() + 7 * 24 * 60 * 60 * 1000
      );
      setOpenEnd(after7Days);
    } else {
      setOpenEnd(date);
      setUpdateEnd(date);
    }
  };

  const onChangeUpdateEndDate = (date: Date) => {
    let openStartDay = dateToString(openStart);
    let updateEndDay = dateToString(date);
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const formattedyesterday = dateToString(yesterday);

    if (openStartDay < updateEndDay || date === null) {
      confirmSwalWarning("수정 마감일은 오픈 시작일 이후로 선택해주세요");
      setUpdateEnd(yesterday);
    } else {
      setUpdateEnd(date!);
    }
  };

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex justify-center items-center">
        <Image
          src={calendarIconImg}
          alt="calendarIconImg"
          width="0"
          height="0"
          className="w-[20px] h-auto mr-2"
        />
        <div className="flex justify-center items-center text-center w-full h-9 border border-black rounded-md">
          <div className="flex w-11/12 justify-center items-center h-9 text-sm border-r border-black">
            타임캡슐 오픈 시작일
          </div>
          <DatePicker
            className="flex justify-center items-center text-center text-sm"
            locale="ko"
            dateFormat="yy.MM.dd"
            selected={openStart}
            onChange={(date) => onChangeOpenStartDate(date!)}
            isClearable={true}
            minDate={new Date()}
          />
        </div>
      </div>

      <div className="flex justify-center items-center">
        <Image
          src={calendarIconImg}
          alt="calendarIconImg"
          width="0"
          height="0"
          className="w-[20px] h-auto mr-2"
        />
        <div className="flex justify-center items-center text-center w-full h-9 border border-black rounded-md">
          <div className="flex w-11/12 justify-center items-center h-9 text-sm border-r border-black">
            타임캡슐 오픈 마감일
          </div>
          <DatePicker
            className="flex justify-center items-center text-center text-sm"
            locale="ko"
            dateFormat="yy.MM.dd"
            selected={openEnd}
            onChange={(date) => onChangeOpenEndDate(date!)}
            isClearable={true}
            minDate={new Date()}
          />
        </div>
      </div>

      <div className="flex justify-center items-center">
        <Image
          src={calendarIconImg}
          alt="calendarIconImg"
          width="0"
          height="0"
          className="w-[20px] h-auto mr-2"
        />
        <div className="flex justify-center items-center text-center w-full h-9 border border-black rounded-md">
          <div className="flex w-11/12 justify-center items-center h-9 text-sm border-r border-black">
            타임캡슐 수정 마감일
          </div>
          <DatePicker
            className="flex justify-center items-center text-center text-sm"
            locale="ko"
            dateFormat="yy.MM.dd"
            selected={updateEnd}
            onChange={(date) => onChangeUpdateEndDate(date!)}
            isClearable={true}
            maxDate={openStart}
          />
        </div>
      </div>
    </div>
  );
}
