'use client'

import React, { useState } from 'react'
import Image from 'next/image';
import SearchImg from './../../../public/icons/search.svg'

export default function SearchBar() {
  const [userInput, setUserInput] = useState(""); // 입력받은 값

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUserInput(event.target.value); 
    console.log(`User entered: ${userInput}`); 
  }

  return (
    <div className='flex flex-row h-10'>
      <div className='border-y-2 border-l-2 rounded-l-md border-black basis-4/5 pl-4'>
        <input className='w-full h-full hover:outline-none' type="text" placeholder='input' value={userInput} onChange={handleInputChange}/>
      </div>
      <div className='flex border-2 rounded-r-md border-black basis-1/5 items-center justify-center bg-yellow'>
        <Image src={SearchImg} alt="searchImg" />
      </div>
    </div>
  );
}

