'use client';

import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';

import Avatar from './Avatar';
import GroupAvatar from './GroupAvatar';

import useOtherUser from '@/hooks/useOtherUser';

import type { ConversationBoxProps } from '@/types';

const ConversationBox = ({ conversation, selected }: ConversationBoxProps) => {
  const router = useRouter();
  const session = useSession();
  const otherUser = useOtherUser(conversation);

  const handleClick = useCallback(() => {
    router.push(`/conversations/${conversation.id}`);
  }, [router, conversation]);

  const lastMessage = useMemo(() => {
    const messages = conversation.messages || [];

    return messages[messages.length - 1];
  }, [conversation]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;

    const seenArray = lastMessage.seen || [];

    if (!userEmail) return false;

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) return 'Sent an image';

    if (lastMessage?.body) return lastMessage.body;

    return 'Started a conversation';
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        'w-full relative flex items-center gap-3 p-3 pt-5 hover:bg-gray-100 rounded-lg transition cursor-pointer shadow',
        selected ? 'bg-gray-100' : 'bg-white'
      )}>
      {conversation.isGroup ? (
        <GroupAvatar users={conversation.users} />
      ) : (
        <Avatar user={otherUser} />
      )}
      <div className='min-w-0 flex-1'>
        <div className='focus:outline-none'>
          <div className='flex justify-between items-center'>
            <p className='font-medium text-gray-900'>
              {conversation.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p className='text-xs text-gray-500 font-light'>
                {format(new Date(lastMessage.createdAt), 'p')}
              </p>
            )}
          </div>
          <p
            className={clsx(
              'truncate text-sm pb-3',
              hasSeen ? 'text-gray-500' : 'text-gray-900'
            )}>
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
