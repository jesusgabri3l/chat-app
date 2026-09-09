import { useState } from 'react';
import { googleLogout } from '@react-oauth/google';
import type { CredentialResponse } from '@react-oauth/google';

import socket from './utils/socket/socket';
import { decodeGoogleCredential } from './utils/auth/decodeGoogleUser';
import api from './utils/api/api';
import type { ChatUser } from './types';
import './styles/styles.scss';
import ChatView from './views/ChatView';
import LoginView from './views/LoginView';

function App() {
  const [user, setUser] = useState<ChatUser | null>(null);

  const handleLoginSuccess = (credentialResponse: CredentialResponse) => {
    const { credential } = credentialResponse;
    if (!credential) return;

    api.setToken(credential);
    socket.auth = { token: credential };
    socket.connect();
    setUser(decodeGoogleCredential(credential));
  };

  const handleLogout = () => {
    googleLogout();
    socket.disconnect();
    setUser(null);
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
