import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from '@/shared/localStorage/accessToken';

export const setAccessTokenInLocalStorage = (accessToken: string) => {
  localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY(), accessToken);
};
