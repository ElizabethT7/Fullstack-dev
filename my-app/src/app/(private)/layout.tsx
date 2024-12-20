import { routes } from '@/common/routes';
import { sessionService } from '@/entities/user/server';
import { Button } from '@/shared/ui/button';
import { redirect } from 'next/navigation';

export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
  const { session } = await sessionService.verifySession();
  return (
    <div className="flex flex-col">
      <header className="px-10 py-4 flex flex-row gap-4 justify-between border-b border-b-primary/50 items-center">
        <div className="text-xl">Tik tak</div>
        <div className="flex items-center gap-4">
          <div className="text-lg">{session.login}</div>
          <form
            action={async () => {
              //можно передавать коллбеки как серверные экшены
              'use server';

              sessionService.deleteSession();
              redirect(routes.signIn());
            }}
          >
            <Button>Sign out</Button>
          </form>
        </div>
      </header>
      {children}
    </div>
  );
}
