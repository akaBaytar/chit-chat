'use client';

import { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import { find } from 'lodash';

import MessageBox from './MessageBox';

import { pusherClient } from '@/libs/pusher';
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

  useEffect(() => {
    pusherClient.subscribe(conversationId);

    bottomRef.current?.scrollIntoView();

    const messageHandler = (message: MessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((current) => {
        if (find(current, { id: message.id })) return current;

        return [...current, message];
      });

      bottomRef.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: MessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) return newMessage;

          return currentMessage;
        })
      );
    };

    pusherClient.bind('messages:new', messageHandler);
    pusherClient.bind('message:update', updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);

      pusherClient.unbind('messages:new', messageHandler);
      pusherClient.unbind('message:update', updateMessageHandler);
    };
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
