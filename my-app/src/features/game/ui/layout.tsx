import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui/card';

export function GameLayout({
  status,
  field,
  actions,
  players,
}: {
  players?: React.ReactNode;
  status?: React.ReactNode;
  field?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardFooter>Крестики нолики</CardFooter>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {players}
        {status}
        <div className="flex items-center justify-between">{field}</div>
      </CardContent>
      <CardFooter>{actions}</CardFooter>
    </Card>
  );
}
