import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { SessionEntity, UserEntity, userToSession } from '../domain';
import { errorType, successType } from '@/shared/lib/either';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

async function encrypt(payload: SessionEntity) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return successType(payload as SessionEntity);
  } catch (error) {
    return errorType(error);
  }
}

async function addSession(user: UserEntity) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const sessionData = userToSession(user, expiresAt.toISOString());

  const session = await encrypt(sessionData);

  const cookiesStore = await cookies();

  cookiesStore.set('session', session, {
    httpOnly: true,
    //secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}

async function verifySession() {
  const cookie = (await cookies()).get('session')?.value;
  const session = await decrypt(cookie);

  if (session.type === 'error') {
    redirect('/sign-in');
  }

  return { isAuth: true, session: session.value };
}

export const sessionService = { addSession, deleteSession, verifySession };
