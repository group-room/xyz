"use client";

import React from "react";
import { useUserList } from "@/hooks/queries/user";
import ProfilePage from "../page";
import ProfileBtn from "@/components/profile/ProfileBtn";

type Props = { params: { slug: number } };

function ProfileUserPage({ params: { slug } }: Props) {
  // 나의 userSeq 와 slug 가 같을 때 << 나
  if (slug === 1) {
    return (
      <>
        <ProfilePage />
        <ProfileBtn userSeq={slug.toString()} />
      </>
    );
  } else {
    return (
      <>
        <ProfilePage />
        <ProfileBtn userSeq={slug.toString()} />
      </>
    );
  }
}

export default ProfileUserPage;
