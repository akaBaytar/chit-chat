import Image from 'next/image';

import type { User } from '@prisma/client';

const GroupAvatar = ({ users = [] }: { users?: User[] }) => {
  const slicedUsers = users.slice(0, 3);

  const positions = {
    0: 'top-0 left-[12px]',
    1: 'bottom-0',
    2: 'bottom-0 right-0',
  };

  return (
    <div className='relative h-11 w-11 mb-2'>
      {slicedUsers.map((user, idx) => (
        <div
          key={user.id}
          className={`absolute inline-block ${
            positions[idx as keyof typeof positions]
          }`}>
          <Image
            src={user?.image || '/user.png'}
            alt='Avatar'
            width={22}
            height={22}
            className='rounded-full'
          />
        </div>
      ))}
    </div>
  );
};

export default GroupAvatar;
