'use client';

import { signIn } from 'next-auth/react';

export async function authenticate(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  try {
    const result = await signIn('credentials', {
      username,
      password,
      redirect: true,
      callbackUrl: '/admin',
    });
    return result;
  } catch (error) {
    if ((error as any).type === 'CredentialsSignin') {
      return 'Invalid credentials.';
    }
    throw error;
  }
}
