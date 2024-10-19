'use server';

import prisma from '@/database';

export const getMessages = async (id: string) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId: id,
      },

      include: {
        sender: true,
        seen: true,
      },

      orderBy: {
        createdAt: 'asc',
      },
    });

    return messages;
  } catch (error) {
    console.error(error);

    return [];
  }
};
