import { UserId } from '@/common/ids';

export type UserEntity = {
  id: UserId;
  login: string;
  rating: number;
  passwordHash: string;
  salt: string;
};

export type SessionEntity = {
  id: UserId;
  login: string;
};

export const DEFAULT_RATING = 1000;
