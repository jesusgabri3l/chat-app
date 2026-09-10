import { jwtDecode } from 'jwt-decode';
import type { ChatUser } from '../../types';

type GoogleIdTokenPayload = {
  sub: string;
  name: string;
  email: string;
  picture: string;
  exp: number; // seconds since epoch
};

export const decodeGoogleCredential = (credential: string): { user: ChatUser; exp: number } => {
  const payload = jwtDecode<GoogleIdTokenPayload>(credential);
  return {
    user: {
      googleId: payload.sub,
      name: payload.name,
      email: payload.email,
      imageUrl: payload.picture,
    },
    exp: payload.exp,
  };
};
