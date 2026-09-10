import { useEffect, useRef, useState } from 'react';
import { googleLogout } from '@react-oauth/google';
import type { CredentialResponse } from '@react-oauth/google';

import socket from './utils/socket/socket';
import { decodeGoogleCredential } from './utils/auth/decodeGoogleUser';
import { clearSession, loadSession, saveSession } from './utils/auth/session';
import api from './utils/api/api';
import type { ChatUser } from './types';
import './styles/styles.scss';
import ChatView from './views/ChatView';
import LoginView from './views/LoginView';

function App() {
  const [user, setUser] = useState<ChatUser | null>(() => loadSession()?.user ?? null);
  const expiryTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleLogout = () => {
    clearTimeout(expiryTimer.current);
    googleLogout();
    socket.disconnect();
    clearSession();
    setUser(null);
  };

  const connectWithCredential = (credential: string, exp: number) => {
    api.setToken(credential);
    socket.auth = { token: credential };
    socket.connect();

    clearTimeout(expiryTimer.current);
    expiryTimer.current = setTimeout(handleLogout, exp * 1000 - Date.now());
  };

  useEffect(() => {
    const stored = loadSession();
    if (stored) connectWithCredential(stored.credential, stored.exp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoginSuccess = (credentialResponse: CredentialResponse) => {
    const { credential } = credentialResponse;
    if (!credential) return;

    const { user: loggedInUser, exp } = decodeGoogleCredential(credential);
    saveSession({ credential, user: loggedInUser, exp });
    connectWithCredential(credential, exp);
    setUser(loggedInUser);
  };

  return (
    <div className="container">
      {user ? (
        <ChatView user={user} onLogout={handleLogout} />
      ) : (
        <LoginView onSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
