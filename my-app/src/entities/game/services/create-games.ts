import { errorType, successType } from "@/shared/lib/either";
import { PlayerEntity } from "../domain";
import { gameRepository } from "../repositories/game";
import cuid from 'cuid';

export async function createGame(player: PlayerEntity) {
  const playerGames = await gameRepository.gamesList({
    players: {some: { id: player.id }},
    status: 'idle'
  });
  if(playerGames.some(game => game.status === 'idle' && game.creator.id === player.id)){
    return errorType('cant-create-only-one-game' as const);
  }
  const createdGame = await gameRepository.createGame({
    id: cuid(),
    creator: player,
    status: 'idle'
  });

  return successType(createdGame);
}