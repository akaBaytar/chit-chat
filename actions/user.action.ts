'use server';

import prisma from '@/database';

import getSession from '@/helpers/getSession';

export const getUsers = async () => {
  const session = await getSession();

  if (!session?.user?.email) return [];

  try {
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          email: session.user.email,
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });

    return users;
  } catch (error) {
    console.error(error);

    return [];
  }
};
