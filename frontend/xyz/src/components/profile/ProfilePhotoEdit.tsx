"use client";

import { useUserList } from "@/hooks/queries/user";
import React, { useEffect, useState, SetStateAction, Dispatch } from "react";
import { useAppSelector } from "@/hooks/redux";

interface ProfilePhotoEditProps {
  ImgUrl: string | undefined;
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
  const userSeq = useAppSelector((state) => state.auth.userInfo?.userSeq);
  const {
    data: userList,
    isLoading: isUserLoading,
    error,
  } = useUserList(userSeq!);

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

  // const handleImgSubmit = () => {
  //   if (!ImgFile) return alert("이미지가 선택되지 않았습니다");
  //   setImgUrl(URL.createObjectURL(ImgFile));
  // };

  const handleImgPreview = () => {
    if (!ImgFile) return alert("이미지가 선택되지 않았습니다");
    const reader = new FileReader();
    reader.onloadend = () => {
      const previewUrl = reader.result as string;
      setImgUrl(previewUrl);
    };
    reader.readAsDataURL(ImgFile);
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
      <button onClick={handleImgPreview}>확인</button>
    </div>
  );
}

export default ProfilePhotoEdit;
