import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from '@/shared/localStorage/accessToken';
import { REFRESH_TOKEN_LOCAL_STORAGE_KEY } from '@/shared/localStorage/refreshToken';

export const clearLocalStorage = () => {
  localStorage.removeItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY());
  localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY());
};
