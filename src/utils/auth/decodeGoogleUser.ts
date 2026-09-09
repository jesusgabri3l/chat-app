import { jwtDecode } from 'jwt-decode';
import type { ChatUser } from '../../types';

type GoogleIdTokenPayload = {
  sub: string;
  name: string;
  email: string;
  picture: string;
};

export const decodeGoogleCredential = (credential: string): ChatUser => {
  const payload = jwtDecode<GoogleIdTokenPayload>(credential);
  return {
    googleId: payload.sub,
    name: payload.name,
    email: payload.email,
    imageUrl: payload.picture,
  };
};
