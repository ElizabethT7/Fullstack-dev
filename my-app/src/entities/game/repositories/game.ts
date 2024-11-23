import { Game,  User } from "@prisma/client";
import { GameEntity, GameIdleEntity, GameOverEntity } from "../domain";
import { prisma } from "@/shared/lib/db";
import {z} from "zod"

const fieldSchema = z.array(z.union(z.string(), z.null()))

function dbGameToGameEntity(game: Game & {
  players: User[];
  winner?:  User | null;
}): GameEntity {
  switch (game.status){
    case "idle": {
      return {
        id: game.id,
        players: game.players,
        status: game.status
      } satisfies GameIdleEntity;
    }
    case "inProgress":
    case "gameOverDraw": {
      return {
        id: game.id,
        players: game.players,
        status: game.status,
        field: fieldSchema.parse(game.field),
      }
    }
    case "gameOver": {
      if(!game.winner){
        throw new Error("Winner shoud be in game over")
      }
      return {
        id: game.id,
        players: game.players,
        status: game.status,
        field: fieldSchema.parse(game.field),
        winner: game.winner,
      } satisfies GameOverEntity;
    }
  }
}

async function gamesList(): Promise<GameEntity[]> {
  const games = await prisma.game.findMany({
    include: {
      winner: true,
      players: true,
    }
  });

  return games.map(dbGameToGameEntity)
}


export const gameRepository = { gamesList }