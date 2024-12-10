import { GameId } from '@/common/ids';
import { GameLayout } from '../ui/layout';
import { GamePlayers } from '../ui/players';
import { GameEntity } from '@/entities/game';

export function Game({ gameId }: { gameId: GameId }) {
  const game: GameEntity = {
    id: gameId,
    creator: {
      id: '1',
      login: 'Test',
      rating: 1000,
    },
    status: 'idle',
  };
  return <GameLayout players={<GamePlayers game={game} />} />;
}
