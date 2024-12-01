'use client'

import { useActionState, useState } from 'react'
import { AuthFormLayout } from '../ui/auth-form-layout'
import { AuthFields } from '../ui/auth-fields'
import { AuthButton } from '../ui/auth-button'
import { mapErrorType, successType } from '@/shared/lib/either'
import { AuthLink } from '../ui/auth-link'
import { AuthErrorAlert } from '../ui/auth-error-alert'
import { signUp } from '../action/sign-up'

export function SignUpForm() {
  const [state, formAction] = useActionState(signUp, successType(undefined))
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (formData: FormData) => {
    setIsSubmitting(true);
    formAction(formData);
    setIsSubmitting(false);
  }

  const stateErrors = mapErrorType(state, (e) => 
    ({
      ['invalid-input-data'] : 'Invalid email or password',
      ['login-already-taken'] : 'Message'
    })[e],)

  return <AuthFormLayout 
    title="Create an Account" 
    action={handleSubmit} 
    fields={<AuthFields 
      //errorLogin={<AuthErrorAlert error={state}/>}
      errorPassword={<AuthErrorAlert error={stateErrors}/>}
    />} 
    actions={<AuthButton isSubmitting={isSubmitting}>{isSubmitting ? 'Signing up...' : 'Sign Up'}</AuthButton>} 
    //success={<AuthSuccessAlert success={successType(null)} />}
    link={<AuthLink text="Already have an account?" linkText="Sign in" url="/sign-in"/>}
    />
}