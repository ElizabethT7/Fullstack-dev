import { Button } from '@/shared/ui/button'

export function AuthButton({children, isSubmitting} :{children: React.ReactNode, isSubmitting: boolean}) {

  return (
    <Button type="submit" className="w-full" disabled={isSubmitting}>
      {children}
    </Button>
  )
}