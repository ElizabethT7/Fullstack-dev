import { GameId } from '@/common/ids';
import { routes } from '@/common/routes';
import { GameDomain } from '@/entities/game';
import { useEventsSource } from '@/shared/lib/sse/client';

export function useGame(gameId: GameId) {
  const { dataStream, isPending } = useEventsSource<GameDomain.GameEntity>(routes.gameStream(gameId));

  return {
    game: dataStream,
    isPending,
  };
}
