"use client";

import React, { useState, useEffect } from "react";

type Group = {
  groupSeq?: number;
  image?: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  chatSeq?: string;
};

function GroupFilter() {
  const [groupList, setGroupList] = useState<Group[]>([
    {
      groupSeq: 0,
      image: "대표사진 경로",
      name: "그룹 이름1",
      createdAt: "생성시간",
      updatedAt: "수정시간",
      chatSeq: "채팅방시퀀스",
    },
    {
      groupSeq: 1,
      image: "대표사진 경로",
      name: "그룹 이름2",
      createdAt: "생성시간",
      updatedAt: "수정시간",
      chatSeq: "채팅방시퀀스",
    },
    {
      groupSeq: 2,
      image: "대표사진 경로",
      name: "그룹 이름3",
      createdAt: "생성시간",
      updatedAt: "수정시간",
      chatSeq: "채팅방시퀀스",
    },
  ]);

  // 셀렉트박스 내 들어갈 초기값 설정
  const [currGroup, setCurrGroup] = useState<Group[]>([{ name: "전체보기" }]);

  // 토글설정은 false 로 셀렉트 박스를 닫아놓자
  const [toggle, setToggle] = useState<boolean>(false);
  const handleTitleClick = () => setToggle((prev) => !prev);

  const handleItemClick = (currGroupName: string) => {
    if (currGroupName === "전체보기") {
      setCurrGroup([{ name: "전체보기" }]);
    } else {
      setCurrGroup(groupList.filter((group) => group.name === currGroupName));
    }
    handleTitleClick();
  };

  useEffect(() => {
    // TODO: 그룹 목록 불러오기
  }, []);

  const DropDown = () => {
    if (currGroup[0].name === "전체보기") {
      return (
        <>
          {groupList.map((item, idx) => {
            return (
              <div
                key={idx}
                onClick={() => handleItemClick(item.name)}
                className="truncate"
              >
                {item.name}
              </div>
            );
          })}
        </>
      );
    } else {
      return (
        <>
          {[{ name: "전체보기" }]
            .concat(groupList)
            .filter((group) => group.groupSeq !== currGroup[0]?.groupSeq)
            .map((item, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => handleItemClick(item.name)}
                  className="truncate"
                >
                  {item.name}
                </div>
              );
            })}
        </>
      );
    }
  };

  return (
    <div className="relative basis-8/12 border border-black">
      <div className="w-full truncate" onClick={handleTitleClick}>
        {currGroup.length === 1 ? currGroup[0].name : "전체보기"}
      </div>
      {toggle && (
        <div className="absolute top-10 left-0 border border-black w-full bg-white z-10">
          <DropDown />
        </div>
      )}
      <div></div>
    </div>
  );
}

export default GroupFilter;
