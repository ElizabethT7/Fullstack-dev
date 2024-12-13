import { GameId } from '@/common/ids';
import { GameDomain } from '@/entities/game';

type GameEvent = {
  type: 'game-changed';
  data: GameDomain.GameEntity;
};

type Listener = (game: GameEvent) => void;

class GameEventsService {
  listeners = new Map<GameId, Set<Listener>>();

  addListener(gameId: GameId, listener: Listener) {
    let listeners = this.listeners.get(gameId);

    if (!listeners) {
      listeners = new Set([listener]);
      this.listeners.set(gameId, listeners);
    }

    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  }

  emit(game: GameDomain.GameEntity) {
    const listeners = this.listeners.get(game.id) ?? new Set();
    for (const listener of listeners) {
      listener({ type: 'game-changed', data: game });
    }
    return;
  }
}

export const gameEvents = new GameEventsService();
