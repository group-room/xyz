"use client";
import Textbox from "../common/Textbox";
import Image from "next/image";
import React from "react";
import ProfileDropdown from "./ProfileDropdown";
import { useUserList } from "@/hooks/queries/user";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks/redux";

interface ProfileMainProps {
  mainUserSeq: string | number | undefined;
}

function ProfileMain({ mainUserSeq }: ProfileMainProps) {
  const { data: profileData, isLoading } = useUserList(mainUserSeq);
  const state = useAppSelector((state) => state);
  const myUserSeq = state.auth.userInfo?.userSeq;
  const router = useRouter();
  console.log(profileData, "profileData");
  const pushToProfileEdit = () => {
    router.push("/profile/edit");
  };
  return (
    <div className={`box-content w-full h-full bg-yellow`}>
      <div className="flex flex-row">
        <div className="mt-1 ml-1 mr-1">
          <img
            src={profileData?.profileImage}
            width={124}
            height={181}
            alt="example"
          />
        </div>
        {/* 유저 본인일 때 이 드롭다운이 보이게 하기 */}
        <div>
          <div className="flex pl-5 gap-10">
            {profileData?.identify}

            {mainUserSeq === myUserSeq ? (
              <ProfileDropdown
                firstText="프로필 편집"
                firstFunc={pushToProfileEdit}
                secondText="로그아웃"
                thirdText="탈퇴하기"
              />
            ) : (
              <ProfileDropdown
                firstText="친구 추가"
                firstFunc={pushToProfileEdit}
              />
            )}
          </div>
          <Textbox
            icon="/icons/edit.svg"
            alt="pretty"
            text="수식어"
            maintext={profileData?.modifier}
          />
          <Textbox
            icon="/icons/avatar.svg"
            alt="nickname"
            text="닉네임"
            maintext={profileData?.nickname}
          />
          <Textbox
            icon="/icons/user.svg"
            alt="visitor"
            text="방문자"
            maintext={profileData?.visitCount}
          />
        </div>
      </div>
      <div className="border-2 border-black m-1 h-[92px] shadow-lg pb-2">
        <div className="border-black border-b-2">자기소개 한 마디</div>
        <div className="">{profileData?.introduce}</div>
      </div>
    </div>
  );
}

export default ProfileMain;
