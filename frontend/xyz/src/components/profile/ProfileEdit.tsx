"use client";
import React from "react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KEYS } from "@/constants/queryKeys";
import { updateProfile } from "@/app/api/user";
import Btn from "../common/Btn";
import { useUserList } from "@/hooks/queries/user";
import ProfilePhotoEdit from "./ProfilePhotoEdit";
import { useAppSelector } from "@/hooks/redux";
import { useRouter } from "next/navigation";

function ProfileEdit() {
  const router = useRouter();
  const userSeq = useAppSelector((state) => state.auth.userInfo?.userSeq);
  const {
    data: userList,
    isLoading: isUserLoading,
    error,
  } = useUserList(userSeq!);
  console.log(userList, "userList-ProfileEdit");
  const [ImgUrl, setImgUrl] = useState<string>(userList?.profileImage || "");
  const [ImgFile, setImgFile] = useState<File>();
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string>(userList?.nickname || "");
  const [introduce, setIntroduce] = useState<string>(userList?.introduce || "");
  const [isProfileImgChanged, setIsProfileImgChanged] =
    useState<boolean>(false);
  const queryClient = useQueryClient();
  const useUpdateProfileMutation = useMutation({
    mutationFn: (formData: FormData) => updateProfile(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(KEYS.user);
    },
  });

  const handleBtnClick = (e?: React.FormEvent): void => {
    e?.preventDefault();
    const formData = new FormData();
    const stringifiedData = JSON.stringify({
      nickname: nickname,
      introduce: introduce,
    });
    const jsonData = new Blob([stringifiedData], {
      type: "application/json",
    });
    formData.append("profileRequest", jsonData);
    console.log(formData, "formData");

    if (isProfileImgChanged) {
      formData.append("profileImage", ImgFile as Blob);
    }

    useUpdateProfileMutation.mutate(formData, {
      onSuccess: (data) => {
        console.log(data, "data");
        router.push("/profile");
      },
    });
  };

  return (
    <div>
      <form action="" onSubmit={handleBtnClick}>
        <textarea
          placeholder="닉네임"
          // value={nickname}
          value={nickname === "" ? userList?.nickname : nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="border-2 border-black"
        ></textarea>
        <textarea
          placeholder="자기소개 한마디"
          value={introduce === "" ? userList?.introduce : introduce}
          onChange={(e) => setIntroduce(e.target.value)}
          className="border-2 border-black"
        ></textarea>
        <ProfilePhotoEdit
          setImgUrl={setImgUrl}
          ImgUrl={ImgUrl}
          setIsProfileImgChanged={setIsProfileImgChanged}
          setImgFile={setImgFile}
          ImgFile={ImgFile}
        />
        <br />
        <br />
        <br />
        <br />
        <br />

        <Btn
          width="w-full"
          bgColor="blue"
          text="수정"
          btnFunc={handleBtnClick}
        />
      </form>
    </div>
  );
}

export default ProfileEdit;
