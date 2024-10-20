'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import { MdOutlineGroupAdd } from 'react-icons/md';

import GroupChatModal from './GroupChatModal';
import ConversationBox from './ConversationBox';

import useConversation from '@/hooks/useConversation';

import type { User } from '@prisma/client';
import type { ConversationType } from '@/types';

const ConversationList = ({
  conversations,
  users,
}: {
  conversations: ConversationType[];
  users: User[];
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState<ConversationType[]>(conversations);

  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={clsx(
          'fixed inset-y-0 pb-20 lg:pb-0 lg:start-20 lg:w-80 lg:block overflow-y-auto border-e border-gray-200',
          isOpen ? 'hidden' : 'block w-full start-0'
        )}>
        <div className='px-5'>
          <div className='flex justify-between mb-4 pt-5'>
            <h3 className='text-2xl font-bold text-gray-900'>Messages</h3>
            <div
              onClick={() => setIsModalOpen(true)}
              className='rounded-full p-2 bg-gray-100 text-gray-900 cursor-pointer hover:bg-amber-500 transition'>
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          <div className='flex flex-col gap-3 lg:mt-8'>
            {items.length > 0 ? (
              items.map((item) => (
                <ConversationBox
                  key={item.id}
                  conversation={item}
                  selected={conversationId === item.id}
                />
              ))
            ) : (
              <>
                <p className='text-lg'>No conversations found.</p>
                <Link href='/users' className='text-sm underline -mt-1'>
                  Click to start a new conversation.
                </Link>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
