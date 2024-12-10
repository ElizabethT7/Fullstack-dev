import { GameEntity } from '@/entities/game';

export function GameStatus({ game }: { game: GameEntity }) {
  switch (game.status) {
    case 'idle':
      return (
        <div className="flex flex-row gap-4 justify-between">
          <div className="text-lg">Ожидание игрока</div>
        </div>
      );
    case 'inProgress':
      return (
        <div className="flex flex-row gap-4 justify-between">
          <div className="text-lg">Ожидание игрока</div>
        </div>
      );
    case 'gameOver':
      return (
        <div className="flex flex-row gap-4 justify-between">
          <div className="text-lg">Ожидание игрока</div>
        </div>
      );
    case 'gameOverDraw':
      return (
        <div className="flex flex-row gap-4 justify-between">
          <div className="text-lg">Ожидание игрока</div>
        </div>
      );
  }
}
