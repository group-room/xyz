"use client";

import React from "react";
import { useUserList } from "@/hooks/queries/user";
import { useRouter } from "next/navigation";

import ProfilePage from "../page";
import ProfileBtn from "@/components/profile/ProfileBtn";
import DropDown from "@/components/memory/DropDown";
import ProfileDropDown from "@/components/profile/ProfileDropdown";
import store from "@/store/store";
import ProfileMain from "@/components/profile/ProfileMain";

type Props = { params: { slug: number | string } };

function ProfileUserPage({ params: { slug } }: Props) {
  const router = useRouter();
  const state = store.getState();
  const userSeq = state.auth.userInfo?.userSeq;

  const { data: userList, isLoading: isUserLoading, error } = useUserList(slug);
  const PushtoProfileEdit = () => {
    router.push("/profile/edit");
  };
  // 나의 userSeq 와 slug 가 같을 때 === 나
  console.log(userList, "userList");
  if (slug === userSeq?.toString()) {
    return (
      <>
        <div>{userList && userList.identify}</div>
        <ProfileDropDown
          firstText="프로필 편집"
          firstFunc={PushtoProfileEdit}
        />
        {userList && <img src={userList.profileImage} alt="profileimg" />}
        <ProfileBtn userSeq={slug.toString()} />
      </>
    );
  }
  // else if (slug !== "1" && userList?.friend === true) {
  //   return <></>;
  // }
  else {
    return (
      <>
        <ProfileMain userSeq={slug.toString()} />
        <ProfileBtn userSeq={slug.toString()} />
      </>
    );
  }
}

export default ProfileUserPage;
