'use client'

import { useState } from 'react'
//import { useFormState } from 'react-dom'
//import { signUp } from '../../../app/actions/auth';
import { AuthFormLayout } from '../ui/auth-form-layout'
import { AuthFields } from '../ui/auth-fields'
import { AuthButton } from '../ui/auth-button'
import { successType } from '@/shared/lib/either'
import { AuthLink } from '../ui/auth-link'
import { AuthErrorAlert } from '../ui/auth-error-alert'
//import { AuthSuccessAlert } from '../ui/auth-success-alert'

export function SignUpForm() {
  //const [state, formAction] = useFormState(signUp, null)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true)
    //formAction(formData)
    setIsSubmitting(false)
  }

  return <AuthFormLayout 
    title="Create an Account" 
    onSubmit={handleSubmit} 
    fields={<AuthFields 
      login={email} 
      password={password}
      onChangeLogin={setEmail} 
      onChangePassword={setPassword} 
      errorLogin={<AuthErrorAlert error={successType(null)}/>}
      errorPassword={<AuthErrorAlert error={successType(null)}/>}
    />} 
    actions={<AuthButton isSubmitting={isSubmitting}>{isSubmitting ? 'Signing up...' : 'Sign Up'}</AuthButton>} 
    //success={<AuthSuccessAlert success={successType(null)} />}
    link={<AuthLink text="Already have an account?" linkText="Sign in" url="/signin"/>}
    />
}