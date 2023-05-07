import React from "react";
import { useUserList } from "@/hooks/queries/user";
import ProfilePage from "../page";

type Props = { params: { slug: number } };

function ProfileUserPage({ params: { slug } }: Props) {
  // 나의 userSeq 와 slug 가 같을 때 << 나
  if (slug !== 1) {
    <ProfilePage />;
    const { data: userList, isLoading: isUserLoading, error } = useUserList(1);
    if (!isUserLoading && userList) {
      console.log(userList, "userList");
    } else {
      const {
        data: userList,
        isLoading: isUserLoading,
        error,
      } = useUserList(slug);
      if (!isUserLoading && userList) {
        console.log(userList, "userList");
      }
    }
  }
  return (
    <div>
      <div>ProfileUserPage</div>
    </div>
  );
}
