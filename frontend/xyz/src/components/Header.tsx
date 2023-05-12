import React from "react";
import Image from "next/image";
import Link from "next/link";
import LogoImg from "../../public/images/logo.svg";
import FriendIcon from "../../public/icons/user_plus.svg";
import NotiIcon from "../../public/icons/notification.svg";

function Header() {
  return (
    <header>
      <nav className="fixed flex items-center justify-between top-0 left-0 right-0 bg-white px-5 py-4 shadow-sm shadow-slate-50 h-14 z-50">
        <Link href={"/memory"}>
          <Image
            src={LogoImg}
            alt="xyz 로고"
            width="0"
            height="0"
            className="w-[80px] h-[24px]"
          />
        </Link>
        <div className="flex gap-x-4">
          <Link href={"/friend"}>
            <Image src={FriendIcon} alt="xyz 로고" width={24} />
          </Link>
          <Link href={"/notification"}>
            <Image src={NotiIcon} alt="xyz 로고" width={20} />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
