"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import styles from "./DateFilter.module.css";
import calendarIcon from "../../../../public/icons/calendar.svg";
import Image from "next/image";

function DateFilter() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const handleChange = (date: Date) => setSelectedDate(date);
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
        onChange={handleChange}
        popperClassName="z-10" // 지도에 겹쳐지는 것 방지
        className={styles.datePicker}
        // wrapperClassName="w-3/6"
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
