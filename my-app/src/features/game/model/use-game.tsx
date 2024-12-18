import { GameId } from '@/common/ids';
import { routes } from '@/common/routes';
import { GameDomain } from '@/entities/game';
import { useEventsSource } from '@/shared/lib/sse/client';
import { useTransition } from 'react';
import { gameStepAction } from '../actions/game-step';

export function useGame(gameId: GameId) {
  const { dataStream, isPending } = useEventsSource<GameDomain.GameEntity>(routes.gameStream(gameId));

  const [isPendingTransition, startTransition] = useTransition();

  const step = (index: number) => {
    startTransition(async () => {
      await gameStepAction({ gameId, index });
    });
  };

  return {
    game: dataStream,
    step,
    isPending: isPending,
    isStepPending: isPendingTransition,
  };
}
