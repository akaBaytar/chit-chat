import { NextResponse } from 'next/server';

import prisma from '@/database';
import getUser from '@/helpers/getUser';
import { pusherServer } from '@/libs/pusher';

export const DELETE = async (
  _: Request,
  { params }: { params: { conversationId: { conversationId?: string } } }
) => {
  try {
    const { conversationId } = params;

    const user = await getUser();

    if (!user?.id) return new NextResponse('Unauthorized.', { status: 401 });

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId as string,
      },

      include: {
        users: true,
      },
    });

    if (!conversation) {
      return new NextResponse('Conversation not found.', { status: 404 });
    }

    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId as string,
        userIds: {
          hasSome: [user.id],
        },
      },
    });

    conversation.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, 'conversation:delete', conversation);
      }
    });

    return NextResponse.json(deletedConversation);
  } catch (error) {
    console.error(error);

    return new NextResponse('An error occurred.', { status: 500 });
  }
};
