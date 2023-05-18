"use client";

import React from "react";
import { useUserList } from "@/hooks/queries/user";
import { useRouter } from "next/navigation";

import ProfilePage from "../page";
import ProfileBtn from "@/components/profile/ProfileBtn";
import ProfileDropDown from "@/components/profile/ProfileDropdown";
import { useAppSelector } from "@/hooks/redux";
import ProfileMain from "@/components/profile/ProfileMain";
import ProfileTab from "@/components/profile/ProfileTab";

type Props = { params: { slug: number } };

function ProfileUserPage({ params: { slug } }: Props) {
  const router = useRouter();
  const { data: userList, isLoading: isUserLoading, error } = useUserList(slug);
  const state = useAppSelector((state) => state);
  const userSeq = state.auth.userInfo?.userSeq;

  const PushtoProfileEdit = () => {
    router.push("/profile/edit");
  };

  const slugToNumber = +slug;

  if (isUserLoading) {
    return <div>로딩중...</div>;
  } else if (slugToNumber === userSeq) {
    return (
      <div className="w-full">
        <ProfileMain userSeq={slug} />
        <div className="flex py-2 items-center justify-center">
          <ProfileBtn btnUserSeq={slug} />
        </div>
        <ProfileTab value={true} onChange={() => {}} profileTabUserSeq={slug} />
      </div>
    );
  } else if (!userList) {
    return <div>존재하지 않는 유저입니다...</div>;
  } else {
    return (
      <div className="w-full ">
        <ProfileMain userSeq={slug} />
        <div className="flex py-2 items-center justify-center">
          <ProfileBtn btnUserSeq={slug} />
        </div>

        <ProfileTab value={true} onChange={() => {}} profileTabUserSeq={slug} />
      </div>
    );
  }
}

export default ProfileUserPage;
