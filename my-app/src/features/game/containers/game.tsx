import { GameId } from '@/common/ids';
import { GameLayout } from '../ui/layout';
import { GamePlayers } from '../ui/players';
import { GameDomain } from '@/entities/game';
import { GameStatus } from '../ui/status';
import { GameField } from '../ui/field';

export function Game({ gameId }: { gameId: GameId }) {
  const game: GameDomain.GameEntity = {
    id: gameId,
    players: [
      {
        id: '1',
        login: 'Test',
        rating: 1000,
      },
      {
        id: '1',
        login: 'Test',
        rating: 1000,
      },
    ],
    status: 'inProgress',
    field: [null, null, null, 'o', 'x', null, null, null, null],
  };
  return (
    <GameLayout
      players={<GamePlayers game={game} />}
      status={<GameStatus game={game} />}
      field={<GameField game={game} />}
    />
  );
}
