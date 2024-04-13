import prisma from '@/lib/prisma';
import NextAuth, {type NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcrypt';
 
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },
  providers: [
    credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        
        if( !parsedCredentials.success ) {
          return null;
        }

        const { email, password } = parsedCredentials.data;

        const user = await prisma.user.findUnique({where: { email: email.toLowerCase() }});

        if( !user){
          return null;
        }

        if( !bcrypt.compareSync(password, user.password)){
          return null;
        }

        const { password: _, ...rest } = user;
        console.log({rest});
        return rest;
      },
    }),
  ]
};

export const { signIn, signOut, auth } = NextAuth(authConfig)