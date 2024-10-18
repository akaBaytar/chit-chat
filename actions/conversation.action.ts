'use server';

import prisma from '@/database';

import getUser from '@/helpers/getUser';

export const getConversations = async () => {
  const user = await getUser();

  if (!user?.id) return [];

  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        userIds: {
          has: user.id,
        },
      },

      orderBy: {
        lastMessageAt: 'desc',
      },

      include: {
        users: true,
        messages: {
          include: {
            seen: true,
            sender: true,
          },
        },
      },
    });

    return conversations;
  } catch (error) {
    console.error(error);

    return [];
  }
};
