import axios, { AxiosResponse } from 'axios';

const URL = 'http://localhost:5000/';
let token = '';

export const api = axios.create({
  baseURL: `${URL}api/`,
});

api.interceptors.request.use((req: any) => {
  req.headers.authorization = token;
  return req;
}, (error) => {
  if (error) {
    // eslint-disable-next-line
    console.log(error);
  }
});

export default {
  URL,
  getMessages (): Promise<AxiosResponse> {
    return api.get('messages');
  },
  setToken (tokenId: string): void {
    token = tokenId;
  },
};
