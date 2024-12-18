'use server';

import { GameId } from '@/common/ids';
import { stepGame } from '@/entities/game/server';
import { getCurrentUser } from '@/entities/user/server';
import { errorType } from '@/shared/lib/either';
import { gameEvents } from '../services/game-events';

export const gameStepAction = async ({ gameId, index }: { gameId: GameId; index: number }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return errorType('not-found');
  }

  const result = await stepGame(gameId, currentUser, index);

  if (result.type === 'success') {
    gameEvents.emit(result.value);

    return result;
  }

  return result;
};
