
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { useId } from 'react';

export function AuthFields({login, password, onChangeLogin, onChangePassword, errorLogin, errorPassword}: {
  login: string,
  password: string,
  onChangeLogin: (login: string) => void,
  onChangePassword: (password: string) => void,
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
          value={login} 
          onChange={(e) => onChangeLogin(e.target.value)}
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
          value={password} 
          onChange={(e) => onChangePassword(e.target.value)}
         required
        />
        {errorPassword}
      </div>
      </>
  )
}

