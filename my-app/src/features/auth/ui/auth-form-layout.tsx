

export function AuthFormLayout({
  title,
  fields,
  actions,
  link,
  action,
  success
}: {
  title: string,
  fields: React.ReactNode,
  actions: React.ReactNode,
  link: React.ReactNode,
  success?: React.ReactNode,
  action: (formData: FormData) => void
}){
  return (
    <div className="w-full max-w-md bg-background">
      <h1 className="mb-6 text-center text-3xl font-bold">{title}</h1>
        <form action={action} className="space-y-4 bg-background">
          {fields}
          {actions}
          {!!success && success}
          {link}
        </form>
     </div>
  )
}

//