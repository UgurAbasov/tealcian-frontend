import axios from 'axios';

import { BACKEND_URL } from '@/shared/const/BACKEND_URL';
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from '@/shared/localStorage/accessToken';

export const $axios = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '<origin>',
    Authorization: `Bearer ${ACCESS_TOKEN_LOCAL_STORAGE_KEY()}`,
  },
});
