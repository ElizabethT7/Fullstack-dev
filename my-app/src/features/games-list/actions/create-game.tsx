'use server';

import { routes } from '@/common/routes';
import { createGame } from '@/entities/game/server';
import { getCurrentUser } from '@/entities/user/server';
import { errorType } from '@/shared/lib/either';
import { redirect } from 'next/navigation';

export const createGameAction = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return errorType('user-not-found' as const);
  }
  const gameResult = await createGame(user);

  if (gameResult.type === 'success') {
    redirect(routes.game(gameResult.value.id));
  }
  return gameResult;
};
