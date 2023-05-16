"use client";
import { useMyMemoryList } from "@/hooks/queries/memory";

function MyMemoryList() {
  const { data: myMemoryList, isLoading: isMyMemoryLoading } =
    useMyMemoryList();
  console.log(myMemoryList, "myMemoryList");
  return <div>MyMemoryList</div>;
}

export default MyMemoryList;
