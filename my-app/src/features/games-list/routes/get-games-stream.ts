import { gameEvents, getIdleGames, surrenderGame } from '@/entities/game/server';
import { sseStream } from '@/shared/lib/sse/server';
import { NextRequest } from 'next/server';

import { getCurrentUser } from '@/entities/user/server';

export async function getGamesStream(req: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return new Response('Game not found', {
      status: 400,
    });
  }

  const { onClose, response, write } = sseStream(req);

  write(await getIdleGames());

  onClose(async () => {
    await gameEvents.addGameCreatedListener(async () => {
      write(await getIdleGames());
    });
  });

  return response;
}
