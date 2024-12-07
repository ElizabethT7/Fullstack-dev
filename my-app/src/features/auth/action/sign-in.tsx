'use server';

import { sessionService, verifyUserPassword } from '@/entities/user/server';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export type SignInFormState = {
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

export async function signIn(state: unknown, formData: FormData): Promise<SignInFormState> {
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

  const verifyUserResult = await verifyUserPassword(validatedFields.data);

  if (verifyUserResult.type === 'success') {
    await sessionService.addSession(verifyUserResult.value);

    redirect('/');
  }

  const errors = {
    'wrong-login-or-password': 'Неверный логин или пароль',
  }[verifyUserResult.error];

  return {
    formData,
    errors: {
      _errors: errors,
    },
  };
}
