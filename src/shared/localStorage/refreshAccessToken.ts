import refresh from '@/utils/refresh';

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    return await refresh(refreshToken);
  } catch (error) {
    console.error('Error while refreshing access token:', error);
    throw error;
  }
};
