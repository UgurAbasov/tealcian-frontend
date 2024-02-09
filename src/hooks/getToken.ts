import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from '@/shared/localStorage/accessToken';
import { REFRESH_TOKEN_LOCAL_STORAGE_KEY } from '@/shared/localStorage/refreshToken';

export const getToken = () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY());
  const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY());
  return { refreshToken, accessToken }
};
