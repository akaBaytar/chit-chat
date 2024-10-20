import { NextResponse } from 'next/server';

import prisma from '@/database';
import getUser from '@/helpers/getUser';

export const POST = async (request: Request) => {
  try {
    const user = await getUser();

    const body = await request.json();

    const { name, image } = body;

    if (!user?.id) return new NextResponse('Unauthorized.', { status: 401 });

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        name,
        image,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);

    return new NextResponse('An error occurred.', { status: 500 });
  }
};
