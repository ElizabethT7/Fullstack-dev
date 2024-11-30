

export function AuthFormLayout({
  title,
  //description,
  fields,
  actions,
  link,
  onSubmit,
  success
}: {
  title: string,
  //description: string,
  fields: React.ReactNode,
  actions: React.ReactNode,
  link: React.ReactNode,
  success?: React.ReactNode,
  onSubmit: React.FormEventHandler<HTMLFormElement>
}){
  return (
    <div className="w-full max-w-md">
      <h1 className="mb-6 text-center text-3xl font-bold">{title}</h1>
        <form onSubmit={onSubmit} className="space-y-4 bg-background">
          {fields}
          {actions}
          {!!success && success}
          {link}
        </form>
     </div>
  )
}

//