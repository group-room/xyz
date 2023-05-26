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
  // console.log(userList, "userList-ProfileEdit");
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
    // console.log(formData, "formData");

    if (isProfileImgChanged) {
      formData.append("profileImage", ImgFile as Blob);
    }

    useUpdateProfileMutation.mutate(formData, {
      onSuccess: (data) => {
        // console.log(data, "data");
        router.push("/profile");
      },
    });
  };

  return (
    <div>
      <div className="flex gap-3 item-center justify-center text-xl border p-3 border-black bg-blue rounded mt-20">
        프로필 수정하기
      </div>
      <form
        action=""
        onSubmit={handleBtnClick}
        className="flex flex-col justify-center align-middle gap-y-5 mt-5 "
      >
        <div className="flex justify-center align-middle gap-3">
          <textarea
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="border border-black rounded p-1 resize-none"
          ></textarea>
          <textarea
            placeholder="자기소개 한마디"
            value={introduce}
            onChange={(e) => setIntroduce(e.target.value)}
            className="border border-black rounded p-1 resize-none"
          ></textarea>
        </div>
        <ProfilePhotoEdit
          setImgUrl={setImgUrl}
          ImgUrl={ImgUrl}
          setIsProfileImgChanged={setIsProfileImgChanged}
          setImgFile={setImgFile}
          ImgFile={ImgFile}
        />

        <Btn
          width="w-full"
          bgColor="blue"
          text="수&nbsp;&nbsp;정"
          btnFunc={handleBtnClick}
        />
      </form>
    </div>
  );
}

export default ProfileEdit;
