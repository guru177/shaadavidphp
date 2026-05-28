import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { createPool } from 'mariadb';

const pool = createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'shaadavid_db',
  port: 3306,
  connectionLimit: 1,
});

const adapter = new PrismaMariaDb(pool as any);
const prisma = new PrismaClient({ adapter });

console.log('🏁 AUTH.TS: INLINE PRISMA INITIALIZED WITH ROOT');

import bcrypt from 'bcryptjs';

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          
          console.log('🔍 AUTH.TS: Searching for admin:', username);
          const admin = await prisma.admin.findUnique({
            where: { username },
          });

          if (!admin) return null;
          
          const passwordsMatch = await bcrypt.compare(password, admin.password);
          
          if (passwordsMatch) return { id: admin.id.toString(), name: admin.username };
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
