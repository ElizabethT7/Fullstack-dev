import { GameId } from '@/common/ids';
import { getGameById, surrenderGame } from '@/entities/game/server';
import { sseStream } from '@/shared/lib/sse/server';
import { NextRequest } from 'next/server';
import { gameEvents } from '../services/game-events';
import { getCurrentUser } from '@/entities/user/server';

export async function getGameStream(req: NextRequest, { params }: { params: Promise<{ id: GameId }> }) {
  const { id } = await params;
  const user = await getCurrentUser();
  const game = await getGameById(id);

  if (!game || !user) {
    return new Response('Game not found', {
      status: 400,
    });
  }

  const { onClose, response, write } = sseStream(req);

  write(game);

  const unwatch = await gameEvents.addListener(game.id, (event) => {
    write(event.data);
  });

  onClose(async () => {
    unwatch();

    const result = await surrenderGame(id, user);

    if (result.type === 'success') {
      gameEvents.emit(result.value);
    }
  });

  return response;
}
