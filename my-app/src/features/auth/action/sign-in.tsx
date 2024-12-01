'use server'

import { errorType, successType } from '@/shared/lib/either'
import { z } from 'zod'

const SignInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export async function signIn(state: unknown, formData: FormData) {
  const validatedFields = SignInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    //return { error: validatedFields.error.flatten().fieldErrors }
    console.log(validatedFields.error.flatten().fieldErrors, "Errors texts")
    return errorType('Invalid email or password')
  }
    return successType('Invalid email or password')
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
  }
    */
}