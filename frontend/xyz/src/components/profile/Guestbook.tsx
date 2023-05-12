"use client";
import store from "@/store/store";
import { useVisitorList } from "@/hooks/queries/user";
import GuestbookItem from "./GuestbookItem";

interface GuestbookProps {
  userSeq: string | number | undefined;
}

function Guestbook({ userSeq }: GuestbookProps) {
  const state = store.getState();
  // const userSeq = state.auth.userInfo?.userSeq;
  const { data: visitorList, isLoading: isVisitorLoading } =
    useVisitorList(userSeq);

  console.log(visitorList, "visitorList333333");

  return (
    <section className="w-full h-[300px]">
      <div className="w-full h-full bg-cover bg-pink flex flex-col">
        {visitorList ? (
          visitorList.map((visitor) => (
            <GuestbookItem key={visitor.userSeq} visitor={visitor} />
          ))
        ) : (
          <div>
            <p>방명록이 없어요ㅠㅠ</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Guestbook;
