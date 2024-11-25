import { Game, Prisma,  User } from "@prisma/client";
import { GameEntity, GameIdleEntity, GameOverEntity } from "../domain";
import { prisma } from "@/shared/lib/db";
import {z} from "zod"

const fieldSchema = z.array(z.union([z.string(), z.null()]));

function dbGameToGameEntity(game: Game & {
  players: User[];
  winner?:  User | null;
}): GameEntity {
  switch (game.status){
    case "idle": {
      const [creator] = game.players;
      if(!creator){
        throw new Error("Creator should be in game idle")
      }
      return {
        id: game.id,
        creator: creator,
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
        throw new Error("Winner should be in game over")
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

async function gamesList(where?: Prisma.GameWhereInput): Promise<GameEntity[]> {
  const games = await prisma.game.findMany({
    where,
    include: {
      winner: true,
      players: true,
    }
  });

  return games.map(dbGameToGameEntity)
}


export const gameRepository = { gamesList }