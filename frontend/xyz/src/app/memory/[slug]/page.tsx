"use client";

import Container from "@/components/common/Container";
import Textbox from "@/components/common/Textbox";
import CommentList from "@/components/memory/CommentList";
import LikeBtn from "@/components/memory/LikeBtn";
import MultiCarousel from "@/components/timecapsule/MultiCarousel";
import { MEMORY_OPTIONS } from "@/constants/memoryOption";
import { useMemoryDetail } from "@/hooks/queries/memory";
import { sliceDate } from "@/utils/dateUtils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: {
    slug: number;
  };
};

function MemoryDetailPage({ params: { slug } }: Props) {
  const { data: memory, isLoading } = useMemoryDetail(slug);
  if (isLoading) {
    return <div>로딩중 ㄱ-...</div>;
  }
  if (!memory) {
    // 없는 memorySeq라면 not found
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
      comments,
    } = memory;

    let imgList = [];
    for (let file of files) {
      imgList.push(file.filePath);
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
          maintext={
            MEMORY_OPTIONS[accessibility as keyof typeof MEMORY_OPTIONS]
          }
        />
        <div className="flex gap-x-3 p-1 justify-end mb-2">
          <Link
            href={`/memory/${slug}/edit`}
            className="flex items-center gap-x-1"
          >
            <Image
              src={"/icons/edit.svg"}
              alt={"편집 아이콘"}
              width={16}
              height={16}
            />
            <span>편집하기</span>
          </Link>
          <button className="flex items-center gap-x-1">
            <Image
              src={"/icons/trash.svg"}
              alt={"삭제 아이콘"}
              width={16}
              height={16}
            />
            <span>삭제하기</span>
          </button>
        </div>
        <Container
          title
          titleText={`${userNickname} 님의 추억 (${imgList.length})`}
          titleImgSrc={"/icons/images.svg"}
          titleImgAlt={"사진 아이콘"}
        >
          <div className="flex flex-col gap-y-2 p-2">
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
            <LikeBtn memorySeq={slug} isLiked={isLiked} likeCnt={likeCnt} />
          </div>
        </Container>
        <CommentList
          memorySeq={slug}
          commentCnt={commentCnt}
          commentList={comments}
        />
      </div>
    );
  }
}

export default MemoryDetailPage;
