"use client";

import Container from "@/components/common/Container";
import ImageScroll from "@/components/common/ImageScroll";
import Textbox from "@/components/common/Textbox";
import KakaoMap from "@/components/memory/KakaoMap";
import MultiCarousel from "@/components/timecapsule/MultiCarousel";
import { options } from "@/constants/option";
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
  const { data: memory, isLoading } = useMemoryDetail(slug);
  if (isLoading) {
    return <div>로딩중 ㄱ-...</div>;
  }
  if (!memory) {
    // TODO: 없는 memorySeq라면 not found
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
        "https://dsmdwofhojppt.cloudfront.net/memory/3ee2f9b8-e0c7-4ca0-ad29-98d7a84aa6af.png"
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
        <Textbox
          icon={"/icons/check.svg"}
          alt={"달력 아이콘"}
          maintext={options[accessibility as keyof typeof options]}
        />
        <Container
          title
          titleText={`${userNickname}님의 추억 (${imgList.length})`}
          titleImgSrc={"/icons/image.svg"}
          titleImgAlt={"사진 아이콘"}
        >
          <div className="p-2">
            <MultiCarousel>
              {imgList.map((imgSrc, idx) => (
                <img
                  key={idx}
                  src={imgSrc}
                  alt={`${idx}번째 이미지`}
                  width={290}
                  height={100}
                />
              ))}
            </MultiCarousel>
            <div>{content}</div>
          </div>
        </Container>
      </div>
    );
  }
}

export default MemoryDetailPage;
