
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { useId } from 'react';

export function AuthFields({ errorLogin, errorPassword}: {
  errorLogin?: React.ReactNode,
  errorPassword?: React.ReactNode,
}) {
  const idLogin = useId();
  const idPassword = useId();
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor={idLogin}>Login</Label>
        <Input 
          id={idLogin} 
          name="login" 
          type="login"
          required
        />
        {errorLogin}
      </div>
      <div className="space-y-2">
        <Label htmlFor={idPassword}>Password</Label>
        <Input
          id={idPassword}
          name="password"
          type="password"
         required
        />
        {errorPassword}
      </div>
      </>
  )
}

