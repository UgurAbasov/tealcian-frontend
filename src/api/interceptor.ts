import axios from 'axios';

import Cookies from 'js-cookie';

import { BACKEND_URL } from '@/shared/const/BACKEND_URL';
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from '@/shared/localStorage/accessToken';

export const $axios = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '<origin>',
    Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_LOCAL_STORAGE_KEY())}`,
  },
});
