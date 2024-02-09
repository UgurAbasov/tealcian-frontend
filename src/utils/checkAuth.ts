import { getToken } from '@/hooks/getToken';
import { refreshAccessToken } from '@/shared/localStorage/refreshAccessToken';
import { setAccessTokenInLocalStorage } from '@/shared/localStorage/setAccessTokenInLocalStorage';
import { setUserIdInLocalStorage } from '@/shared/localStorage/setUserIdInLocalStorage';
import { clearLocalStorage } from '@/utils/localStorage/clearLocalStorage';
import { getUserData } from '@/utils/user/getUserData';

export const enum ERROR_CODE {
  SUCCESS = 1,
  FAILURE = 0,
}

const checkAuth = async () => {
  try {
    const { accessToken, refreshToken } = getToken();

    if (!refreshToken || !accessToken) {
      clearLocalStorage();
      return ERROR_CODE.FAILURE;
    }

    const accessResponse = await getUserData();
    if (accessResponse.id) {
      setUserIdInLocalStorage(accessResponse.id);
      return ERROR_CODE.SUCCESS;
    } else {
      const refreshResponse = await refreshAccessToken(refreshToken);
      if (refreshResponse.accessToken) {
        setAccessTokenInLocalStorage(refreshResponse.accessToken);
        return ERROR_CODE.SUCCESS;
      } else {
        return ERROR_CODE.FAILURE;
      }
    }
  } catch (error) {
    console.error('An error occurred during authentication:', error);
    return ERROR_CODE.FAILURE;
  }
};

export default checkAuth;
