import KakaoMap from "@/components/memory/KakaoMap";

export default function Home() {
  return (
    <section>
      <div className="flex justify-between">
        <div>날짜</div>
        <div>그룹</div>
      </div>
      <div>현재 위치 기준으로 보기</div>
      <KakaoMap />
    </section>
  );
}
