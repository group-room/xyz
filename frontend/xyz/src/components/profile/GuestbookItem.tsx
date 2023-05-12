"use client";
import { VisitorTypes } from "@/types/user";

interface GuestbookItemProps {
  visitor: VisitorTypes;
}

function GuestbookItem({ visitor }: GuestbookItemProps) {
  return (
    <>
      <div className="border-2 border-white w-90% h-10% m-2 px-2 rounded">
        <div className=" text-white">
          {visitor.content} <br></br>
          {visitor.nickname}
        </div>
      </div>
    </>
  );
}

export default GuestbookItem;
