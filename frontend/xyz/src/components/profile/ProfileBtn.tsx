"use client";

import React from "react";
import Btn from "../common/Btn";
import { useRouter } from "next/navigation";
import { useUserList } from "@/hooks/queries/user";
import ModalBtn from "../common/ModalBtn";
import { useState } from "react";
import { useAppSelector } from "@/hooks/redux";

type Props = { btnUserSeq: string | number | undefined };

function ProfileBtn({ btnUserSeq }: Props) {
  const state = useAppSelector((state) => state);
  const myUserSeq = state.auth.userInfo?.userSeq;
  const router = useRouter();
  const [isModal, setIsModal] = useState(false);
  const {
    data: userList,
    isLoading: isUserLoading,
    error,
  } = useUserList(btnUserSeq);

  const PushtoProfileFriend = () => {
    router.push("/profile/friend");
  };
  const PushtoProfileMypage = () => {
    router.push("/profile/mypage");
  };
  const MakeFriends = () => {
    // 추후에 친구 신청을 누르면 친구 신청이 감 (query 만들어놓으면 연결)
  };

  if (btnUserSeq === myUserSeq) {
    return (
      <div className="flex justify-start items-start relative gap-[15px]">
        <Btn
          className="w-[168px] h-[50px]"
          bgColor="blue"
          text="친구"
          btnFunc={PushtoProfileFriend}
        />
        <Btn
          className="w-[168px] h-[50px]"
          bgColor="blue"
          text="나의 활동"
          btnFunc={PushtoProfileMypage}
        />
      </div>
    );
  } else if (btnUserSeq !== myUserSeq && userList?.friend === true) {
    return (
      <>
        <Btn
          width="300"
          bgColor="blue"
          text={`친구 된 지 ${userList.friendTime}일 째`.toString()}
          btnFunc={() => {}}
          // 추후에 축하합니다 css 같은거 three.js 로 넣을 수 있으면 더 좋음
        />
      </>
    );
  } else if (btnUserSeq !== myUserSeq && userList?.friendRequest === true) {
    return (
      <>
        <Btn width="168" bgColor="blue" text="수락 대기중" btnFunc={() => {}} />
        <Btn
          width="168"
          bgColor="blue"
          text="친구 요청 취소"
          btnFunc={() => {}}
          // 추후에 친구 완성 되면 친구 요청 취소 함수 연결
        />
      </>
    );
  } else if (btnUserSeq !== myUserSeq && userList?.friendResponse === true) {
    return (
      <>
        <Btn
          width="300"
          bgColor="blue"
          text="친구요청 수락하기"
          btnFunc={() => {}}
          // 추후에 알림 완성 되면 친구 요청 수락 알림 페이지로 이동
        />
      </>
    );
  } else {
    return (
      <div className="w-full h-full">
        <button
          type="button"
          onClick={() => setIsModal(true)}
          className={`${300} bg-blue rounded px-3 py-1 drop-shadow-md border border-black`}
        >
          친구 신청하기
        </button>
        {isModal && (
          <ModalBtn
            closeModal={() => setIsModal(false)}
            yesFunc={MakeFriends}
            text="친구 요청을 보내시겠습니까?"
          />
        )}
      </div>
    );
  }
}

export default ProfileBtn;
