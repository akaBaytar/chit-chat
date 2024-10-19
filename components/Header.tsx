'use client';

import { useMemo } from 'react';
import Link from 'next/link';

import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2';

import Avatar from './Avatar';
import useOtherUser from '@/hooks/useOtherUser';
import type { Header } from '@/types';

const ConversationHeader: React.FC<Header> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return 'Active';
  }, [conversation]);

  return (
    <header className='bg-white w-full flex justify-between items-center border-b-[1px] p-4 lg:px-6 shadow-sm'>
      <div className='flex items-center gap-3'>
        <Link
          href='/conversations'
          className='lg:hidden block text-amber-500 hover:text-amber-600 transition cursor-pointer z-40 mb-1'>
          <HiChevronLeft
            size={32}
          />
        </Link>
        <Avatar user={otherUser} />
        <div className='flex flex-col'>
          <p className='font-semibold'>{conversation.name || otherUser.name}</p>
          <p className='text-sm font-light text-gray-500 mb-2'>{statusText}</p>
        </div>
      </div>
      <HiEllipsisHorizontal
        size={32}
        onClick={() => {}}
        className='text-amber-500 hover:text-amber-600 transition cursor-pointer z-40 mb-1'
      />
    </header>
  );
};

export default ConversationHeader;
