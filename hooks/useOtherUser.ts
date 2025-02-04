import { useMemo } from 'react';
import { useSession } from 'next-auth/react';

import type { User } from '@prisma/client';
import type { ConversationType } from '@/types';

const useOtherUser = (conversation: ConversationType | { users: User[] }) => {
  const session = useSession();

  const otherUser = useMemo(() => {
    const currentUserEmail = session.data?.user?.email;

    const otherUser = conversation.users.filter(
      (user: User) => user.email !== currentUserEmail
    );

    return otherUser[0];
  }, [conversation.users, session.data?.user?.email]);

  return otherUser;
};

export default useOtherUser;
