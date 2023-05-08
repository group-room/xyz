"use client";

import Btn from "@/components/common/Btn";
import ProfileImg from "@/components/common/ProfileImg";
import { LOCAL } from "@/constants/localUrl";
import { useAppSelector } from "@/hooks/redux";
import useInput from "@/hooks/useInput";
import { UserTypes } from "@/types/user";
import React, { useEffect, useState } from "react";

function AzitCreatePage() {
  const [aztNameInput, onChangeAztNameInput] = useInput("");
  const [aztPhoto, setAztPhoto] = useState<File | null>(null);
  const [previewPhoto, setPreviewPhoto] = useState("");
  const [aztMembers, setAztMembers] = useState<UserTypes[]>([]);

  const state = useAppSelector((state) => state);
  const loggedInUserInfo = state.auth.userInfo;

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList: any = e.target.files;
    if (fileList) {
      const photo: File = fileList[0];
      setAztPhoto(photo);
      setPreviewPhoto(URL.createObjectURL(photo));
    }
  };

  const handleClickInvite = () => {};
  const handleClickCreate = () => {};

  useEffect(() => {
    if (
      loggedInUserInfo &&
      !aztMembers.find((member) => member.userSeq === loggedInUserInfo.userSeq)
    ) {
      setAztMembers([loggedInUserInfo]);
    }
  }, []);

  return (
    <div>
      <h2 className="text-lg mb-3">새 아지트 만들기</h2>
      <div className="flex flex-col gap-y-5">
        <div>
          <p>아지트 이름</p>
          <input
            type="text"
            autoFocus
            value={aztNameInput}
            onChange={onChangeAztNameInput}
            className="w-full border border-black rounded mt-2 px-2 py-1 "
          />
        </div>
        <div>
          <p>아지트 프로필 사진</p>
          <div className="w-full">
            <label
              htmlFor="input-file"
              className="w-full block bg-pink py-1 rounded border border-black text-center cursor-pointer mt-2"
            >
              {aztPhoto
                ? "ヘㅏ진 ㉰시 선택㉭ドブl"
                : "バr진을 첨부ぁĦ 주パㅔ요"}
            </label>
            <input
              type="file"
              id="input-file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>
          {previewPhoto && (
            <div className="my-5 mx-auto text-center">
              <img
                src={previewPhoto}
                alt="아지트 프로필 사진 미리보기"
                className="rounded border-2 border-black object-contain text-center max-w-full my-0 mx-auto"
              />
            </div>
          )}
        </div>
        <div>
          <p>아지트 멤버</p>
          <div className="my-3 mx-auto text-center">
            <div className="flex text-center gap-x-3 justify-center">
              {aztMembers.map(({ userSeq, profileImage }) => (
                <div key={userSeq}>
                  <ProfileImg imgSrc={profileImage} />
                </div>
              ))}
            </div>
            <div className="mt-3">
              {/* TODO: 멤버 초대하기 링크 연결 */}
              <Btn
                bgColor="blue"
                text="멤버 초대하기"
                btnFunc={handleClickInvite}
              />
            </div>
          </div>
        </div>
        <div>
          <Btn
            bgColor="yellow"
            text="아지트 생성하기"
            btnFunc={handleClickCreate}
            padding="py-2"
            className="w-full mt-5"
          />
        </div>
      </div>
    </div>
  );
}

export default AzitCreatePage;
