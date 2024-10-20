'use client';

import Image from 'next/image';

import type { User } from '@prisma/client';

const Avatar = ({ user }: { user: User }) => {
  return (
    <div className='relative'>
      <div className='relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11'>
        <Image
          src={user?.image || '/user.png'}
          alt='Avatar'
          width={44}
          height={44}
        />
      </div>
      <span className='absolute block rounded-full ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3 bg-emerald-500' />
    </div>
  );
};

export default Avatar;
