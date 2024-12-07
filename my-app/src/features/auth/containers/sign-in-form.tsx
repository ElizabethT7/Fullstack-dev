'use client';

import { useActionState, useState } from 'react';
import { AuthFormLayout } from '../ui/auth-form-layout';
import { AuthFields } from '../ui/auth-fields';
import { AuthButton } from '../ui/auth-button';
import { AuthLink } from '../ui/auth-link';
import { signIn, SignInFormState } from '../action/sign-in';

export function SignInForm() {
  const [state, formAction] = useActionState(signIn, {} satisfies SignInFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (formData: FormData) => {
    setIsSubmitting(true);
    formAction(formData);
    setIsSubmitting(false);
  };

  return (
    <AuthFormLayout
      title="Sign In"
      action={handleSubmit}
      fields={<AuthFields {...state} />}
      actions={<AuthButton isSubmitting={isSubmitting}>{isSubmitting ? 'Signing in...' : 'Sign In'}</AuthButton>}
      link={<AuthLink text="Don't have an account?" linkText="Sign up" url="/sign-up" />}
    />
  );
}
