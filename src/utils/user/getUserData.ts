import { $axios } from '@/api/interceptor';

export const getUserData = async () => {
  try {
    const { data } = await $axios.get('/auth/profile');
    return data;
  } catch (error) {
    console.error('Error while fetching user data:', error);
    throw error;
  }
};
