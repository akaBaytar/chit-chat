import { NextResponse } from 'next/server';

import prisma from '@/database';
import getUser from '@/helpers/getUser';

export const POST = async (request: Request) => {
  try {
    const user = await getUser();

    const body = await request.json();

    const { message, image, conversationId } = body;

    if (!user?.id) return new NextResponse('Unauthorized.', { status: 401 });

    const newMessage = await prisma.message.create({
      data: {
        body: message,
        image: image,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: user.id,
          },
        },
        seen: {
          connect: {
            id: user.id,
          },
        },
      },

      include: {
        seen: true,
        sender: true,
      },
    });

    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },

      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },

      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    return NextResponse.json(newMessage);
    
  } catch (error) {
    console.error(error);

    return new NextResponse('An error occurred.', { status: 500 });
  }
};
