import Sidebar from '@/components/Sidebar';
import ConversationList from '@/components/ConversationList';

import { getConversations } from '@/actions/conversation.action';

import type { ConversationType } from '@/types';

const ConversationsPageLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const conversations = await getConversations();

  return (
    <Sidebar>
      <div className='h-full'>
        <ConversationList conversations={conversations as ConversationType[]} />
        {children}
      </div>
    </Sidebar>
  );
};

export default ConversationsPageLayout;
