'use server';

import { createUser, sessionService } from '@/entities/user/server';
import { errorType, mapErrorType } from '@/shared/lib/either';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const SignInSchema = z.object({
  login: z.string().min(3, 'Invalid login'),
  password: z.string().min(4, 'Password is required'),
});

export async function signUp(state: unknown, formData: FormData) {
  const validatedFields = SignInSchema.safeParse({
    login: formData.get('login'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return errorType(`Ошибка валидации: ${validatedFields.error.flatten().fieldErrors}`);
  }

  const createUserResult = await createUser(validatedFields.data);

  if (createUserResult.type === 'success') {
    await sessionService.addSession(createUserResult.value);

    redirect('/');
  }

  return mapErrorType(createUserResult, (error) => {
    return {
      'user-login-exists': 'Пользователь с таким логином существует',
    }[error];
  });
}
