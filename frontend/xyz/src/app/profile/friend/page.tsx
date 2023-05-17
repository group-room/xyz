"use client";

import React, { useState } from "react";
import FriendList from "@/components/friend/FriendList";
import ProfileDropDown from "@/components/profile/ProfileDropdown";

export default function ProfileFriend() {
  const [isBlock, setIsBlock] = useState(false);

  return (
    <div>
      <div className="absolute right-8 top-16">
        <ProfileDropDown
          firstText={isBlock ? "친구 목록" : "차단한 친구 목록"}
          firstFunc={isBlock ? () => setIsBlock(false) : () => setIsBlock(true)}
        />
      </div>
      <FriendList isBlock={isBlock} />
    </div>
  );
}
