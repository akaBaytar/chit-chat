import EmptyState from '@/components/EmptyState';
import ConversationHeader from '@/components/Header';
import ConversationBody from '@/components/Body';
import MessageForm from '@/components/Form';

import { getConversation } from '@/actions/conversation.action';
import { getMessages } from '@/actions/message.action';

const ConversationPage = async ({
  params,
}: {
  params: { conversationId: string };
}) => {
  const conversation = await getConversation(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className='lg:ps-80 h-full'>
        <div className='flex flex-col h-full'>
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className='lg:ps-80 h-full'>
      <div className='flex flex-col h-full'>
        <ConversationHeader conversation={conversation} />
        <ConversationBody initialMessages={messages} />
        <MessageForm />
      </div>
    </div>
  );
};

export default ConversationPage;
