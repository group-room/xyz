import DateFilter from "@/components/memory/DateFilter/DateFilter";
import GroupFilter from "@/components/memory/GroupFilter";
import KakaoMap from "@/components/memory/KakaoMap";
import MemoryCreateBtn from "@/components/memory/MemoryCreateBtn";

export default function Home() {
  return (
    <section>
      <div className="flex flex-row justify-between gap-2">
        <DateFilter />
        <GroupFilter />
      </div>
      <div>현재 위치 기준으로 보기</div>
      <KakaoMap />
      <MemoryCreateBtn />
    </section>
  );
}
