import { GameId } from '@/common/ids';
import { gameRepository } from '../repositories/game';

export const getGameById = (gameId: GameId) => {
  return gameRepository.getGame({ id: gameId });
};
