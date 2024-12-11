import { GameDomain } from '@/entities/game';

export function GameStatus({ game }: { game: GameDomain.GameEntity }) {
  switch (game.status) {
    case 'idle':
      return (
        <div className="flex flex-row gap-4 justify-between">
          <div className="text-lg">Ожидание игрока</div>
        </div>
      );
    case 'inProgress': {
      const currentSymbol = GameDomain.getGameCurrentStep(game);

      return (
        <div className="flex flex-row gap-4 justify-between">
          <div className="text-lg">Ход: {currentSymbol}</div>
        </div>
      );
    }
    case 'gameOver': {
      const currentSymbol = GameDomain.getGameCurrentStep(game);

      return (
        <div className="flex flex-row gap-4 justify-between">
          <div className="text-lg">Победитель: {currentSymbol}</div>
        </div>
      );
    }
    case 'gameOverDraw':
      return (
        <div className="flex flex-row gap-4 justify-between">
          <div className="text-lg">Ничья</div>
        </div>
      );
  }
}
