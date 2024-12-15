import { GameId } from '@/common/ids';
import { getGameById } from '@/entities/game/server';
import { sseStream } from '@/shared/lib/sse/server';
import { NextRequest } from 'next/server';
import { gameEvents } from '../services/game-events';

export async function getGameStream(req: NextRequest, { params }: { params: Promise<{ id: GameId }> }) {
  const { id } = await params;

  const game = await getGameById(id);
  if (!game) {
    return new Response('Game not found', {
      status: 400,
    });
  }

  const { onClose, response, write } = sseStream(req);

  write(game);

  const unwatch = await gameEvents.addListener(game.id, (event) => {
    write(event.data);
  });

  onClose(() => {
    unwatch();
  });

  return response;
}
