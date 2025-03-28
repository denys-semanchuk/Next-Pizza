import { User } from '@prisma/client';
import { api } from './instance';

export const getMe = async () => {
  const { data } = await api.get<User>('/auth/me');

  return data;
};