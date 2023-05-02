import Image from "next/image";
import Link from "next/link";
import KakaoLogin from "../../public/images/login/kakao_login.png";
import GoogleLogin from "../../public/images/login/google_login.png";
import NaverLogin from "../../public/images/login/naver_login.png";

export default function Home() {
  return (
    <section>
      <div className="m-10">
        <Link href={"https://xyz-gen.com/backend/api/user/login/kakao"}>
          <Image src={KakaoLogin} alt="카카오로그인" width={800} height={240} />
        </Link>
      </div>
      <div className="m-10">
        <Link href={"https://xyz-gen.com/backend/api/user/login/google"}>
          <Image src={GoogleLogin} alt="구글로그인" width={800} height={240} />
        </Link>
      </div>
      <div className="m-10">
        <Link href={"https://xyz-gen.com/backend/api/user/login/naver"}>
          <Image src={NaverLogin} alt="네이버로그인" width={800} height={240} />
        </Link>
      </div>
    </section>
  );
}
