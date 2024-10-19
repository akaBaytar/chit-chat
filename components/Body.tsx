'use client';

import { useEffect, useRef, useState } from 'react';

import axios from 'axios';

import MessageBox from './MessageBox';
import useConversation from '@/hooks/useConversation';

import type { MessageType } from '@/types';

const ConversationBody = ({
  initialMessages,
}: {
  initialMessages: MessageType[];
}) => {
  const [messages, setMessages] = useState(initialMessages);

  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  return (
    <div className='flex-1 overflow-y-auto px-6 py-4'>
      {messages.map((message, idx) => (
        <MessageBox
          key={idx}
          message={message}
          isLast={idx === messages.length - 1}
        />
      ))}
      <div ref={bottomRef} className='pt-24' />
    </div>
  );
};

export default ConversationBody;
