'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import axios from 'axios';

import Avatar from './Avatar';
import LoadingModal from './LoadingModal';

import type { User } from '@prisma/client';

const UserBox = ({ user }: { user: User }) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleClick = useCallback(() => {
    setIsLoading(true);
    axios
      .post('/api/conversations', { userId: user.id })
      .then(({ data }) => router.push(`/conversations/${data.id}`))
      .finally(() => setIsLoading(false));
  }, [router, user]);

  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className='relative w-ful flex items-center gap-3 p-3 pt-5 bg-white hover:bg-gray-100 rounded-lg transition cursor-pointer shadow'>
        <Avatar user={user} />
        <div className='min-w-0 flex-1'>
          <div className='focus:outline-none'>
            <div className='flex justify-between items-center'>
              <p className='font-medium text-gray-900'>{user.name}</p>
            </div>
            <p className='truncate text-sm pb-3 text-gray-500'>{user.email}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
