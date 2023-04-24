import React from "react";
import Image from "next/image";
import Link from "next/link";
import LogoImg from "../assets/logo.svg";
import FriendIcon from "../assets/icon/user_plus.svg";
import NotiIcon from "../assets/icon/notification.svg";

function Header() {
  return (
    <header>
      <nav className="fixed flex items-center justify-between top-0 left-0 right-0 bg-white px-5 py-4 shadow-sm shadow-slate-50 h-14">
        <Link href={"/"}>
          <Image src={LogoImg} alt="xyz 로고" width={80} height={24} />
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
