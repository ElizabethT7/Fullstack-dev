'use server';

import { sessionService, verifyUserPassword } from '@/entities/user/server';
import { errorType, mapErrorType } from '@/shared/lib/either';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const SignInSchema = z.object({
  login: z.string().min(3, 'Invalid login'),
  password: z.string().min(4, 'Password is required'),
});

export async function signIn(state: unknown, formData: FormData) {
  const validatedFields = SignInSchema.safeParse({
    login: formData.get('login'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return errorType(`Ошибка валидации: ${validatedFields.error.flatten().fieldErrors}`);
  }

  const verifyUserResult = await verifyUserPassword(validatedFields.data);

  if (verifyUserResult.type === 'success') {
    await sessionService.addSession(verifyUserResult.value);

    redirect('/');
  }

  return mapErrorType(verifyUserResult, (error) => {
    return {
      'wrong-login-or-password': 'Неверный логин или пароль',
    }[error];
  });
}
