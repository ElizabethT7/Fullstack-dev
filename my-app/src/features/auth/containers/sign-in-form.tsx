'use client'

import { useActionState, useState } from 'react'
import { AuthFormLayout } from '../ui/auth-form-layout'
import { AuthFields } from '../ui/auth-fields'
import { AuthButton } from '../ui/auth-button'
import { successType } from '@/shared/lib/either'
import { AuthLink } from '../ui/auth-link'
import { AuthErrorAlert } from '../ui/auth-error-alert'
import { signIn } from '../action/sign-in'
//import { AuthSuccessAlert } from '../ui/auth-success-alert'

export function SignInForm() {
  const [state, formAction] = useActionState(signIn, successType(undefined))
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (formData: FormData) => {
    setIsSubmitting(true);
    formAction(formData);
    setIsSubmitting(false);
  }

  return <AuthFormLayout 
    title="Sign In" 
    action={handleSubmit} 
    fields={<AuthFields 
      //errorLogin={<AuthErrorAlert error={state}/>}
      errorPassword={<AuthErrorAlert error={state}/>}
    />} 
    actions={<AuthButton isSubmitting={isSubmitting}>{isSubmitting ? 'Signing in...' : 'Sign In'}</AuthButton>} 
    //success={<AuthSuccessAlert success={errorType(null)} />}
    link={<AuthLink text="Don't have an account?" linkText="Sign up" url="/sign-up"/>}
    />
}