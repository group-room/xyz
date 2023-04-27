import ProfileImg from './../common/ProfileImg';
import Image from 'next/image';

export default function TimecapsuleList() {
  return (
    <div className='flex overflow-x-auto scrollbar-hide '>
      <div className='relative flex flex-col items-center justify-center shrink-0 mr-2'>
        <div className='absolute top-0 left-1'>
          <Image src="/icons/lock-gray.svg" alt="icon" width={15} height={15} />
        </div>
        <ProfileImg />
        <div>D-Day</div>
      </div>

      <div className='flex flex-col items-center justify-center shrink-0 mr-2'>
        <ProfileImg />
        <div>D-1</div>
      </div>
      <div className='flex flex-col items-center justify-center shrink-0 mr-2'>
        <ProfileImg />
        <div>D-2</div>
      </div>
      <div className='flex flex-col items-center justify-center shrink-0 mr-2'>
        <ProfileImg />
        <div>D-3</div>
      </div>
      <div className='flex flex-col items-center justify-center shrink-0 mr-2'>
        <ProfileImg />
        <div>D-4</div>
      </div>
      <div className='flex flex-col items-center justify-center shrink-0 mr-2'>
        <ProfileImg />
        <div>D-5</div>
      </div>
      <div className='flex flex-col items-center justify-center shrink-0 mr-2'>
        <ProfileImg />
        <div>D-6</div>
      </div>
      <div className='flex flex-col items-center justify-center shrink-0 mr-2'>
        <ProfileImg />
        <div>D-7</div>
      </div>
      <div className='flex flex-col items-center justify-center shrink-0 mr-2'>
        <ProfileImg />
        <div>D-8</div>
      </div>
    </div>
  );
}

