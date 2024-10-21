'use client';

import Image from 'next/image';

import type { User } from '@prisma/client';

const Avatar = ({ user }: { user: User }) => {
  return (
    <div className='relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11'>
      <Image
        src={user?.image || '/user.png'}
        alt='Avatar'
        width={44}
        height={44}
      />
    </div>
  );
};

export default Avatar;
