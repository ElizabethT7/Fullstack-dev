import { Game, Prisma, User } from '@prisma/client';
import { GameEntity, GameIdleEntity, GameOverEntity } from '../domain';
import { prisma } from '@/shared/lib/db';
import { z } from 'zod';
import { removePassword } from '@/shared/lib/password';

const fieldSchema = z.array(z.union([z.string(), z.null()]));

function dbGameToGameEntity(
  game: Game & {
    players: User[];
    winner?: User | null;
  }
): GameEntity {
  const players = game.players.map(removePassword);
  switch (game.status) {
    case 'idle': {
      const [creator] = players;
      if (!creator) {
        throw new Error('Creator should be in game idle');
      }
      return {
        id: game.id,
        creator: creator,
        status: game.status,
        field: fieldSchema.parse(game.field),
      } satisfies GameIdleEntity;
    }
    case 'inProgress':
    case 'gameOverDraw': {
      return {
        id: game.id,
        players: players,
        status: game.status,
        field: fieldSchema.parse(game.field),
      };
    }
    case 'gameOver': {
      if (!game.winner) {
        throw new Error('Winner should be in game over');
      }
      return {
        id: game.id,
        players: players,
        status: game.status,
        field: fieldSchema.parse(game.field),
        winner: removePassword(game.winner),
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
    },
  });

  return games.map(dbGameToGameEntity);
}

async function getGame(where?: Prisma.GameWhereInput) {
  const game = await prisma.game.findFirst({
    where,
    include: {
      winner: true,
      players: true,
    },
  });

  if (game) {
    return dbGameToGameEntity(game);
  }

  return undefined;
}

async function createGame(game: GameIdleEntity): Promise<GameEntity> {
  const createdGame = await prisma.game.create({
    data: {
      status: game.status,
      id: game.id,
      field: game.field,
      players: {
        connect: { id: game.creator.id },
      },
    },
    include: {
      winner: true,
      players: true,
    },
  });

  return dbGameToGameEntity(createdGame);
}

export const gameRepository = { gamesList, createGame, getGame };
