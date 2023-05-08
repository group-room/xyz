"use client";

import Btn from "@/components/common/Btn";
import ProfileImg from "@/components/common/ProfileImg";
import Textbox from "@/components/common/Textbox";
import { useAztInfo } from "@/hooks/queries/azt";
import { SlugProps } from "@/types/common";
import React from "react";

function AztInfoPage({ params: { slug } }: SlugProps) {
  const { data: aztInfoData, isLoading: isAztInfoLoading } = useAztInfo(slug);
  const handleClickInvite = () => {};
  return (
    <div>
      {aztInfoData ? (
        <div>
          <Textbox
            icon="/icons/users.svg"
            alt="아지트 아이콘"
            maintext={aztInfoData.name}
            bgColor="pink"
          />
          <Textbox
            icon="/icons/calendar.svg"
            alt="날짜 아이콘"
            maintext={`${aztInfoData.createdAt[0]}년 ${aztInfoData.createdAt[1]}월 ${aztInfoData.createdAt[2]}일`}
          />
          <div>
            <p>아지트 대표 사진</p>
            <img src={aztInfoData.image} alt={aztInfoData.name} />
          </div>
          <div>
            <div>
              <p>아지트 멤버</p>
              {aztInfoData.members.map((member) => (
                <ProfileImg key={member.userSeq} imgSrc={member.profileImage} />
              ))}
            </div>
            <Btn bgColor="blue" text="멤버 초대" btnFunc={handleClickInvite} />
          </div>
          <div>
            <Btn
              bgColor="blue"
              className="bg-neutral-200"
              text="탈퇴"
              btnFunc={handleClickInvite}
            />
          </div>
        </div>
      ) : (
        <div>로딩중...</div>
      )}
    </div>
  );
}

export default AztInfoPage;
