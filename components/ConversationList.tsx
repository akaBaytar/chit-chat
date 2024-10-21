'use client';

import { useEffect, useMemo, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import { find } from 'lodash';
import { useSession } from 'next-auth/react';
import { MdOutlineGroupAdd } from 'react-icons/md';

import GroupChatModal from './GroupChatModal';
import ConversationBox from './ConversationBox';

import { pusherClient } from '@/libs/pusher';
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

  const session = useSession();

  const { conversationId, isOpen } = useConversation();

  const email = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!email) return;

    pusherClient.subscribe(email);

    const newHandler = (conversation: ConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) return current;

        return [conversation, ...current];
      });
    };

    const updateHandler = (conversation: ConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return { ...currentConversation, messages: conversation.messages };
          }

          return currentConversation;
        })
      );
    };

    const deleteHandler = (conversation: ConversationType) => {
      setItems((current) => {
        return [...current.filter((c) => c.id !== conversation.id)];
      });

      if (conversationId === conversation.id) {
        router.push('/conversations');
      }
    };

    pusherClient.bind('conversation:new', newHandler);
    pusherClient.bind('conversation:update', updateHandler);
    pusherClient.bind('conversation:delete', deleteHandler);

    return () => {
      pusherClient.unsubscribe(email);

      pusherClient.unbind('conversation:new', newHandler);
      pusherClient.unbind('conversation:update', updateHandler);
      pusherClient.unbind('conversation:delete', deleteHandler);
    };
  }, [conversationId, email, router]);

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
