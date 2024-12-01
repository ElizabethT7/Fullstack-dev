import { GameId, UserId } from "@/common/ids";

export type PlayerEntity = {
  id: UserId;
  login: string;
  rating: number;
}


export type GameIdleEntity = {
  id: GameId;
  creator: PlayerEntity;
  status: 'idle'
}

export type GameInProgressEntity = {
  id: GameId;
  players: PlayerEntity[];
  field: Field;
  status: 'inProgress'
}

export type GameOverEntity = {
  id: GameId;
  players: PlayerEntity[];
  field: Field;
  status: 'gameOver';
  isDraw?: boolean;
  winner?: PlayerEntity;
}

export type GameOverDrawEntity = {
  id: GameId;
  players: PlayerEntity[];
  field: Field;
  status: 'gameOverDraw';
}

export type GameEntity = GameIdleEntity | GameInProgressEntity | GameOverEntity | GameOverDrawEntity;

export type Field = Cell[];
export type Cell = GameSymbol | null;
export type GameSymbol = string;
