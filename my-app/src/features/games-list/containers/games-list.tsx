import { getIdleGames } from '@/entities/game/server';
import { Layout } from '../ui/layout';
import { GameCard } from '../ui/game-card';
import { CreateButton } from './create-button';
import Link from 'next/link';
import { routes } from '@/common/routes';
import { Button } from '@/shared/ui/button';

export async function GamesList() {
  const games = await getIdleGames();
  return (
    <Layout actions={<CreateButton />}>
      {games.map((game) => (
        <GameCard
          key={game.id}
          login={game.creator.login}
          rating={game.creator.rating}
          actions={
            <Link href={routes.game(game.id)}>
              <Button>Подключиться</Button>
            </Link>
          }
        />
      ))}
    </Layout>
  );
}
