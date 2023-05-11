"use client";

import React from "react";
import { useRandomCapsule } from "@/hooks/queries/capsule";
import Textbox from "@/components/common/Textbox";
import Container from "@/components/common/Container";
import MultiCarousel from "@/components/timecapsule/MultiCarousel";

export default function TimecapsuleRamdomDetailPage() {
  const { data: randomDetail, isLoading } = useRandomCapsule();
  if (randomDetail) {
    console.log(randomDetail);
  }

  return (
    <div>
      {randomDetail ? (
        <div>
          <Textbox
            icon={"/icons/users.svg"}
            alt={"그룹 아이콘"}
            maintext={randomDetail.tc.aztName}
            bgColor="pink"
          />
          <Textbox
            icon={"/icons/calendar.svg"}
            alt={"캘린더 아이콘"}
            maintext={randomDetail.tc.openedAt}
          />
          <Textbox
            icon={"/icons/pin.svg"}
            alt={"달력 아이콘"}
            maintext={randomDetail.tc.location}
          />
          <Container
            title
            titleText={"타임캡슐 사진"}
            titleImgSrc={"/icons/images.svg"}
            titleImgAlt={"사진 아이콘"}
          >
            <div className="flex flex-col gap-y-2 p-2">
              <MultiCarousel>
                {randomDetail.contents.map((content) => {
                  return content.files.map((file, idx) => {
                    return <img key={idx} src={file.filePath} alt="image" />;
                  });
                })}
              </MultiCarousel>
            </div>
          </Container>
          <div className="mt-2 border border-black rounded-sm p-2">
            {randomDetail.contents.map((item, idx) => {
              return <div key={idx}>{item.content}</div>;
            })}
          </div>
        </div>
      ) : (
        <div>로딩중</div>
      )}
    </div>
  );
}
