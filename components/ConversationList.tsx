'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import { MdOutlineGroupAdd } from 'react-icons/md';

import ConversationBox from './ConversationBox';
import useConversation from '@/hooks/useConversation';

import type { Conversation } from '@prisma/client';

const ConversationList = ({
  conversations,
}: {
  conversations: Conversation[];
}) => {
  const [items, setItems] = useState<Conversation[]>(conversations);

  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

  return (
    <aside
      className={clsx(
        'fixed inset-y-0 pb-20 lg:pb-0 lg:start-20 lg:w-80 lg:block overflow-y-auto border-e border-gray-200',
        isOpen ? 'hidden' : 'block w-full start-0'
      )}>
      <div className='px-5'>
        <div className='flex justify-between mb-4 pt-5'>
          <h3 className='text-2xl font-bold text-gray-900'>Messages</h3>
          <div className='rounded-full p-2 bg-gray-100 text-gray-900 cursor-pointer hover:bg-amber-400 transition'>
            <MdOutlineGroupAdd size={21} />
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              conversation={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ConversationList;
