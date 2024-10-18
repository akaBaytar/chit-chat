import { Conversation } from '@prisma/client';

const ConversationList = ({
  conversations,
}: {
  conversations: Conversation[];
}) => {
  return <div>conversation count: {conversations.length}</div>;
};

export default ConversationList;
