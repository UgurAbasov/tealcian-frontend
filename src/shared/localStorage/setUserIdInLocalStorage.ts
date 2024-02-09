import { USER_ID_LOCAL_STORAGE_KEY } from '@/shared/localStorage/userId';

export const setUserIdInLocalStorage = (userId: string) => {
  localStorage.setItem(USER_ID_LOCAL_STORAGE_KEY(), userId);
};
