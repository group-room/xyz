import React from "react";
import { useAztAvailableFriendList } from "@/hooks/queries/azt";
import MyFriendBox from "./MyFriendBox";
import Btn from "../common/Btn";
import { useRouter } from "next/navigation";
import { API } from "@/constants/queryKeys";
import { UserTypes } from "@/types/user";
import LoadingLottie from "../lottie/Loading";
import NotResultLottie from "../lottie/NotResult";

type Props = {
  slug: number;
  aztMembers: UserTypes[];
  handleClickMemberInvite: (
    nickname: string,
    profileImage: string,
    userSeq: number
  ) => void;
};

function MyFriendList({ slug, aztMembers, handleClickMemberInvite }: Props) {
  const { data: availableFriendList, isLoading } =
    useAztAvailableFriendList(slug);
  const router = useRouter();

  if (isLoading) {
    return (
      <div>
        <LoadingLottie />
      </div>
    );
  }

  if (!isLoading && availableFriendList && availableFriendList.length === 0) {
    return (
      <div className="text-center">
        <p className="p-5">
          <NotResultLottie />
          아직 친구가 없어요 ㅠㅠ
        </p>
        <Btn
          bgColor="blue"
          text={"친구 추가하러 가기"}
          btnFunc={() => router.push(`/${API.friend}`)}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="text-lg mb-2">내 친구 목록</div>
      <hr className="border-1 border-black mb-4"></hr>
      <div className="flex flex-col gap-y-3">
        {availableFriendList?.map(
          ({ identify, profileImage, nickname, userSeq }) => {
            return (
              <MyFriendBox
                aztMembers={aztMembers}
                key={identify}
                imgSrc={profileImage}
                nickname={nickname}
                identify={identify}
                userSeq={userSeq}
                handleClickMemberInvite={() =>
                  handleClickMemberInvite(nickname, profileImage, userSeq)
                }
              />
            );
          }
        )}
      </div>
    </div>
  );
}

export default MyFriendList;
