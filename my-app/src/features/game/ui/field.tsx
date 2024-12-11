'use client';

import { GameDomain } from '@/entities/game';

export function GameField({
  game,
  onCellClick,
}: {
  game: GameDomain.GameEntity;
  onCellClick?: (index: number) => void;
}) {
  return (
    <div className="grid grid-cols-3">
      {game.field.map((symbol, index) => (
        <button
          className="border border-primary w-10 h-10 flex justify-center items-center"
          key={index}
          onClick={() => onCellClick?.(index)}
        >
          {symbol ?? ''}
        </button>
      ))}
    </div>
  );
}
