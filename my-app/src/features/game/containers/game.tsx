import { GameId } from '@/common/ids';
import { GameClient } from './game-client';
import { getCurrentUser } from '@/entities/user/server';
import { getGameById, startGame } from '@/entities/game/server';
import { redirect } from 'next/navigation';

export async function Game({ gameId }: { gameId: GameId }) {
  const user = await getCurrentUser();

  let game = await getGameById(gameId);
  if (!game || !user) {
    redirect('/');
  }

  if (user) {
    const startGameResult = await startGame(gameId, user);

    if (startGameResult.type === 'success') {
      game = startGameResult.value;
    }
  }

  return <GameClient defaultGame={game} player={user} />;
}
