import { PlayerEntity } from "../domain";
import { gameRepository } from "../repositories/game";
import cuid from 'cuid';

export async function createGame(player: PlayerEntity) {
  const playerGames = await gameRepository.gamesList({
    players: {some: { id: player.id }},
    status: 'idle'
  });
  if(playerGames.some(game => game.status === 'idle' && game.creator.id === player.id)){
    return {
      type: 'error',
      error: 'Player can not create more than one game'
    } as const;
  }
  const createdGame = await gameRepository.createGame({
    id: cuid(),
    creator: player,
    status: 'idle'
  });

  return createdGame;
}