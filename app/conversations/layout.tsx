import Sidebar from '@/components/Sidebar';
import ConversationList from '@/components/ConversationList';

import { getConversations } from '@/actions/conversation.action';

import type { Conversation } from '@prisma/client';

const ConversationsPageLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const conversations = await getConversations();

  return (
    <Sidebar>
      <div className='h-full'>
        <ConversationList conversations={conversations as Conversation[]} />
        {children}
      </div>
    </Sidebar>
  );
};

export default ConversationsPageLayout;
