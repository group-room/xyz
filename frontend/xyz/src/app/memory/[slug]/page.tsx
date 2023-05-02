"use client";

import Container from "@/components/common/Container";
import ImageScroll from "@/components/common/ImageScroll";
import Textbox from "@/components/common/Textbox";
import KakaoMap from "@/components/memory/KakaoMap";
import { useMemoryDetail } from "@/hooks/queries/memory";
import { sliceDate } from "@/utils/sliceDate";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
  params: {
    slug: number;
  };
};

import React from "react";

function MemoryDetailPage({ params: { slug } }: Props) {
  // TODO: 없는 memorySeq라면 not found
  const { data: memory, isLoading } = useMemoryDetail(slug);
  if (isLoading) {
    return <div>로딩중 ㄱ-...</div>;
  }
  if (!memory) {
    notFound();
  }

  if (memory) {
    console.log(memory);
    const {
      aztSeq,
      aztName,
      commentCnt,
      content,
      memorySeq,
      memoryImage,
      date,
      latitude,
      longitude,
      location,
      likeCnt,
      isLiked,
      userNickname,
      accessibility,
      files,
    } = memory;

    let imgList = [];
    for (let file of files) {
      imgList.push(file.filePath);
    }
    for (let i = 0; i < 10; i++) {
      imgList.push(
        "https://i.pinimg.com/736x/60/1b/a1/601ba126b73d93ff7528666c283df171.jpg"
      );
    }

    return (
      <div>
        <Textbox
          icon={"/icons/users.svg"}
          alt={"그룹 아이콘"}
          maintext={aztName}
          bgColor="pink"
          // textColor="white"
        />
        <Textbox
          icon={"/icons/calendar.svg"}
          alt={"캘린더 아이콘"}
          maintext={sliceDate(date)}
        />
        <Textbox
          icon={"/icons/pin.svg"}
          alt={"달력 아이콘"}
          maintext={location}
        />
        <Container
          title
          titleText={`${userNickname}님의 추억`}
          titleImgSrc={"/icons/image.svg"}
          titleImgAlt={"사진 아이콘"}
        >
          <div>
            <div className="mb-2">
              {imgList.length > 1 ? (
                <ImageScroll imgList={imgList} />
              ) : (
                <img src={imgList[0]} alt="" />
              )}
            </div>
            <div>{content}</div>
          </div>
        </Container>
      </div>
    );
  }
}

export default MemoryDetailPage;
