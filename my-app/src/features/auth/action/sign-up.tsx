'use server';

import { createUser, sessionService } from '@/entities/user/server';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export type SignUpFormState = {
  formData?: FormData;
  errors?: {
    login?: string;
    password?: string;
    _errors?: string;
  };
};

const SignInSchema = z.object({
  login: z.string().min(3, 'Invalid login'),
  password: z.string().min(4, 'Password is required'),
});

export async function signUp(state: unknown, formData: FormData): Promise<SignUpFormState> {
  const validatedFields = SignInSchema.safeParse({
    login: formData.get('login'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    const formattedErrors = validatedFields.error.format();
    console.log(formattedErrors, validatedFields.error.format());
    return {
      formData,
      errors: {
        login: formattedErrors.login?._errors.join(', '),
        password: formattedErrors.password?._errors.join(', '),
        _errors: formattedErrors._errors.join(),
      },
    };
  }

  const createUserResult = await createUser(validatedFields.data);

  if (createUserResult.type === 'success') {
    await sessionService.addSession(createUserResult.value);

    redirect('/');
  }

  const errors = {
    'user-login-exists': 'Пользователь с таким логином существует',
  }[createUserResult.error];

  return {
    formData,
    errors: {
      _errors: errors,
    },
  };
}
