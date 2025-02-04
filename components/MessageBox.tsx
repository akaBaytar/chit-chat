import { useState } from 'react';
import Image from 'next/image';

import clsx from 'clsx';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';

import Avatar from './Avatar';
import ImageModal from './ImageModal';

import type { MessageType } from '@/types';

const MessageBox = ({
  message,
  isLast,
}: {
  message: MessageType;
  isLast?: boolean;
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const session = useSession();

  const isOwn = session.data?.user?.email === message.sender.email;

  const seenList = (message.seen || [])
    .filter((user) => user.email !== message.sender.email)
    .map((user) => user.name)
    .join(', ');

  const CN_container = clsx('flex gap-3 p-4', isOwn && 'justify-end');
  const CN_avatar = clsx(isOwn && 'order-2');
  const CN_body = clsx('flex flex-col gap-2', isOwn && 'items-end');
  const CN_message = clsx(
    'text-sm w-fit overflow-hidden',
    isOwn ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-900',
    message.image ? 'rounded-lg p-0' : 'rounded-lg py-1 px-3'
  );

  return (
    <div className={CN_container}>
      <div className={CN_avatar}>
        <Avatar user={message.sender} />
      </div>
      <div className={CN_body}>
        <div className='flex items-center gap-1 mt-2'>
          <p className='text-sm text-gray-500'>{message.sender.name}</p>
          <p className='text-xs text-gray-300'>
            {format(new Date(message.createdAt), 'p')}
          </p>
        </div>
        <div className={CN_message}>
          <ImageModal
            src={message.image as string}
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
          />
          {message.image ? (
            <Image
              src={message.image}
              height={140}
              width={140}
              alt='image'
              onClick={() => setModalOpen(true)}
              className='object-cover cursor-pointer hover:scale-105 transition'
            />
          ) : (
            <p>{message.body}</p>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <span className='text-xs text-gray-500 font-light -mt-1.5'>{`Seen by ${seenList}`}</span>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
