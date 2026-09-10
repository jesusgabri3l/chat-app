import type { ChatUser } from '../../types';

const STORAGE_KEY = 'devchat:session';

export type StoredSession = {
  credential: string;
  user: ChatUser;
  exp: number; // seconds since epoch, from the Google ID token's `exp` claim
};

export const saveSession = (session: StoredSession) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // localStorage unavailable (private mode, blocked cookies, etc.) — session just won't persist
  }
};

export const loadSession = (): StoredSession | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const session: StoredSession = JSON.parse(raw);
    if (session.exp * 1000 <= Date.now()) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
};

export const clearSession = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
};
