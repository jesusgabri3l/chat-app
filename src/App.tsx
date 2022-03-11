import React, { useState } from 'react';
import socket from './utils/socket/socket';
import { useAuthIn, refreshTokenSetup } from './utils/auth/useAuth';
import api from './utils/api/api';
import './styles/styles.scss';
import ChatView from './views/ChatView';
import LoginView from './views/LoginView';

function App () {
  const [view, setView] = useState('login');
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const onSuccessLogin = async (res: any) => {
    refreshTokenSetup(res);
    api.setToken(res.tokenId);
    socket.auth.token = res.tokenId;
    socket.connect();
    setUser(res.profileObj);
    setLoading(false);
    setView('chat');
  };

  const onFailureLogin = () => setLoading(false);

  const onRequestLogin = () => setLoading(true);

  const onAutoLoadFinished = (res: any) => { if (res === false) setLoading(false); };

  const signIn = useAuthIn(onSuccessLogin, onFailureLogin, onRequestLogin, onAutoLoadFinished);

  return (
    <div className="container">
      { view === 'login' ? <LoginView signIn={signIn} loading={loading} /> : <ChatView user={user} /> }
    </div>
  );
}

export default App;
