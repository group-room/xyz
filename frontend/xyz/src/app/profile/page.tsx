"use client";
import Modal from "@/components/Modal";
import Tab from "@/components/Tab";
import Textbox from "@/components/Textbox";
import React from "react";
import { useState } from "react";
import Link from "next/link";

function ProfilePage() {
  const [isModal, setIsModal] = useState(false);

  const handleClick = () => {
    setIsModal(true);
  };

  return (
    <div>
      <div onClick={handleClick}> ProfilePage</div>
      {isModal && (
        <Modal closeModal={() => setIsModal(false)}>
          {<div>친구하실래요?</div>}
        </Modal>
      )}
      <Textbox text="하이하이하이하이 이게너무궁금해" />
      <div
        className={`box-border flex items-center justify-center bg-opacity-80 rounded-full min-h-[45px] max-h-[80px] min-w-[288px] h-[6.9vh] max-w-[480px] w-[15vw] font-hopang-black text-3xl border-[4px] shadow-xl duration-[0.66s] hover:scale-105 mt-[1vh] cursor-pointer py-2 bg-gradient-to-br from-gray-200 to-gray-50 hover:from-gray-50 hover:to-gray-200`}
      >
        <Link href={"/api/user/login/google"}>구글 로그인</Link>
      </div>
      <div className=" overscroll-y-auto">
        MyroomPage Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Cumque praesentium placeat, sed voluptatem excepturi accusantium
        repellat temporibus, ex dignissimos dicta tempora aperiam quibusdam est
        delectus nam soluta, molestiae rerum doloremque! Lorem, ipsum dolor sit
        amet consectetur adipisicing elit. Pariatur ipsam tempora, quis
        molestias eos sint. Nemo quas, nisi sunt, nesciunt expedita harum ipsa
        totam voluptatibus ipsam sit laboriosam autem quo? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Quos quasi ducimus at enim tempora
        ipsum non voluptatem molestias quidem facere blanditiis minima dolores a
        eius, repudiandae incidunt ad vel libero. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Aliquid totam impedit labore ab
        accusantium consectetur maxime excepturi iure, sit nihil ratione vitae,
        magnam assumenda adipisci eveniet saepe natus officiis deleniti. Lorem,
        ipsum dolor sit amet consectetur adipisicing elit. Non quidem voluptate
        iure ut corrupti neque iusto, facere, libero vitae quisquam temporibus
        sit quos molestias consectetur rerum suscipit perspiciatis. Provident,
        quia. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Perferendis culpa accusantium quam dignissimos, harum delectus quo non
        ea sunt voluptatem, iure, ab ad obcaecati magnam! Suscipit esse cumque
        voluptatibus accusamus! MyroomPage Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Cumque praesentium placeat, sed
        voluptatem excepturi accusantium repellat temporibus, ex dignissimos
        dicta tempora aperiam quibusdam est delectus nam soluta, molestiae rerum
        doloremque! Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Pariatur ipsam tempora, quis molestias eos sint. Nemo quas, nisi sunt,
        nesciunt expedita harum ipsa totam voluptatibus ipsam sit laboriosam
        autem quo? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
        quasi ducimus at enim tempora ipsum non voluptatem molestias quidem
        facere blanditiis minima dolores a eius, repudiandae incidunt ad vel
        libero. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
        totam impedit labore ab accusantium consectetur maxime excepturi iure,
        sit nihil ratione vitae, magnam assumenda adipisci eveniet saepe natus
        officiis deleniti. Lorem, ipsum dolor sit amet consectetur adipisicing
        elit. Non quidem voluptate iure ut corrupti neque iusto, facere, libero
        vitae quisquam temporibus sit quos molestias consectetur rerum suscipit
        perspiciatis. Provident, quia. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Perferendis culpa accusantium quam dignissimos, harum
        delectus quo non ea sunt voluptatem, iure, ab ad obcaecati magnam!
        Suscipit esse cumque vo
      </div>
      {/* <Tab
        FirstLink="/profile/myroom"
        SecondLink="/profile/guestbook"
        FirstMenu="마이룸"
        SecondMenu="방명록"
      /> */}
    </div>
  );
}

export default ProfilePage;
