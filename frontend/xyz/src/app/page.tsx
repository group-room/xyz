import DateFilter from "@/components/memory/DateFilter/DateFilter";
import AztFilter from "@/components/memory/AztFilter";
import KakaoMap from "@/components/memory/KakaoMap";
import MemoryCreateBtn from "@/components/memory/MemoryCreateBtn";

export default function Home() {
  return (
    <section>
      <div className="flex flex-row justify-between gap-2 mb-3">
        <DateFilter />
        <AztFilter />
      </div>
      <KakaoMap />
      <MemoryCreateBtn />
    </section>
  );
}
