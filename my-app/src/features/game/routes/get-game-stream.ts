import { GameId } from '@/common/ids';
import { getGameById } from '@/entities/game/server';
import { sseStream } from '@/shared/lib/sse/server';
import { NextRequest } from 'next/server';

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

  onClose(() => {});
  return response;
}
