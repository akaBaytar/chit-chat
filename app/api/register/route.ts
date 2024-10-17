import { NextResponse } from 'next/server';

import bcrypt from 'bcrypt';

import prisma from '@/database';

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new NextResponse('Invalid credentials.', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);

    return new NextResponse('Internal error.', { status: 500 });
  }
};
