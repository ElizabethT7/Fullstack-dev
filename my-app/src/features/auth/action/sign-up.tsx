'use server';

import { createUser } from '@/entities/user/server';
import { errorType, mapErrorType } from '@/shared/lib/either';
import { z } from 'zod';

const SignInSchema = z.object({
  login: z.string().min(3, 'Invalid login'),
  password: z.string().min(4, 'Password is required'),
});

export async function signUp(state: unknown, formData: FormData) {
  console.log(formData.get('login'), 'formData');

  const validatedFields = SignInSchema.safeParse({
    login: formData.get('login'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return errorType(`${validatedFields.error.flatten().fieldErrors}`);
  }

  const createUserResult = await createUser(validatedFields.data);

  return mapErrorType(createUserResult, (error) => {
    return {
      'user-login-exists': 'Пользователь с таким логином существует',
    }[error];
  });
}
