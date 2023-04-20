"use client";

import { useState } from "react";

export default function List() {
  let list = ["Tomatoes", "Pasta", "Coconut"];
  let [cnt, setCnt] = useState([0, 0, 0]);
  return (
    <div>
      <h4 className="title">상품목록</h4>
      {list.map((item, idx) => {
        <div className="food" key={idx}>
          {/* <img src={`/food${idx}.png`} className="food-img" /> */}
          <h4>{item} $40</h4>
          <span> {cnt[idx]} </span>
          <button
            onClick={() => {
              setCnt(cnt[idx] + 1);
            }}
          >
            +
          </button>
        </div>;
      })}
    </div>
  );
}
