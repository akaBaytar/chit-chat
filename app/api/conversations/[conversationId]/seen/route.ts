import { NextResponse } from 'next/server';

import prisma from '@/database';
import getUser from '@/helpers/getUser';
import { pusherServer } from '@/libs/pusher';

export const POST = async (
  _: Request,
  { params }: { params: { conversationId: { conversationId?: string } } }
) => {
  try {
    const user = await getUser();

    const { conversationId } = params;

    if (!user?.id) return new NextResponse('Unauthorized', { status: 401 });

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId as string,
      },

      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });

    if (!conversation) {
      return new NextResponse('Conversation not found.', { status: 404 });
    }

    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) return NextResponse.json(conversation);

    const updatedMessage = await prisma.message.update({
      where: {
        id: lastMessage.id,
      },

      data: {
        seen: {
          connect: {
            id: user.id,
          },
        },
      },

      include: {
        sender: true,
        seen: true,
      },
    });

    await pusherServer.trigger(user.email!, 'conversation:update', {
      id: conversationId,
      messages: [updatedMessage],
    });

    if (lastMessage.seenIds.indexOf(user.id) !== -1) {
      return NextResponse.json(conversation);
    }

    await pusherServer.trigger(
      conversationId as string,
      'message:update',
      updatedMessage
    );

    return NextResponse.json(updatedMessage);
  } catch (error) {
    console.error(error);

    return new NextResponse('An error occurred.', { status: 500 });
  }
};
