"use client";

import React from "react";
import Btn from "../common/Btn";
import { useRouter } from "next/navigation";
import { useUserList } from "@/hooks/queries/user";
import ModalBtn from "../common/ModalBtn";
import { useState } from "react";
import { useAppSelector } from "@/hooks/redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postFollow, putCancelFollow, deleteBlock } from "@/app/api/friend";
import { KEYS } from "@/constants/queryKeys";

type Props = { btnUserSeq: number };

function ProfileBtn({ btnUserSeq }: Props) {
  console.log(typeof btnUserSeq);
  const queryClient = useQueryClient();

  const state = useAppSelector((state) => state);
  const myUserSeq = state.auth.userInfo?.userSeq;
  const myProfileImage = state.auth.userInfo?.profileImage;
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
  const useMakeFriendsMutation = useMutation({
    mutationFn: () => postFollow(btnUserSeq),
    onSuccess: () => {
      queryClient.invalidateQueries(KEYS.friend);
    },
  });

  const MakeFriends = useMakeFriendsMutation.mutate;

  const useDeleteFriendRequestMutation = useMutation({
    mutationFn: () => putCancelFollow(btnUserSeq),
    onSuccess: () => {
      queryClient.invalidateQueries(KEYS.friend);
      console.log("친구 요청 취소");
    },
  });

  const DeleteFriendRequest = useDeleteFriendRequestMutation.mutate;
  const AcceptFriendRequest = () => {
    router.push("/notification");
  };

  let compareSeq;
  if (typeof btnUserSeq === "string") {
    compareSeq = +btnUserSeq;
  } else {
    compareSeq = btnUserSeq;
  }
  if (compareSeq === myUserSeq) {
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
  } else if (userList?.friend === true) {
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
  } else if (userList?.friendRequest === true) {
    return (
      <>
        <Btn width="168" bgColor="blue" text="수락 대기중" btnFunc={() => {}} />
        <Btn
          width="168"
          bgColor="blue"
          text="친구 요청 취소"
          btnFunc={DeleteFriendRequest}
          // 추후에 친구 완성 되면 친구 요청 취소 함수 연결
        />
      </>
    );
  } else if (userList?.friendResponse === true) {
    return (
      <>
        <Btn
          width="300"
          bgColor="blue"
          text="친구요청 수락하기"
          btnFunc={AcceptFriendRequest}
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
