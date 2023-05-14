"use client";

import React from "react";
import { useUserList } from "@/hooks/queries/user";
import { useRouter } from "next/navigation";

import ProfilePage from "../page";
import ProfileBtn from "@/components/profile/ProfileBtn";
import DropDown from "@/components/memory/DropDown";
import ProfileDropDown from "@/components/profile/ProfileDropdown";
import { useAppSelector } from "@/hooks/redux";
import ProfileMain from "@/components/profile/ProfileMain";
import ProfileTab from "@/components/profile/ProfileTab";
import { sl } from "date-fns/locale";

type Props = { params: { slug: number | string } };

function ProfileUserPage({ params: { slug } }: Props) {
  const router = useRouter();
  const { data: userList, isLoading: isUserLoading, error } = useUserList(slug);
  const state = useAppSelector((state) => state);
  const userSeq = state.auth.userInfo?.userSeq;

  const PushtoProfileEdit = () => {
    router.push("/profile/edit");
  };
  // 나의 userSeq 와 slug 가 같을 때 === 나

  if (slug === userSeq?.toString()) {
    return (
      <div className="w-full h-full">
        <ProfileMain mainUserSeq={slug.toString()} />
        <div className="flex py-2 items-center justify-center">
          <ProfileBtn btnUserSeq={slug.toString()} />
        </div>
      </div>
    );
  }
  // else if (slug !== "1" && userList?.friend === true) {
  //   return <></>;
  // }
  else {
    return (
      <div className="w-full h-full">
        <ProfileMain mainUserSeq={slug.toString()} />
        <div className="flex py-2 items-center justify-center">
          <ProfileBtn btnUserSeq={slug.toString()} />
        </div>

        <ProfileTab
          value={true}
          onChange={() => {}}
          profileTabUserSeq={slug.toString()}
        />
      </div>
    );
  }
}

export default ProfileUserPage;
