import EmptyState from '@/components/EmptyState';
import ConversationHeader from '@/components/Header';
import ConversationBody from '@/components/Body';
import MessageForm from '@/components/Form';

import { getConversation } from '@/actions/conversation.action';
import { getMessages } from '@/actions/message.action';

const ConversationPage = async ({ params }: { params: { id: string } }) => {
  const conversation = await getConversation(params.id);
  const messages = await getMessages(params.id);

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
    <div className='relative lg:ps-80 h-full bg-white z-40 lg:-z-10'>
      <div className='flex flex-col h-full'>
        <ConversationHeader conversation={conversation} />
        <ConversationBody />
        <MessageForm />
      </div>
    </div>
  );
};

export default ConversationPage;
