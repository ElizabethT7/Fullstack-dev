import { GameId } from '@/common/ids';
import { doStep, PlayerEntity } from '../domain';
import { gameRepository } from '../repositories/game';
import { errorType, successType } from '@/shared/lib/either';

export async function stepGame(gameId: GameId, player: PlayerEntity, index: number) {
  const game = await gameRepository.getGame({ id: gameId });
  if (!game) {
    return errorType('game-not-found');
  }

  if (game.status !== 'inProgress') {
    return errorType('game-status-not-in-progress');
  }

  if (!game.players.some((p) => p.id === player.id)) {
    return errorType('player-is-not-in-game');
  }

  const stepResult = doStep(game, index, player);

  if (stepResult.type === 'error') {
    return stepResult;
  }

  return successType(await gameRepository.saveGame(stepResult.value));
}
