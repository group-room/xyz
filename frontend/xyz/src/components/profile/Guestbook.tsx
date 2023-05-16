"use client";
import { useAppSelector } from "@/hooks/redux";
import { useVisitorList } from "@/hooks/queries/user";
import GuestbookItem from "./GuestbookItem";

interface GuestbookProps {
  userSeq: number;
}

function Guestbook({ userSeq }: GuestbookProps) {
  const state = useAppSelector((state) => state);

  // const userSeq = state.auth.userInfo?.userSeq;
  const { data: visitorList, isLoading: isVisitorLoading } =
    useVisitorList(userSeq);

  console.log(visitorList, "visitorList333333");

  return (
    <section className="w-full h-full">
      <div className="w-full h-full min-h-[300px] bg-cover bg-pink flex flex-col">
        {visitorList && visitorList.length > 0 ? (
          visitorList.map((visitor) => (
            <GuestbookItem key={visitor.userSeq} visitor={visitor} />
          ))
        ) : (
          <div className=" text-white">방명록이 없어요ㅠㅠ</div>
        )}
      </div>
    </section>
  );
}

export default Guestbook;
