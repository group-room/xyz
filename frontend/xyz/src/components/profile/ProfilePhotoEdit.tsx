"use client";

import { useUserList } from "@/hooks/queries/user";
import React, { useEffect, useState, SetStateAction, Dispatch } from "react";

interface ProfilePhotoEditProps {
  ImgUrl: string;
  setImgUrl: Dispatch<SetStateAction<string>>;
  setIsProfileImgChanged: Dispatch<SetStateAction<boolean>>;
  setImgFile: Dispatch<SetStateAction<File | undefined>>;
  ImgFile: File | undefined;
}

function ProfilePhotoEdit({
  setImgUrl,
  ImgUrl,
  setIsProfileImgChanged,
  setImgFile,
  ImgFile,
}: ProfilePhotoEditProps) {
  const { data: userList, isLoading: isUserLoading, error } = useUserList(1);

  useEffect(() => {
    userList && setImgUrl(userList.profileImage);
  }, [userList]);

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setIsProfileImgChanged) {
      setIsProfileImgChanged(true);
    }
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      //   let image = window.URL.createObjectURL(file);
      setImgFile(file);
    }
  };

  const handleImgSubmit = () => {
    if (!ImgFile) return alert("이미지가 선택되지 않았습니다");
    setImgUrl(URL.createObjectURL(ImgFile));
  };

  console.log(ImgUrl, "ImgUrl");
  console.log(userList?.profileImage, "userList?.profileImage");
  return (
    <div>
      프로필사진
      <img src={ImgUrl} />
      <input
        type="file"
        id="profile-edit"
        accept="image/*"
        onChange={handleImgChange}
      />
      <button onClick={handleImgSubmit}>이미지 변경 미리보기</button>
    </div>
  );
}

export default ProfilePhotoEdit;
