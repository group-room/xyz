"use client";

import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import calendarIcon from "../../../public/icons/calendar.svg";
import Image from "next/image";

interface DateFilterProps {
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  handleDateChange: (date: Date) => void;
}

function DateFilter({
  selectedDate,
  setSelectedDate,
  handleDateChange,
}: DateFilterProps) {
  // const years = range(1990, getYear(new Date()) + 1, 1);
  // const months = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];

  return (
    // <div className="w-3/6 border border-black drop-shadow-md">
    <div className="flex basis-7/12 shadow-md">
      <div className="flex align-middle px-2 border border-r-0 border-black">
        <Image src={calendarIcon} alt="캘린더 아이콘" width={15} />
      </div>
      <DatePicker
        locale={ko}
        dateFormat="yyyy년 MM월 dd일"
        selected={selectedDate}
        onChange={handleDateChange}
        popperClassName="z-10" // 지도에 겹쳐지는 것 방지
        className="flex align-middle border border-black text-center py-1 cursor-pointer w-full placeholder:text-black"
        placeholderText="날짜 선택하기"
      />
    </div>
    /*{ <DatePicker
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            {"<"}
          </button>
          <select
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            {">"}
          </button>
        </div>
      )}
      selected={startDate}
      onChange={(date) => setStartDate(date)}
    />} */
    // </div>
  );
}

export default DateFilter;
