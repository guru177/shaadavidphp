import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(1) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          
          console.log('🔍 AUTH.TS: Searching for admin via PHP API:', username);
          
          try {
            // Replace with your actual PHP backend URL (e.g., XAMPP localhost or production URL)
            const apiUrl = process.env.NEXT_PUBLIC_PHP_API_URL || 'http://localhost/shaadavidnew/backend/admin_login.php';
            
            const res = await fetch(apiUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (data.status === 'success' && data.user) {
              return { id: data.user.id.toString(), name: data.user.username };
            }
          } catch (error) {
            console.error('PHP API Login Error:', error);
          }
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
