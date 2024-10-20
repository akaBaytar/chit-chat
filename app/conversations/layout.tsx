import Sidebar from '@/components/Sidebar';
import ConversationList from '@/components/ConversationList';

import { getUsers } from '@/actions/user.action';
import { getConversations } from '@/actions/conversation.action';

const ConversationsPageLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const users = await getUsers();
  const conversations = await getConversations();

  return (
    <Sidebar>
      <div className='h-full'>
        <ConversationList conversations={conversations} users={users} />
        {children}
      </div>
    </Sidebar>
  );
};

export default ConversationsPageLayout;
