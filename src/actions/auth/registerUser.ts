'use server';

import prisma from "@/lib/prisma";
import bcrypt from 'bcrypt';

export async function RegisterUser(name:string, email:string, password:string) {
  try {
    const user = await prisma.user.create(
      {
        data: {
          name,
          email: email.toLowerCase(),
          password: bcrypt.hashSync(password, 10),
        },
        select: {
          name: true,
          email: true,
          id: true,
          role: true
        }
      }
    );

    return {
      ok: true,
      user
    }
  } catch (error) {
    return {
      ok: false,
      message: "Error Register User"
    }
  }
}