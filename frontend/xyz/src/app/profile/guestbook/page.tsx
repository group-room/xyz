import React from "react";
import ProfilePage from "../page";
import Tab from "@/components/Tab";

function GuestbookPage() {
  return (
    <div>
      <ProfilePage />
      <Tab
        FirstLink="/profile/myroom"
        SecondLink="/profile/guestbook"
        FirstMenu="마이룸"
        SecondMenu="방명록"
      />
      GuestbookPage
    </div>
  );
}

export default GuestbookPage;
