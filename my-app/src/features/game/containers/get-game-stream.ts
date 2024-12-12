import { sseStream } from '@/shared/lib/sse/server';
import { NextRequest } from 'next/server';

export function getGameStream(req: NextRequest) {
  const { onClose, response, write } = sseStream(req);

  let counter = 1;

  const interval = setInterval(() => {
    write(counter++);
  }, 1000);

  onClose(() => {
    clearInterval(interval);
  });
  return response;
}
