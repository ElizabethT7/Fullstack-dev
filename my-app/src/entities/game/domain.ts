import { GameId, UserId } from '@/common/ids';
import { errorType, successType } from '@/shared/lib/either';

export type PlayerEntity = {
  id: UserId;
  login: string;
  rating: number;
};

export type GameIdleEntity = {
  id: GameId;
  creator: PlayerEntity;
  field: Field;
  status: 'idle';
};

export type GameInProgressEntity = {
  id: GameId;
  players: PlayerEntity[];
  field: Field;
  status: 'inProgress';
};

export type GameOverEntity = {
  id: GameId;
  players: PlayerEntity[];
  field: Field;
  status: 'gameOver';
  isDraw?: boolean;
  winner?: PlayerEntity;
};

export type GameOverDrawEntity = {
  id: GameId;
  players: PlayerEntity[];
  field: Field;
  status: 'gameOverDraw';
};

export type GameEntity = GameIdleEntity | GameInProgressEntity | GameOverEntity | GameOverDrawEntity;

export type Field = Cell[];
export type Cell = GameSymbol | null;
export type GameSymbol = string;

export const GameSymbol = {
  x: 'X',
  o: 'O',
};

export const getGameCurrentSymbol = (game: GameInProgressEntity | GameOverDrawEntity | GameOverEntity) => {
  const symbols = game.field.filter((s) => s !== null).length;
  return symbols % 1 === 0 ? GameSymbol.x : GameSymbol.o;
};

export const getNextSymbol = (gameSymbol: GameSymbol) => {
  if (gameSymbol === GameSymbol.x) {
    return GameSymbol.o;
  }
  return GameSymbol.x;
};

export const getPlayerSymbol = (player: PlayerEntity, game: GameInProgressEntity) => {
  const index = game.players.findIndex((p) => p.id === player.id);

  return { 0: GameSymbol.x, 1: GameSymbol.o }[index];
};

export const doStep = (game: GameInProgressEntity, index: number, player: PlayerEntity) => {
  const currentSymbol = getGameCurrentSymbol(game);
  const nextSymbol = getNextSymbol(currentSymbol);

  if (nextSymbol !== getPlayerSymbol(player, game)) {
    return errorType('not-player-symbol');
  }

  if (game.field[index]) {
    return errorType('game-cell-already-has-symbol');
  }

  const newField = game.field.map((cell, i) => (i === index ? nextSymbol : cell));

  const winner = calculateWinner(newField);

  if (winner) {
    return successType({
      ...game,
      field: newField,
      winner: player,
      status: 'gameOver',
    } satisfies GameOverEntity);
  }

  if (isDraw(newField)) {
    return successType({
      ...game,
      field: newField,
      status: 'gameOverDraw',
    } satisfies GameOverDrawEntity);
  }

  return successType({
    ...game,
    field: newField,
  });
};

function isDraw(squares: Field) {
  const winner = calculateWinner(squares);
  if (!winner) {
    return squares.every((s) => s !== null);
  }

  return false;
}

function calculateWinner(squares: Field) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
