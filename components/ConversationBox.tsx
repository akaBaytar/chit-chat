'use client';

import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { format } from 'date-fns';

import type { ConversationBoxProps } from '@/types';
import type { Conversation, Message, User } from '@prisma/client';

const ConversationBox = ({ conversation, selected }: ConversationBoxProps) => {
  return <div>box</div>;
};

export default ConversationBox;
