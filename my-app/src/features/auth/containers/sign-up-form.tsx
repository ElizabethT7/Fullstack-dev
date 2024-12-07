'use client';

import { useActionState, useState } from 'react';
import { AuthFormLayout } from '../ui/auth-form-layout';
import { AuthFields } from '../ui/auth-fields';
import { AuthButton } from '../ui/auth-button';
import { AuthLink } from '../ui/auth-link';
import { signUp, SignUpFormState } from '../action/sign-up';
import { AuthErrorAlert } from '../ui/auth-error-alert';

export function SignUpForm() {
  const [state, formAction] = useActionState(signUp, {} satisfies SignUpFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (formData: FormData) => {
    setIsSubmitting(true);
    formAction(formData);
    setIsSubmitting(false);
  };

  return (
    <AuthFormLayout
      title="Create an Account"
      action={handleSubmit}
      fields={<AuthFields {...state} errorsMessage={<AuthErrorAlert error={state.errors?._errors} />} />}
      actions={<AuthButton isSubmitting={isSubmitting}>{isSubmitting ? 'Signing up...' : 'Sign Up'}</AuthButton>}
      link={<AuthLink text="Already have an account?" linkText="Sign in" url="/sign-in" />}
    />
  );
}
