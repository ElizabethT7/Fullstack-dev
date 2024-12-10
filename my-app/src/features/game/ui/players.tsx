import { GameEntity } from '@/entities/game';

export function GamePlayers({ game }: { game: GameEntity }) {
  const firstPlayer = game.status === 'idle' ? game.creator : game.players[0];
  const secondPlayer = game.status === 'idle' ? undefined : game.players[0];

  return (
    <div className="flex flex-row gap-4 justify-between">
      <div className="text-lg">
        X - {firstPlayer.login} ({firstPlayer.rating})
      </div>
      <div className="text-lg">
        O - {secondPlayer?.login ?? 'Ожидание ...'} ({secondPlayer?.rating})
      </div>
    </div>
  );
}
