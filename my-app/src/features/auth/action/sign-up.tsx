'use server'

import { errorType } from '@/shared/lib/either'
import { z } from 'zod'

const SignInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export async function signUp(state: unknown, formData: FormData) {

  console.log(formData.get("login"), "formData");
  const validatedFields = SignInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors, "Errors texts")
    return errorType('invalid-input-data' as const)
  }
  return errorType('login-already-taken' as const);
  /*
  // Here you would typically verify the user's credentials
  // For this example, we'll just simulate a successful sign-in
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Simulating a failed sign-in for demonstration purposes
  // In a real application, you'd check against your database
  if (validatedFields.data.email === 'test@example.com' && validatedFields.data.password === 'password') {
    return { success: true }
  } else {
    return { error: { _form: ['Invalid email or password'] } }
  }*/
}