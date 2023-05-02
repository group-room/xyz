import Image from "next/image";
import Link from "next/link";
import KakaoLogin from "../../public/images/login/kakao_login.png";
import GoogleLogin from "../../public/images/login/google_login.png";
import Rectangle from "../../public/icons/rectangle.svg";
import Close from "../../public/icons/close.svg";
import Logo from "../../public/images/logo.svg";

export default function Home() {
  return (
    <section>
      <div className="flex flex-row-reverse py-3 gap-2 pr-2 rounded-t-md fixed top-0 left-0 border border-black bg-blue w-full ">
        <div className="">
          <Image src={Close} alt="닫기" width={20} height={20} />
        </div>
        <div className="">
          <Image src={Rectangle} alt="최대화" width={20} height={20} />
        </div>
        <div className=" border-b-2 border-black w-5 "></div>
      </div>

      <div className=" fixed top-[242px] left-[82px] items-center justify-center w-full h-full">
        <Image src={Logo} alt="로고" />
      </div>
      <Link href={"https://xyz-gen.com/backend/api/user/login/kakao"}>
        <div className=" fixed top-[439px] left-[69px] w-[255px] h-[66px] rounded-[5px] bg-[#fddc3f] border border-black ">
          <div className="fixed top-[459px] w-[320px] h-16 text-xl text-center text-black">
            카카오 로그인
          </div>
        </div>
      </Link>
      <Link href={"https://xyz-gen.com/backend/api/user/login/naver"}>
        <div className=" fixed top-[525px] left-[69px] w-[255px] h-[66px] rounded-[5px] bg-[#1dc800] border border-black">
          <div className="w-[191px] h-16 text-xl text-center text-white">
            네이버 로그인
          </div>
        </div>
      </Link>
      <Link href={"https://xyz-gen.com/backend/api/user/login/google"}>
        <div className=" fixed top-[621px] left-[69px] w-[255px] h-[66px] rounded-[5px] bg-white border border-black">
          <div className="w-[191px] h-16 text-xl text-center text-black">
            구글 로그인
          </div>
        </div>
      </Link>
    </section>
  );
}
