import { GameId } from '@/common/ids';
import { routes } from '@/common/routes';
import { GameDomain } from '@/entities/game';
import { useEventsSource } from '@/shared/lib/sse/client';
import { useOptimistic, useTransition } from 'react';
import { gameStepAction } from '../actions/game-step';

export function useGame(gameId: GameId, player: GameDomain.PlayerEntity) {
  const { dataStream, isPending } = useEventsSource<GameDomain.GameEntity>(routes.gameStream(gameId));

  const [isPendingTransition, startTransition] = useTransition();

  const [optimisticGame, dispatchOptimistic] = useOptimistic(dataStream, (game, index: number) => {
    if (!game || game.status !== 'inProgress') {
      return game;
    }
    const result = GameDomain.doStep({ game, player, index });
    if (result.type === 'success') {
      return result.value;
    }

    return game;
  });

  const step = (index: number) => {
    startTransition(async () => {
      dispatchOptimistic(index);
      await gameStepAction({ gameId, index });
    });
  };

  return {
    game: optimisticGame,
    step,
    isPending: isPending,
    isStepPending: isPendingTransition,
  };
}
