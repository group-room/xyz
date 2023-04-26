import Image from 'next/image';
import { useState } from 'react';

export default function Notification() {
  const [isFriend, setIsFriend] = useState(false);

  return (
    <div className='w-full mt-4 border-2 border-black rounded-md'>
      <div className='flex border-b-2 border-black h-10 w-full'>
        <div className='flex items-center justify-center w-14 border-r-2 border-black bg-slate-300'>
          <p>마이룸</p>
        </div>
        <div className='w-[250px] flex items-center justify-center'><p>ㅇㅇㅇ님이 마이룸 알림입니다.</p></div>
        <div className='w-10 border-l-2 border-black flex items-center justify-center bg-slate-300'>
          <Image src="/icons/check.svg" alt="checkImg" width={20} height={20} />
        </div>
      </div>

      { !isFriend ?         
        <div className='flex h-10 items-center justify-center'>
          <div className='flex items-center justify-center w-1/3 h-10 border-r-2 border-black bg-yellow'>수락</div>
          <div className='flex items-center justify-center w-1/3 h-10 border-r-2 border-black bg-pink'>거절</div>
          <div className='flex items-center justify-center w-1/3 bg-slate-100 h-10'>차단</div>
        </div> :
        <div className='flex items-center justify-center  h-10 w-full'>
          <div className='flex items-center justify-center w-1/2 h-10 border-r-2 border-black bg-yellow'>
            <p>마이룸으로</p>
          </div>
          <div className='flex items-center justify-center w-1/2 h-10 bg-slate-100'>확인</div>
        </div>      
      }

    </div>
  );
}

