import React from "react";
import { useAztAvailableFriendList } from "@/hooks/queries/azt";
import MyFriendBox from "./MyFriendBox";
import Btn from "../common/Btn";
import { useRouter } from "next/navigation";
import { API } from "@/constants/queryKeys";

type Props = {
  slug: number;
};

function MyFriendList({ slug }: Props) {
  const { data: availableFriendList, isLoading } =
    useAztAvailableFriendList(slug);
  if (availableFriendList) {
    // console.log(slug);
    console.log(availableFriendList);
  }
  const handleClickInvite = (e: React.MouseEvent) => {
    console.log("초대하기");
  };
  const router = useRouter();

  return (
    <div>
      <div className="text-lg mb-2">내 친구 목록</div>
      <hr className="border-1 border-black mb-4"></hr>
      {availableFriendList ? (
        availableFriendList.length > 0 ? (
          availableFriendList?.map((list) => {
            return (
              <MyFriendBox
                key={list.identify}
                imgSrc={list.profileImage}
                nickname={list.nickname}
                identify={list.identify}
                userSeq={list.userSeq}
                handleClickInvite={handleClickInvite}
              />
            );
          })
        ) : (
          <div className="text-center">
            <p className="p-5">아직 친구가 없어요 ㅠㅠ</p>
            <Btn
              bgColor="blue"
              text={"친구 추가하러 가기"}
              btnFunc={() => router.push(`/${API.friend}`)}
            />
          </div>
        )
      ) : (
        <div>로딩중</div>
      )}
    </div>
  );
}

export default MyFriendList;
