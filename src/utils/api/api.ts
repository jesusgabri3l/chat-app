import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { ChatMessage } from '../../types';

const URL = import.meta.env.VITE_API_URL as string;
let token = '';

export const api = axios.create({
  baseURL: `${URL}api/`,
});

api.interceptors.request.use((req) => {
  req.headers.authorization = token;
  return req;
});

export default {
  URL,
  getMessages(): Promise<AxiosResponse<ChatMessage[]>> {
    return api.get('messages');
  },
  setToken(tokenId: string): void {
    token = tokenId;
  },
};
