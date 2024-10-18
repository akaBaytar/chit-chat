import prisma from '@/database';

import getSession from './getSession';

const getUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) return null;

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!user) return null;

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getUser;
