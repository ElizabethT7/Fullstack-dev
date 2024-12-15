import { GameId } from '@/common/ids';
import { PlayerEntity } from '../domain';
import { gameRepository } from '../repositories/game';
import { errorType, successType } from '@/shared/lib/either';

export async function surrenderGame(gameId: GameId, player: PlayerEntity) {
  const game = await gameRepository.getGame({ id: gameId });
  if (!game) {
    return errorType('game-not-found' as const);
  }

  if (game.status !== 'inProgress') {
    return errorType('game-status-not-in-progress' as const);
  }

  if (!game.players.some((p) => p.id === player.id)) {
    return errorType('player-is-not-in-game' as const);
  }

  return successType(
    await gameRepository.saveGame({
      ...game,
      status: 'gameOver',
      winner: game.players.find((p) => p.id !== player.id)!,
    })
  );
}
