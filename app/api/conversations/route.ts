import { NextResponse } from 'next/server';

import prisma from '@/database';

import getUser from '@/helpers/getUser';

export const POST = async (request: Request) => {
  try {
    const user = await getUser();
    const body = await request.json();

    const { userId, isGroup, members, name } = body;

    if (!user?.id || !user?.email) {
      return new NextResponse('Unauthorized.', { status: 401 });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse('Invalid data.', { status: 400 });
    }

    if (isGroup) {
      const newConversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              {
                id: user.id,
              },
            ],
          },
        },

        include: {
          users: true,
        },
      });

      return NextResponse.json(newConversation);
    }

    const existingConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [user.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, user.id],
            },
          },
        ],
      },
    });

    const conversation = existingConversations[0];

    if (conversation) return NextResponse.json(conversation);

    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: user.id,
            },
            {
              id: userId,
            },
          ],
        },
      },

      include: {
        users: true,
      },
    });

    return NextResponse.json(newConversation);
  } catch (error) {
    console.error(error);

    return new NextResponse('An error occurred.', { status: 500 });
  }
};
