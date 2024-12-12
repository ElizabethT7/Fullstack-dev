import { GameId } from '@/common/ids';
import { GameDomain } from '@/entities/game';
import { useEventsSource } from '@/shared/lib/sse/client';

export function useGame(gameId: GameId) {
  const { dataStream, isPending } = useEventsSource<GameDomain.GameEntity>(`game/${gameId}/stream`);

  return {
    game: dataStream,
    isPending,
  }
}
