import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { ReactNode, useId } from 'react';
import { AuthErrorAlert } from './auth-error-alert';

export function AuthFields({
  errors,
  formData,
  errorsMessage,
}: {
  formData?: FormData;
  errors?: {
    login?: string;
    password?: string;
  };
  errorsMessage?: ReactNode;
}) {
  const idLogin = useId();
  const idPassword = useId();
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor={idLogin}>Login</Label>
        <Input id={idLogin} name="login" type="login" required defaultValue={formData?.get('login')?.toString()} />
        {errors?.login && <AuthErrorAlert error={errors.login} />}
      </div>
      <div className="space-y-2">
        <Label htmlFor={idPassword}>Password</Label>
        <Input
          id={idPassword}
          name="password"
          type="password"
          required
          defaultValue={formData?.get('password')?.toString()}
        />
        {errors?.password && <AuthErrorAlert error={errors.password} />}
      </div>
      {errorsMessage && errorsMessage}
    </>
  );
}
