"use client";
import React from "react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KEYS } from "@/constants/queryKeys";
import { updateProfile } from "@/app/api/user";
import Btn from "../common/Btn";

function ProfileEdit() {
  const [nickname, setNickname] = useState<string>("");
  const [introduce, setIntroduce] = useState<string>("");
  const queryClient = useQueryClient();
  const useUpdateProfileMutation = useMutation({
    mutationFn: (formData: FormData) => updateProfile(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(KEYS.user);
      console.log("성공");
    },
  });

  const handleBtnClick = (e?: React.FormEvent): void => {
    e?.preventDefault();
    const formData = new FormData();
    // const stringifiedData = JSON.stringify({
    //   nickname: nickname,
    //   introduce: introduce,
    // });
    // const nickData = new Blob(JSON.stringify(nickname),
    // {
    //   type: "application/json",
    // });
    formData.append("nickname", JSON.stringify(nickname));
    formData.append("introduce", JSON.stringify(introduce));

    console.log(formData, "formData");

    // const jsonData = new Blob([stringifiedData], {
    //   type: "application/json",
    // });

    useUpdateProfileMutation.mutate(formData, {
      onSuccess: (data) => {
        console.log(data, "data");
        console.log(introduce, "introduce");
      },
    });
  };

  return (
    <div>
      <form action="" onSubmit={handleBtnClick}>
        <textarea
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="border-2 border-black"
        ></textarea>
        <textarea
          placeholder="자기소개 한마디"
          value={introduce}
          onChange={(e) => setIntroduce(e.target.value)}
          className="border-2 border-black"
        ></textarea>
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
