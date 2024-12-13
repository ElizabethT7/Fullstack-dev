import { GameId } from '@/common/ids';
import { PlayerEntity } from '../domain';
import { gameRepository } from '../repositories/game';
import { errorType, successType } from '@/shared/lib/either';

export async function startGame(gameId: GameId, player: PlayerEntity) {
  const game = await gameRepository.getGame({ id: gameId });
  if (!game) {
    return errorType('game-not-found' as const);
  }

  if (game.status !== 'idle') {
    return errorType('game-status-not-idle' as const);
  }

  if (game.creator.id === player.id) {
    return errorType('creator-can-not-start-game' as const);
  }

  return successType(await gameRepository.startGame(gameId, player));
}
